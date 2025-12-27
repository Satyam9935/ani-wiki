import React, { useState } from 'react';
import AnimeWiki from './components/AnimeWiki';
import { Search, Loader2 } from 'lucide-react';

export default function App() {
  const [query, setQuery] = useState('');
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCharacter = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch data (sorted by popularity)
      const searchRes = await fetch(`https://api.jikan.moe/v4/characters?q=${query}&order_by=favorites&sort=desc&limit=1`);
      const searchJson = await searchRes.json();
      
      if (searchJson.data && searchJson.data.length > 0) {
        const id = searchJson.data[0].mal_id;
        const detailsRes = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
        const detailsJson = await detailsRes.json();
        setCharacterData(detailsJson.data);
      } else {
        setError("Character not found.");
      }
    } catch (err) {
      setError("API Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Dynamic Background Glow (Blurred) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {characterData ? (
           <img 
             src={characterData.images.jpg.large_image_url} 
             className="w-full h-full object-cover blur-[100px] opacity-30 scale-150" 
           />
        ) : (
           <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-black" />
        )}
      </div>

      {/* Search Bar (Floating Top) */}
      <div className="relative z-20 w-full max-w-lg mb-12 mt-10">
        <form onSubmit={searchCharacter} className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <input
            type="text"
            placeholder="Search Character (e.g. Gojo, Naruto)..."
            className="w-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-8 pr-14 text-white focus:outline-none focus:border-pink-500 transition-all text-lg shadow-2xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-pink-500 transition-colors">
            {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <Search className="w-5 h-5" />}
          </button>
        </form>
        {error && <p className="text-red-400 text-center mt-4 bg-black/50 p-2 rounded-lg border border-red-500/30">{error}</p>}
      </div>

      {/* The Main Card Stage */}
      <div className="relative z-10 w-full flex justify-center items-center perspective-1000">
        {characterData ? (
          <AnimeWiki character={characterData} />
        ) : (
          <h1 className="text-6xl md:text-8xl font-black text-white/5 tracking-tighter text-center">
            ANI-WIKI
          </h1>
        )}
      </div>

    </div>
  );
}