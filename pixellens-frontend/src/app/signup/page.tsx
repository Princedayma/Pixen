'use client';

import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ username:'', email:'', first_name:'', last_name:'', password:'', password_confirm:'' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiClient.post('/auth/register/', {
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
        password_confirm: form.password_confirm,
      });

      // Auto-login: try JSON first, then form-encoded as a fallback
      let token: string | null = null;
      try {
        const tokenRes = await apiClient.post('/auth/token/', { username: form.username, password: form.password });
        token = tokenRes.data?.token;
      } catch (jsonErr: any) {
        // fallback to form-encoded (some endpoints expect form data)
        try {
          const qs = new URLSearchParams();
          qs.append('username', form.username);
          qs.append('password', form.password);
          const tokenRes2 = await apiClient.post('/auth/token/', qs.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
          token = tokenRes2.data?.token;
        } catch (formErr: any) {
          console.error('Token JSON error:', jsonErr?.response?.data || jsonErr);
          console.error('Token form error:', formErr?.response?.data || formErr);
        }
      }

      if (token) {
        localStorage.setItem('authToken', token);
        router.push('/');
        return;
      }

      router.push('/login');
    } catch (err: any) {
      // Surface backend validation errors in UI and console for debugging
      const serverData = err?.response?.data;
      console.error('Signup error response:', serverData || err);
      
      // Format validation errors for display
      let errorMessage = 'Signup failed';
      if (serverData && typeof serverData === 'object') {
        const errors: string[] = [];
        Object.entries(serverData).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errors.push(`${field}: ${messages.join(', ')}`);
          } else {
            errors.push(`${field}: ${messages}`);
          }
        });
        errorMessage = errors.join(' | ');
      } else if (typeof serverData === 'string') {
        errorMessage = serverData;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-linear-to-b from-gray-900 to-black">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Pixellens</h1>
            <p className="text-gray-400">Create your account and start your journey</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username *
                </label>
                <Input
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>
                  <Input
                    name="first_name"
                    placeholder="First name"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    name="last_name"
                    placeholder="Last name"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <Input
                  name="password_confirm"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.password_confirm}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {error && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <Button type="submit" variant="primary" className="w-full mt-6">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-[#D4AF37] hover:underline">
                  Sign in
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
