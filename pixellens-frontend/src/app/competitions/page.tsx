'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Card from "@/components/Card";
import Link from 'next/link';
import apiClient from "@/lib/apiClient";

interface Competition {
  id: number;
  title: string;
  description: string;
  theme: string;
  startDate: string;
  endDate: string;
  price: string;
  status: 'ONGOING' | 'UPCOMING' | 'CLOSED';
  isPaid: boolean;
}

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState<string>('ongoing');
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await apiClient.get('/competitions/');
        setCompetitions(response.data);
      } catch (error) {
        console.error('Failed to fetch competitions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  const filteredCompetitions = competitions.filter(c => {
    if (activeTab === 'ongoing') return c.status === 'ONGOING';
    if (activeTab === 'upcoming') return c.status === 'UPCOMING';
    if (activeTab === 'past') return c.status === 'CLOSED';
    return true;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Competitions</h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Showcase your talent, compete with the best, and win amazing prizes
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-gray-950 sticky top-20 z-40 border-b border-gray-800">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('ongoing')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'ongoing' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'upcoming' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'past' 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Past
            </button>
          </div>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
              <p className="mt-4 text-gray-400">Loading competitions...</p>
            </div>
          ) : (
          <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.map((competition) => (
              <Card key={competition.id}>
                <div className="relative aspect-4/3 overflow-hidden">
                  <img 
                    src='https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80' 
                    alt={competition.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#D4AF37] text-black rounded-full text-xs font-bold uppercase">
                      {competition.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{competition.title}</h3>
                  <p className="text-[#D4AF37] text-sm mb-3">Theme: {competition.theme}</p>
                  <p className="text-gray-400 mb-4">{competition.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(competition.startDate).toLocaleDateString()} - {new Date(competition.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {competition.isPaid ? `Entry Fee: ₹${competition.price}` : 'Free Entry'}
                    </div>
                  </div>

                  <Link href={`/competitions/${competition.id}`}>
                    <button className="btn btn-secondary w-full">
                      {competition.status === 'CLOSED' ? 'View Winners' : 'View Details'}
                    </button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {filteredCompetitions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No {activeTab} competitions at the moment</p>
            </div>
          )}
          </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
