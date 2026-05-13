"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "who-i-am", label: "Who I Am" },
  { id: "what-i-build-with", label: "What I Build With" },
  { id: "things-ive-shipped", label: "Things I've Shipped" },
  { id: "education", label: "Education" },
  { id: "lets-build", label: "Let's Build" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);

    const observers: IntersectionObserver[] = [];

    const observeSection = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    };

    sections.forEach((s) => observeSection(s.id));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/80 frosted border-b border-[#1a1a1a]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <button
          onClick={() => scrollTo("who-i-am")}
          className="font-display text-lg font-bold tracking-tight text-text-primary"
        >
          <span className="text-accent">&lt;</span>
          <span>Rafay</span>
          <span className="text-accent">/&gt;</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === s.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-text-primary md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex flex-col bg-[#050505] px-6 py-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-text-primary">
                <span className="text-accent">&lt;</span>Rafay<span className="text-accent">/&gt;</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={24} className="text-text-primary" />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-4">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(s.id)}
                  className={`text-left text-2xl font-bold transition-colors ${
                    active === s.id ? "text-accent" : "text-text-muted"
                  }`}
                >
                  {s.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
