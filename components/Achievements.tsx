"use client";

import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "First Prize \u2014 Speed Programming Competition",
    institution: "Aptech Learning",
    year: "2023",
    color: "#c8a96e",
  },
  {
    icon: Medal,
    title: "Second Prize \u2014 Web Designing Competition",
    institution: "Aptech Learning",
    year: "2023",
    color: "#a0a0a0",
  },
];

export default function Achievements() {
  return (
    <section className="relative px-4 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Achievements
          </span>
          <h2 className="section-heading mt-2 text-text-primary">
            Proven <span className="text-gradient">Excellence</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex items-start gap-4 rounded-2xl border border-[#1a1a1a] bg-[#0f0f0f] p-6"
            >
              <a.icon
                className="mt-0.5 h-6 w-6 shrink-0"
                style={{ color: a.color }}
              />
              <div>
                <h3 className="font-display text-base font-bold text-text-primary">
                  {a.title}
                </h3>
                <p className="mt-1 font-body text-sm text-text-muted">
                  {a.institution}
                </p>
                <span className="mt-1 inline-block font-mono text-xs text-text-muted/60">
                  {a.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
