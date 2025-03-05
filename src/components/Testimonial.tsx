
import React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  className?: string;
}

const Testimonial = ({ quote, author, role, company, className }: TestimonialProps) => {
  return (
    <div className={cn(
      "glass-card p-8 hover-lift flex flex-col h-full group",
      className
    )}>
      <Quote size={32} className="text-accent/40 mb-5" />
      
      <p className="text-gray-800 font-medium leading-relaxed italic mb-6 flex-grow">
        {quote}
      </p>
      
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">
          {role}, {company}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
    </div>
  );
};

export default Testimonial;
