"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, GitFork, Play } from "lucide-react";

export type ProjectData = {
  title: string;
  description: string;
  stack: string[];
  github: string;
  video?: string;
  featured?: boolean;
  medium?: boolean;
};

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const { title, description, stack, github, video, featured, medium } = project;
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [6, -6]);
  const rotateY = useTransform(x, [0, 1], [-6, 6]);

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => { x.set(0.5); y.set(0.5); };

  const cols = featured ? "md:col-span-2" : "md:col-span-1";
  const rows = featured ? "md:row-span-2" : "";

  return (
    <motion.a
      ref={ref}
      href={video ?? github}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        perspective: "1200px",
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      className={`group relative ${cols} ${rows} flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0f0f0f] p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_60px_rgba(0,229,255,0.1)]`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,229,255,0.04), transparent 40%)",
          }}
        />
      </div>

      {featured && (
        <span className="mb-3 inline-block w-fit rounded-full border border-[#c8a96e]/30 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-[#c8a96e]">
          Featured Project
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <h3
          className={`font-display font-bold leading-tight text-text-primary transition-colors group-hover:text-accent ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {title}
        </h3>
        <div className="mt-1 flex shrink-0 gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a1a1a] text-text-muted opacity-0 transition-all duration-300 group-hover:opacity-100">
            {video ? <Play size={14} /> : <GitFork size={14} />}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1a1a1a] text-text-muted opacity-0 transition-all duration-300 group-hover:opacity-100">
            <ExternalLink size={14} />
          </span>
        </div>
      </div>

      <p
        className={`mt-3 flex-1 font-body leading-relaxed text-text-muted ${
          featured ? "text-base" : "text-sm"
        }`}
      >
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-[#1a1a1a] px-2.5 py-1 font-mono text-[11px] text-text-muted transition-colors group-hover:border-accent/20 group-hover:text-accent/80"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
