import React, { useState } from 'react';
import axios from 'axios';
import { Search, X, Loader2, PlayCircle, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface YouTubeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const YouTubeSearchModal: React.FC<YouTubeSearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setHasSearched(true);
    setResults([]);

    try {
      // Calls the new backend proxy route using SerpApi
      const response = await axios.get(`/api/videos/search?q=${encodeURIComponent(query)}`);
      
      // SerpApi returns standard search data. Depending on `engine=google_video` it might be `video_results`
      const videoItems = response.data.video_results || [];
      setResults(videoItems);
      
      if (videoItems.length === 0) {
        setError('No videos found for this search.');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while fetching videos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-scaleIn relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Video className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-gray-900 tracking-tight">AI Video Suggestion</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-red-500 shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input Section */}
        <div className="p-6 pb-2">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-32 py-4 border-2 border-transparent bg-gray-50  text-gray-900 rounded-xl leading-5 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white sm:text-lg transition-all duration-300 shadow-inner"
              placeholder="E.g. AI Basics, Legal Education, ReactJS Tutorial..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute inset-y-2 right-2 flex items-center px-6 bg-indigo-600 border border-transparent rounded-lg font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
            </button>
          </form>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-indigo-600">
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="text-lg font-medium animate-pulse text-indigo-800">Finding the best educational videos...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <div className="bg-red-100 p-4 rounded-full text-red-500">
                <Search className="w-8 h-8" />
              </div>
              <p className="text-red-600 font-medium text-lg">{error}</p>
            </div>
          )}

          {!isLoading && !hasSearched && !error && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <Video className="w-16 h-16 opacity-20" />
              <p className="text-lg">Type a keyword to discover AI-picked educational videos.</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {results.map((video, index) => (
                <a
                  key={index}
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                    <img 
                      src={video.thumbnail || video.thumbnails?.[0] || 'https://via.placeholder.com/640x360'} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-xs font-semibold tracking-wide">
                        {video.duration}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-gray-900 font-semibold line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                      {video.title}
                    </h3>
                    <div className="mt-auto pt-3 flex items-center text-xs text-gray-500 font-medium">
                      <span className="truncate">{video.channel || video.source || 'YouTube'}</span>
                      {video.date && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{video.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YouTubeSearchModal;
