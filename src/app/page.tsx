"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ConnectSection from '@/components/ConnectSection';
import BeatsSection from '@/components/BeatsSection';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  const { scrollY } = useScroll();
  
  // Animated gradient backgrounds based on scroll with enhanced visibility
  const gradient1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const gradient1Opacity = useTransform(scrollY, [0, 500], [0.6, 0.3]);
  
  const gradient2Y = useTransform(scrollY, [500, 1500], [0, -150]);
  const gradient2Opacity = useTransform(scrollY, [500, 1000], [0.7, 0.4]);
  
  const gradient3Y = useTransform(scrollY, [1000, 2000], [0, 100]);
  const gradient3Opacity = useTransform(scrollY, [1000, 1500], [0.6, 0.3]);

  return (
    <main className="min-h-screen bg-gradient-dark text-white relative overflow-hidden">
      {/* Animated gradient overlays that move with scroll - enhanced visibility */}
      <motion.div
        style={{ y: gradient1Y, opacity: gradient1Opacity }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl opacity-80" />
      </motion.div>
      
      <motion.div
        style={{ y: gradient2Y, opacity: gradient2Opacity }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-3xl opacity-80" />
      </motion.div>
      
      <motion.div
        style={{ y: gradient3Y, opacity: gradient3Opacity }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-pink-600 rounded-full blur-3xl opacity-80" />
      </motion.div>

      {/* Content sections */}
      <div className="relative z-10">
        <HeroSection />
        <ConnectSection />
        <BeatsSection />
        <AboutSection />
      </div>
    </main>
  );
}
