"use client";

import { motion } from "framer-motion";
import ProgressRing from "./ProgressRing";
import { Code2, Layers, Blocks, Cpu } from "lucide-react";
import SplitText from "./SplitText";

const stats = [
  { icon: Code2, value: 16, max: 16, label: "Projects Shipped" },
  { icon: Layers, value: 4, max: 5, label: "Domains Mastered" },
  { icon: Blocks, value: 2, max: 3, label: "Blockchains Built On" },
  { icon: Cpu, value: 3, max: 5, label: "AI Frameworks" },
];

export default function About() {
  return (
    <section id="who-i-am" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Who I Am
          </span>
          <SplitText
            text="Engineering the Full Stack of Tomorrow"
            as="h2"
            className="section-heading mt-2 text-text-primary"
          />
        </motion.div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-body text-base leading-relaxed text-text-muted md:text-lg">
              I&apos;m a software engineer from Karachi shipping real software across the full stack{" "}
              &mdash; ZK-proof protocols on Starknet, FastAPI backends, React frontends, and ML systems
              that explain their decisions. I don&apos;t follow tutorials. I build products.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-text-muted md:text-lg">
              From trustless cross-chain atomic swaps to AI that audits its own bias &mdash; every project
              I ship solves a real problem with production-grade engineering. No toy repos. No
              abandoned side projects.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Backend \u00B7 Full-Stack", "Web3 \u00B7 Smart Contracts", "AI/ML \u00B7 Explainable AI"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#1a1a1a] px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <ProgressRing
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                max={stat.max}
                label={stat.label}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
