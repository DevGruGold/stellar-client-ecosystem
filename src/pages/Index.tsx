import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ModuleCard from '@/components/ModuleCard';
import Testimonial from '@/components/Testimonial';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { 
  BookUser, 
  MessageSquareText, 
  ClipboardList, 
  BarChart3,
  FileText,
  Sparkles,
  Users,
  Shield,
  Clock,
  LayoutGrid,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
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
    <div className="relative">
      <Navbar />
      <Hero />
      
      {/* Overview Section */}
      <section className="py-20 sm:py-28 relative" id="overview">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6">
                Modular Ecosystem
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-balance">
                Complete, scalable client management solution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 max-w-xl text-balance">
                Client Compass AI brings together client management, project planning, analytics, and content orchestration in one seamless ecosystem. Use modules together or as standalone products.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "AI assistants Estrella & Stellar to guide your workflow",
                  "Seamless integrations with your favorite tools",
                  "Real-time collaboration and data sharing",
                  "Customizable to fit your unique workflow"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-accent/10">
                      <Sparkles size={14} className="text-accent/80" />
                    </div>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#modules"
                className="inline-flex items-center font-medium hover:underline transition-all"
              >
                Discover all modules <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
            
            <div className="relative animate-on-scroll">
              <div className="glass-panel p-8 rounded-2xl">
                <div className="absolute -top-3 -right-3 bg-accent rounded-full text-white text-xs px-3 py-1 font-medium">
                  Modular Design
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: BookUser, label: "Client Compass" },
                    { icon: MessageSquareText, label: "Need Navigator" },
                    { icon: ClipboardList, label: "Blueprint Builder" },
                    { icon: BarChart3, label: "Project Pulse" },
                    { icon: FileText, label: "Content Conductor" },
                    { icon: LayoutGrid, label: "More Coming Soon..." },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex flex-col items-center p-4 rounded-xl bg-white/80 border border-gray-100 text-center hover:shadow-sm hover:bg-white transition-all">
                        <Icon size={24} className="text-gray-800 mb-3" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="hidden md:block absolute -z-10 -top-10 -left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
              <div className="hidden md:block absolute -z-10 -bottom-10 -right-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modules Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative" id="modules">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6">
              Our Modules
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-balance">
              Powerful tools designed for seamless integration
            </h2>
            <p className="text-gray-700 leading-relaxed text-balance">
              Each module is powerful on its own, but they're designed to work together for a truly transformative experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard 
              title="Client Compass"
              description="The central hub for managing client interactions and nurturing relationships with data-driven insights."
              icon={BookUser}
              iconColor="#3b82f6"
              className="animate-on-scroll"
            />
            <ModuleCard 
              title="Need Navigator"
              description="A dynamic interface that engages clients and captures their requirements through AI-guided conversations."
              icon={MessageSquareText}
              iconColor="#8b5cf6"
              className="animate-on-scroll delay-100"
            />
            <ModuleCard 
              title="Blueprint Builder"
              description="Translates client needs into detailed, actionable project plans with customizable templates and smart recommendations."
              icon={ClipboardList}
              iconColor="#10b981"
              className="animate-on-scroll delay-200"
            />
            <ModuleCard 
              title="Project Pulse"
              description="Keeps you informed with live dashboards, KPI tracking, and predictive insights to ensure timely project delivery."
              icon={BarChart3}
              iconColor="#f97316"
              className="animate-on-scroll delay-300"
            />
            <ModuleCard 
              title="Content Conductor"
              description="Orchestrates all your digital assets and creative content, integrating seamlessly with client and project data."
              icon={FileText}
              iconColor="#f43f5e"
              className="animate-on-scroll delay-400"
            />
            <div className="glass-card p-8 flex flex-col items-center justify-center text-center hover-lift animate-on-scroll delay-500">
              <div className="mb-5 p-3 rounded-xl bg-black/5 w-fit">
                <Sparkles size={28} className="text-gray-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Modules</h3>
              <p className="text-gray-600 mb-5">Need something specific for your business? We can build custom modules.</p>
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                Get in touch <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 sm:py-28 relative" id="benefits">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6">
              Benefits
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-balance">
              Transform your client relationships
            </h2>
            <p className="text-gray-700 leading-relaxed text-balance">
              Estrella helps you deliver exceptional experiences for your clients while streamlining your internal operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
            {[
              {
                title: "Enhanced Client Engagement",
                description: "Keep clients engaged and informed throughout the entire project lifecycle with intuitive interfaces and clear communication.",
                icon: Users,
                delay: 0
              },
              {
                title: "Reduced Project Risks",
                description: "Identify potential issues before they become problems with AI-powered insights and comprehensive tracking features.",
                icon: Shield,
                delay: 0.1
              },
              {
                title: "Improved Productivity",
                description: "Automate repetitive tasks and streamline workflows to help your team focus on high-value creative work.",
                icon: Clock,
                delay: 0.2
              },
              {
                title: "Data-Driven Decisions",
                description: "Make informed decisions based on comprehensive analytics and real-time project tracking across all modules.",
                icon: BarChart3,
                delay: 0.3
              },
              {
                title: "Unified Business Operations",
                description: "Bring together all aspects of client management in one place for a cohesive, streamlined business operation.",
                icon: LayoutGrid,
                delay: 0.4
              },
              {
                title: "Scalable for Growth",
                description: "Start with what you need and expand as your business grows, with modular pricing that scales with you.",
                icon: Sparkles,
                delay: 0.5
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex animate-on-scroll" style={{ animationDelay: `${benefit.delay}s` }}>
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 rounded-lg bg-black/5 text-gray-800">
                      <Icon size={22} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white relative" id="testimonials">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6">
              Client Success
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-balance">
              Trusted by forward-thinking businesses
            </h2>
            <p className="text-gray-700 leading-relaxed text-balance">
              See how Client Compass AI is helping businesses streamline their operations and delight their clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial 
              quote="Client Compass AI has transformed how we manage our projects. Estrella's recommendations alone have saved us countless hours in planning."
              author="Sarah Johnson"
              role="Project Director"
              company="Design Collective"
              className="animate-on-scroll"
            />
            <Testimonial 
              quote="The integration between modules gives us a unified view of our business that we've never had before. Stellar is like having an extra team member!"
              author="Michael Chen"
              role="CEO"
              company="Innovate Digital"
              className="animate-on-scroll delay-100"
            />
            <Testimonial 
              quote="The dual AI approach with Estrella and Stellar has completely changed our client relationships. We're now able to anticipate needs before clients even express them."
              author="Elena Rodriguez"
              role="Client Success Manager"
              company="Web Solutions Inc."
              className="animate-on-scroll delay-200"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative" id="demo">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto glass-panel p-12 md:p-16 animate-on-scroll relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-accent/0 to-transparent opacity-70"></div>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Ready to transform your client operations?</h2>
                  <p className="text-gray-700 mb-0 md:max-w-md">
                    Schedule a personalized demo to see how Client Compass AI with Estrella & Stellar can work for your specific business needs.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#contact" 
                    className="rounded-full px-8 py-3 bg-black text-white font-medium transition-all hover:bg-opacity-90 hover:shadow-md whitespace-nowrap"
                  >
                    Request a Demo
                  </a>
                  <a 
                    href="#modules" 
                    className="rounded-full px-8 py-3 border border-black/10 bg-white hover:bg-black/5 font-medium transition-all whitespace-nowrap"
                  >
                    Explore Modules
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative" id="contact">
        <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <div className="inline-block rounded-full bg-black/5 px-4 py-1.5 text-sm font-medium mb-6">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6 text-balance">
              Let's start the conversation
            </h2>
            <p className="text-gray-700 leading-relaxed text-balance">
              We're here to answer your questions and show you how Client Compass AI can work for your specific needs.
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <ContactForm />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
