"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, GitFork, ArrowUpRight, Send, Loader2 } from "lucide-react";

const links = [
  { icon: Mail, label: "aburafayyy@gmail.com", href: "mailto:aburafayyy@gmail.com" },
  { icon: Globe, label: "linkedin.com/in/aburafayyy", href: "https://linkedin.com/in/aburafayyy" },
  { icon: GitFork, label: "github.com/RafayImraan", href: "https://github.com/RafayImraan" },
];

function FloatingInput({ label, id, type = "text", multiline = false }: { label: string; id: string; type?: string; multiline?: boolean }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={multiline ? undefined : type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={multiline ? 4 : undefined}
        className={`peer w-full rounded-xl border bg-transparent px-4 pt-6 pb-2 font-body text-sm text-text-primary outline-none transition-all ${
          focused ? "border-accent/50 shadow-[0_0_20px_rgba(0,229,255,0.05)]" : "border-[#1a1a1a]"
        } ${multiline ? "resize-none" : ""}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 transition-all ${
          active ? "top-2 text-[10px] text-accent" : "top-1/2 -translate-y-1/2 text-sm text-text-muted"
        } ${multiline && active ? "top-2 translate-y-0" : ""} ${multiline && !active ? "top-4 translate-y-0" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 4,
      })),
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 3000);
      }
    } catch {
      /* silently fail */
    }
    setSending(false);
  };

  return (
    <section id="lets-build" className="relative overflow-hidden px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-accent"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Let&apos;s Build Something
          </span>
          <h2 className="section-heading mt-2 text-text-primary">
            Ready to <span className="text-gradient">Ship?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-text-muted md:text-lg">
            I&apos;m actively looking for engineering roles where I can build complex,
            real-world systems across the full stack. If that sounds like your team,
            let&apos;s talk.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-12 max-w-lg space-y-4"
        >
          <FloatingInput label="Your Name" id="name" />
          <FloatingInput label="Your Email" id="email" type="email" />
          <FloatingInput label="Your Message" id="message" multiline />

          <motion.button
            type="submit"
            disabled={sending || sent}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-full font-medium transition-all ${
              sent
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-accent text-[#050505] hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]"
            }`}
          >
            {sending ? (
              <><Loader2 size={16} className="animate-spin" /> Sending...</>
            ) : sent ? (
              <><Send size={16} /> Sent!</>
            ) : (
              <><Send size={16} /> Send Message</>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-[#1a1a1a] px-5 font-body text-sm text-text-muted transition-all hover:border-accent/30 hover:text-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.05)]"
            >
              <link.icon size={16} />
              <span>{link.label}</span>
              <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
