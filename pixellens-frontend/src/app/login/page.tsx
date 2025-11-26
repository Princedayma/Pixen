'use client';

import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/auth/token/', { username, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        router.push('/');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your account</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <Button type="submit" variant="primary" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#D4AF37] hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
