'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { Beat } from '../lib/beats'

interface AudioPlayerProps {
  beat: Beat
  isPlaying: boolean
  onPlayPause: (beatId: string) => void
  currentPlayingId: string | null
}

export default function AudioPlayer({ beat, isPlaying, onPlayPause, currentPlayingId }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying && currentPlayingId === beat.id) {
      audio.play()
    } else {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying, currentPlayingId, beat.id])

  const handlePlayPause = () => {
    onPlayPause(beat.id)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 flex items-center space-x-6 hover:bg-white/15 transition-all duration-300">
      <audio ref={audioRef} src={beat.audioSrc} />
      
      <button
        onClick={handlePlayPause}
        className="play-button"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        aria-pressed={isPlaying}
      >
        {isPlaying && currentPlayingId === beat.id ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white ml-1" />
        )}
      </button>

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-3">{beat.title}</h3>
        <div className="flex items-center space-x-8 text-gray-200">
          <span className="text-base">{beat.bpm} BPM</span>
          <span className="text-base">{beat.genre}</span>
          <span className="text-base">{beat.duration}</span>
        </div>
      </div>

      <div className="flex items-end space-x-3 h-12">
        {isPlaying && currentPlayingId === beat.id ? (
          Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className="audio-bar animated w-3"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${20 + Math.random() * 80}%`
              }}
            />
          ))
        ) : (
          Array.from({ length: 5 }, () => (
            <div key={Math.random()} className="audio-bar w-3 h-4" />
          ))
        )}
      </div>
    </div>
  )
}
