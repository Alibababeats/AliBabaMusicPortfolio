"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
const FancyHeadphones3D = dynamic(() => import("./FancyHeadphones3D"), { ssr: false });

/*
   • Scroll pulls the headphones DOWN while exploding apart
   • Stops right before the beats section(height: 220vh)
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
          <FancyHeadphones3D scrollSpring={s} />
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
