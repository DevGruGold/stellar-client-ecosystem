
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activePersona, setActivePersona] = useState<'estrella' | 'stellar' | null>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!overlayRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      overlayRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToModules = () => {
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const PersonaIntro = ({ type }: { type: 'estrella' | 'stellar' }) => {
    const isActive = activePersona === type;
    const isEstrella = type === 'estrella';

    return (
      <div 
        className={cn(
          "glass-card p-6 transition-all duration-300 cursor-pointer select-none",
          isActive ? "scale-105 shadow-lg" : "hover:scale-[1.02]",
          isActive && isEstrella ? "ring-2 ring-pink-400/50" : "",
          isActive && !isEstrella ? "ring-2 ring-blue-400/50" : ""
        )}
        onClick={() => setActivePersona(isActive ? null : type)}
      >
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center shrink-0",
            isEstrella ? "bg-pink-100" : "bg-blue-100"
          )}>
            {isEstrella ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                <path d="M3 16c0 2 4 4 9 4s9-2 9-4"></path>
                <path d="M12 12v8"></path>
                <line x1="8" y1="16" x2="8" y2="16"></line>
                <line x1="16" y1="16" x2="16" y2="16"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <circle cx="12" cy="8" r="5"></circle>
                <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2"></path>
              </svg>
            )}
          </div>
          
          <div className="text-left">
            <h3 className={cn(
              "text-xl font-semibold mb-1 flex items-center gap-2",
              isEstrella ? "text-pink-600" : "text-blue-600"
            )}>
              {isEstrella ? "Estrella" : "Stellar"}
              {isActive && <Sparkles size={16} className={isEstrella ? "text-pink-400" : "text-blue-400"} />}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3">
              {isEstrella 
                ? "Your strategic planning assistant" 
                : "Your client relations expert"}
            </p>
            
            {isActive && (
              <div className="animate-fade-in">
                <div className={cn(
                  "p-3 rounded-lg mb-3",
                  isEstrella ? "bg-pink-50" : "bg-blue-50"
                )}>
                  <div className="flex gap-2 items-start">
                    <MessageSquare size={18} className={isEstrella ? "text-pink-500 mt-1" : "text-blue-500 mt-1"} />
                    <p className="text-sm">
                      {isEstrella 
                        ? "I specialize in project organization, content management, and helping you execute plans with precision." 
                        : "I focus on client needs analysis, relationship nurturing, and providing real-time performance insights."}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {isEstrella 
                    ? ["Project Planning", "Content Management", "Task Scheduling"].map((skill, i) => (
                      <span key={i} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{skill}</span>
                    ))
                    : ["Client Analysis", "Relationship Management", "Performance Insights"].map((skill, i) => (
                      <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{skill}</span>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative md:min-h-[90vh] py-20 flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-radial from-transparent to-transparent via-accent/5 opacity-70 transition-transform duration-200 ease-out"></div>

      <div className="absolute inset-x-0 top-1/4 bg-gradient-radial from-accent/10 to-transparent w-full h-96 blur-3xl"></div>
      
      {/* Content */}
      <div className="container relative max-w-7xl mx-auto px-4 sm:px-6 z-10 pt-12 md:pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6 animate-bounce-subtle">
            Introducing Client Compass AI
          </div>
          
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-fade-in">
            Meet Estrella & Stellar, Your Client Management Superstars
          </h1>
          
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Empower your business with an AI-driven, modular ecosystem featuring dual AI assistants that capture every client need, plan every project, and manage content seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
            <a 
              href="#demo" 
              className="rounded-full px-8 py-3 bg-black text-white font-medium transition-all hover:bg-opacity-90 hover:shadow-md w-full sm:w-auto"
            >
              Request a Demo
            </a>
            <a 
              href="#modules" 
              className="rounded-full px-8 py-3 border border-black/10 bg-white hover:bg-black/5 font-medium transition-all w-full sm:w-auto"
            >
              Explore the Suite
            </a>
          </div>
        </div>

        {/* AI Personas - Interactive Section */}
        <div className="mt-12 md:mt-16 animate-fade-in max-w-4xl mx-auto" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl md:text-2xl font-medium text-center mb-6">Meet Your AI Assistants</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <PersonaIntro type="estrella" />
            <PersonaIntro type="stellar" />
          </div>
          
          <div className="mt-8 p-5 glass-card bg-gradient-to-r from-pink-50 via-white to-blue-50 text-center">
            <Sparkles size={20} className="text-accent inline-block mb-2" />
            <p className="text-gray-700">
              Estrella & Stellar work together seamlessly to enhance your client management workflow, 
              each bringing unique strengths to help your business thrive.
            </p>
          </div>
        </div>

        {/* Floating elements - reduced for mobile */}
        <div className="hidden md:block absolute top-[40%] left-[10%] w-16 h-16 rounded-full bg-pink-100/40 blur-xl animate-pulse-subtle"></div>
        <div className="hidden md:block absolute top-[20%] right-[15%] w-24 h-24 rounded-full bg-blue-100/40 blur-xl animate-float"></div>
        <div className="hidden md:block absolute bottom-[25%] left-[20%] w-20 h-20 rounded-full bg-purple-100/40 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce-subtle">
        <button 
          onClick={scrollToModules}
          className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <span className="text-sm font-medium mb-2">Discover More</span>
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
