import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Zap, Heart } from 'lucide-react';

const AnimeWiki = ({ character }) => {
  if (!character) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative w-full max-w-5xl h-auto md:h-[600px] bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden"
      style={{
        boxShadow: "0 0 50px -12px rgba(168, 85, 247, 0.25)" // Subtle Purple Glow
      }}
    >
      
      {/* 1. LEFT SIDE: IMAGE CONTAINER */}
      <div className="relative w-full md:w-[45%] h-[400px] md:h-full bg-black group">
        {/* The Image - set to COVER but strictly contained in this box */}
        <img 
          src={character.images?.jpg?.large_image_url} 
          alt={character.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
        
        {/* Floating Japanese Name */}
        <div className="absolute bottom-8 left-8">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 opacity-20">
                {character.name_kanji}
            </h1>
        </div>
      </div>

      {/* 2. RIGHT SIDE: CONTENT DASHBOARD */}
      <div className="relative w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center bg-[#0a0a0a]">
        
        {/* Giant Name */}
        <div className="mb-6 relative">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-2 uppercase">
                {character.name}
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <Heart className="w-5 h-5 text-pink-500 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-bold">Favorites</p>
                <p className="text-lg font-bold text-white">{character.favorites?.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <Star className="w-5 h-5 text-yellow-500 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-bold">Rank</p>
                <p className="text-lg font-bold text-white">#Top 100</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <Zap className="w-5 h-5 text-purple-500 mb-2" />
                <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                <p className="text-lg font-bold text-white">Active</p>
            </div>
        </div>

        {/* Bio Text */}
        <div className="relative h-[150px] overflow-hidden mb-8 group/bio">
            <p className="text-gray-400 leading-relaxed text-sm md:text-base pr-4 overflow-y-auto h-full custom-scrollbar">
                {character.about || "No biography available for this character."}
            </p>
            {/* Fade effect at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>

        {/* Action Button */}
        <a 
            href={character.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-white text-black font-bold text-center hover:bg-purple-500 hover:text-white transition-all duration-300 flex justify-center items-center gap-2 group"
        >
            View Full Profile <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

    </motion.div>
  );
};

export default AnimeWiki;