
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

export async function generateAIResponse(
  message: string, 
  persona: 'estrella' | 'stellar'
): Promise<GeminiResponse> {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      console.error("Missing Gemini API key");
      return { 
        text: "Sorry, I'm unable to respond right now due to a configuration issue.",
        error: "Missing API key" 
      };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${personas[persona].prompt}\n\nUser message: ${message}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return { 
        text: "Sorry, I encountered an error while processing your request.",
        error: data.error.message 
      };
    }

    // Extract the response text from the Gemini API response
    const responseText = data.candidates[0].content.parts[0].text;
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { 
      text: "Sorry, I encountered an error while processing your request.",
      error: String(error) 
    };
  }
}
