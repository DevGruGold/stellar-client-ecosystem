
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  delay: string;
}

const TestimonialCard = ({ quote, author, role, company, delay }: TestimonialProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 card-hover h-full animate-fade-up ${delay}`}>
      <Quote size={24} className="text-primary/30 mb-4" />
      <p className="text-gray-700 italic mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-gray-500 text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Client Compass AI has transformed how we manage our projects. Estrella's recommendations alone have saved us countless hours in planning.",
      author: "Sarah Johnson",
      role: "Project Director",
      company: "Design Collective"
    },
    {
      quote: "The integration between modules gives us a unified view of our business that we've never had before. Stellar is like having an extra team member!",
      author: "Michael Chen",
      role: "CEO",
      company: "Innovate Digital"
    },
    {
      quote: "The dual AI approach with Estrella and Stellar has completely changed our client relationships. We're now able to anticipate needs before clients even express them.",
      author: "Elena Rodriguez",
      role: "Client Success Manager",
      company: "Web Solutions Inc."
    }
  ];

  return (
    <section className="section-padding bg-gray-50" id="testimonials">
      <div className="container-tight">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            See how Client Compass AI is helping businesses streamline their operations 
            and delight their clients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              delay={`delay-${index * 100}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
