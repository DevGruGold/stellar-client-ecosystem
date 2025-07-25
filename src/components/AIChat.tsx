
import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Users, Loader2, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { generateAIResponse, personas } from '@/services/geminiService';
import { toast } from '@/components/ui/use-toast';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  persona?: 'estrella' | 'stellar';
  timestamp: Date;
  error?: boolean;
}

interface PersonaState {
  messages: Message[];
  isLoading: boolean;
}

const AIChat: React.FC = () => {
  const [activePersona, setActivePersona] = useState<'estrella' | 'stellar'>('estrella');
  const [inputText, setInputText] = useState('');
  const [personaStates, setPersonaStates] = useState<Record<'estrella' | 'stellar', PersonaState>>({
    estrella: {
      messages: [{
        text: "Hello! I'm Estrella, your strategic planning assistant powered by Gemini AI. I specialize in project organization, content management, and helping you execute plans with precision. How can I help you organize your projects today?",
        sender: 'ai',
        persona: 'estrella',
        timestamp: new Date()
      }],
      isLoading: false
    },
    stellar: {
      messages: [{
        text: "Hi there! I'm Stellar, your client relations expert powered by Gemini AI. I focus on understanding client needs, building relationships, and delivering insights that improve client satisfaction. How can I help you strengthen your client relationships today?",
        sender: 'ai',
        persona: 'stellar',
        timestamp: new Date()
      }],
      isLoading: false
    }
  });
  const [apiConfigured, setApiConfigured] = useState(true);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const checkAPIConfig = async () => {
      try {
        console.log("Checking Gemini API configuration...");
        const testResponse = await generateAIResponse("Hello", "estrella");
        if (testResponse.error?.includes("Missing API key") || testResponse.error?.includes("Gemini API key")) {
          console.log("Gemini API key missing");
          setApiConfigured(false);
        } else {
          console.log("Gemini API configuration check passed");
          setApiConfigured(true);
        }
      } catch (error) {
        console.error("Error checking Gemini API configuration:", error);
        setApiConfigured(false);
      }
    };
    
    if (networkStatus === 'online') {
      checkAPIConfig();
    }
  }, [networkStatus]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [personaStates, activePersona]);

  const handlePersonaSwitch = (persona: 'estrella' | 'stellar') => {
    if (persona !== activePersona) {
      setActivePersona(persona);
      setInputText(''); // Clear input when switching
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    if (networkStatus === 'offline') {
      toast({
        title: "No Internet Connection",
        description: "You are currently offline. Please check your internet connection and try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (!apiConfigured) {
      toast({
        title: "Gemini API Configuration Error",
        description: "The Gemini AI service is not properly configured. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      persona: activePersona,
      timestamp: new Date()
    };

    // Add user message to current persona's conversation
    setPersonaStates(prev => ({
      ...prev,
      [activePersona]: {
        ...prev[activePersona],
        messages: [...prev[activePersona].messages, userMessage],
        isLoading: true
      }
    }));

    setInputText('');

    try {
      console.log(`Sending message to ${activePersona}:`, inputText);
      
      // Build conversation context for the current persona
      const currentMessages = personaStates[activePersona].messages;
      const conversationContext = currentMessages
        .slice(-5) // Last 5 messages for context
        .map(msg => `${msg.sender === 'user' ? 'User' : personas[activePersona].name}: ${msg.text}`)
        .join('\n') + `\nUser: ${inputText}`;

      const response = await generateAIResponse(conversationContext, activePersona);
      console.log(`Received response from ${activePersona}:`, response);
      
      const aiMessage: Message = {
        text: response.text,
        sender: 'ai',
        persona: activePersona,
        timestamp: new Date(),
        error: !!response.error
      };
      
      // Add AI response to current persona's conversation
      setPersonaStates(prev => ({
        ...prev,
        [activePersona]: {
          ...prev[activePersona],
          messages: [...prev[activePersona].messages, aiMessage],
          isLoading: false
        }
      }));
      
      if (response.error) {
        toast({
          title: "AI Response Error",
          description: response.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(`Error getting response from ${activePersona}:`, error);
      
      const errorMessage: Message = {
        text: "Sorry, there was an error connecting to the AI service. Please check your network connection and try again.",
        sender: 'ai',
        persona: activePersona,
        timestamp: new Date(),
        error: true
      };

      setPersonaStates(prev => ({
        ...prev,
        [activePersona]: {
          ...prev[activePersona],
          messages: [...prev[activePersona].messages, errorMessage],
          isLoading: false
        }
      }));
      
      toast({
        title: "Connection Error",
        description: "There was an issue connecting to the AI service. Please check your network connection.",
        variant: "destructive"
      });
    }
  };

  const currentPersonaState = personaStates[activePersona];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-3xl mx-auto">
      {networkStatus === 'offline' && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex items-center gap-2">
          <WifiOff className="text-amber-500" />
          <div>
            <p className="font-medium text-amber-800">No Internet Connection</p>
            <p className="text-sm text-amber-700">You are currently offline. Please check your internet connection to use the AI assistants.</p>
          </div>
        </div>
      )}
      
      {networkStatus === 'online' && !apiConfigured && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 flex items-center gap-2">
          <AlertTriangle className="text-amber-500" />
          <div>
            <p className="font-medium text-amber-800">Gemini AI Service Not Available</p>
            <p className="text-sm text-amber-700">The Gemini AI service is currently unavailable. Please try again later.</p>
          </div>
        </div>
      )}
      
      <div className="flex border-b">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 ${
            activePersona === 'estrella' 
              ? 'bg-primary/10 text-primary border-b-2 border-primary' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
          onClick={() => handlePersonaSwitch('estrella')}
          disabled={networkStatus === 'offline'}
        >
          <Cpu size={18} />
          <span>Estrella</span>
          <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">Strategic Planning</span>
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-200 ${
            activePersona === 'stellar' 
              ? 'bg-accent/10 text-accent border-b-2 border-accent' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
          onClick={() => handlePersonaSwitch('stellar')}
          disabled={networkStatus === 'offline'}
        >
          <Users size={18} />
          <span>Stellar</span>
          <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">Client Relations</span>
        </button>
        
        <div className="ml-auto flex items-center px-4">
          {networkStatus === 'online' ? (
            <Wifi className="text-green-500" size={16} />
          ) : (
            <WifiOff className="text-gray-400" size={16} />
          )}
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto bg-gray-50">
        {currentPersonaState.messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
          >
            <div 
              className={`max-w-xs sm:max-w-md p-3 rounded-lg transition-all duration-200 ${
                message.sender === 'user'
                  ? 'bg-gray-200 text-gray-800'
                  : message.error
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : activePersona === 'estrella'
                      ? 'bg-primary/10 text-gray-800'
                      : 'bg-accent/10 text-gray-800'
              }`}
            >
              {message.text}
              <div className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {currentPersonaState.isLoading && (
          <div className="flex justify-start mb-4">
            <div className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
              activePersona === 'estrella' 
                ? 'bg-primary/10' 
                : 'bg-accent/10'
            }`}>
              <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask ${activePersona === 'estrella' ? 'Estrella about strategic planning' : 'Stellar about client relations'}...`}
          disabled={currentPersonaState.isLoading || networkStatus === 'offline' || !apiConfigured}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
        <button 
          type="submit" 
          disabled={currentPersonaState.isLoading || !inputText.trim() || networkStatus === 'offline' || !apiConfigured}
          className={`p-2 rounded-lg transition-all ${
            activePersona === 'estrella' 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-accent text-white hover:bg-accent/90'
          } disabled:opacity-50`}
        >
          {currentPersonaState.isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

export default AIChat;
