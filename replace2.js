const fs = require('fs');
const path = 'd:/AliBabaMusicPortfolio/src/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// The file has Windows CRLF or LF. We can normalize by stripping \r for parsing then put it back if needed, or just use indexOf.
const startEP = content.indexOf('/* ── Exploding-part wrapper ──');
const endEP = content.indexOf('</motion.g>\n  );\n}');

if (startEP !== -1 && endEP !== -1) {
    content = content.substring(0, startEP) + content.substring(endEP + 18);
}

const startSVG = content.indexOf('<svg');
const endSVG = content.lastIndexOf('</svg>');

if (startSVG !== -1 && endSVG !== -1) {
    content = content.substring(0, startSVG) + '<FancyHeadphones3D scrollSpring={s} />' + content.substring(endSVG + 6);
}

if (!content.includes('import FancyHeadphones3D')) {
    content = content.replace('import { motion, useScroll, useTransform, useSpring } from "framer-motion";', 'import { motion, useScroll, useTransform, useSpring } from "framer-motion";\nimport FancyHeadphones3D from "./FancyHeadphones3D";');
}

fs.writeFileSync(path, content);
console.log('EP replaced?', startEP !== -1);
console.log('SVG replaced?', startSVG !== -1);
