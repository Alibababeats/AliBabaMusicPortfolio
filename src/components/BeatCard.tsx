"use client";

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Pause, Activity } from 'lucide-react';
import { useAudio } from './AudioContext';
import { type Beat } from '../lib/beats';

function formatTime(time: number) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

interface BeatCardProps {
  beat: Beat;
  index: number;
  isMobileActive: boolean;
  onMobileEnter: () => void;
}

export default function BeatCard({ beat, index, isMobileActive, onMobileEnter }: BeatCardProps) {
  const { currentBeat, isPlaying, playPause, currentTime, duration, seek } = useAudio();
  const isThisBeat = currentBeat?.id === beat.id;
  const isThisPlaying = isThisBeat && isPlaying;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const isInCenter = useInView(cardRef, { margin: "-40% 0px -40% 0px" });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // When this card scrolls into center on mobile, tell parent
  useEffect(() => {
    if (isMobile && isInCenter) {
      onMobileEnter();
    }
  }, [isMobile, isInCenter, onMobileEnter]);

  const shouldHighlight = (isMobile && isMobileActive) || (!isMobile && isHovered);

  // Memoize random heights so visualizer bars don't flicker on re-render
  const barHeights = useMemo(() => Array.from({ length: 6 }, () => (30 + Math.random() * 70) + '%'), [beat.id]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      animate={{ scale: shouldHighlight ? 1.02 : 1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 overflow-hidden ${shouldHighlight ? 'border-gray-600' : 'border-gray-700'}`}>
        
        {/* Animated gradient background on hover or center scroll (mobile) */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${beat.gradient} transition-opacity duration-500`}
          style={{ opacity: shouldHighlight ? 0.1 : 0 }}
        />
        
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          
          {/* Play/Pause Button */}
          <button
            onClick={() => playPause(beat)}
            className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg ${(isThisPlaying || shouldHighlight) ? 'bg-gradient-to-r ' + beat.gradient + ' scale-105' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isThisPlaying ? (
              <Pause className="w-8 h-8 text-white relative z-10" />
            ) : (
              <Play className="w-8 h-8 text-white ml-2 relative z-10" />
            )}
          </button>

          {/* Track Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <h3 className="text-xl font-bold">{beat.title}</h3>
              {beat.featured && (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${beat.gradient}`}>
                  Featured
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                {beat.bpm} BPM
              </span>
              <span>•</span>
              <span className="px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700">
                {beat.genre}
              </span>
            </div>
          </div>

          {/* End section: Visualizer while playing */}
          <div className="flex items-center justify-end w-32 gap-1 h-12">
            {isThisPlaying ? (
              barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-gradient-to-t ${beat.gradient} rounded-t-sm animate-[bounce_1s_infinite]`}
                  style={{
                    animationDelay: (i * 0.15) + 's',
                    height: h
                  }}
                />
              ))
            ) : (
              <span className="text-gray-500 text-sm font-medium">{beat.duration || '0:00'}</span>
            )}
          </div>
        </div>

        {/* Progress bar - only visible when this beat is selected */}
        {isThisBeat && (
          <div className="relative mt-4 flex items-center gap-3">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div
              className="flex-1 relative cursor-pointer"
              style={{ height: '16px', display: 'flex', alignItems: 'center' }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                const pct = clickX / rect.width;
                seek(pct * duration);
              }}
            >
              {/* Track */}
              <div style={{ width: '100%', height: '4px', backgroundColor: '#374151', borderRadius: '9999px', position: 'relative' }}>
                {/* Filled */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  background: `linear-gradient(to right, #a855f7, #22d3ee)`,
                  borderRadius: '9999px',
                  pointerEvents: 'none',
                }} />
                {/* Circle thumb */}
                <div style={{
                  position: 'absolute', top: '50%',
                  left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  width: '12px', height: '12px',
                  backgroundColor: '#ffffff',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 4px rgba(0,0,0,0.6)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
