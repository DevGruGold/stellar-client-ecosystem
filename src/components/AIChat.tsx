
import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Users, Loader2, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { generateAIResponse, personas } from '@/services/anthropicService';
import { toast } from '@/components/ui/use-toast';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  persona?: 'estrella' | 'stellar';
  timestamp: Date;
  error?: boolean;
}

const AIChat: React.FC = () => {
  const [activePersona, setActivePersona] = useState<'estrella' | 'stellar'>('estrella');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiConfigured, setApiConfigured] = useState(true);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus('online');
    const handleOffline = () => setNetworkStatus('offline');
    
    // Initial check
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Check if API key is configured
    const checkAPIConfig = async () => {
      try {
        console.log("Checking API configuration...");
        const testResponse = await generateAIResponse("Hello", "estrella");
        if (testResponse.error?.includes("Missing API key")) {
          console.log("API key missing");
          setApiConfigured(false);
        } else {
          console.log("API configuration check passed");
          setApiConfigured(true);
        }
      } catch (error) {
        console.error("Error checking API configuration:", error);
        setApiConfigured(false);
      }
    };
    
    if (networkStatus === 'online') {
      checkAPIConfig();
    }

    const initialMessages: Message[] = [
      {
        text: "Hello! I'm Estrella, your strategic planning assistant. How can I help you organize your projects today?",
        sender: 'ai',
        persona: 'estrella',
        timestamp: new Date()
      },
      {
        text: "Hi there! I'm Stellar, your client relations expert. I can help you understand client needs and build stronger relationships. Just switch to my tab to chat with me!",
        sender: 'ai',
        persona: 'stellar',
        timestamp: new Date()
      }
    ];
    setMessages(initialMessages);
  }, [networkStatus]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        title: "API Configuration Error",
        description: "The AI service is not properly configured. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      console.log("Sending message to AI:", inputText);
      const response = await generateAIResponse(inputText, activePersona);
      console.log("Received AI response:", response);
      
      const aiMessage: Message = {
        text: response.text,
        sender: 'ai',
        persona: activePersona,
        timestamp: new Date(),
        error: !!response.error
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      if (response.error) {
        toast({
          title: "AI Response Error",
          description: response.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        text: "Sorry, there was an error connecting to the AI service. Please check your network connection and try again.",
        sender: 'ai',
        persona: activePersona,
        timestamp: new Date(),
        error: true
      }]);
      
      toast({
        title: "Connection Error",
        description: "There was an issue connecting to the AI service. Please check your network connection.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="font-medium text-amber-800">AI Service Not Available</p>
            <p className="text-sm text-amber-700">The AI service is currently unavailable. Please try again later.</p>
          </div>
        </div>
      )}
      
      <div className="flex border-b">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
            activePersona === 'estrella' 
              ? 'bg-primary/10 text-primary border-b-2 border-primary' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
          onClick={() => setActivePersona('estrella')}
          disabled={networkStatus === 'offline'}
        >
          <Cpu size={18} />
          <span>Estrella</span>
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
            activePersona === 'stellar' 
              ? 'bg-accent/10 text-accent border-b-2 border-accent' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
          onClick={() => setActivePersona('stellar')}
          disabled={networkStatus === 'offline'}
        >
          <Users size={18} />
          <span>Stellar</span>
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
        {messages.map((message, index) => {
          if (message.sender === 'ai' && message.persona !== activePersona && index > 1) {
            return null;
          }
          
          return (
            <div 
              key={index} 
              className={`mb-4 ${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
            >
              <div 
                className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-gray-200 text-gray-800'
                    : message.error
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : message.persona === 'estrella'
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
          );
        })}
        {isLoading && (
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
          placeholder={`Ask ${activePersona === 'estrella' ? 'Estrella' : 'Stellar'} something...`}
          disabled={isLoading || networkStatus === 'offline' || !apiConfigured}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputText.trim() || networkStatus === 'offline' || !apiConfigured}
          className={`p-2 rounded-lg ${
            activePersona === 'estrella' 
              ? 'bg-primary text-white' 
              : 'bg-accent text-white'
          } disabled:opacity-50`}
        >
          {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

export default AIChat;
