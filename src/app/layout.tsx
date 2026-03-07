import './globals.css'
import { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { AudioProvider } from '@/components/AudioContext'
import GlobalAudioPlayer from '@/components/GlobalAudioPlayer'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-jost',
})

export const metadata: Metadata = {
  title: 'Ali Baba - Music Producer & Beat Maker',
  description: 'Ali Salem - Professional music producer and beat maker. Listen to my latest beats and connect with me.',
  keywords: ['music producer', 'beat maker', 'Ali Baba', 'Ali Salem', 'music', 'beats', 'producer'],
  openGraph: {
    title: 'Ali Baba - Music Producer & Beat Maker',
    description: 'Professional music producer and beat maker. Listen to my latest beats.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${jost.variable}`}>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        className="bg-gradient-dark text-white min-h-screen pb-48"
        style={{ fontFamily: "Futura, var(--font-jost), 'Century Gothic', 'Trebuchet MS', Arial, sans-serif" }}
      >
        <AudioProvider>
          {children}
          <GlobalAudioPlayer />
        </AudioProvider>
      </body>
    </html>
  )
}
