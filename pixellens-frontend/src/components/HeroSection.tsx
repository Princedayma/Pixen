'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Replace with a video or image carousel */}
      <div className="absolute inset-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          poster="https://images.unsplash.com/photo-1524230659267-739633a45951?q=80&w=2070&auto=format&fit=crop"
        >
          {/* Add video sources here */}
          <source src="https://videos.pexels.com/video-files/2882801/2882801-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Where Stories Meet Frames
        </h1>
        <p className="mt-6 max-w-3xl text-lg md:text-xl text-gray-300">
          Photography & Filmmaking community driving creativity and professional content.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/portfolio" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-amber-400 rounded-full hover:bg-amber-500 transition-colors">
            Explore Portfolio
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/competitions" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors">
            Join a Competition
          </Link>
        </div>
      </div>
    </div>
  );
}
