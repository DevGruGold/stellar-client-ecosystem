
import React from 'react';
import { CircleUser, GitBranch, BarChart, MessageSquare, FileText, Zap } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-gray-50" id="features">
      <div className="container-tight">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            Why Choose Client Compass AI
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A Complete Client Management Ecosystem
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Our modular platform integrates everything you need to manage clients, 
            plan projects, and deliver outstanding results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CircleUser,
              title: "Enhanced Client Engagement",
              description: "Keep clients engaged and informed throughout the entire project lifecycle.",
              delay: "delay-100"
            },
            {
              icon: GitBranch,
              title: "Reduced Project Risks",
              description: "Identify potential issues before they become problems with AI-powered insights.",
              delay: "delay-200"
            },
            {
              icon: Zap,
              title: "Improved Productivity",
              description: "Automate repetitive tasks and streamline workflows to focus on high-value work.",
              delay: "delay-300"
            },
            {
              icon: BarChart,
              title: "Data-Driven Decisions",
              description: "Make informed decisions based on comprehensive analytics and real-time tracking.",
              delay: "delay-100"
            },
            {
              icon: MessageSquare,
              title: "Unified Communication",
              description: "Centralize all client communications for better context and response time.",
              delay: "delay-200"
            },
            {
              icon: FileText,
              title: "Content Integration",
              description: "Seamlessly connect your content creation with client needs and project timelines.",
              delay: "delay-300"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`bg-white p-6 rounded-lg border border-gray-100 card-hover animate-fade-up ${feature.delay}`}>
                <div className="feature-icon-container mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
