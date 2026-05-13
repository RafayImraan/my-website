"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Palette,
  Server,
  Database,
  Container,
  Brain,
  Link2,
} from "lucide-react";
import SplitText from "./SplitText";

const skillGroups: {
  name: string;
  icon: React.ElementType;
  skills: string[];
}[] = [
  {
    name: "Languages",
    icon: Code2,
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "Solidity", "Cairo", "PHP"],
  },
  {
    name: "Frontend",
    icon: Palette,
    skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3"],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      "Node.js", "Express.js", "FastAPI", "REST APIs",
      "WebSockets", "JWT", "OAuth", "RBAC", "Microservices",
    ],
  },
  {
    name: "Databases",
    icon: Database,
    skills: ["MongoDB", "MySQL", "Redis"],
  },
  {
    name: "DevOps",
    icon: Container,
    skills: ["Docker", "Git", "GitHub", "CI/CD", "Containerization"],
  },
  {
    name: "AI / ML",
    icon: Brain,
    skills: [
      "scikit-learn", "XGBoost", "Transformers",
      "NLP", "Pandas", "NumPy", "Explainable AI",
    ],
  },
  {
    name: "Blockchain / Web3",
    icon: Link2,
    skills: [
      "Hedera", "Starknet", "EVM", "ZK-proofs",
      "HTLCs", "Atomic Swaps", "DeFi", "Smart Contracts",
    ],
  },
];

const marqueeItems = [
  ...skillGroups.flatMap((g) => g.skills),
  ...skillGroups.flatMap((g) => g.skills),
];

export default function Skills() {
  return (
    <section id="what-i-build-with" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            What I Build With
          </span>
          <SplitText
            text="The Full Stack Arsenal"
            as="h2"
            className="section-heading mt-2 text-text-primary"
          />
        </motion.div>

        <TechMarquee />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: gi * 0.08 }}
                className="rounded-2xl border border-[#1a1a1a] bg-[#0f0f0f] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {group.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.03 }}
                      className="rounded-full border border-[#1a1a1a] px-3 py-1.5 font-mono text-xs text-text-muted transition-all hover:border-accent/30 hover:text-accent"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mt-8 overflow-hidden">
      <div className="relative flex">
        <motion.div
          className="flex shrink-0 gap-3"
          initial={{ x: "0%" }}
          animate={isInView ? { x: "-50%" } : { x: "0%" }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-[#1a1a1a] px-3 py-1.5 font-mono text-xs text-text-muted"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
