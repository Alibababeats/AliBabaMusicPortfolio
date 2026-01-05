"use client";

import { motion } from 'framer-motion';
import { Headphones, Sparkles, TrendingUp } from 'lucide-react';

const highlights = [
  {
    icon: Headphones,
    title: 'Years of Experience',
    description: 'Crafting unique sounds and beats',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Sparkles,
    title: 'Creative Vision',
    description: 'Pushing boundaries in music production',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: TrendingUp,
    title: 'Growing Portfolio',
    description: 'Constantly evolving and improving',
    color: 'from-pink-500 to-purple-500',
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl mb-6 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <p className="text-lg text-gray-300 mb-4">
          My name is Ali Salem, also known as Ali Baba. I'm a producer and beat maker who loves building from the ground up—whether that's crafting beats from scratch or creating this website from scratch. I'm based in Gaithersburg, Maryland, and I'm proud to be the son of Egyptian immigrants.
        </p>
        <p className="text-lg text-gray-300 mb-4">
          Right now I live with my mother, who's a single mother, and she always pushes me to do better and always wishes for my success. When I was failing my first year of college, she still told me that I am very smart. My mother is my biggest supporter, and I want to support her too.
        </p>
        <p className="text-lg text-gray-300">
          Everyday I'm learning something new, I push my body and my mind, and I always try to have fun.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 relative overflow-hidden group"
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-4`}>
              <highlight.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl mb-2">{highlight.title}</h3>
            <p className="text-gray-400">{highlight.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-gray-500 mb-8">
          Let's create something amazing together. Whether you need a custom beat or want to collaborate, I'm always open to new projects.
        </p>
        <motion.a
          href="mailto:ali.salem.skate@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
        >
          Get In Touch
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-500"
      >
        <p>© 2026 Ali Baba. All rights reserved.</p>
      </motion.div>
    </section>
  );
}
