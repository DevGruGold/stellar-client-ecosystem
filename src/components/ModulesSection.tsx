
import React from 'react';
import { BookUser, MessageSquareText, ClipboardList, BarChart3, FileText, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  delay: string;
}

const ModuleCard = ({ title, description, icon: Icon, color, delay }: ModuleCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 card-hover animate-fade-up ${delay}`}>
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a 
        href="#contact" 
        className="text-sm font-medium inline-flex items-center"
        style={{ color }}
      >
        Learn more <Plus size={16} className="ml-1" />
      </a>
    </div>
  );
};

const ModulesSection = () => {
  const modules = [
    {
      title: "Client Compass",
      description: "The central hub for managing client interactions and nurturing relationships with data-driven insights.",
      icon: BookUser,
      color: "#4f46e5" // Indigo
    },
    {
      title: "Need Navigator",
      description: "A dynamic interface that engages clients and captures their requirements through AI-guided conversations.",
      icon: MessageSquareText,
      color: "#8b5cf6" // Purple
    },
    {
      title: "Blueprint Builder",
      description: "Translates client needs into detailed, actionable project plans with customizable templates.",
      icon: ClipboardList,
      color: "#10b981" // Emerald
    },
    {
      title: "Project Pulse",
      description: "Keeps you informed with live dashboards, KPI tracking, and predictive insights to ensure timely delivery.",
      icon: BarChart3,
      color: "#f97316" // Orange
    },
    {
      title: "Content Conductor",
      description: "Orchestrates all your digital assets and creative content, integrating with client and project data.",
      icon: FileText,
      color: "#ec4899" // Pink
    }
  ];

  return (
    <section className="section-padding" id="modules">
      <div className="container-tight">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            Our Modules
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Tools for Seamless Integration
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Each module is powerful on its own, but they're designed to work together 
            for a truly transformative experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <ModuleCard
              key={index}
              title={module.title}
              description={module.description}
              icon={module.icon}
              color={module.color}
              delay={`delay-${index * 100}`}
            />
          ))}
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 flex flex-col items-center justify-center text-center card-hover animate-fade-up delay-500">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
              <Plus size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom Modules</h3>
            <p className="text-gray-600 mb-4">Need something specific for your business? We can build custom modules.</p>
            <a href="#contact" className="btn-primary">
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
