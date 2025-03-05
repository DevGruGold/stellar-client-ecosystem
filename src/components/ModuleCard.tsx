
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const ModuleCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "#000",
  className 
}: ModuleCardProps) => {
  return (
    <div 
      className={cn(
        "relative glass-card p-8 hover-lift group", 
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="mb-5 relative z-10">
        <div className="rounded-xl bg-white/80 p-3 w-fit shadow-sm">
          <Icon size={28} color={iconColor} strokeWidth={1.5} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3 text-gray-900 relative z-10">{title}</h3>
      
      <p className="text-gray-600 leading-relaxed relative z-10">{description}</p>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
    </div>
  );
};

export default ModuleCard;
