"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Beat, beats } from '../lib/beats';

interface AudioContextType {
  currentBeat: Beat | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  isShuffle: boolean;
  playPause: (beat: Beat) => void;
  playNext: () => void;
  playPrevious: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      // When audio.loop is true, this event won't fire (browser handles repeat).
      // When audio.loop is false, advance to the next track.
      playNextRef.current?.();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We have to use a reference to the latest state for handleEnded
  const playNextRef = useRef<() => void>();
  useEffect(() => {
    playNextRef.current = handlePlayNext;
  }, [currentBeat, isShuffle, isLooping]);

  function handlePlayNext() {
    if (!currentBeat) return;
    const currentIndex = beats.findIndex(b => b.id === currentBeat.id);
    let nextIndex = currentIndex + 1;
    
    if (isShuffle) {
      // Ensure we don't pick the same track
      if (beats.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * beats.length);
        } while (nextIndex === currentIndex);
      } else {
        nextIndex = 0;
      }
    } else if (nextIndex >= beats.length) {
      nextIndex = 0; // loop back to first
    }
    
    playBeat(beats[nextIndex]);
  }

  const playBeat = (beat: Beat) => {
    if (!audioRef.current) return;
    
    // If double tapping the same beat, just pause
    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error('Playback failed:', err);
          setIsPlaying(false);
        });
      }
    } else {
      // New beat
      setCurrentBeat(beat);
      audioRef.current.src = beat.audioSrc;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error('Playback failed:', err);
        setIsPlaying(false);
      });
    }
  };

  const playPrevious = () => {
    if (!currentBeat) return;
    const currentIndex = beats.findIndex(b => b.id === currentBeat.id);
    let prevIndex = currentIndex - 1;
    
    if (isShuffle) {
      if (beats.length > 1) {
        do {
          prevIndex = Math.floor(Math.random() * beats.length);
        } while (prevIndex === currentIndex);
      } else {
        prevIndex = 0;
      }
    } else if (prevIndex < 0) {
      prevIndex = beats.length - 1;
    }
    
    playBeat(beats[prevIndex]);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const toggleLoop = () => setIsLooping(!isLooping);
  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider value={{
      currentBeat,
      isPlaying,
      currentTime,
      duration,
      isLooping,
      isShuffle,
      playPause: playBeat,
      playNext: () => playNextRef.current?.(),
      playPrevious,
      toggleLoop,
      toggleShuffle,
      seek
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
