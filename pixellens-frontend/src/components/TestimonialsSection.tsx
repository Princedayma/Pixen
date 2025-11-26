'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Wedding Client',
      content: 'Pixellens captured our special day beautifully. Their attention to detail and creative vision exceeded our expectations!',
      avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=D4AF37&color=000'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Brand Manager',
      content: 'Working with Pixellens on our brand film was an amazing experience. They truly understood our vision and delivered exceptional quality.',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=D4AF37&color=000'
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Workshop Participant',
      content: 'The cinematography workshop transformed my understanding of visual storytelling. Highly recommend their training programs!',
      avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=D4AF37&color=000'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-900 rounded-lg p-8 md:p-12">
            <div className="text-[#D4AF37] text-6xl mb-4">"</div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {testimonials[currentIndex].content}
            </p>
            <div className="flex items-center">
              <img 
                src={testimonials[currentIndex].avatar} 
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-gray-400">{testimonials[currentIndex].role}</p>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#D4AF37] w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-400 mb-8">Trusted by leading brands and institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder logos - replace with actual partner logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-16 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-600 text-sm">Partner {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
