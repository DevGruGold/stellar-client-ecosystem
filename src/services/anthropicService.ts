
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

export async function generateAIResponse(
  message: string, 
  persona: 'estrella' | 'stellar'
): Promise<AnthropicResponse> {
  try {
    const API_KEY = import.meta.env.ANTHROPIC_API_KEY;
    
    if (!API_KEY) {
      console.error("Missing Anthropic API key");
      return { 
        text: "Sorry, I'm unable to respond right now due to a configuration issue.",
        error: "Missing API key" 
      };
    }

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

    const data = await response.json();
    
    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return { 
        text: "Sorry, I encountered an error while processing your request.",
        error: data.error.message 
      };
    }

    // Extract the response text from the Anthropic API response
    const responseText = data.content[0].text;
    return { text: responseText };
  } catch (error) {
    console.error("Error calling Anthropic API:", error);
    return { 
      text: "Sorry, I encountered an error while processing your request.",
      error: String(error) 
    };
  }
}
