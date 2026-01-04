"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, Activity } from 'lucide-react';

interface Beat {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  duration: string;
  audioSrc: string;
  gradient: string;
}

interface BeatCardProps {
  beat: Beat;
  index: number;
  isPlaying: boolean;
  onPlayPause: (beatId: string) => void;
  currentPlayingId: string | null;
}

export default function BeatCard({ beat, index, isPlaying, onPlayPause, currentPlayingId }: BeatCardProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(beat.audioSrc);
    
    // Set up audio event listeners
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audio) {
        setDuration(audio.duration || 0);
        console.log('Audio loaded successfully, duration:', audio.duration);
      }
    };
    
    const handleEnded = () => {
      onPlayPause(beat.id);
      setCurrentTime(0);
    };
    
    const handleError = (e: any) => {
      console.error('Audio error:', e);
      onPlayPause(beat.id);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, [beat.audioSrc]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      // Play the actual audio
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        onPlayPause(beat.id); // Stop playing on error
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, beat.id, onPlayPause]);

  const handlePlayPause = () => {
    onPlayPause(beat.id);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercentage = clickX / rect.width;
    const newTime = clickPercentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!audioRef.current || !duration) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(moveEvent.clientX - rect.left, rect.width));
      const clickPercentage = clickX / rect.width;
      const newTime = clickPercentage * duration;
      
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${beat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Progress indicator bar */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden cursor-pointer hover:h-2 transition-all duration-200"
          onClick={handleProgressClick}
          onMouseDown={handleProgressMouseDown}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${beat.gradient}`}
            style={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="relative flex items-center gap-6">
          {/* Play button with visualization */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${beat.gradient} flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer`}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7" fill="white" />
              ) : (
                <Play className="w-7 h-7 ml-1" fill="white" />
              )}
            </motion.button>

            {/* Pulsing ring animation when playing */}
            {isPlaying && (
              <>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${beat.gradient}`}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.2, 0.6]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${beat.gradient}`}
                />
              </>
            )}
          </div>

          {/* Beat info */}
          <div className="flex-1">
            <h3 className="text-2xl mb-2">{beat.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                <span>{beat.bpm} BPM</span>
              </div>
              <div className="px-3 py-1 bg-gray-700/50 rounded-full">
                {beat.genre}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Visual audio bars */}
          <div className="hidden md:flex items-end gap-1 h-16">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying
                    ? `${20 + Math.random() * 80}%`
                    : '20%',
                }}
                transition={{
                  duration: 0.3,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: 'reverse',
                  delay: i * 0.05,
                }}
                className={`w-1 bg-gradient-to-t ${beat.gradient} rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
