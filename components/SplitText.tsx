"use client";

import { motion } from "framer-motion";

export default function SplitText({ text, as = "h2", className = "" }: { text: string; as?: "h1" | "h2" | "h3" | "span"; className?: string }) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%", rotateX: -60, opacity: 0 }}
            whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{ perspective: "600px" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
