
// Anthropic API service for Estrella and Stellar AI personas

interface AnthropicResponse {
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

// Hard-coded API keys as fallbacks
const ANTHROPIC_API_KEY = "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";

export async function generateAIResponse(
  message: string, 
  persona: 'estrella' | 'stellar'
): Promise<AnthropicResponse> {
  try {
    // First try to use the environment variable, then fall back to the hardcoded key
    const API_KEY = import.meta.env.ANTHROPIC_API_KEY || ANTHROPIC_API_KEY;
    
    if (!API_KEY) {
      console.error("Missing Anthropic API key");
      return { 
        text: "I'm unable to respond right now because the API key hasn't been configured properly.",
        error: "Missing API key" 
      };
    }

    console.log("Attempting to call Anthropic API...");
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `${personas[persona].prompt}\n\nUser message: ${message}`
          }
        ]
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
      
      console.error("Anthropic API error:", errorData);
      return { 
        text: `I encountered an error (${response.status}): ${errorData.error?.message || "Unknown error"}. Please check your network connection.`,
        error: errorData.error?.message || `HTTP error ${response.status}` 
      };
    }

    const data = await response.json();
    
    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return { 
        text: "Sorry, I encountered an error while processing your request. Please try again later.",
        error: data.error.message 
      };
    }

    // Extract the response text from the Anthropic API response
    const responseText = data.content?.[0]?.text || "I couldn't generate a response. Please try again later.";
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return { 
      text: "Sorry, I couldn't connect to the AI service right now. Please check your internet connection and try again.",
      error: String(error) 
    };
  }
}
