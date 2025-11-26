'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Card from "@/components/Card";
import Link from 'next/link';
import apiClient from "@/lib/apiClient";

interface Workshop {
  id: number;
  title: string;
  description: string;
  mode: 'ONLINE' | 'OFFLINE';
  level: string;
  startDate: string;
  endDate: string;
  venue?: string;
  price: string;
  capacity: number;
}

export default function WorkshopsPage() {
  const [filterMode, setFilterMode] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await apiClient.get('/workshops/');
        setWorkshops(response.data);
      } catch (error) {
        console.error('Failed to fetch workshops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter(workshop => {
    const modeMatch = filterMode === 'all' || workshop.mode.toLowerCase() === filterMode;
    const levelMatch = filterLevel === 'all' || workshop.level === filterLevel;
    return modeMatch && levelMatch;
  });

  const levels = ['all', ...Array.from(new Set(workshops.map(w => w.level)))];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Workshops & Courses</h1>
          <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
            Learn from industry experts and master your creative skills
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-950 sticky top-20 z-40 border-b border-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mode Filter */}
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="all">All Modes</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>

            {/* Level Filter */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
              <p className="mt-4 text-gray-400">Loading workshops...</p>
            </div>
          ) : (
          <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id}>
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src='https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80' 
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      workshop.mode === 'ONLINE' ? 'bg-blue-600' :
                      workshop.mode === 'OFFLINE' ? 'bg-purple-600' :
                      'bg-green-600'
                    } text-white`}>
                      {workshop.mode}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-[#D4AF37] text-black rounded-full text-xs font-bold uppercase">
                      {workshop.level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{workshop.description}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {workshop.venue || 'Online'}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Capacity: {workshop.capacity}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#D4AF37]">₹{workshop.price}</span>
                    <Link href={`/workshops/${workshop.id}`}>
                      <button className="btn btn-accent">
                        Register Now
                      </button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No workshops found matching your filters</p>
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
