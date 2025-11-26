'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Input from '@/components/Input';
import Button from '@/components/Button';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

export default function AddVideoPage() {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<{
    title: string;
    description: string;
    thumbnail: string;
    video_id: string;
    embed_url: string;
  } | null>(null);
  const [category, setCategory] = useState('OTHER');
  const [error, setError] = useState('');

  const handleFetchVideo = async () => {
    if (!youtubeUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await apiClient.post('/portfolio-items/fetch_youtube_data/', {
        youtube_url: youtubeUrl
      });
      
      setVideoData(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch video data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVideo = async () => {
    if (!videoData) return;

    setLoading(true);
    setError('');

    try {
      await apiClient.post('/portfolio-items/', {
        type: 'VIDEO',
        title: videoData.title,
        description: videoData.description,
        mediaUrl: videoData.embed_url,
        thumbnailUrl: videoData.thumbnail,
        category: category
      });

      alert('Video added successfully!');
      router.push('/portfolio');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Add YouTube Video</h1>
            <p className="text-gray-400">Paste any YouTube URL to automatically fetch video details</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            {/* YouTube URL Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                YouTube URL
              </label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleFetchVideo}
                  disabled={loading || !youtubeUrl}
                  variant="primary"
                >
                  {loading ? 'Fetching...' : 'Fetch Video'}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Supports: youtube.com/watch, youtu.be, youtube.com/shorts URLs
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {/* Video Preview */}
            {videoData && (
              <>
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Video Preview</h3>
                  
                  {/* Video Embed */}
                  <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                    <iframe
                      src={videoData.embed_url}
                      title={videoData.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title
                    </label>
                    <Input
                      type="text"
                      value={videoData.title}
                      onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={videoData.description}
                      onChange={(e) => setVideoData({...videoData, description: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent min-h-[120px]"
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                    >
                      <option value="WEDDING">Wedding</option>
                      <option value="STREET">Street</option>
                      <option value="FEST">Fest</option>
                      <option value="PORTRAIT">Portrait</option>
                      <option value="LANDSCAPE">Landscape</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Thumbnail
                    </label>
                    <img 
                      src={videoData.thumbnail} 
                      alt={videoData.title}
                      className="w-full max-w-md rounded-lg"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleSaveVideo}
                      disabled={loading}
                      variant="primary"
                      className="flex-1"
                    >
                      {loading ? 'Saving...' : 'Add to Portfolio'}
                    </Button>
                    <Button
                      onClick={() => {
                        setVideoData(null);
                        setYoutubeUrl('');
                        setError('');
                      }}
                      variant="secondary"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-[#D4AF37]">How to get YouTube API Key (Optional)</h3>
            <ol className="space-y-2 text-sm text-gray-400">
              <li>1. Go to <a href="https://console.cloud.google.com/" target="_blank" className="text-[#D4AF37] hover:underline">Google Cloud Console</a></li>
              <li>2. Create a new project or select existing project</li>
              <li>3. Enable "YouTube Data API v3"</li>
              <li>4. Go to Credentials → Create Credentials → API Key</li>
              <li>5. Copy the API key and add it to Django settings.py: <code className="bg-gray-800 px-2 py-1 rounded">YOUTUBE_API_KEY = 'your-key'</code></li>
              <li className="text-[#D4AF37] mt-4">⚠️ Without API key, videos will still work but you'll need to enter title/description manually</li>
            </ol>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
