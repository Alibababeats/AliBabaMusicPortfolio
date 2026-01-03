import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Clock, Activity } from 'lucide-react';

interface Beat {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  duration: string;
  gradient: string;
}

interface BeatCardProps {
  beat: Beat;
  index: number;
}

export function BeatCard({ beat, index }: BeatCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Simulate audio visualization with random levels
      audioIntervalRef.current = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
        audioIntervalRef.current = null;
      }
      setAudioLevel(0);
    }

    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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

        {/* Audio level visualization bars */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${beat.gradient}`}
            style={{ width: `${isPlaying ? audioLevel : 0}%` }}
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
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${beat.gradient} flex items-center justify-center transition-all duration-300 relative z-10`}
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
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${beat.gradient}`}
                />
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
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
                <span>{beat.duration}</span>
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
