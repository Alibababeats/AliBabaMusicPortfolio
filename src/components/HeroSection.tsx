"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   PREMIUM OVER-EAR HEADPHONE HERO  —  v6
   ───────────────────────────────────────────────────────────────
   • Realistic elliptical over-ear closed-back form factor
   • Scroll pulls the headphones DOWN while exploding apart
   • Stops right before the beats section (height: 220vh)
   • All parts use bright enough colors to be visible on dark bg
   ═══════════════════════════════════════════════════════════════ */

/* ── Exploding-part wrapper ─────────────────────────────────── */
function EP({
  children,
  s,
  x,
  y,
  r = [0, 0],
  d = [0.05, 0.85],
  o,
}: {
  children: React.ReactNode;
  s: any;
  x: [number, number];
  y: [number, number];
  r?: [number, number];
  d?: [number, number];
  o?: [number[], number[]];
}) {
  const mx = useTransform(s, d, x);
  const my = useTransform(s, d, y);
  const mr = useTransform(s, d, r);
  const mo = useTransform(s, o ? o[0] : [0, 1], o ? o[1] : [1, 1]);
  return (
    <motion.g style={{ x: mx, y: my, rotate: mr, opacity: mo } as any}>
      {children}
    </motion.g>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const s = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001,
  });

  /* Title fade + move down */
  const titleOp = useTransform(s, [0, 0.18, 0.55], [1, 1, 0]);
  const titleY = useTransform(s, [0, 1], [0, 120]);

  /* Whole SVG moves downward as you scroll */
  const svgY = useTransform(s, [0, 1], [0, 1050]);

  return (
    <section ref={ref} style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          padding: "0 1rem",
        }}
      >
        {/* ── Ambient orbs ── */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "2%",
            left: "4%",
            width: "28rem",
            height: "28rem",
            background:
              "radial-gradient(circle,rgba(124,58,237,.4) 0%,transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.14, 0.3, 0.14],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            position: "absolute",
            top: "8%",
            right: "4%",
            width: "22rem",
            height: "22rem",
            background:
              "radial-gradient(circle,rgba(6,182,212,.4) 0%,transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* ── Title ── */}
        <motion.div
          style={{
            opacity: titleOp,
            y: titleY,
            textAlign: "center",
            position: "relative",
            zIndex: 20,
            marginBottom: "0.25rem",
          } as any}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: "clamp(5rem, 14vw, 12rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              background:
                "linear-gradient(135deg,#a78bfa 0%,#ec4899 40%,#22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ALI BABA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
              color: "#9ca3af",
              fontWeight: 300,
              letterSpacing: "0.06em",
              marginTop: "0.15rem",
            }}
          >
            Ali Salem
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: "clamp(0.7rem, 1.4vw, 0.95rem)",
              color: "#6b7280",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              marginTop: "0.25rem",
            }}
          >
            Music Producer &amp; Beat Maker
          </motion.p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
            HEADPHONE SVG — PREMIUM OVER-EAR
            Center: 400,310. Cups are large ellipses.
            Scroll pushes SVG down (svgY) + explodes parts.
            viewBox focused — overflow:visible for exploded parts.
            ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{
            position: "relative",
            zIndex: 10,
            y: svgY,
          } as any}
        >
          <svg
            viewBox="40 40 720 520"
            fill="none"
            style={{
              width: "min(580px, 92vw)",
              height: "auto",
              overflow: "visible",
              display: "block",
            }}
          >
            <defs>
              {/* ── Headband ── */}
              <linearGradient id="hbOuter" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7a7aa8" />
                <stop offset="18%" stopColor="#9898c0" />
                <stop offset="35%" stopColor="#b0b0d4" />
                <stop offset="50%" stopColor="#bdbde0" />
                <stop offset="65%" stopColor="#b0b0d4" />
                <stop offset="82%" stopColor="#9898c0" />
                <stop offset="100%" stopColor="#7a7aa8" />
              </linearGradient>
              <linearGradient id="hbPad" x1="0" y1="0" x2="1" y2=".5">
                <stop offset="0%" stopColor="#4a3a2a" />
                <stop offset="30%" stopColor="#6a5440" />
                <stop offset="50%" stopColor="#7a6450" />
                <stop offset="70%" stopColor="#6a5440" />
                <stop offset="100%" stopColor="#4a3a2a" />
              </linearGradient>
              {/* ── Arm / Yoke ── */}
              <linearGradient id="armG" x1=".5" y1="0" x2=".5" y2="1">
                <stop offset="0%" stopColor="#a0a0c8" />
                <stop offset="50%" stopColor="#7878a6" />
                <stop offset="100%" stopColor="#5c5c8a" />
              </linearGradient>
              <linearGradient id="yokeG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9090b8" />
                <stop offset="100%" stopColor="#585888" />
              </linearGradient>
              {/* ── Earcup shells ── */}
              <radialGradient id="cupL" cx=".35" cy=".35" r=".7">
                <stop offset="0%" stopColor="#9898c0" />
                <stop offset="30%" stopColor="#7878a4" />
                <stop offset="60%" stopColor="#5c5c86" />
                <stop offset="100%" stopColor="#3a3a62" />
              </radialGradient>
              <radialGradient id="cupR" cx=".65" cy=".35" r=".7">
                <stop offset="0%" stopColor="#9898c0" />
                <stop offset="30%" stopColor="#7878a4" />
                <stop offset="60%" stopColor="#5c5c86" />
                <stop offset="100%" stopColor="#3a3a62" />
              </radialGradient>
              {/* ── Earpad leather ── */}
              <radialGradient id="padL" cx=".4" cy=".38" r=".62">
                <stop offset="0%" stopColor="#5a4a3a" />
                <stop offset="50%" stopColor="#4a3a2c" />
                <stop offset="100%" stopColor="#3a2c20" />
              </radialGradient>
              <radialGradient id="padR" cx=".6" cy=".38" r=".62">
                <stop offset="0%" stopColor="#5a4a3a" />
                <stop offset="50%" stopColor="#4a3a2c" />
                <stop offset="100%" stopColor="#3a2c20" />
              </radialGradient>
              {/* ── Driver ── */}
              <radialGradient id="drvG" cx=".42" cy=".38" r=".66">
                <stop offset="0%" stopColor="#4e4e78" />
                <stop offset="40%" stopColor="#383862" />
                <stop offset="100%" stopColor="#22224a" />
              </radialGradient>
              {/* ── Voice coil copper ── */}
              <linearGradient id="coilG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8b868" />
                <stop offset="50%" stopColor="#d49840" />
                <stop offset="100%" stopColor="#b87c28" />
              </linearGradient>
              {/* ── Magnet ── */}
              <linearGradient id="magG" x1=".5" y1="0" x2=".5" y2="1">
                <stop offset="0%" stopColor="#a0a0a0" />
                <stop offset="50%" stopColor="#787878" />
                <stop offset="100%" stopColor="#555" />
              </linearGradient>
              {/* ── PCB ── */}
              <linearGradient id="pcbG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a7a3a" />
                <stop offset="100%" stopColor="#0e5a28" />
              </linearGradient>
              <linearGradient id="pcbBlk" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#282828" />
                <stop offset="100%" stopColor="#1a1a1a" />
              </linearGradient>
              {/* ── Cable ── */}
              <linearGradient id="cabG" x1=".5" y1="0" x2=".5" y2="1">
                <stop offset="0%" stopColor="#4e4e72" />
                <stop offset="100%" stopColor="#2e2e52" />
              </linearGradient>
              {/* ── Accents ── */}
              <linearGradient id="acPurp" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9b5de5" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient id="acCyan" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
              {/* ── Filters ── */}
              <filter id="s1">
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="4"
                  floodColor="#000"
                  floodOpacity=".55"
                />
              </filter>
              <filter id="s2">
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="8"
                  floodColor="#000"
                  floodOpacity=".6"
                />
              </filter>
              <filter id="s3">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="12"
                  floodColor="#000"
                  floodOpacity=".55"
                />
              </filter>
              <filter id="gP">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="5"
                  floodColor="#9b5de5"
                  floodOpacity=".6"
                />
              </filter>
              <filter id="gC">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="5"
                  floodColor="#22d3ee"
                  floodOpacity=".6"
                />
              </filter>
            </defs>

            {/* ═══════════════════════════════════════
                CENTER: 400, 310.
                Left cup ~183. Right cup ~617.
                Headband arc peaks at ~y=95.
                Cup bottoms at ~y=470.
                Parts explode DOWN + OUT from center.
                ═══════════════════════════════════════ */}

            {/* ─── 1. HEADBAND — SPRING STEEL BAND ─── */}
            <EP s={s} x={[0, 0]} y={[0, -70]} r={[0, 0]} d={[0.04, 0.5]}>
              <g filter="url(#s2)">
                {/* Main arc — thick brushed metal */}
                <path
                  d="M 190 280 C 190 82, 610 82, 610 280"
                  stroke="url(#hbOuter)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Top highlight */}
                <path
                  d="M 220 270 C 220 106, 580 106, 580 270"
                  stroke="rgba(255,255,255,.12)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Bottom edge shadow */}
                <path
                  d="M 200 284 C 200 91, 600 91, 600 284"
                  stroke="rgba(0,0,0,.2)"
                  strokeWidth="1.2"
                  fill="none"
                />
                {/* Detent marks for size adjustment */}
                {[260, 290, 320, 350, 450, 480, 510, 540].map((cx, i) => {
                  const t = (cx - 190) / 420;
                  const cy = 280 - Math.sin(t * Math.PI) * 198;
                  const angle =
                    (Math.atan2(
                      Math.cos(t * Math.PI) * 198,
                      1
                    ) *
                      180) /
                    Math.PI;
                  return (
                    <line
                      key={`dt${i}`}
                      x1={cx - 2}
                      y1={cy}
                      x2={cx + 2}
                      y2={cy}
                      stroke="rgba(255,255,255,.1)"
                      strokeWidth=".7"
                    />
                  );
                })}

              </g>
            </EP>

            {/* ─── 2. HEADBAND — LEATHER PADDING ─── */}
            <EP s={s} x={[0, 0]} y={[0, -90]} r={[0, 1]} d={[0.06, 0.52]}>
              <g>
                <path
                  d="M 310 210 C 310 140, 490 140, 490 210"
                  stroke="url(#hbPad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Leather texture — contrast stitching */}
                <path
                  d="M 320 207 C 330 164, 470 164, 480 207"
                  stroke="rgba(200,180,140,.18)"
                  strokeWidth=".5"
                  strokeDasharray="3 2.5"
                  fill="none"
                />
                <path
                  d="M 318 213 C 328 170, 472 170, 482 213"
                  stroke="rgba(200,180,140,.18)"
                  strokeWidth=".5"
                  strokeDasharray="3 2.5"
                  fill="none"
                />
                {/* Foam peek at edges */}
                <ellipse
                  cx="316"
                  cy="198"
                  rx="5"
                  ry="8"
                  fill="rgba(80,70,55,.4)"
                />
                <ellipse
                  cx="484"
                  cy="198"
                  rx="5"
                  ry="8"
                  fill="rgba(80,70,55,.4)"
                />
              </g>
            </EP>

            {/* ─── 3. LEFT SLIDER ARM ─── */}
            <EP
              s={s}
              x={[0, -30]}
              y={[0, 40]}
              r={[0, -3]}
              d={[0.07, 0.48]}
            >
              <g filter="url(#s1)">
                <rect
                  x="180"
                  y="258"
                  width="14"
                  height="68"
                  rx="4"
                  fill="url(#armG)"
                />
                {/* Adjustment notches */}
                {[0, 8, 16, 24, 32, 40].map((o, i) => (
                  <line
                    key={`la${i}`}
                    x1="183"
                    y1={266 + o}
                    x2="191"
                    y2={266 + o}
                    stroke="rgba(255,255,255,.12)"
                    strokeWidth=".6"
                  />
                ))}
                <rect
                  x="182"
                  y="280"
                  width="10"
                  height="3"
                  rx="1"
                  fill="rgba(155,93,229,.22)"
                />
              </g>
            </EP>

            {/* ─── 4. RIGHT SLIDER ARM ─── */}
            <EP
              s={s}
              x={[0, 30]}
              y={[0, 40]}
              r={[0, 3]}
              d={[0.07, 0.48]}
            >
              <g filter="url(#s1)">
                <rect
                  x="606"
                  y="258"
                  width="14"
                  height="68"
                  rx="4"
                  fill="url(#armG)"
                />
                {[0, 8, 16, 24, 32, 40].map((o, i) => (
                  <line
                    key={`ra${i}`}
                    x1="609"
                    y1={266 + o}
                    x2="617"
                    y2={266 + o}
                    stroke="rgba(255,255,255,.12)"
                    strokeWidth=".6"
                  />
                ))}
                <rect
                  x="608"
                  y="280"
                  width="10"
                  height="3"
                  rx="1"
                  fill="rgba(34,211,238,.22)"
                />
              </g>
            </EP>

            {/* ─── 5. LEFT YOKE — MACHINED ALUMINUM ─── */}
            <EP
              s={s}
              x={[0, -48]}
              y={[0, 65]}
              r={[0, -5]}
              d={[0.09, 0.52]}
            >
              <g filter="url(#s1)">
                {/* U-shaped yoke fork */}
                <path
                  d="M 176 322 L 160 340 L 160 406 L 166 410 L 166 346 L 176 332 Z"
                  fill="#8080ac"
                  stroke="#4e4e78"
                  strokeWidth=".6"
                />
                <path
                  d="M 196 322 L 212 340 L 212 406 L 206 410 L 206 346 L 196 332 Z"
                  fill="#6c6c9a"
                  stroke="#4e4e78"
                  strokeWidth=".6"
                />
                {/* Gimbal pivot — circular bearing */}
                <circle
                  cx="186"
                  cy="326"
                  r="9"
                  fill="#4a4a76"
                  stroke="#8888b4"
                  strokeWidth="1.5"
                />
                <circle
                  cx="186"
                  cy="326"
                  r="5.5"
                  fill="#3e3e6a"
                  stroke="#6c6c9a"
                  strokeWidth=".8"
                />
                <circle cx="186" cy="326" r="2" fill="#2a2a56" />
                {/* Hex head micro-bolts */}
                {[
                  [164, 360],
                  [164, 390],
                  [208, 360],
                  [208, 390],
                ].map(([bx, by], i) => (
                  <g key={`lbolt${i}`}>
                    <circle
                      cx={bx}
                      cy={by}
                      r="2.5"
                      fill="#5a5a86"
                      stroke="#3e3e68"
                      strokeWidth=".5"
                    />
                    {/* hex head pattern */}
                    <path
                      d={`M ${bx! - 1} ${by! - 1.7} L ${bx! + 1} ${by! - 1.7} L ${bx! + 2} ${by} L ${bx! + 1} ${by! + 1.7} L ${bx! - 1} ${by! + 1.7} L ${bx! - 2} ${by} Z`}
                      fill="none"
                      stroke="rgba(255,255,255,.1)"
                      strokeWidth=".3"
                    />
                  </g>
                ))}
                {/* Model etch */}
                <text
                  x="186"
                  y="416"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.08)"
                  fontSize="4"
                  fontFamily="monospace"
                  letterSpacing="1.2"
                >
                  AB-50L
                </text>
              </g>
            </EP>

            {/* ─── 6. RIGHT YOKE ─── */}
            <EP
              s={s}
              x={[0, 48]}
              y={[0, 65]}
              r={[0, 5]}
              d={[0.09, 0.52]}
            >
              <g filter="url(#s1)">
                <path
                  d="M 604 322 L 588 340 L 588 406 L 594 410 L 594 346 L 604 332 Z"
                  fill="#6c6c9a"
                  stroke="#4e4e78"
                  strokeWidth=".6"
                />
                <path
                  d="M 624 322 L 640 340 L 640 406 L 634 410 L 634 346 L 624 332 Z"
                  fill="#8080ac"
                  stroke="#4e4e78"
                  strokeWidth=".6"
                />
                <circle
                  cx="614"
                  cy="326"
                  r="9"
                  fill="#4a4a76"
                  stroke="#8888b4"
                  strokeWidth="1.5"
                />
                <circle
                  cx="614"
                  cy="326"
                  r="5.5"
                  fill="#3e3e6a"
                  stroke="#6c6c9a"
                  strokeWidth=".8"
                />
                <circle cx="614" cy="326" r="2" fill="#2a2a56" />
                {[
                  [592, 360],
                  [592, 390],
                  [636, 360],
                  [636, 390],
                ].map(([bx, by], i) => (
                  <g key={`rbolt${i}`}>
                    <circle
                      cx={bx}
                      cy={by}
                      r="2.5"
                      fill="#5a5a86"
                      stroke="#3e3e68"
                      strokeWidth=".5"
                    />
                    <path
                      d={`M ${bx! - 1} ${by! - 1.7} L ${bx! + 1} ${by! - 1.7} L ${bx! + 2} ${by} L ${bx! + 1} ${by! + 1.7} L ${bx! - 1} ${by! + 1.7} L ${bx! - 2} ${by} Z`}
                      fill="none"
                      stroke="rgba(255,255,255,.1)"
                      strokeWidth=".3"
                    />
                  </g>
                ))}
                <text
                  x="614"
                  y="416"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.08)"
                  fontSize="4"
                  fontFamily="monospace"
                  letterSpacing="1.2"
                >
                  AB-50R
                </text>
              </g>
            </EP>

            {/* ─── 7. LEFT OUTER EARCUP SHELL — ANODIZED ALUMINUM ─── */}
            <EP
              s={s}
              x={[0, -75]}
              y={[0, 100]}
              r={[0, -4]}
              d={[0.12, 0.58]}
            >
              <g filter="url(#s3)">
                {/* Main elliptical shape — over-ear */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="76"
                  ry="90"
                  fill="url(#cupL)"
                />
                {/* Rim highlight */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="76"
                  ry="90"
                  fill="none"
                  stroke="rgba(255,255,255,.1)"
                  strokeWidth="1.2"
                />
                {/* Inner bevel */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="72"
                  ry="86"
                  fill="none"
                  stroke="rgba(0,0,0,.15)"
                  strokeWidth=".6"
                />
                {/* Specular highlight */}
                <ellipse
                  cx="165"
                  cy="345"
                  rx="28"
                  ry="22"
                  fill="rgba(255,255,255,.06)"
                />
                <ellipse
                  cx="158"
                  cy="338"
                  rx="14"
                  ry="10"
                  fill="rgba(255,255,255,.04)"
                />
                {/* Logo inlay */}
                <text
                  x="186"
                  y="385"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.12)"
                  fontSize="18"
                  fontWeight="800"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                >
                  AB
                </text>
                {/* Purple accent ring */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="68"
                  ry="82"
                  fill="none"
                  stroke="rgba(155,93,229,.2)"
                  strokeWidth="1.5"
                />
                {/* Passive vent micro-mesh */}
                <ellipse
                  cx="186"
                  cy="430"
                  rx="12"
                  ry="5"
                  fill="rgba(0,0,0,.3)"
                  stroke="rgba(120,120,160,.2)"
                  strokeWidth=".5"
                />
                {[-6, -2, 2, 6].map((dx, i) => (
                  <line
                    key={`vl${i}`}
                    x1={186 + dx}
                    y1="426"
                    x2={186 + dx}
                    y2="434"
                    stroke="rgba(120,120,160,.15)"
                    strokeWidth=".3"
                  />
                ))}
              </g>
            </EP>

            {/* ─── 8. RIGHT OUTER EARCUP SHELL ─── */}
            <EP
              s={s}
              x={[0, 75]}
              y={[0, 100]}
              r={[0, 4]}
              d={[0.12, 0.58]}
            >
              <g filter="url(#s3)">
                <ellipse
                  cx="614"
                  cy="380"
                  rx="76"
                  ry="90"
                  fill="url(#cupR)"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="76"
                  ry="90"
                  fill="none"
                  stroke="rgba(255,255,255,.1)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="72"
                  ry="86"
                  fill="none"
                  stroke="rgba(0,0,0,.15)"
                  strokeWidth=".6"
                />
                <ellipse
                  cx="635"
                  cy="345"
                  rx="28"
                  ry="22"
                  fill="rgba(255,255,255,.06)"
                />
                <ellipse
                  cx="642"
                  cy="338"
                  rx="14"
                  ry="10"
                  fill="rgba(255,255,255,.04)"
                />
                <text
                  x="614"
                  y="385"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.12)"
                  fontSize="18"
                  fontWeight="800"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                >
                  AB
                </text>
                <ellipse
                  cx="614"
                  cy="380"
                  rx="68"
                  ry="82"
                  fill="none"
                  stroke="rgba(34,211,238,.2)"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="614"
                  cy="430"
                  rx="12"
                  ry="5"
                  fill="rgba(0,0,0,.3)"
                  stroke="rgba(120,120,160,.2)"
                  strokeWidth=".5"
                />
                {[-6, -2, 2, 6].map((dx, i) => (
                  <line
                    key={`vr${i}`}
                    x1={614 + dx}
                    y1="426"
                    x2={614 + dx}
                    y2="434"
                    stroke="rgba(120,120,160,.15)"
                    strokeWidth=".3"
                  />
                ))}
              </g>
            </EP>

            {/* ─── 9. LEFT INTERNAL FRAME ─── */}
            <EP
              s={s}
              x={[0, -55]}
              y={[0, 145]}
              r={[0, -2]}
              d={[0.16, 0.62]}
            >
              <g>
                <ellipse
                  cx="186"
                  cy="380"
                  rx="66"
                  ry="78"
                  fill="#1e1e3e"
                  stroke="rgba(110,110,160,.3)"
                  strokeWidth=".8"
                />
                {/* Standoffs */}
                {[0, 72, 144, 216, 288].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <circle
                      key={`lsof${i}`}
                      cx={186 + Math.cos(rad) * 56}
                      cy={380 + Math.sin(rad) * 66}
                      r="3"
                      fill="#2c2c52"
                      stroke="rgba(100,100,140,.35)"
                      strokeWidth=".5"
                    />
                  );
                })}
                {/* Driver mount ring */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="50"
                  ry="60"
                  fill="none"
                  stroke="rgba(100,100,140,.25)"
                  strokeWidth="4"
                />
              </g>
            </EP>

            {/* ─── 10. RIGHT INTERNAL FRAME ─── */}
            <EP
              s={s}
              x={[0, 55]}
              y={[0, 145]}
              r={[0, 2]}
              d={[0.16, 0.62]}
            >
              <g>
                <ellipse
                  cx="614"
                  cy="380"
                  rx="66"
                  ry="78"
                  fill="#1e1e3e"
                  stroke="rgba(110,110,160,.3)"
                  strokeWidth=".8"
                />
                {[0, 72, 144, 216, 288].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <circle
                      key={`rsof${i}`}
                      cx={614 + Math.cos(rad) * 56}
                      cy={380 + Math.sin(rad) * 66}
                      r="3"
                      fill="#2c2c52"
                      stroke="rgba(100,100,140,.35)"
                      strokeWidth=".5"
                    />
                  );
                })}
                <ellipse
                  cx="614"
                  cy="380"
                  rx="50"
                  ry="60"
                  fill="none"
                  stroke="rgba(100,100,140,.25)"
                  strokeWidth="4"
                />
              </g>
            </EP>

            {/* ─── 11. LEFT EARPAD — LAMBSKIN LEATHER ─── */}
            <EP
              s={s}
              x={[0, -48]}
              y={[0, 188]}
              r={[0, -1]}
              d={[0.2, 0.66]}
            >
              <g filter="url(#s2)">
                {/* Outer pad ring */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="72"
                  ry="86"
                  fill="url(#padL)"
                  stroke="rgba(90,75,55,.5)"
                  strokeWidth="1"
                />
                {/* Memory foam opening */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="46"
                  ry="56"
                  fill="#0e0e24"
                />
                {/* Plush surface texture lines */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="60"
                  ry="72"
                  fill="none"
                  stroke="rgba(255,255,255,.04)"
                  strokeWidth="8"
                />
                {/* Stitching */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="68"
                  ry="82"
                  fill="none"
                  stroke="rgba(180,160,120,.15)"
                  strokeWidth=".5"
                  strokeDasharray="4 2.5"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="50"
                  ry="60"
                  fill="none"
                  stroke="rgba(180,160,120,.12)"
                  strokeWidth=".5"
                  strokeDasharray="4 2.5"
                />
              </g>
            </EP>

            {/* ─── 12. RIGHT EARPAD ─── */}
            <EP
              s={s}
              x={[0, 48]}
              y={[0, 188]}
              r={[0, 1]}
              d={[0.2, 0.66]}
            >
              <g filter="url(#s2)">
                <ellipse
                  cx="614"
                  cy="380"
                  rx="72"
                  ry="86"
                  fill="url(#padR)"
                  stroke="rgba(90,75,55,.5)"
                  strokeWidth="1"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="46"
                  ry="56"
                  fill="#0e0e24"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="60"
                  ry="72"
                  fill="none"
                  stroke="rgba(255,255,255,.04)"
                  strokeWidth="8"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="68"
                  ry="82"
                  fill="none"
                  stroke="rgba(180,160,120,.15)"
                  strokeWidth=".5"
                  strokeDasharray="4 2.5"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="50"
                  ry="60"
                  fill="none"
                  stroke="rgba(180,160,120,.12)"
                  strokeWidth=".5"
                  strokeDasharray="4 2.5"
                />
              </g>
            </EP>

            {/* ─── 13. LEFT DRIVER UNIT — 50mm BERYLLIUM ─── */}
            <EP
              s={s}
              x={[0, -70]}
              y={[0, 240]}
              r={[0, -4]}
              d={[0.24, 0.72]}
            >
              <g filter="url(#s2)">
                {/* Outer magnet housing ring */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="48"
                  ry="56"
                  fill="none"
                  stroke="rgba(100,100,140,.35)"
                  strokeWidth="4"
                />
                {/* Driver body */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="44"
                  ry="52"
                  fill="url(#drvG)"
                  stroke="rgba(80,80,120,.3)"
                  strokeWidth=".8"
                />
                {/* Beryllium diaphragm — concentric rings */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="36"
                  ry="43"
                  fill="none"
                  stroke="rgba(255,255,255,.06)"
                  strokeWidth=".6"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="30"
                  ry="36"
                  fill="none"
                  stroke="rgba(255,255,255,.05)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="24"
                  ry="29"
                  fill="none"
                  stroke="rgba(255,255,255,.04)"
                  strokeWidth=".4"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="18"
                  ry="22"
                  fill="none"
                  stroke="rgba(255,255,255,.035)"
                  strokeWidth=".4"
                />
                {/* Suspension surround */}
                <ellipse
                  cx="186"
                  cy="380"
                  rx="40"
                  ry="48"
                  fill="none"
                  stroke="rgba(120,120,160,.2)"
                  strokeWidth="2.5"
                  strokeDasharray="2 1.2"
                />
                {/* Center dome */}
                <ellipse
                  cx="186"
                  cy="378"
                  rx="12"
                  ry="14"
                  fill="#2e2e58"
                  stroke="rgba(255,255,255,.06)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="183"
                  cy="375"
                  rx="5"
                  ry="6"
                  fill="rgba(255,255,255,.03)"
                />
                {/* Bolt holes around surround */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <circle
                      key={`ldb${i}`}
                      cx={186 + Math.cos(rad) * 42}
                      cy={380 + Math.sin(rad) * 50}
                      r="1.5"
                      fill="#1c1c44"
                      stroke="rgba(100,100,140,.25)"
                      strokeWidth=".4"
                    />
                  );
                })}
                <text
                  x="186"
                  y="400"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.05)"
                  fontSize="3.5"
                  fontFamily="monospace"
                >
                  50mm Be
                </text>
              </g>
            </EP>

            {/* ─── 14. RIGHT DRIVER UNIT ─── */}
            <EP
              s={s}
              x={[0, 70]}
              y={[0, 240]}
              r={[0, 4]}
              d={[0.24, 0.72]}
            >
              <g filter="url(#s2)">
                <ellipse
                  cx="614"
                  cy="380"
                  rx="48"
                  ry="56"
                  fill="none"
                  stroke="rgba(100,100,140,.35)"
                  strokeWidth="4"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="44"
                  ry="52"
                  fill="url(#drvG)"
                  stroke="rgba(80,80,120,.3)"
                  strokeWidth=".8"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="36"
                  ry="43"
                  fill="none"
                  stroke="rgba(255,255,255,.06)"
                  strokeWidth=".6"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="30"
                  ry="36"
                  fill="none"
                  stroke="rgba(255,255,255,.05)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="24"
                  ry="29"
                  fill="none"
                  stroke="rgba(255,255,255,.04)"
                  strokeWidth=".4"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="18"
                  ry="22"
                  fill="none"
                  stroke="rgba(255,255,255,.035)"
                  strokeWidth=".4"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="40"
                  ry="48"
                  fill="none"
                  stroke="rgba(120,120,160,.2)"
                  strokeWidth="2.5"
                  strokeDasharray="2 1.2"
                />
                <ellipse
                  cx="614"
                  cy="378"
                  rx="12"
                  ry="14"
                  fill="#2e2e58"
                  stroke="rgba(255,255,255,.06)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="617"
                  cy="375"
                  rx="5"
                  ry="6"
                  fill="rgba(255,255,255,.03)"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  return (
                    <circle
                      key={`rdb${i}`}
                      cx={614 + Math.cos(rad) * 42}
                      cy={380 + Math.sin(rad) * 50}
                      r="1.5"
                      fill="#1c1c44"
                      stroke="rgba(100,100,140,.25)"
                      strokeWidth=".4"
                    />
                  );
                })}
                <text
                  x="614"
                  y="400"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.05)"
                  fontSize="3.5"
                  fontFamily="monospace"
                >
                  50mm Be
                </text>
              </g>
            </EP>

            {/* ─── 15. LEFT VOICE COIL — CCAW ON KAPTON ─── */}
            <EP
              s={s}
              x={[0, -62]}
              y={[0, 290]}
              r={[0, -7]}
              d={[0.28, 0.76]}
            >
              <g>
                <ellipse
                  cx="186"
                  cy="380"
                  rx="16"
                  ry="19"
                  fill="none"
                  stroke="url(#coilG)"
                  strokeWidth="5.5"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="12"
                  ry="14"
                  fill="none"
                  stroke="rgba(212,160,80,.25)"
                  strokeWidth="1.2"
                />
                {/* Copper wire wrapping detail */}
                {[-9, -5.5, -2, 1.5, 5, 8.5].map((dy, i) => (
                  <ellipse
                    key={`lww${i}`}
                    cx="186"
                    cy={380 + dy}
                    rx="14"
                    ry="2"
                    fill="none"
                    stroke="rgba(232,184,104,.14)"
                    strokeWidth=".4"
                  />
                ))}
                {/* Lead wires */}
                <line
                  x1="186"
                  y1="399"
                  x2="178"
                  y2="412"
                  stroke="rgba(220,170,70,.5)"
                  strokeWidth=".8"
                />
                <line
                  x1="186"
                  y1="399"
                  x2="194"
                  y2="412"
                  stroke="rgba(220,170,70,.5)"
                  strokeWidth=".8"
                />
                {/* Solder joints */}
                <circle cx="178" cy="412" r="1.5" fill="#d4a040" />
                <circle cx="194" cy="412" r="1.5" fill="#d4a040" />
              </g>
            </EP>

            {/* ─── 16. RIGHT VOICE COIL ─── */}
            <EP
              s={s}
              x={[0, 62]}
              y={[0, 290]}
              r={[0, 7]}
              d={[0.28, 0.76]}
            >
              <g>
                <ellipse
                  cx="614"
                  cy="380"
                  rx="16"
                  ry="19"
                  fill="none"
                  stroke="url(#coilG)"
                  strokeWidth="5.5"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="12"
                  ry="14"
                  fill="none"
                  stroke="rgba(212,160,80,.25)"
                  strokeWidth="1.2"
                />
                {[-9, -5.5, -2, 1.5, 5, 8.5].map((dy, i) => (
                  <ellipse
                    key={`rww${i}`}
                    cx="614"
                    cy={380 + dy}
                    rx="14"
                    ry="2"
                    fill="none"
                    stroke="rgba(232,184,104,.14)"
                    strokeWidth=".4"
                  />
                ))}
                <line
                  x1="614"
                  y1="399"
                  x2="606"
                  y2="412"
                  stroke="rgba(220,170,70,.5)"
                  strokeWidth=".8"
                />
                <line
                  x1="614"
                  y1="399"
                  x2="622"
                  y2="412"
                  stroke="rgba(220,170,70,.5)"
                  strokeWidth=".8"
                />
                <circle cx="606" cy="412" r="1.5" fill="#d4a040" />
                <circle cx="622" cy="412" r="1.5" fill="#d4a040" />
              </g>
            </EP>

            {/* ─── 17. LEFT NEODYMIUM RING MAGNET ─── */}
            <EP
              s={s}
              x={[0, -58]}
              y={[0, 340]}
              r={[0, -5]}
              d={[0.32, 0.8]}
            >
              <g filter="url(#s1)">
                <ellipse
                  cx="186"
                  cy="382"
                  rx="28"
                  ry="32"
                  fill="url(#magG)"
                />
                <ellipse
                  cx="186"
                  cy="380"
                  rx="22"
                  ry="26"
                  fill="#585858"
                  stroke="rgba(180,180,180,.25)"
                  strokeWidth=".8"
                />
                <ellipse
                  cx="186"
                  cy="378"
                  rx="15"
                  ry="18"
                  fill="#6a6a6a"
                  stroke="rgba(200,200,200,.15)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="186"
                  cy="378"
                  rx="6"
                  ry="7"
                  fill="#404040"
                />
                <ellipse
                  cx="186"
                  cy="377"
                  rx="4"
                  ry="4.5"
                  fill="url(#acPurp)"
                  filter="url(#gP)"
                />
                {/* N-S Labeling */}
                <text
                  x="172"
                  y="384"
                  fill="rgba(255,255,255,.1)"
                  fontSize="4"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  N
                </text>
                <text
                  x="200"
                  y="384"
                  fill="rgba(255,255,255,.1)"
                  fontSize="4"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  S
                </text>
              </g>
            </EP>

            {/* ─── 18. RIGHT NEODYMIUM RING MAGNET ─── */}
            <EP
              s={s}
              x={[0, 58]}
              y={[0, 340]}
              r={[0, 5]}
              d={[0.32, 0.8]}
            >
              <g filter="url(#s1)">
                <ellipse
                  cx="614"
                  cy="382"
                  rx="28"
                  ry="32"
                  fill="url(#magG)"
                />
                <ellipse
                  cx="614"
                  cy="380"
                  rx="22"
                  ry="26"
                  fill="#585858"
                  stroke="rgba(180,180,180,.25)"
                  strokeWidth=".8"
                />
                <ellipse
                  cx="614"
                  cy="378"
                  rx="15"
                  ry="18"
                  fill="#6a6a6a"
                  stroke="rgba(200,200,200,.15)"
                  strokeWidth=".5"
                />
                <ellipse
                  cx="614"
                  cy="378"
                  rx="6"
                  ry="7"
                  fill="#404040"
                />
                <ellipse
                  cx="614"
                  cy="377"
                  rx="4"
                  ry="4.5"
                  fill="url(#acCyan)"
                  filter="url(#gC)"
                />
                <text
                  x="600"
                  y="384"
                  fill="rgba(255,255,255,.1)"
                  fontSize="4"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  N
                </text>
                <text
                  x="628"
                  y="384"
                  fill="rgba(255,255,255,.1)"
                  fontSize="4"
                  fontWeight="700"
                  fontFamily="sans-serif"
                >
                  S
                </text>
              </g>
            </EP>

            {/* ─── 19. FRONT BAFFLE PLATES ─── */}
            <EP
              s={s}
              x={[0, -42]}
              y={[0, 130]}
              r={[0, -1]}
              d={[0.14, 0.58]}
            >
              <g>
                <ellipse
                  cx="186"
                  cy="380"
                  rx="56"
                  ry="67"
                  fill="rgba(26,26,50,.6)"
                  stroke="rgba(100,100,140,.2)"
                  strokeWidth=".6"
                />
                {/* Anti-diffraction port pattern */}
                {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  const r1 = 32;
                  const r2 = 38;
                  return (
                    <g key={`bafl${i}`}>
                      <circle
                        cx={186 + Math.cos(rad) * r1}
                        cy={380 + Math.sin(rad) * (r1 * 1.19)}
                        r="1.8"
                        fill="rgba(0,0,0,.4)"
                        stroke="rgba(80,80,120,.2)"
                        strokeWidth=".3"
                      />
                      <circle
                        cx={186 + Math.cos(rad + 0.35) * r2}
                        cy={
                          380 + Math.sin(rad + 0.35) * (r2 * 1.19)
                        }
                        r="1.3"
                        fill="rgba(0,0,0,.3)"
                        stroke="rgba(80,80,120,.15)"
                        strokeWidth=".2"
                      />
                    </g>
                  );
                })}
              </g>
            </EP>
            <EP
              s={s}
              x={[0, 42]}
              y={[0, 130]}
              r={[0, 1]}
              d={[0.14, 0.58]}
            >
              <g>
                <ellipse
                  cx="614"
                  cy="380"
                  rx="56"
                  ry="67"
                  fill="rgba(26,26,50,.6)"
                  stroke="rgba(100,100,140,.2)"
                  strokeWidth=".6"
                />
                {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
                  const rad = (a * Math.PI) / 180;
                  const r1 = 32;
                  const r2 = 38;
                  return (
                    <g key={`bafr${i}`}>
                      <circle
                        cx={614 + Math.cos(rad) * r1}
                        cy={380 + Math.sin(rad) * (r1 * 1.19)}
                        r="1.8"
                        fill="rgba(0,0,0,.4)"
                        stroke="rgba(80,80,120,.2)"
                        strokeWidth=".3"
                      />
                      <circle
                        cx={614 + Math.cos(rad + 0.35) * r2}
                        cy={
                          380 + Math.sin(rad + 0.35) * (r2 * 1.19)
                        }
                        r="1.3"
                        fill="rgba(0,0,0,.3)"
                        stroke="rgba(80,80,120,.15)"
                        strokeWidth=".2"
                      />
                    </g>
                  );
                })}
              </g>
            </EP>

            {/* ─── 20. ACOUSTIC DAMPING FOAM ─── */}
            <EP
              s={s}
              x={[0, -38]}
              y={[0, 115]}
              r={[0, 0]}
              d={[0.13, 0.56]}
            >
              <ellipse
                cx="186"
                cy="380"
                rx="52"
                ry="62"
                fill="rgba(50,50,75,.4)"
                stroke="rgba(90,90,120,.2)"
                strokeWidth=".5"
                strokeDasharray="2 2"
              />
            </EP>
            <EP
              s={s}
              x={[0, 38]}
              y={[0, 115]}
              r={[0, 0]}
              d={[0.13, 0.56]}
            >
              <ellipse
                cx="614"
                cy="380"
                rx="52"
                ry="62"
                fill="rgba(50,50,75,.4)"
                stroke="rgba(90,90,120,.2)"
                strokeWidth=".5"
                strokeDasharray="2 2"
              />
            </EP>

            {/* ─── 21. PRECISION SCREWS ─── */}
            <EP
              s={s}
              x={[0, -35]}
              y={[0, 165]}
              r={[0, 22]}
              d={[0.18, 0.65]}
            >
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                const cx = 186 + Math.cos(rad) * 64;
                const cy = 380 + Math.sin(rad) * 76;
                return (
                  <g key={`scl${i}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#5e5e88"
                      stroke="#3e3e68"
                      strokeWidth=".5"
                    />
                    <line
                      x1={cx - 1.2}
                      y1={cy}
                      x2={cx + 1.2}
                      y2={cy}
                      stroke="#2a2a50"
                      strokeWidth=".7"
                    />
                    <line
                      x1={cx}
                      y1={cy - 1.2}
                      x2={cx}
                      y2={cy + 1.2}
                      stroke="#2a2a50"
                      strokeWidth=".7"
                    />
                  </g>
                );
              })}
            </EP>
            <EP
              s={s}
              x={[0, 35]}
              y={[0, 165]}
              r={[0, -22]}
              d={[0.18, 0.65]}
            >
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                const cx = 614 + Math.cos(rad) * 64;
                const cy = 380 + Math.sin(rad) * 76;
                return (
                  <g key={`scr${i}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r="3"
                      fill="#5e5e88"
                      stroke="#3e3e68"
                      strokeWidth=".5"
                    />
                    <line
                      x1={cx - 1.2}
                      y1={cy}
                      x2={cx + 1.2}
                      y2={cy}
                      stroke="#2a2a50"
                      strokeWidth=".7"
                    />
                    <line
                      x1={cx}
                      y1={cy - 1.2}
                      x2={cx}
                      y2={cy + 1.2}
                      stroke="#2a2a50"
                      strokeWidth=".7"
                    />
                  </g>
                );
              })}
            </EP>

            {/* ─── 22. CABLE ASSEMBLY ─── */}
            <EP
              s={s}
              x={[0, -15]}
              y={[0, 210]}
              r={[0, 2]}
              d={[0.15, 0.6]}
            >
              <g filter="url(#s1)">
                {/* Strain relief */}
                <path
                  d="M 178 468 C 178 462, 194 462, 194 468 L 192 478 L 180 478 Z"
                  fill="#4a4a74"
                />
                {/* Main cable */}
                <path
                  d="M 186 478 C 186 500, 180 525, 178 545"
                  stroke="url(#cabG)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 186 478 C 186 500, 180 525, 178 545"
                  stroke="rgba(255,255,255,.06)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Connector housing */}
                <rect
                  x="176"
                  y="460"
                  width="20"
                  height="12"
                  rx="3.5"
                  fill="#4a4a74"
                  stroke="rgba(100,100,140,.3)"
                  strokeWidth=".5"
                />
                <rect
                  x="179"
                  y="457"
                  width="14"
                  height="5"
                  rx="2"
                  fill="#5e5e8a"
                />
                {/* Gold pin */}
                <circle cx="186" cy="458" r="1.5" fill="#c8a040" />
              </g>
            </EP>

            {/* ─── 23. INTERNAL WIRING ─── */}
            <EP
              s={s}
              x={[0, -25]}
              y={[0, 175]}
              r={[0, 0]}
              d={[0.16, 0.6]}
              o={[[0, 0.2, 0.5, 1], [0, 0, 0.8, 0.5]]}
            >
              <g>
                {/* PTFE wires L-channel */}
                <path
                  d="M 168 405 C 160 420, 175 440, 180 460"
                  stroke="rgba(220,60,60,.35)"
                  strokeWidth="1"
                  fill="none"
                />
                <path
                  d="M 204 405 C 212 420, 197 440, 192 460"
                  stroke="rgba(60,60,220,.35)"
                  strokeWidth="1"
                  fill="none"
                />
                {/* Heat-shrink solder joints */}
                <rect
                  x="178"
                  y="454"
                  width="6"
                  height="3"
                  rx="1"
                  fill="rgba(40,40,40,.6)"
                  stroke="rgba(100,100,100,.3)"
                  strokeWidth=".3"
                />
                <rect
                  x="190"
                  y="454"
                  width="6"
                  height="3"
                  rx="1"
                  fill="rgba(40,40,40,.6)"
                  stroke="rgba(100,100,100,.3)"
                  strokeWidth=".3"
                />
              </g>
            </EP>

            {/* ─── 24. PCB — BLUETOOTH / DSP ─── */}
            <EP
              s={s}
              x={[0, 20]}
              y={[0, 380]}
              r={[0, 3]}
              d={[0.35, 0.85]}
            >
              <g filter="url(#s2)">
                {/* Main board */}
                <rect
                  x="350"
                  y="370"
                  width="100"
                  height="62"
                  rx="3.5"
                  fill="url(#pcbG)"
                  stroke="rgba(50,130,70,.5)"
                  strokeWidth=".8"
                />
                {/* Copper traces */}
                {[376, 381, 386, 391, 396, 401, 406, 411, 416, 421].map(
                  (py, i) => (
                    <line
                      key={`tr${i}`}
                      x1="357"
                      y1={py}
                      x2={380 + ((i * 7) % 40)}
                      y2={py}
                      stroke="rgba(220,200,80,.15)"
                      strokeWidth=".4"
                    />
                  )
                )}
                {/* Bluetooth chip — CSR8675 */}
                <rect
                  x="360"
                  y="378"
                  width="22"
                  height="18"
                  rx="1.5"
                  fill="url(#pcbBlk)"
                  stroke="rgba(140,140,140,.3)"
                  strokeWidth=".4"
                />
                <text
                  x="371"
                  y="386"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.18)"
                  fontSize="3"
                  fontFamily="monospace"
                >
                  CSR8675
                </text>
                <text
                  x="371"
                  y="392"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.1)"
                  fontSize="2.2"
                  fontFamily="monospace"
                >
                  BT 5.2
                </text>
                {/* DSP — ESS Sabre */}
                <rect
                  x="388"
                  y="378"
                  width="20"
                  height="14"
                  rx="1.5"
                  fill="url(#pcbBlk)"
                  stroke="rgba(140,140,140,.3)"
                  strokeWidth=".4"
                />
                <text
                  x="398"
                  y="385"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.18)"
                  fontSize="2.5"
                  fontFamily="monospace"
                >
                  ESS Sabre
                </text>
                <text
                  x="398"
                  y="390"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.1)"
                  fontSize="2"
                  fontFamily="monospace"
                >
                  DAC
                </text>
                {/* Antenna trace — serpentine */}
                <path
                  d="M 412 378 L 418 378 L 418 382 L 424 382 L 424 378 L 430 378 L 430 382 L 436 382 L 436 378 L 442 378"
                  stroke="rgba(180,160,80,.2)"
                  strokeWidth=".6"
                  fill="none"
                />
                {/* Pin headers */}
                {[0, 4, 8, 12, 16].map((o, i) => (
                  <g key={`pin${i}`}>
                    <rect
                      x={358 + o * 1.8}
                      y="425"
                      width="1.5"
                      height="4"
                      fill="rgba(200,180,80,.25)"
                    />
                  </g>
                ))}
                {/* USB-C port outline */}
                <rect
                  x="416"
                  y="400"
                  width="14"
                  height="6"
                  rx="3"
                  fill="#1a1a1a"
                  stroke="rgba(160,160,160,.3)"
                  strokeWidth=".4"
                />
                <text
                  x="423"
                  y="404.5"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.08)"
                  fontSize="2"
                  fontFamily="monospace"
                >
                  USB-C
                </text>
                {/* 3.5mm jack */}
                <circle
                  cx="438"
                  cy="414"
                  r="4"
                  fill="#0e0e0e"
                  stroke="rgba(160,160,160,.3)"
                  strokeWidth=".4"
                />
                <circle
                  cx="438"
                  cy="414"
                  r="1.5"
                  fill="rgba(200,180,80,.3)"
                />
                <text
                  x="438"
                  y="421"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.06)"
                  fontSize="2"
                  fontFamily="monospace"
                >
                  3.5mm
                </text>
                {/* Power LED */}
                <circle
                  cx="356"
                  cy="400"
                  r="1.5"
                  fill="rgba(155,93,229,.5)"
                />
                {/* Board label */}
                <text
                  x="400"
                  y="430"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.1)"
                  fontSize="3"
                  fontFamily="monospace"
                  letterSpacing=".5"
                >
                  AB-AUDIO REV 2.1
                </text>
              </g>
            </EP>

            {/* ─── 25. BATTERY MODULE ─── */}
            <EP
              s={s}
              x={[0, -30]}
              y={[0, 410]}
              r={[0, -2]}
              d={[0.38, 0.88]}
            >
              <g filter="url(#s1)">
                {/* Pouch cell */}
                <rect
                  x="336"
                  y="445"
                  width="56"
                  height="28"
                  rx="3"
                  fill="#2a2a48"
                  stroke="rgba(100,100,140,.3)"
                  strokeWidth=".6"
                />
                {/* Wrap label */}
                <rect
                  x="340"
                  y="449"
                  width="48"
                  height="20"
                  rx="1.5"
                  fill="#22223e"
                />
                <text
                  x="364"
                  y="457"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.15)"
                  fontSize="3"
                  fontFamily="monospace"
                >
                  3.7V 1200mAh
                </text>
                <text
                  x="364"
                  y="463"
                  textAnchor="middle"
                  fill="rgba(255,255,255,.08)"
                  fontSize="2.2"
                  fontFamily="monospace"
                >
                  Li-Po AB-BAT-01
                </text>
                {/* JST connector wires */}
                <line
                  x1="392"
                  y1="456"
                  x2="405"
                  y2="456"
                  stroke="rgba(220,50,50,.4)"
                  strokeWidth="1"
                />
                <line
                  x1="392"
                  y1="462"
                  x2="405"
                  y2="462"
                  stroke="rgba(30,30,30,.6)"
                  strokeWidth="1"
                />
                {/* JST connector */}
                <rect
                  x="405"
                  y="452"
                  width="8"
                  height="14"
                  rx="1"
                  fill="#e8e8e8"
                  stroke="rgba(160,160,160,.5)"
                  strokeWidth=".4"
                />
              </g>
            </EP>


          </svg>
        </motion.div>

        {/* ── Floating particles ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                x: [0, i % 2 === 0 ? 10 : -10, 0],
                opacity: [0.08, 0.3, 0.08],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{
                position: "absolute",
                width: `${1.5 + i * 0.25}px`,
                height: `${1.5 + i * 0.25}px`,
                borderRadius: "50%",
                background:
                  i % 2 === 0
                    ? "rgba(155,93,229,.5)"
                    : "rgba(34,211,238,.5)",
                boxShadow:
                  i % 2 === 0
                    ? "0 0 6px rgba(155,93,229,.3)"
                    : "0 0 6px rgba(34,211,238,.3)",
                top: `${6 + i * 7.5}%`,
                left: `${4 + i * 8}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
