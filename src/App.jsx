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
    setCharacterData(null);

    try {
      console.log("Searching for:", query); // <--- Add this

      const searchRes = await fetch(`https://api.jikan.moe/v4/characters?q=${query}&order_by=favorites&sort=desc&limit=1`);
      const searchJson = await searchRes.json();
      
      console.log("API Result:", searchJson); // <--- Add this to see what Jikan found
      
      if (searchJson.data && searchJson.data.length > 0) {
        
        const id = searchJson.data[0].mal_id;
        
        // 2. Get full details using the ID
        const detailsRes = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`);
        const detailsJson = await detailsRes.json();
        
        setCharacterData(detailsJson.data);
      } else {
        setError("Character not found. Try a full name (e.g., 'Monkey D. Luffy')");
      }
    } catch (err) {
      setError("API Error. Jikan might be busy. Please wait a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Search Header */}
      <div className="flex flex-col items-center pt-20 px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-center">
          ANI-WIKI
        </h1>
        
        <form onSubmit={searchCharacter} className="relative w-full max-w-lg group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Who are you looking for? (e.g. Gojo)"
              className="w-full bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-neutral-500 text-lg shadow-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5"/> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </form>

        {/* Initial Greeting / Error Messages */}
        {!characterData && !loading && !error && (
           <p className="mt-8 text-neutral-500 text-sm animate-pulse">Search for an anime character to begin...</p>
        )}
        
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Render the Bento Grid */}
      <div className="pb-20">
        {characterData && <AnimeWiki character={characterData} />}
      </div>
      
    </div>
  );
}