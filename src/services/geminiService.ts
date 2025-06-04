
// Gemini API service for Estrella and Stellar AI personas

interface GeminiResponse {
  text: string;
  error?: string;
}

export const personas = {
  estrella: {
    name: "Estrella",
    role: "Strategic Planning Assistant",
    prompt: "You are Estrella, a strategic planning assistant specializing in project organization, content management, and helping clients execute plans with precision. Your tone is professional yet approachable. You focus on efficiency, organization, and practical solutions."
  },
  stellar: {
    name: "Stellar",
    role: "Client Relations Expert", 
    prompt: "You are Stellar, a client relations expert specializing in client needs analysis, relationship nurturing, and providing real-time performance insights. Your tone is warm and personable. You focus on understanding client needs, building relationships, and delivering insights that improve client satisfaction."
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
        text: "I'm unable to respond right now because the Gemini API key hasn't been configured properly.",
        error: "Missing API key" 
      };
    }

    console.log("Attempting to call Gemini API...");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${personas[persona].prompt}\n\nUser message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
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
        text: `I encountered an error (${response.status}): ${errorData.error?.message || "Unknown error"}. Please check your network connection.`,
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
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "Sorry, I couldn't connect to the AI service right now. Please check your internet connection and try again.",
      error: String(error) 
    };
  }
}
