
import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Users, Loader2 } from 'lucide-react';
import { generateAIResponse, personas } from '@/services/geminiService';
import { toast } from '@/components/ui/use-toast';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  persona?: 'estrella' | 'stellar';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [activePersona, setActivePersona] = useState<'estrella' | 'stellar'>('estrella');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome messages
  useEffect(() => {
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
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Get AI response
      const response = await generateAIResponse(inputText, activePersona);
      
      if (response.error) {
        toast({
          title: "Error",
          description: "There was an issue connecting to the AI service. Please try again.",
          variant: "destructive"
        });
      }

      // Add AI response
      const aiMessage: Message = {
        text: response.text,
        sender: 'ai',
        persona: activePersona,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "There was an issue connecting to the AI service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-3xl mx-auto">
      {/* Persona Tabs */}
      <div className="flex border-b">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
            activePersona === 'estrella' 
              ? 'bg-primary/10 text-primary border-b-2 border-primary' 
              : 'hover:bg-gray-50 text-gray-600'
          }`}
          onClick={() => setActivePersona('estrella')}
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
        >
          <Users size={18} />
          <span>Stellar</span>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.map((message, index) => {
          // Only show messages from the active persona or user messages
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

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask ${activePersona === 'estrella' ? 'Estrella' : 'Stellar'} something...`}
          disabled={isLoading}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputText.trim()}
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
