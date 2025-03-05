
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { ChevronRight, Mail, Phone } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<keyof FormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: keyof FormData) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Message sent successfully! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      // Would normally send to server here
      console.log('Form submitted with:', formData);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Get in touch</h3>
          <p className="text-gray-600 mb-6">
            Interested in seeing how Estrella can transform your business? Reach out to us for a personalized demo.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-black/5">
                <Mail size={18} className="text-gray-700" />
              </div>
              <a href="mailto:xmrtsolutions@gmail.com" className="text-gray-700 hover:text-black transition-colors">
                xmrtsolutions@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-black/5">
                <Phone size={18} className="text-gray-700" />
              </div>
              <span className="text-gray-700">Contact via email for phone details</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className={cn(
                  "text-sm font-medium mb-1.5 block transition-colors",
                  activeField === 'name' ? "text-black" : "text-gray-600"
                )}
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className={cn(
                  "text-sm font-medium mb-1.5 block transition-colors",
                  activeField === 'email' ? "text-black" : "text-gray-600"
                )}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="company"
              className={cn(
                "text-sm font-medium mb-1.5 block transition-colors",
                activeField === 'company' ? "text-black" : "text-gray-600"
              )}
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              onFocus={() => handleFocus('company')}
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>
          
          <div>
            <label
              htmlFor="message"
              className={cn(
                "text-sm font-medium mb-1.5 block transition-colors",
                activeField === 'message' ? "text-black" : "text-gray-600"
              )}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full px-6 py-3 bg-black text-white font-medium transition-all hover:bg-opacity-90 hover:shadow-md flex items-center gap-1 disabled:opacity-70"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <ChevronRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
