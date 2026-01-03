import { motion } from 'motion/react';
import { BeatCard } from './BeatCard';

const beats = [
  {
    id: '1',
    title: 'Midnight Vibes',
    bpm: 140,
    genre: 'Trap',
    duration: '3:24',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: '2',
    title: 'City Lights',
    bpm: 128,
    genre: 'Hip Hop',
    duration: '2:58',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    id: '3',
    title: 'Neon Dreams',
    bpm: 150,
    genre: 'EDM',
    duration: '3:42',
    gradient: 'from-pink-600 to-purple-600',
  },
  {
    id: '4',
    title: 'Desert Storm',
    bpm: 135,
    genre: 'Trap',
    duration: '3:15',
    gradient: 'from-orange-600 to-red-600',
  },
  {
    id: '5',
    title: 'Ocean Waves',
    bpm: 120,
    genre: 'Lo-Fi',
    duration: '4:01',
    gradient: 'from-teal-600 to-cyan-600',
  },
  {
    id: '6',
    title: 'Thunder Road',
    bpm: 145,
    genre: 'Drill',
    duration: '2:47',
    gradient: 'from-indigo-600 to-purple-600',
  },
];

export function BeatsSection() {
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
          <BeatCard key={beat.id} beat={beat} index={index} />
        ))}
      </div>
    </section>
  );
}
