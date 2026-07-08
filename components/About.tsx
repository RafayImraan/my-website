"use client";

import { motion } from "framer-motion";
import ProgressRing from "./ProgressRing";
import { Code2, Layers, Brain, Cpu } from "lucide-react";
import SplitText from "./SplitText";

const stats = [
  { icon: Code2, value: 17, max: 17, label: "Projects Shipped" },
  { icon: Brain, value: 7, max: 10, label: "AI/ML Projects" },
  { icon: Layers, value: 4, max: 5, label: "Applied Domains" },
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
            text="Applied AI Backed by Full-Stack Engineering"
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
              I&apos;m a Software Engineering student from Karachi focused on AI/ML
              roles, applied machine learning, and full-stack AI products. My work
              spans Python, FastAPI, scikit-learn, transformers, NLP, MedGemma,
              and deployable React/Next.js interfaces.
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-text-muted md:text-lg">
              I build systems where models are useful inside real workflows: phishing
              detection, clinical triage, manipulation-risk scoring, infrastructure
              failure prediction, crop-yield forecasting, and skill-gap analysis. The
              focus is not only training models, but making predictions explainable,
              usable, and reviewable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Python \u00B7 FastAPI", "ML \u00B7 NLP \u00B7 Transformers", "Explainable AI \u00B7 Deployed Products"].map(
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
