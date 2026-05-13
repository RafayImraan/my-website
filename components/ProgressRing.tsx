"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function ProgressRing({
  value,
  max = 10,
  label,
  icon: Icon,
  suffix = "",
}: {
  value: number;
  max?: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const progress = useMotionValue(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(progress, (v) => circumference * (1 - v));

  useEffect(() => {
    if (isInView) {
      const pct = Math.min(value / max, 1);
      const pControls = animate(progress, pct, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      const cControls = animate(count, value, { duration: 2, ease: [0.22, 1, 0.36, 1] });
      return () => {
        pControls.stop();
        cControls.stop();
      };
    }
  }, [isInView, progress, count, value, max]);

  return (
    <div ref={ref} className="relative flex flex-col items-center rounded-2xl border border-[#1a1a1a] bg-[#0f0f0f] p-6">
      <svg width="120" height="120" viewBox="0 0 120 120" className="mb-3">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="6" />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#cyanGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset, rotate: "-90deg" }}
          transform="rotate(-90 60 60)"
        />
        <defs>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00a3ff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Icon className="mb-1 h-4 w-4 text-accent" />
        <motion.span className="font-display text-2xl font-bold text-text-primary">
          <motion.span>{rounded}</motion.span>{suffix}
        </motion.span>
      </div>
      <span className="font-mono text-[11px] text-text-muted">{label}</span>
    </div>
  );
}
