
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10",
        isScrolled ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl tracking-tight">Estrella</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="#modules">Modules</NavLink>
          <NavLink href="#benefits">Benefits</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          
          <Link 
            to="#demo" 
            className="rounded-full px-5 py-2 bg-black text-white font-medium text-sm transition-all hover:bg-opacity-90 flex items-center gap-1"
          >
            Request Demo <ChevronRight size={16} className="ml-1" />
          </Link>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in-slow">
          <MobileNavLink href="#modules" onClick={() => setIsMobileMenuOpen(false)}>Modules</MobileNavLink>
          <MobileNavLink href="#benefits" onClick={() => setIsMobileMenuOpen(false)}>Benefits</MobileNavLink>
          <MobileNavLink href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
          
          <Link 
            to="#demo" 
            className="rounded-full px-5 py-2 bg-black text-white font-medium text-sm transition-all hover:bg-opacity-90 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Request Demo <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-sm font-medium text-gray-800 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-base font-medium py-2 border-b border-gray-100"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
