'use client';

import Link from 'next/link';
import Card from './Card';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      id: 1,
      title: 'Event Shoots',
      description: 'Professional coverage for your events, capturing every moment with cinematic precision.',
      features: ['Wedding Photography', 'Corporate Events', 'Live Concerts', 'Sports Coverage'],
      icon: '📸'
    },
    {
      id: 2,
      title: 'Brand Films',
      description: 'Compelling visual stories that elevate your brand and connect with your audience.',
      features: ['Commercial Videos', 'Product Showcases', 'Brand Documentaries', 'Social Media Content'],
      icon: '🎬'
    },
    {
      id: 3,
      title: 'Creative Editing',
      description: 'Post-production magic that transforms raw footage into stunning visual narratives.',
      features: ['Color Grading', 'Motion Graphics', 'Sound Design', 'VFX Integration'],
      icon: '✨'
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional content creation tailored to your vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id}>
              <div className="p-8 text-center h-full flex flex-col">
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">
                  {service.description}
                </p>
                <ul className="text-left space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="text-[#D4AF37] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/hire-us">
            <button className="btn btn-accent text-lg px-8 py-4">
              Request A Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
