"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { ProjectData } from "./ProjectCard";
import SplitText from "./SplitText";

const featured: ProjectData[] = [
  {
    title: "Reality Check",
    description:
      "Explainable NLP platform detecting fear, urgency, authority abuse, and polarization with transformer analysis, confidence scoring, and evidence trails.",
    stack: ["React", "FastAPI", "Transformers", "NLP"],
    github: "https://github.com/RafayImraan/realitycheck",
    video: "https://youtu.be/Zy2hAV6sjCk?si=73lIRE_TJgzqi48j",
    featured: true,
  },
  {
    title: "FrostByte",
    description:
      "Multi-layer phishing and malicious URL detection with a Chrome extension, ML models, and live monitoring dashboard.",
    stack: ["Next.js", "FastAPI", "Chrome Extension", "Machine Learning"],
    github: "https://github.com/RafayImraan/frostbyte",
    featured: true,
  },
  {
    title: "GridMind AI",
    description:
      "Hybrid ML engine predicting utility failures across power, water, traffic, and transformer grids with cascading-failure simulation.",
    stack: ["FastAPI", "scikit-learn", "React"],
    github: "https://github.com/RafayImraan/GridMind",
    video: "https://youtu.be/KtwrvgjbZg0?si=N0qcjkZMCOo-gHNv",
    featured: true,
  },
];

const medium: ProjectData[] = [
  {
    title: "MedIntel-AI",
    description:
      "Clinical decision intelligence engine ingesting unstructured medical reports, extracting biomarkers, predicting disease risk via Random Forest, and explaining results with SHAP.",
    stack: ["FastAPI", "scikit-learn", "SHAP", "Transformers", "React"],
    github: "https://github.com/RafayImraan/MedIntel-AI",
    medium: true,
  },
  {
    title: "MedAssist",
    description:
      "Offline-capable clinical triage assistant using MedGemma to evaluate symptoms, vitals, and history with Docker deployment options.",
    stack: ["React", "FastAPI", "MedGemma", "Docker"],
    github: "https://github.com/RafayImraan/medassist",
    video: "https://youtu.be/lUVYx0slGJY?si=XJuEOBPiCEffZIzH",
    medium: true,
  },
  {
    title: "TrustNet AI",
    description:
      "AI-assisted onboarding, payout flows, and risk evaluation with Hedera audit logging and multi-tenant RBAC.",
    stack: ["React", "FastAPI", "Node.js", "Hedera"],
    github: "https://github.com/RafayImraan/trustnet",
    medium: true,
  },
  {
    title: "Skill-to-Job Gap Visualizer",
    description:
      "AI-powered platform mapping user skills against job market demands via NLP, generating personalized learning roadmaps with radar charts and heatmaps.",
    stack: ["Next.js", "FastAPI", "spaCy", "Transformers", "Recharts"],
    github: "https://github.com/RafayImraan/skill-to-job-gap-visualizer",
    medium: true,
  },
  {
    title: "Crop Yield Prediction",
    description:
      "ML models predicting crop yields using soil, climate, and historical data with feature engineering and explainability.",
    stack: ["Python", "scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/RafayImraan/crop-yeild-prediction-in-pakistan",
    medium: true,
  },
  {
    title: "Medicore",
    description:
      "Full MERN healthcare platform: admin, doctor, patient roles, telehealth, billing, Redis caching, and analytics.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Redis"],
    github: "https://github.com/RafayImraan/medicore",
    medium: true,
  },
];

const small: ProjectData[] = [
  {
    title: "ShadowPay",
    description:
      "ZK-proof payment flows on Starknet L2 with Pedersen commitments and nullifier-tree double-spend prevention.",
    stack: ["Cairo", "Starknet", "Next.js", "ZK-proofs"],
    github: "https://github.com/RafayImraan/-ShadowPay",
  },
  {
    title: "ARIA: City of Silence",
    description:
      "Interactive narrative simulation with branching flows, live audience voting, configurable voting windows, and dynamic state updates.",
    stack: ["React", "Vite", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/RafayImraan/ARIA-City-of-Silence",
  },
  {
    title: "BSwap",
    description:
      "Trustless Bitcoin to Hedera swaps using SHA-256 HTLCs with non-custodial claim, refund, and monitoring flows.",
    stack: ["Next.js", "Bitcoin Testnet", "Hedera", "HTLC"],
    github: "https://github.com/RafayImraan/BSwap",
  },
  {
    title: "GitHub Time Machine",
    description:
      "3D interactive visualization of GitHub contribution history using React Three Fiber, Zustand state management, and the GitHub API.",
    stack: ["React", "Three.js", "Framer Motion", "Zustand"],
    github: "https://github.com/RafayImraan/github-time-machine",
  },
  {
    title: "GBF",
    description:
      "Fractionalizes institutional green bonds into tokenized retail units on Hedera with verifiable impact traceability.",
    stack: ["Hedera", "React", "Node.js"],
    github: "https://github.com/RafayImraan/GBF",
  },
  {
    title: "GadgetWise",
    description:
      "Conversion-focused e-commerce storefront with dynamic product management, admin panel, and switchable JSON/MongoDB backend.",
    stack: ["Next.js", "MongoDB", "React", "Node.js"],
    github: "https://github.com/RafayImraan/gadgetwise",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section id="things-ive-shipped" className="relative px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Things I&apos;ve Shipped
          </span>
          <SplitText
            text="Applied AI and ML Projects"
            as="h2"
            className="section-heading mt-2 text-text-primary"
          />
        </motion.div>
      </div>

      <div ref={sectionRef} className="relative mt-12 overflow-hidden">
        <div className="hidden md:block">
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-5 pl-[calc((100vw-1152px)/2)]">
            {featured.map((project, i) => (
              <div key={project.title} className="w-[400px] shrink-0">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent" />
        </div>

        <div className="grid gap-5 md:hidden">
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {medium.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={featured.length + i} />
            ))}
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {small.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={featured.length + medium.length + i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
