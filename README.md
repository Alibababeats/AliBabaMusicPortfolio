# Ali Baba Music Portfolio

A modern, responsive music portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Dark gradient background** with glassmorphism effects
- **Hero section** with animated music icon and gradient text
- **Audio player** with animated bars and play/pause functionality
- **Connect section** with social media links
- **About section** with personal story
- **Fully responsive** design
- **SEO optimized** with proper metadata
- **Accessible** with ARIA labels

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: HTML5 Audio API

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
ali-baba-music/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── BeatsSection.tsx
│   │   ├── ConnectSection.tsx
│   │   └── HeroSection.tsx
│   └── lib/
│       └── beats.ts
├── public/
│   └── audio/
│       ├── midnight-vibes.mp3
│       ├── city-lights.mp3
│       ├── neon-dreams.mp3
│       ├── desert-storm.mp3
│       ├── ocean-waves.mp3
│       └── thunder.mp3
└── README.md
```

## Adding New Beats

1. **Add your audio file** to the `public/audio/` directory
2. **Update the beats data** in `src/lib/beats.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Your Beat Title',
  bpm: 140,
  genre: 'Trap',
  duration: '3:24',
  audioSrc: '/audio/your-beat-file.mp3'
}
```

## Replacing Audio Files

1. **Replace the audio files** in the `public/audio/` directory
2. **Update the beats data** in `src/lib/beats.ts` to match your new files
3. **Ensure the audioSrc paths** match your file names

## Deployment to Vercel

1. **Push your code** to GitHub/GitLab/Bitbucket
2. **Connect your repository** to [Vercel](https://vercel.com)
3. **Deploy** - Vercel will automatically detect it's a Next.js project

### Environment Variables (Optional)

If you need to add environment variables:

1. Create a `.env.local` file in the root directory
2. Add your variables with the `NEXT_PUBLIC_` prefix for client-side access

## Customization

### Colors and Theme

Update the gradient colors in `src/app/globals.css`:

```css
body {
  background: linear-gradient(to bottom, #1e3a8a, #581c87, #000000);
}
```

### Social Links

Update the social links in `src/components/ConnectSection.tsx`:

```typescript
const socialLinks = [
  {
    name: 'YouTube',
    icon: Youtube,
    href: 'https://your-youtube-channel.com',
    color: 'hover:bg-red-500/20'
  },
  // ... other links
]
```

### About Section

Edit the content in `src/components/AboutSection.tsx` to update your personal story.

## Performance Optimization

- Images are optimized automatically by Next.js
- Audio files are served statically
- CSS is minified in production build
- Framer Motion animations are GPU accelerated

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation is supported
- Semantic HTML5 structure
- High contrast text on dark background

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, feel free to open an issue on GitHub.
