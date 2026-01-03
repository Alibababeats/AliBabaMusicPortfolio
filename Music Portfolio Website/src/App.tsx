import { Hero } from './components/Hero';
import { SocialLinks } from './components/SocialLinks';
import { BeatsSection } from './components/BeatsSection';
import { AboutMe } from './components/AboutMe';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Hero />
      <SocialLinks />
      <BeatsSection />
      <AboutMe />
    </div>
  );
}