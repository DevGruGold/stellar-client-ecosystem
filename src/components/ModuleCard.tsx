
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  className?: string;
}

const ModuleCard = ({ title, description, icon: Icon, iconColor, className }: ModuleCardProps) => {
  return (
    <div className={cn(
      "glass-card p-8 hover-lift flex flex-col h-full",
      className
    )}>
      <div className="mb-5 p-3 rounded-xl" style={{ backgroundColor: `${iconColor}10` }}>
        <Icon size={28} style={{ color: iconColor }} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <p className="text-gray-600 mb-5 flex-grow">{description}</p>
      
      <div className="mt-auto">
        <a 
          href="#contact" 
          className="text-sm font-medium text-gray-800 hover:text-black underline-offset-4 hover:underline transition-colors"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default ModuleCard;
