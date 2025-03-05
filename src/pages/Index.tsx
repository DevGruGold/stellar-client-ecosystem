
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import ModulesSection from '@/components/ModulesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const Index = () => {
  // Animation on scroll effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-fade-up');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check on load
    animateOnScroll();
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <ModulesSection />
      <TestimonialsSection />
      <CtaSection />
      
      {/* Contact Section */}
      <section className="section-padding" id="contact">
        <div className="container-tight">
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Start the Conversation
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're here to answer your questions and show you how Client Compass AI can work for your specific needs.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto animate-fade-up">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
