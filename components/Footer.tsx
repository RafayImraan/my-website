"use client";

import { GitFork, Globe, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a1a] px-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold text-text-primary">
            <span className="text-accent">&lt;</span>Rafay<span className="text-accent">/&gt;</span>
          </span>
          <span className="font-mono text-xs text-text-muted/60">&copy; {year}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/RafayImraan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <GitFork size={16} />
          </a>
          <a
            href="https://linkedin.com/in/aburafayyy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <Globe size={16} />
          </a>
          <a
            href="mailto:aburafayyy@gmail.com"
            aria-label="Email"
            className="text-text-muted transition-colors hover:text-accent"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="font-mono text-xs text-text-muted/60">
          Built with Next.js, Tailwind CSS, Framer Motion
        </p>
      </div>
    </footer>
  );
}
