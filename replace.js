const fs = require('fs');
const path = 'd:/AliBabaMusicPortfolio/src/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove EP function
content = content.replace(/\/\* ── Exploding-part wrapper ─────────────────────────────────── \*\/[\s\S]*?<\/motion\.g>\n  \);\n\}\n/g, '');

// 2. Replace SVG block
content = content.replace(/<svg\n            viewBox="40 40 720 520"[\s\S]*?<\/svg>/g, '<FancyHeadphones3D scrollSpring={s} />');

// 3. Add import
if (!content.includes('import FancyHeadphones3D')) {
    content = content.replace('import { motion, useScroll, useTransform, useSpring } from "framer-motion";', 'import { motion, useScroll, useTransform, useSpring } from "framer-motion";\nimport FancyHeadphones3D from "./FancyHeadphones3D";');
}

fs.writeFileSync(path, content);
console.log('done');
