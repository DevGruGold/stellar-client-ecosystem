
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "AI Assistants", href: "#personas" },
        { label: "Modules", href: "#modules" },
        { label: "Pricing", href: "#contact" },
        { label: "Roadmap", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "FAQs", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#contact" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-tight">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary to-accent"></div>
              <span className="text-xl font-bold">Client Compass AI</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Empower your business with our AI-driven, modular ecosystem that captures every client need, 
              plans every project, and manages content seamlessly.
            </p>
            <p className="text-gray-500 text-sm">
              © {currentYear} Client Compass AI. All rights reserved.
            </p>
          </div>
          
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href={link.href} className="text-gray-600 hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            Made with <Heart size={14} className="inline text-red-500" /> by XMRT Solutions
          </div>
          <div className="mt-4 md:mt-0">
            <a href="mailto:xmrtsolutions@gmail.com" className="hover:text-primary transition-colors">
              xmrtsolutions@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
