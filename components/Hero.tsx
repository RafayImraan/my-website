"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useSpring } from "framer-motion";

const roles = [
  "AI/ML Developer",
  "Applied AI Engineer",
  "Machine Learning Developer",
  "Full-Stack AI Builder",
];

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((p) => p + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((p) => p - 1), 30);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setIndex((p) => (p + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, words]);

  return (
    <span className="text-gradient">
      {words[index].substring(0, charIndex)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="ml-0.5 inline-block h-[1em] w-[2px] bg-accent"
      />
    </span>
  );
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 8;
    const dy = (e.clientY - cy) / 8;
    x.set(dx);
    y.set(dy);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const nameLetters = "Abdul Rafay Imran".split("");

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const blobs = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        size: 300 + i * 150,
        xStart: 20 + i * 30,
        yStart: 30 + i * 20,
        xDrift: 15 + i * 5,
        yDrift: 10 + i * 8,
        duration: 12 + i * 4,
      })),
    []
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0,229,255,0.08) 0%, transparent 45%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              background:
                "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
              left: `${blob.xStart}%`,
              top: `${blob.yStart}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, blob.xDrift, -blob.xDrift / 2, 0],
              y: [0, blob.yDrift, -blob.yDrift / 2, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-accent/50" />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            AI/ML-Focused Software Engineering Student
          </span>
          <span className="h-px w-8 bg-accent/50" />
        </div>

        <h1 className="whitespace-nowrap font-display text-[clamp(2rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight text-text-primary">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{ perspective: "800px" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-4 font-body text-lg text-text-muted md:text-xl"
        >
          I build applied AI products with Python, FastAPI, NLP, machine learning, and full-stack deployment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-3 font-mono text-sm text-text-muted"
        >
          <Typewriter words={roles} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="#things-ive-shipped"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-[#050505] transition-all hover:bg-accent/90 hover:shadow-[0_0_40px_rgba(0,229,255,0.4)]"
          >
            See My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MagneticButton>
          <MagneticButton
            href="#lets-build"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#1a1a1a] px-6 font-medium text-text-primary transition-all hover:border-accent/50 hover:text-accent"
          >
            Get in Touch
          </MagneticButton>
          <MagneticButton
            href="/Abdul-Rafay-Imran-CV.pdf"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[#1a1a1a] px-6 font-medium text-text-primary transition-all hover:border-accent/50 hover:text-accent"
          >
            Download CV
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
