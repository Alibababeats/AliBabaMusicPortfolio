import './globals.css'
import { Metadata } from 'next'
import { Jost } from 'next/font/google'

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
      <body
        className="bg-gradient-dark text-white min-h-screen"
        style={{ fontFamily: "Futura, var(--font-jost), 'Century Gothic', 'Trebuchet MS', Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  )
}
