
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="mb-5">
              <span className="font-display font-bold text-xl tracking-tight">Estrella</span>
            </div>
            <p className="text-gray-600 mb-6">
              Empowering businesses with AI-driven client management solutions.
            </p>
            <a 
              href="#demo" 
              className="inline-flex items-center text-sm font-medium text-gray-800 hover:text-black transition-colors"
            >
              Book a demo <ChevronRight size={14} className="ml-1" />
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              <FooterLink href="#overview">Overview</FooterLink>
              <FooterLink href="#modules">Modules</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#integrations">Integrations</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#security">Security</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 order-2 md:order-1">
            &copy; {year} Estrella. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 order-1 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
    >
      {children}
    </a>
  </li>
);

export default Footer;
