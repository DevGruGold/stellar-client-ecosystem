
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
      <div ref={overlayRef} className="absolute inset-0 bg-gradient-radial from-transparent to-transparent via-accent/5 opacity-70 transition-transform duration-200 ease-out"></div>

      <div className="absolute inset-x-0 top-1/4 bg-gradient-radial from-accent/10 to-transparent w-full h-96 blur-3xl"></div>
      
      {/* Content */}
      <div className="container relative max-w-7xl mx-auto px-6 z-10 pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6 animate-bounce-subtle">
            Introducing Client Compass AI
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-fade-in">
            Meet Estrella & Stellar, Your Client Management Superstars
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Empower your business with an AI-driven, modular ecosystem featuring dual AI assistants that capture every client need, plan every project, and manage content seamlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a 
              href="#demo" 
              className="rounded-full px-8 py-3 bg-black text-white font-medium transition-all hover:bg-opacity-90 hover:shadow-md"
            >
              Request a Demo
            </a>
            <a 
              href="#modules" 
              className="rounded-full px-8 py-3 border border-black/10 bg-white hover:bg-black/5 font-medium transition-all"
            >
              Explore the Suite
            </a>
          </div>
        </div>

        {/* AI Personas */}
        <div className="flex justify-center mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="glass-card p-6 hover-lift flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 16c0 2 4 4 9 4s9-2 9-4"></path>
                  <path d="M12 12v8"></path>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                  <line x1="16" y1="16" x2="16" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Estrella</h3>
              <p className="text-gray-600">Your strategic planning assistant, specializing in project organization and content management.</p>
            </div>
            
            <div className="glass-card p-6 hover-lift flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Stellar</h3>
              <p className="text-gray-600">Your client relations expert, focusing on needs analysis and real-time performance insights.</p>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="hidden md:block absolute top-[40%] left-[10%] w-16 h-16 rounded-full bg-accent/10 blur-xl animate-pulse-subtle"></div>
        <div className="hidden md:block absolute top-[20%] right-[15%] w-24 h-24 rounded-full bg-black/5 blur-xl animate-float"></div>
        <div className="hidden md:block absolute bottom-[25%] left-[20%] w-20 h-20 rounded-full bg-black/5 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce-subtle">
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
