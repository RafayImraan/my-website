"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    icon: GraduationCap,
    title: "BS Software Engineering",
    institution: "University of Karachi",
    period: "2023 \u2013 May 2027",
  },
  {
    icon: GraduationCap,
    title: "Diploma in Software Engineering",
    institution: "Aptech Learning",
    period: "2022 \u2013 2026",
  },
];

const certifications = [
  "Intermediate Machine Learning \u2014 Kaggle",
  "Machine Learning Explainability \u2014 Kaggle",
  "Data Visualization \u2014 Kaggle",
];

export default function Education() {
  return (
    <section id="education" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Education
          </span>
          <h2 className="section-heading mt-2 text-text-primary">
            Built on a <span className="text-gradient">Strong Foundation</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-6 font-display text-lg font-bold text-text-primary">
              Formal Education
            </h3>
            <div className="space-y-0">
              {education.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative border-l border-[#1a1a1a] pl-6 pb-8 last:pb-0"
                >
                  <div className="absolute left-[-9px] top-0 flex h-4 w-4 items-center justify-center rounded-full border border-[#1a1a1a] bg-[#050505]">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>
                  <item.icon className="mb-2 h-4 w-4 text-accent" />
                  <h4 className="font-display text-base font-bold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-body text-sm text-text-muted">
                    {item.institution}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-text-muted/60">
                    {item.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-lg font-bold text-text-primary">
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-[#1a1a1a] bg-[#0f0f0f] p-4"
                >
                  <Award className="h-4 w-4 shrink-0 text-[#c8a96e]" />
                  <span className="font-body text-sm text-text-muted">{cert}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
