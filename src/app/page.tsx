"use client";

import HeroSection from "@/components/HeroSection";
import BeatsSection from "@/components/BeatsSection";
import AboutSection from "@/components/AboutSection";
import ConnectSection from "@/components/ConnectSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-dark text-white relative overflow-hidden">
      {/* Static gradient backgrounds */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600 rounded-full blur-3xl opacity-60" />
      </div>
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-3xl opacity-70" />
      </div>
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-pink-600 rounded-full blur-3xl opacity-60" />
      </div>

      {/* Content sections */}
      <div className="relative z-10">
        <HeroSection />
        <BeatsSection />
        <AboutSection />
        <ConnectSection />
      </div>
    </main>
  );
}
