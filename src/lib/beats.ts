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
    audioSrc: './audio/sensations.mp3',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: '2',
    title: 'Yusta',
    bpm: 120,
    genre: 'Afrobeat',
    duration: '2:28',
    audioSrc: './audio/Yusta.mp3',
    gradient: 'from-teal-600 to-orange-600'
  },
  {
    id: '3',
    title: 'Spaceglide - Don Toliver Type Beat',
    bpm: 121,
    genre: 'Rap/Hip-Hop',
    duration: '2:38',
    audioSrc: './audio/Spaceglide.mp3',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: '4',
    title: 'Suspense',
    bpm: 119,
    genre: 'Rap/Hip-Hop',
    duration: '4:20',
    audioSrc: './audio/Suspense.mp3',
    gradient: 'from-blue-600 to-cyan-600'
  }
]
