'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navLinks } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isMenuOpen ? 'bg-black bg-opacity-80 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
            PIXELLENS
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-amber-400',
                  pathname === link.href ? 'text-amber-400' : 'text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signup" className="text-sm font-medium text-white hover:text-amber-400 transition-colors">
              Sign Up
            </Link>
            <Link href="/login" className="px-6 py-2 text-sm font-semibold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition-colors">
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90">
          <nav className="flex flex-col items-center px-4 pt-2 pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block w-full text-center py-2 text-lg font-medium transition-colors hover:text-amber-400',
                  pathname === link.href ? 'text-amber-400' : 'text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-6 py-3 text-lg font-semibold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition-colors">
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
