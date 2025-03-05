
import React from 'react';

const CtaSection = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 md:p-12 text-center md:text-left animate-fade-up">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Ready to transform your client operations?
              </h2>
              <p className="text-gray-700">
                Schedule a personalized demo to see how Client Compass AI with Estrella & Stellar 
                can work for your specific business needs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary whitespace-nowrap">
                Request a Demo
              </a>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#personas')?.scrollIntoView({ behavior: 'smooth' });
              }} className="btn-secondary whitespace-nowrap">
                Try Estrella & Stellar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
