
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-3 bg-white/90 backdrop-blur-sm shadow-sm" : "py-5"
    )}>
      <div className="container-tight flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary to-accent"></div>
          <span className="text-xl font-bold">Client Compass AI</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#personas">Meet the AI</NavLink>
          <NavLink href="#modules">Modules</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <button className="btn-primary">Get Demo</button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-up">
          <div className="container py-4 flex flex-col gap-4">
            <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#personas" onClick={() => setIsOpen(false)}>Meet the AI</MobileNavLink>
            <MobileNavLink href="#modules" onClick={() => setIsOpen(false)}>Modules</MobileNavLink>
            <MobileNavLink href="#testimonials" onClick={() => setIsOpen(false)}>Testimonials</MobileNavLink>
            <button className="btn-primary w-full">Get Demo</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-gray-700 hover:text-primary font-medium transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { 
  href: string, 
  onClick: () => void, 
  children: React.ReactNode 
}) => (
  <a 
    href={href} 
    className="text-gray-700 py-2 border-b border-gray-100 block"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
