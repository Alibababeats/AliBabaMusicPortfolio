export interface Beat {
  id: string
  title: string
  bpm: number
  genre: string
  duration: string
  audioSrc: string
  gradient: string
}

export const beats: Beat[] = [
  {
    id: '1',
    title: 'Sensations - One Last Hit Movie Score',
    bpm: 121,
    genre: 'Movie Score',
    duration: '3:10',
    audioSrc: '/audio/sensations.mp3',
    gradient: 'from-purple-600 to-pink-600'
  }
]
