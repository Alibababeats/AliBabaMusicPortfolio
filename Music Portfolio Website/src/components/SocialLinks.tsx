import { motion } from 'motion/react';
import { Youtube, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'YouTube',
    icon: Youtube,
    url: 'https://youtube.com/@yourusername',
    color: 'hover:bg-red-500/20 hover:text-red-400',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/yourusername',
    color: 'hover:bg-pink-500/20 hover:text-pink-400',
  },
  {
    name: 'TikTok',
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    url: 'https://tiktok.com/@yourusername',
    color: 'hover:bg-cyan-500/20 hover:text-cyan-400',
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:your.email@example.com',
    color: 'hover:bg-purple-500/20 hover:text-purple-400',
  },
];

export function SocialLinks() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Connect With Me
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-6">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-6 py-4 bg-gray-800/50 rounded-xl border border-gray-700 transition-all duration-300 ${link.color}`}
            >
              <Icon className="w-6 h-6" />
              <span>{link.name}</span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}