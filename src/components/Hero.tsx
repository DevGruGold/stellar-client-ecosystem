
import React, { useState } from 'react';
import { ChevronRight, Cpu, Users } from 'lucide-react';

const Hero = () => {
  const [activeTab, setActiveTab] = useState<'estrella' | 'stellar'>('estrella');
  
  return (
    <section className="pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container-tight">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            Introducing Client Compass AI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-8 heading-gradient">
            Meet Your AI-Powered<br />Client Management Team
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Revolutionize your client relationships with our dual AI assistants that capture needs, 
            plan projects, and manage content in one seamless ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#personas" className="btn-primary">
              Meet the AI Assistants
            </a>
            <a href="#modules" className="btn-secondary">
              Explore Features
            </a>
          </div>
        </div>
        
        {/* AI Persona Showcase */}
        <div className="mt-16 grid md:grid-cols-2 gap-8" id="personas">
          <div 
            className={`persona-card animate-scale-in delay-100 ${activeTab === 'estrella' ? 'border-primary/30 ring-1 ring-primary/20' : ''}`}
            onClick={() => setActiveTab('estrella')}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Cpu className="text-primary" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">Estrella</h3>
                <p className="text-gray-600 mb-4">Your strategic planning assistant</p>
                
                {activeTab === 'estrella' && (
                  <div className="animate-fade-up">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-700">
                        "I specialize in project organization, content management, and helping you execute plans with precision."
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Project Planning", "Content Management", "Task Scheduling"].map((skill, i) => (
                        <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div 
            className={`persona-card animate-scale-in delay-200 ${activeTab === 'stellar' ? 'border-accent/30 ring-1 ring-accent/20' : ''}`}
            onClick={() => setActiveTab('stellar')}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="text-accent" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-accent mb-2">Stellar</h3>
                <p className="text-gray-600 mb-4">Your client relations expert</p>
                
                {activeTab === 'stellar' && (
                  <div className="animate-fade-up">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="text-gray-700">
                        "I focus on client needs analysis, relationship nurturing, and providing real-time performance insights."
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Client Analysis", "Relationship Management", "Performance Insights"].map((skill, i) => (
                        <span key={i} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center animate-fade-up delay-300">
          <p className="text-gray-600 mb-4">
            Estrella & Stellar work together seamlessly, each bringing unique strengths to transform your business.
          </p>
          <a href="#modules" className="inline-flex items-center text-primary font-medium hover:underline">
            See how they power our modules <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
