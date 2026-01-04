"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import BeatCard from './BeatCard';
import { beats } from '../lib/beats';

export default function BeatsSection() {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const handlePlayPause = (beatId: string) => {
    setCurrentPlayingId(currentPlayingId === beatId ? null : beatId);
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl mb-4 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        My Beats
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-center mb-16"
      >
        Latest productions ready for your next project
      </motion.p>

      <div className="space-y-6">
        {beats.map((beat, index) => (
          <BeatCard 
            key={beat.id} 
            beat={beat} 
            index={index} 
            isPlaying={currentPlayingId === beat.id}
            onPlayPause={handlePlayPause}
            currentPlayingId={currentPlayingId || null}
          />
        ))}
      </div>
    </section>
  );
}
