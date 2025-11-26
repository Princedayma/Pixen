'use client';

import Link from 'next/link';
import Card from './Card';

interface EventCardProps {
  id: number;
  title: string;
  type: 'competition' | 'workshop';
  date: string;
  theme?: string;
  level?: string;
  imageUrl: string;
}

export default function UpcomingEvents() {
  // Placeholder events - in production, fetch from API
  const events: EventCardProps[] = [
    {
      id: 1,
      title: 'Street Photography Challenge',
      type: 'competition',
      date: 'Dec 15 - Jan 15, 2025',
      theme: 'Urban Life',
      imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80'
    },
    {
      id: 2,
      title: 'Cinematic Lighting Workshop',
      type: 'workshop',
      date: 'Jan 5, 2025',
      level: 'Intermediate',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80'
    },
    {
      id: 3,
      title: 'Documentary Film Contest',
      type: 'competition',
      date: 'Jan 20 - Feb 28, 2025',
      theme: 'Social Impact',
      imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80'
    },
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join competitions and workshops to enhance your creative skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id}>
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.type === 'competition' 
                      ? 'bg-[#D4AF37] text-black' 
                      : 'bg-purple-600 text-white'
                  }`}>
                    {event.type === 'competition' ? 'Competition' : 'Workshop'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{event.date}</p>
                {event.theme && (
                  <p className="text-[#D4AF37] text-sm mb-4">Theme: {event.theme}</p>
                )}
                {event.level && (
                  <p className="text-purple-400 text-sm mb-4">Level: {event.level}</p>
                )}
                <Link 
                  href={`/${event.type === 'competition' ? 'competitions' : 'workshops'}/${event.id}`}
                >
                  <button className="btn btn-secondary w-full">
                    {event.type === 'competition' ? 'Enter Now' : 'Register'}
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-12">
          <Link href="/competitions">
            <button className="btn btn-primary">View All Competitions</button>
          </Link>
          <Link href="/workshops">
            <button className="btn btn-secondary">View All Workshops</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
