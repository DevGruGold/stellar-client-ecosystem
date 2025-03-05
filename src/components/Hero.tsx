
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
            Introducing the complete client management suite
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 animate-fade-in">
            Estrella: Your New Client Management Superstar
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Empower your business with an AI-driven, modular ecosystem that captures every client need, plans every project, and manages content seamlessly.
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
