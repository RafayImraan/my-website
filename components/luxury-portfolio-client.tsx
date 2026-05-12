"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RuntimeContent } from "@/lib/types";

type Props = {
  data: RuntimeContent;
};

type ZoneId = "lab" | "academy" | "forge" | "vault";
type DayMode = "day" | "night";

type Position = {
  x: number;
  y: number;
};

type SaveState = {
  dayMode: DayMode;
  foundTreasures: string[];
  emailUnlocked: boolean;
  visitedZones: ZoneId[];
  activeZone: ZoneId;
  introSkipped: boolean;
  audioEnabled: boolean;
  recruiterMode: boolean;
};

const SAVE_KEY = "rpg-portfolio-save-v1";

const zonePositions: Record<ZoneId, Position> = {
  lab: { x: 18, y: 32 },
  academy: { x: 72, y: 24 },
  forge: { x: 64, y: 70 },
  vault: { x: 20, y: 72 }
};

const zoneArt: Record<ZoneId, string> = {
  lab: "/rpg/zone-lab.svg",
  academy: "/rpg/zone-academy.svg",
  forge: "/rpg/zone-forge.svg",
  vault: "/rpg/zone-vault.svg"
};

const introPrompt = "Press any key to enter the world";

function useTypewriter(text: string, speed: number, active: boolean) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!active) {
      setValue("");
      return;
    }

    let index = 0;
    setValue("");

    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, active]);

  return value;
}

function formatNumber(value: number | null): string {
  return value === null ? "--" : new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value?: string) {
  if (!value) return "Recently updated";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Recently updated";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

function getProofLabel(project: RuntimeContent["projects"][number]) {
  if (project.live) return "Live Product";
  if (project.video) return "Video Walkthrough";
  if (project.github) return "Code Available";
  return "Portfolio Project";
}

function getProjectArt(slug: string) {
  if (slug === "reality-check") return "/rpg/project-reality-check.svg";
  if (slug === "medicore") return "/rpg/project-medicore.svg";
  if (slug === "veluxe-motors") return "/rpg/project-veluxe.svg";
  return "/rpg/project-crop-yield.svg";
}

function readSaveState(): SaveState | null {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SaveState;
  } catch {
    return null;
  }
}

function createAudioEngine() {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();

  const play = (notes: Array<{ freq: number; duration: number; delay?: number; type?: OscillatorType; gain?: number }>) => {
    const startAt = context.currentTime;
    notes.forEach((note) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = note.type ?? "square";
      oscillator.frequency.setValueAtTime(note.freq, startAt + (note.delay ?? 0));
      gain.gain.setValueAtTime(note.gain ?? 0.0001, startAt + (note.delay ?? 0));
      gain.gain.exponentialRampToValueAtTime(Math.max(note.gain ?? 0.04, 0.001), startAt + (note.delay ?? 0) + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + (note.delay ?? 0) + note.duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt + (note.delay ?? 0));
      oscillator.stop(startAt + (note.delay ?? 0) + note.duration + 0.02);
    });
  };

  return {
    resume: () => context.resume(),
    playWalk: () => play([{ freq: 160, duration: 0.08, gain: 0.03 }, { freq: 145, duration: 0.08, delay: 0.12, gain: 0.03 }]),
    playChest: () =>
      play([
        { freq: 440, duration: 0.08, gain: 0.04 },
        { freq: 660, duration: 0.08, delay: 0.09, gain: 0.04 },
        { freq: 880, duration: 0.12, delay: 0.18, gain: 0.05 }
      ]),
    playUnlock: () =>
      play([
        { freq: 330, duration: 0.1, gain: 0.04 },
        { freq: 494, duration: 0.1, delay: 0.12, gain: 0.05 },
        { freq: 659, duration: 0.16, delay: 0.24, gain: 0.05 }
      ]),
    playMove: () => play([{ freq: 280, duration: 0.08, gain: 0.03 }, { freq: 330, duration: 0.08, delay: 0.1, gain: 0.03 }]),
    playSelect: () => play([{ freq: 540, duration: 0.08, gain: 0.03 }]),
    playIntro: () =>
      play([
        { freq: 262, duration: 0.12, gain: 0.04 },
        { freq: 330, duration: 0.12, delay: 0.16, gain: 0.04 },
        { freq: 392, duration: 0.18, delay: 0.32, gain: 0.05 }
      ])
  };
}

export default function LuxuryPortfolioClient({ data }: Props) {
  const [liveData, setLiveData] = useState<RuntimeContent>(data);
  const [phase, setPhase] = useState<"loading" | "typing" | "ready" | "world">("loading");
  const [introWalker, setIntroWalker] = useState(-16);
  const [characterPosition, setCharacterPosition] = useState<Position>({ x: 48, y: 54 });
  const [walking, setWalking] = useState(false);
  const [activeZone, setActiveZone] = useState<ZoneId>("lab");
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [dayMode, setDayMode] = useState<DayMode>("day");
  const [foundTreasures, setFoundTreasures] = useState<string[]>([]);
  const [visitedZones, setVisitedZones] = useState<ZoneId[]>(["lab"]);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [toast, setToast] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [saveReady, setSaveReady] = useState(false);
  const audioRef = useRef<ReturnType<typeof createAudioEngine> | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function refreshProfile() {
      try {
        const response = await fetch("/api/profile", { cache: "no-store" });
        if (!response.ok) return;
        const latest = (await response.json()) as RuntimeContent;
        if (isMounted) setLiveData(latest);
      } catch {
        // keep UI stable when runtime refresh fails
      }
    }

    const interval = window.setInterval(refreshProfile, 60000);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    audioRef.current = createAudioEngine();
  }, []);

  useEffect(() => {
    const saved = readSaveState();
    if (saved) {
      setDayMode(saved.dayMode);
      setFoundTreasures(saved.foundTreasures);
      setEmailUnlocked(saved.emailUnlocked);
      setVisitedZones(saved.visitedZones.length ? saved.visitedZones : ["lab"]);
      setActiveZone(saved.activeZone);
      setAudioEnabled(saved.audioEnabled);
      setRecruiterMode(saved.recruiterMode);
      if (saved.introSkipped) {
        setPhase("world");
        setDialogueOpen(true);
      }
    }
    setSaveReady(true);
  }, []);

  useEffect(() => {
    if (!saveReady) return;
    const state: SaveState = {
      dayMode,
      foundTreasures,
      emailUnlocked,
      visitedZones,
      activeZone,
      introSkipped: phase === "world",
      audioEnabled,
      recruiterMode
    };
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }, [activeZone, audioEnabled, dayMode, emailUnlocked, foundTreasures, phase, recruiterMode, saveReady, visitedZones]);

  useEffect(() => {
    if (phase !== "loading") return;
    const bootTimer = window.setTimeout(() => {
      setIntroWalker(20);
      setPhase("typing");
      if (audioEnabled) {
        audioRef.current?.resume().then(() => audioRef.current?.playIntro()).catch(() => undefined);
      }
    }, 120);

    return () => window.clearTimeout(bootTimer);
  }, [audioEnabled, phase]);

  useEffect(() => {
    if (phase !== "typing") return;
    const readyTimer = window.setTimeout(() => setPhase("ready"), liveData.profile.name.length * 95 + 1600);
    return () => window.clearTimeout(readyTimer);
  }, [phase, liveData.profile.name.length]);

  useEffect(() => {
    if (recruiterMode) return;
    const cycle = window.setInterval(() => {
      setDayMode((current) => (current === "day" ? "night" : "day"));
    }, 12000);
    return () => window.clearInterval(cycle);
  }, [recruiterMode]);

  useEffect(() => {
    if (phase !== "ready") return;

    const enterWorld = () => {
      setPhase("world");
      setDialogueOpen(true);
      setCharacterPosition({ x: 48, y: 54 });
      if (audioEnabled) {
        audioRef.current?.resume().then(() => audioRef.current?.playSelect()).catch(() => undefined);
      }
    };

    const onKeyDown = () => enterWorld();
    const onPointerDown = () => enterWorld();

    window.addEventListener("keydown", onKeyDown, { once: true });
    window.addEventListener("pointerdown", onPointerDown, { once: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [audioEnabled, phase]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const featuredProjects = useMemo(
    () => liveData.projects.filter((project) => project.featured).slice(0, 4),
    [liveData.projects]
  );

  const selectedProject = useMemo(
    () => featuredProjects.find((project) => project.slug === selectedProjectSlug) ?? null,
    [featuredProjects, selectedProjectSlug]
  );

  const zoneDialogue = useMemo<Record<ZoneId, string>>(
    () => ({
      lab: `Welcome to The Lab. ${liveData.profile.name} has ${featuredProjects.length} featured builds ready for review, plus ${liveData.runtime.syncedRepos} synced repositories in the archive.`,
      academy: `This zone tracks the experience path: ${liveData.profile.experience[0]?.role ?? "Software Engineering"} and a progression built around consistent project output, competitions, and technical growth.`,
      forge: `The Forge stores the stack: ${liveData.profile.skills.technologies.slice(0, 5).join(", ")} and more, organized like an inventory instead of a flat list.`,
      vault: `The Vault protects direct contact. Unlock the email gate, open the links, and use the fast path if you already know you want to talk.`
    }),
    [featuredProjects.length, liveData]
  );

  const typedName = useTypewriter(liveData.profile.name.toUpperCase(), 90, phase === "typing" || phase === "ready");
  const typedPrompt = useTypewriter(introPrompt, 32, phase === "ready");
  const typedDialogue = useTypewriter(zoneDialogue[activeZone], 14, phase === "world" && dialogueOpen);

  const questProgress = Math.round(((visitedZones.length + foundTreasures.length + (emailUnlocked ? 1 : 0)) / 7) * 100);

  function pulse(kind: "walk" | "chest" | "unlock" | "move" | "select") {
    if (!audioEnabled) return;
    audioRef.current?.resume().catch(() => undefined).then(() => {
      if (kind === "walk") audioRef.current?.playWalk();
      if (kind === "chest") audioRef.current?.playChest();
      if (kind === "unlock") audioRef.current?.playUnlock();
      if (kind === "move") audioRef.current?.playMove();
      if (kind === "select") audioRef.current?.playSelect();
    });
  }

  function handleZoneSelect(zone: ZoneId) {
    if (walking) return;
    setDialogueOpen(false);
    setWalking(true);
    setCharacterPosition(zonePositions[zone]);
    pulse("move");
    const walkLoop = window.setInterval(() => pulse("walk"), 220);
    window.setTimeout(() => {
      window.clearInterval(walkLoop);
      setActiveZone(zone);
      setVisitedZones((current) => (current.includes(zone) ? current : [...current, zone]));
      setDialogueOpen(true);
      setWalking(false);
    }, 900);
  }

  function handleTreasureUnlock(key: string, message: string) {
    if (foundTreasures.includes(key)) {
      setToast("Chest already opened");
      return;
    }
    setFoundTreasures((current) => [...current, key]);
    setToast(message);
    pulse("chest");
  }

  function unlockEmailGate() {
    const normalized = riddleAnswer.trim().toLowerCase();
    if (normalized === "github" || normalized === "github repository" || normalized === "git") {
      setEmailUnlocked(true);
      setToast("The Vault opened");
      pulse("unlock");
      return;
    }
    setToast("That answer does not open the Vault");
  }

  function resetAdventure() {
    window.localStorage.removeItem(SAVE_KEY);
    setFoundTreasures([]);
    setVisitedZones(["lab"]);
    setEmailUnlocked(false);
    setActiveZone("lab");
    setCharacterPosition({ x: 48, y: 54 });
    setDialogueOpen(true);
    setDayMode("day");
    setRecruiterMode(false);
    setSelectedProjectSlug(null);
    setToast("Adventure reset");
  }

  const unlockedAchievements = [
    ...liveData.profile.achievements,
    ...foundTreasures.map((treasure) => {
      if (treasure === "chest-alpha") return "Hidden Chest: Extra achievement found in the forest";
      if (treasure === "chest-beta") return "Hidden Chest: Secret project explorer bonus unlocked";
      return "Hidden Chest: Discovery logged";
    })
  ];

  return (
    <main className={`pixel-rpg-shell ${dayMode} ${recruiterMode ? "recruiter-fast-mode" : ""}`}>
      <div className="rpg-screen-noise" />
      <div className="rpg-screen-glow" />

      {toast ? <div className="rpg-toast">{toast}</div> : null}

      {selectedProject ? (
        <div className="rpg-modal-backdrop" onClick={() => setSelectedProjectSlug(null)}>
          <div className="rpg-project-modal" onClick={(event) => event.stopPropagation()}>
            <img src={getProjectArt(selectedProject.slug)} alt={selectedProject.title} className="rpg-project-poster-large" />
            <div className="rpg-project-modal-copy">
              <p className="rpg-label">Project Detail</p>
              <h2>{selectedProject.title}</h2>
              <p className="rpg-dialogue-text">{selectedProject.summary.join(" ")}</p>
              <div className="rpg-mini-pills">
                <span>{selectedProject.stack}</span>
                {selectedProject.outcomes.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="rpg-card-links">
                {selectedProject.github ? (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                ) : null}
                {selectedProject.live ? (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                ) : null}
                {selectedProject.video ? (
                  <a href={selectedProject.video} target="_blank" rel="noreferrer">
                    Video Walkthrough
                  </a>
                ) : null}
                <Link href={liveData.caseStudies.some((study) => study.slug === selectedProject.slug) ? `/case-studies/${selectedProject.slug}` : "/case-studies"}>Case Study</Link>
              </div>
              <button className="rpg-modal-close" type="button" onClick={() => setSelectedProjectSlug(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {phase !== "world" ? (
        <section className="rpg-intro" data-reveal>
          <button className="rpg-skip-button" type="button" onClick={() => setPhase("world")}>
            Skip Intro
          </button>
          <div className="rpg-intro-stage">
            <div className="rpg-intro-ground" />
            <div className="rpg-pixel-character intro-character" style={{ left: `${introWalker}%` }}>
              <span className="pixel-head" />
              <span className="pixel-body" />
              <span className="pixel-shadow" />
            </div>
            <div className="rpg-title-panel">
              <p className="rpg-label">Loading World</p>
              <h1>{typedName || "\u00A0"}</h1>
              <p className="rpg-subtitle">{liveData.profile.tagline}</p>
              <p className="rpg-press-text">{phase === "ready" ? typedPrompt : "..."}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="rpg-world" data-reveal>
          <div className="rpg-world-topbar">
            <div>
              <p className="rpg-label">Pixel Portfolio</p>
              <h1>{liveData.profile.name}</h1>
            </div>
            <div className="rpg-top-actions">
              <a className="rpg-pill-link" href={liveData.profile.cvPath} target="_blank" rel="noreferrer">
                Download CV
              </a>
              <a className="rpg-pill-link" href={liveData.profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <button className="rpg-pill-link" type="button" onClick={() => setRecruiterMode((current) => !current)}>
                {recruiterMode ? "Adventure Mode" : "Recruiter Fast Mode"}
              </button>
              <button className="rpg-pill-link" type="button" onClick={() => setAudioEnabled((current) => !current)}>
                {audioEnabled ? "Audio On" : "Audio Off"}
              </button>
              <button className="rpg-pill-link" type="button" onClick={() => setDayMode((mode) => (mode === "day" ? "night" : "day"))}>
                {dayMode === "day" ? "Night Mode" : "Day Mode"}
              </button>
            </div>
          </div>

          <div className="rpg-fastbar">
            <div className="rpg-fastbar-card">
              <p className="rpg-label">Quest Log</p>
              <strong>{questProgress}% complete</strong>
              <span>{visitedZones.length}/4 zones explored</span>
            </div>
            <div className="rpg-fastbar-card">
              <p className="rpg-label">Unlocked</p>
              <strong>{foundTreasures.length} chests</strong>
              <span>{emailUnlocked ? "Vault opened" : "Vault locked"}</span>
            </div>
            <div className="rpg-fastbar-card">
              <p className="rpg-label">Fast Route</p>
              <strong>{liveData.profile.phone}</strong>
              <span>{liveData.profile.city}</span>
            </div>
            <div className="rpg-fastbar-card action-card">
              <button type="button" onClick={resetAdventure}>
                Reset Adventure
              </button>
            </div>
          </div>

          <div className="rpg-map-shell">
            <div className="rpg-map-frame" data-tilt>
              <div className="rpg-map">
                <div className="rpg-map-decor clouds" />
                <div className="rpg-map-decor water" />
                <div className="rpg-map-decor trees" />

                <button className={`rpg-zone zone-lab ${activeZone === "lab" ? "active" : ""}`} type="button" onClick={() => handleZoneSelect("lab")}>
                  <img src={zoneArt.lab} alt="" />
                  <span>The Lab</span>
                </button>
                <button className={`rpg-zone zone-academy ${activeZone === "academy" ? "active" : ""}`} type="button" onClick={() => handleZoneSelect("academy")}>
                  <img src={zoneArt.academy} alt="" />
                  <span>The Academy</span>
                </button>
                <button className={`rpg-zone zone-forge ${activeZone === "forge" ? "active" : ""}`} type="button" onClick={() => handleZoneSelect("forge")}>
                  <img src={zoneArt.forge} alt="" />
                  <span>The Forge</span>
                </button>
                <button className={`rpg-zone zone-vault ${activeZone === "vault" ? "active" : ""}`} type="button" onClick={() => handleZoneSelect("vault")}>
                  <img src={zoneArt.vault} alt="" />
                  <span>The Vault</span>
                </button>

                <button className="rpg-chest chest-alpha" type="button" onClick={() => handleTreasureUnlock("chest-alpha", "Secret chest opened: extra achievement discovered")}>
                  Chest
                </button>
                <button className="rpg-chest chest-beta" type="button" onClick={() => handleTreasureUnlock("chest-beta", "Secret chest opened: hidden bonus found")}>
                  Chest
                </button>

                <div
                  className={`rpg-pixel-character world-character ${walking ? "walking" : "idle"}`}
                  style={{
                    left: `${characterPosition.x}%`,
                    top: `${characterPosition.y}%`
                  }}
                >
                  <span className="pixel-head" />
                  <span className="pixel-body" />
                  <span className="pixel-shadow" />
                </div>
              </div>
            </div>

            <div className="rpg-map-sidebar">
              <div className="rpg-stat-card" data-tilt>
                <p className="rpg-card-label">Map Stats</p>
                <div className="rpg-stat-grid">
                  <article>
                    <strong>{formatNumber(liveData.runtime.githubFollowers)}</strong>
                    <span>Followers</span>
                  </article>
                  <article>
                    <strong>{formatNumber(liveData.runtime.githubRepos)}</strong>
                    <span>Repos</span>
                  </article>
                  <article>
                    <strong>{formatNumber(liveData.runtime.totalStars)}</strong>
                    <span>Stars</span>
                  </article>
                </div>
                <p className="rpg-meta-line">Profile updated: {liveData.runtime.generatedLabel}</p>
              </div>

              <div className="rpg-stat-card" data-tilt>
                <p className="rpg-card-label">Quick Travel</p>
                <div className="rpg-travel-list">
                  <button type="button" onClick={() => handleZoneSelect("lab")}>
                    Projects
                  </button>
                  <button type="button" onClick={() => handleZoneSelect("academy")}>
                    Education
                  </button>
                  <button type="button" onClick={() => handleZoneSelect("forge")}>
                    Skills
                  </button>
                  <button type="button" onClick={() => handleZoneSelect("vault")}>
                    Contact
                  </button>
                </div>
              </div>

              <div className="rpg-stat-card" data-tilt>
                <p className="rpg-card-label">Adventure Save</p>
                <div className="rpg-save-list">
                  <span>{saveReady ? "Auto-save active" : "Loading save"}</span>
                  <span>{audioEnabled ? "Sound enabled" : "Sound muted"}</span>
                  <span>{recruiterMode ? "Fast mode enabled" : "World mode enabled"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rpg-dialogue-shell">
            <div className="rpg-dialogue-box" data-reveal>
              <div className="rpg-dialogue-header">
                <div>
                  <p className="rpg-label">Now Exploring</p>
                  <h2>
                    {activeZone === "lab" && "The Lab"}
                    {activeZone === "academy" && "The Academy"}
                    {activeZone === "forge" && "The Forge"}
                    {activeZone === "vault" && "The Vault"}
                  </h2>
                </div>
                <p className="rpg-dialogue-hint">{walking ? "Walking..." : "Use map zones to explore"}</p>
              </div>
              <p className="rpg-dialogue-text">{typedDialogue}</p>
            </div>

            <div className="rpg-content-box" data-reveal>
              {activeZone === "lab" && (
                <div className="rpg-content-area">
                  <div className="rpg-section-head">
                    <p className="rpg-label">Quest Board</p>
                    <h3>Featured Projects</h3>
                  </div>
                  <div className="rpg-quest-grid">
                    {featuredProjects.map((project) => (
                      <article key={project.slug} className="rpg-quest-card" data-tilt>
                        <img src={getProjectArt(project.slug)} alt={project.title} className="rpg-project-poster" />
                        <p className="rpg-mini-tag">{getProofLabel(project)}</p>
                        <h4>{project.title}</h4>
                        <p>{project.summary[0]}</p>
                        <div className="rpg-mini-pills">
                          <span>{project.stack}</span>
                          {project.outcomes.slice(0, 1).map((item) => (
                            <span key={item}>{item}</span>
                          ))}
                        </div>
                        <div className="rpg-card-links">
                          <button type="button" onClick={() => setSelectedProjectSlug(project.slug)}>
                            Open Quest
                          </button>
                          <span>{formatDate(project.updatedAt)}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {activeZone === "academy" && (
                <div className="rpg-content-area">
                  <div className="rpg-section-head">
                    <p className="rpg-label">Level Path</p>
                    <h3>Education and Achievements</h3>
                  </div>
                  <div className="rpg-timeline">
                    {liveData.profile.experience.map((item, index) => (
                      <article key={`${item.role}-${item.period}`} className="rpg-timeline-card" data-tilt>
                        <span className="rpg-level-pill">LVL {index + 1}</span>
                        <h4>{item.role}</h4>
                        <p>{item.org}</p>
                        <p>{item.period}</p>
                      </article>
                    ))}
                  </div>
                  <div className="rpg-achievement-list">
                    {unlockedAchievements.map((item) => (
                      <div key={item} className="rpg-achievement-item">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeZone === "forge" && (
                <div className="rpg-content-area">
                  <div className="rpg-section-head">
                    <p className="rpg-label">Inventory</p>
                    <h3>Skills, Tools, and Languages</h3>
                  </div>
                  <div className="rpg-inventory-grid">
                    {liveData.profile.skills.technologies.map((item) => (
                      <article key={item} className="rpg-item-card" data-tilt>
                        {item}
                      </article>
                    ))}
                    {liveData.profile.skills.databases.map((item) => (
                      <article key={item} className="rpg-item-card item-db" data-tilt>
                        {item}
                      </article>
                    ))}
                    {liveData.profile.skills.dashboards.map((item) => (
                      <article key={item} className="rpg-item-card item-analytics" data-tilt>
                        {item}
                      </article>
                    ))}
                    {liveData.profile.languages.map((item) => (
                      <article key={item} className="rpg-item-card item-language" data-tilt>
                        {item}
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {activeZone === "vault" && (
                <div className="rpg-content-area">
                  <div className="rpg-section-head">
                    <p className="rpg-label">Contact Gate</p>
                    <h3>Unlock the Vault</h3>
                  </div>
                  <div className="rpg-vault-grid">
                    <div className="rpg-riddle-card" data-tilt>
                      <p className="rpg-riddle-text">Riddle: I hold your code, your commits, and your public proof. What am I?</p>
                      <div className="rpg-riddle-row">
                        <input value={riddleAnswer} onChange={(event) => setRiddleAnswer(event.target.value)} placeholder="Type your answer" />
                        <button type="button" onClick={unlockEmailGate}>
                          Unlock
                        </button>
                      </div>
                      <p className="rpg-meta-line">{emailUnlocked ? `Vault opened: ${liveData.profile.email}` : "Hint: where your repositories live."}</p>
                    </div>
                    <div className="rpg-link-card" data-tilt>
                      <a href={liveData.profile.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                      <a href={liveData.profile.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                      {emailUnlocked ? <a href={`mailto:${liveData.profile.email}`}>Email</a> : null}
                      <a href={liveData.profile.cvPath} target="_blank" rel="noreferrer">
                        CV
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rpg-bottom-strip" data-reveal>
            <div className="rpg-bottom-card">
              <p className="rpg-label">Side Quests</p>
              <h3>Latest Writing</h3>
              <div className="rpg-side-list">
                {liveData.blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rpg-bottom-card">
              <p className="rpg-label">Companions</p>
              <h3>Testimonials</h3>
              <div className="rpg-side-list">
                {liveData.testimonials.map((item) => (
                  <span key={item.name}>
                    {item.name}: {item.quote}
                  </span>
                ))}
              </div>
            </div>
            <div className="rpg-bottom-card">
              <p className="rpg-label">Recruiter Exit</p>
              <h3>Fast Route</h3>
              <div className="rpg-side-list">
                <Link href="/recruiters">Recruiter Overview</Link>
                <span>Phone: {liveData.profile.phone}</span>
                <span>Location: {liveData.profile.city}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
