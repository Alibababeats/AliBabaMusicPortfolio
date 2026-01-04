import './globals.css'
import { Metadata } from 'next'

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
    <html lang="en" className="dark">
      <body className="bg-gradient-dark text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
