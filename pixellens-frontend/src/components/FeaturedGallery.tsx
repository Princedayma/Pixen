'use client';

import { useState } from 'react';
import Card from './Card';
import Modal from './Modal';
import Link from 'next/link';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  creator: string;
}

export default function FeaturedGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Placeholder gallery items - in production, fetch from API
  const galleryItems: GalleryItem[] = [
    { id: 1, title: 'Urban Reflections', category: 'Photography', imageUrl: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=80', creator: 'John Doe' },
    { id: 2, title: 'Motion in Time', category: 'Film', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80', creator: 'Jane Smith' },
    { id: 3, title: 'Light & Shadow', category: 'Photography', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80', creator: 'Alex Brown' },
    { id: 4, title: 'Street Stories', category: 'Film', imageUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80', creator: 'Sarah Lee' },
    { id: 5, title: 'Golden Hour', category: 'Photography', imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80', creator: 'Mike Wilson' },
    { id: 6, title: 'Creative Vision', category: 'Film', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80', creator: 'Emma Davis' },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover stunning visual stories from our talented community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card 
              key={item.id} 
              variant="cinematic"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="card-overlay flex flex-col justify-end p-6">
                  <p className="text-[#D4AF37] text-sm font-medium mb-2">{item.category}</p>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">by {item.creator}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio">
            <button className="btn btn-accent text-lg px-8 py-4">
              View Full Portfolio
            </button>
          </Link>
        </div>
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
        >
          <img 
            src={selectedItem.imageUrl} 
            alt={selectedItem.title}
            className="w-full rounded-lg mb-4"
          />
          <div className="space-y-2">
            <p className="text-[#D4AF37] font-medium">{selectedItem.category}</p>
            <p className="text-gray-300">Creator: {selectedItem.creator}</p>
          </div>
        </Modal>
      )}
    </section>
  );
}
