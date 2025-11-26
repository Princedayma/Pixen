'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import apiClient from "@/lib/apiClient";
import Link from 'next/link';

// Helper function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /vid:([a-zA-Z0-9_-]+)/,
    /youtube\.com\/shorts\/([^&\?\/]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url;
};

interface PortfolioItem {
  id: number;
  title: string;
  type: 'PHOTO' | 'VIDEO';
  category: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  createdBy: number;
  description: string;
}

export default function PortfolioPage() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'photo' | 'video'>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await apiClient.get('/portfolio-items/');
        setPortfolioItems(response.data);
      } catch (error) {
        console.error('Failed to fetch portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const filteredItems = portfolioItems.filter(item => {
    const categoryMatch = filterCategory === 'all' || item.type.toLowerCase() === filterCategory;
    const typeMatch = filterType === 'all' || item.category === filterType;
    return categoryMatch && typeMatch;
  });

  const types = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">Portfolio</h1>
              <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto">
                Explore our collection of stunning photography and filmmaking works
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link 
              href="/admin/add-video"
              className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-md hover:bg-[#C4A037] transition-colors"
            >
              + Add YouTube Video
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-950 sticky top-20 z-40 border-b border-gray-800">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 rounded-md transition-all ${
                  filterCategory === 'all' 
                    ? 'bg-[#D4AF37] text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCategory('photo')}
                className={`px-4 py-2 rounded-md transition-all ${
                  filterCategory === 'photo' 
                    ? 'bg-[#D4AF37] text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Photo
              </button>
              <button
                onClick={() => setFilterCategory('video')}
                className={`px-4 py-2 rounded-md transition-all ${
                  filterCategory === 'video'
                    ? 'bg-[#D4AF37] text-black' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Video
              </button>
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            >
              <option value="latest">Latest</option>
              <option value="popular">Most Viewed</option>
            </select>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
              <p className="mt-4 text-gray-400">Loading portfolio...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                variant="cinematic"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-video overflow-hidden">
                  {item.type === 'VIDEO' ? (
                    <div className="relative w-full h-full bg-black">
                      <iframe
                        src={getYouTubeEmbedUrl(item.mediaUrl)}
                        title={item.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img 
                      src={item.thumbnailUrl || item.mediaUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  )}
                  {item.type === 'VIDEO' && (
                    <div className="absolute top-4 left-4 bg-black/80 rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  )}
                  <div className="card-overlay flex flex-col justify-end p-6">
                    <p className="text-[#D4AF37] text-sm font-medium mb-2">{item.category}</p>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">by Creator #{item.createdBy}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-400">No items found matching your filters</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)}
        >
          <div className="space-y-4">
            {selectedItem.type === 'VIDEO' && selectedItem.mediaUrl ? (
              <div className="aspect-video">
                <iframe
                  src={selectedItem.mediaUrl}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            ) : (
              <img 
                src={selectedItem.thumbnailUrl || selectedItem.mediaUrl} 
                alt={selectedItem.title}
                className="w-full rounded-lg"
              />
            )}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">{selectedItem.title}</h2>
                <span className="px-3 py-1 bg-[#D4AF37] text-black rounded-full text-sm font-medium">
                  {selectedItem.category}
                </span>
              </div>
              <p className="text-gray-400 mb-4">by Creator #{selectedItem.createdBy}</p>
              <p className="text-gray-300">{selectedItem.description}</p>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </main>
  );
}
