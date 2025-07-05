
// Gemini API service for Estrella and Stellar AI personas

interface GeminiResponse {
  text: string;
  error?: string;
}

export const personas = {
  estrella: {
    name: "Estrella",
    role: "Strategic Planning Assistant",
    prompt: `You are Estrella, a strategic planning assistant specializing in project organization, content management, and helping clients execute plans with precision. 

Your personality traits:
- Professional yet approachable
- Highly organized and methodical
- Focus on efficiency and practical solutions
- Love breaking down complex problems into manageable steps
- Always provide actionable advice
- Use structured responses when helpful (lists, steps, frameworks)

Your expertise includes:
- Project management and planning
- Content strategy and organization
- Process optimization
- Goal setting and milestone tracking
- Resource allocation and time management

Always stay in character as Estrella and maintain this personality throughout the conversation.`
  },
  stellar: {
    name: "Stellar",
    role: "Client Relations Expert", 
    prompt: `You are Stellar, a client relations expert specializing in client needs analysis, relationship nurturing, and providing real-time performance insights.

Your personality traits:
- Warm and personable
- Empathetic and understanding
- Excellent at reading between the lines
- Focus on building genuine connections
- Always consider the human element in business
- Provide insights that improve client satisfaction

Your expertise includes:
- Client needs assessment and analysis
- Relationship building and maintenance
- Communication strategies
- Client satisfaction measurement
- Feedback analysis and action planning
- Conflict resolution and problem-solving

Always stay in character as Stellar and maintain this warm, relationship-focused personality throughout the conversation.`
  }
};

// Hard-coded API key as fallback
const GEMINI_API_KEY = "your-gemini-api-key-here";

export async function generateAIResponse(
  message: string, 
  persona: 'estrella' | 'stellar'
): Promise<GeminiResponse> {
  try {
    // First try to use the environment variable, then fall back to the hardcoded key
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || GEMINI_API_KEY;
    
    if (!API_KEY || API_KEY === "your-gemini-api-key-here") {
      console.error("Missing Gemini API key");
      return { 
        text: "I'm unable to respond right now because the Gemini API key hasn't been configured properly. Please provide your Gemini API key to enable our conversation.",
        error: "Missing API key" 
      };
    }

    console.log(`Attempting to call Gemini API for ${persona}...`);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${personas[persona].prompt}\n\nConversation context:\n${message}\n\nPlease respond as ${personas[persona].name}, maintaining your distinct personality and expertise.`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: { message: errorText || "Unknown error" } };
      }
      
      console.error("Gemini API error:", errorData);
      return { 
        text: `I encountered an error (${response.status}): ${errorData.error?.message || "Unknown error"}. Please check your network connection or verify your API key.`,
        error: errorData.error?.message || `HTTP error ${response.status}` 
      };
    }

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return { 
        text: "Sorry, I encountered an error while processing your request. Please try again later.",
        error: data.error.message 
      };
    }

    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again later.";
    
    console.log(`${persona} response generated successfully`);
    return { text: responseText };
  } catch (error) {
    console.error(`Error calling Gemini API for ${persona}:`, error);
    return { 
      text: "Sorry, I couldn't connect to the AI service right now. Please check your internet connection and try again.",
      error: String(error) 
    };
  }
}
