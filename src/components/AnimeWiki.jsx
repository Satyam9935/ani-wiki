import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Heart } from 'lucide-react';

// Animation configs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const AnimeWiki = ({ character }) => {
  if (!character) return null;

  return (
    <div className="w-full flex justify-center items-center py-10 px-4">
      <motion.div 
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={character.mal_id} 
      >

        {/* 1. HERO IMAGE CARD */}
        <motion.div 
          variants={itemVariants}
          className="md:row-span-2 relative rounded-3xl overflow-hidden group shadow-2xl border border-white/10 bg-gray-900"
        >
          <img 
            src={character.images?.jpg?.large_image_url} 
            alt={character.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 pt-32">
            <h1 className="text-4xl font-black text-white leading-none tracking-tighter uppercase">{character.name}</h1>
            <p className="text-purple-400 text-xl font-bold mt-2">{character.name_kanji}</p>
          </div>
        </motion.div>

        {/* 2. BIO / ABOUT CARD */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex flex-col hover:bg-white/10 transition-colors duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest">Character Bio</h2>
            <Heart className="text-pink-500 w-5 h-5 fill-current" />
          </div>
          <div className="text-gray-300 leading-relaxed text-sm md:text-base overflow-y-auto pr-4 custom-scrollbar h-full">
            {character.about ? character.about : "No description available for this character."}
          </div>
        </motion.div>

        {/* 3. STATS CARD */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex flex-col justify-center"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <div className="flex items-center gap-2 mb-2">
                 <Star className="w-4 h-4 text-yellow-400" />
                 <p className="text-xs text-gray-400 uppercase font-bold">Favorites</p>
               </div>
               <p className="text-2xl font-bold text-white tracking-tight">
                 {character.favorites?.toLocaleString()}
               </p>
            </div>
            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
               <p className="text-xs text-gray-400 uppercase font-bold mb-2">Nickname</p>
               <p className="text-sm font-semibold text-white truncate">
                 {character.nicknames?.length > 0 ? character.nicknames[0] : "N/A"}
               </p>
            </div>
          </div>
        </motion.div>

        {/* 4. LINK ACTION CARD */}
        <motion.a 
          href={character.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl border border-white/20 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all hover:scale-[1.02] shadow-lg shadow-purple-900/20"
        >
            <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full translate-x-8 -translate-y-8 blur-2xl group-hover:bg-white/20 transition-all"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Full Profile</h3>
                <p className="text-purple-200 text-xs mt-1 font-medium">View detailed stats on MyAnimeList &rarr;</p>
              </div>
            </div>
        </motion.a>

      </motion.div>
    </div>
  );
};

export default AnimeWiki;