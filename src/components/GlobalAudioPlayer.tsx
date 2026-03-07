"use client";

import { useAudio } from "./AudioContext";
import { Play, Pause, SkipForward, SkipBack, Repeat, Shuffle } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

export default function GlobalAudioPlayer() {
  const { 
    currentBeat, 
    isPlaying, 
    currentTime, 
    duration, 
    isLooping, 
    isShuffle, 
    playPause, 
    playNext, 
    playPrevious, 
    toggleLoop, 
    toggleShuffle, 
    seek 
  } = useAudio();

  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPercentage, setDragPercentage] = useState(0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handlePointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX: number;
    if ('touches' in e) {
      if (!e.touches || e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDragPercentage((clickX / rect.width) * 100);
  }, []);

  const handlePointerUp = useCallback((e: MouseEvent | TouchEvent) => {
    setIsDragging(false);
    let clientX: number;
    if ('changedTouches' in e) {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      clientX = e.changedTouches[0].clientX;
    } else {
      clientX = (e as MouseEvent).clientX;
    }
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    seek((clickX / rect.width) * duration);
  }, [duration, seek]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('touchend', handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  if (!mounted || !currentBeat) return null;

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayPercentage = isDragging ? dragPercentage : currentPercentage;

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if (!progressBarRef.current) return;
    let clientX: number;
    if ('touches' in e) {
      if (!e.touches || e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setDragPercentage((clickX / rect.width) * 100);
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 999999, 
        backgroundColor: '#0d0d0d',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.8)',
      }}
    >
      {/* ===== DRAGGABLE PROGRESS BAR AT TOP OF PLAYER ===== */}
      <div
        ref={progressBarRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{
          width: '100%',
          height: '16px',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Gray track background */}
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#374151',
          position: 'relative',
        }}>
          {/* Filled progress */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${displayPercentage}%`,
            background: 'linear-gradient(to right, #a855f7, #22d3ee)',
            pointerEvents: 'none',
          }} />
          {/* Draggable circle thumb */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${displayPercentage}%`,
            width: isDragging ? '16px' : '12px',
            height: isDragging ? '16px' : '12px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            transition: 'width 0.1s, height 0.1s',
          }} />
        </div>
      </div>

      {/* ===== PLAYER CONTENT ===== */}
      <div style={{ padding: '8px 16px 14px', maxWidth: '72rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        
        {/* Track info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'center' }}>
          <div 
            className={`bg-gradient-to-br ${currentBeat.gradient}`}
            style={{ width: '40px', height: '40px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '13px' }}>{currentBeat.bpm}</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h4 style={{ color: 'white', fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{currentBeat.title}</h4>
            <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{currentBeat.genre}</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={toggleShuffle} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: isShuffle ? '#22d3ee' : '#9ca3af', padding: 0 }}
            title="Shuffle"
          >
            <Shuffle style={{ width: 18, height: 18 }} />
            {isShuffle && <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22d3ee', display: 'block' }} />}
          </button>
          <button 
            onClick={playPrevious} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
            title="Previous"
          >
            <SkipBack style={{ width: 22, height: 22 }} />
          </button>
          <button 
            onClick={() => playPause(currentBeat)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'white', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause style={{ width: 18, height: 18 }} /> : <Play style={{ width: 18, height: 18, marginLeft: '2px' }} />}
          </button>
          <button 
            onClick={playNext} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
            title="Next"
          >
            <SkipForward style={{ width: 22, height: 22 }} />
          </button>
          <button 
            onClick={toggleLoop} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', color: isLooping ? '#22d3ee' : '#9ca3af', padding: 0 }}
            title="Loop"
          >
            <Repeat style={{ width: 18, height: 18 }} />
            {isLooping && <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#22d3ee', display: 'block' }} />}
          </button>
        </div>

        {/* Timestamps only - no bar here */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
          <span>{formatTime(isDragging ? (dragPercentage / 100) * duration : currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
