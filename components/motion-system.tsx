"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function bindMagneticEffects() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
  const disposers: Array<() => void> = [];

  elements.forEach((element) => {
    const strength = Number(element.dataset.magneticStrength ?? "12");

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const moveX = (x / rect.width) * strength;
      const moveY = (y / rect.height) * strength;
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    };

    const onLeave = () => {
      element.style.transform = "translate3d(0, 0, 0)";
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    disposers.push(() => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => disposers.forEach((dispose) => dispose());
}

function bindRevealObserver() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  if (elements.length === 0) return () => {};

  elements.forEach((element, index) => {
    element.classList.add("reveal-init");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}

function bindParallaxCursor() {
  const onMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--mouse-x", `${x}`);
    document.documentElement.style.setProperty("--mouse-y", `${y}`);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  return () => window.removeEventListener("mousemove", onMove);
}

function bindSurfaceTilt() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
  const disposers: Array<() => void> = [];

  elements.forEach((element) => {
    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 8;
      element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--glow-x", `${(px * 100).toFixed(2)}%`);
      element.style.setProperty("--glow-y", `${(py * 100).toFixed(2)}%`);
    };

    const onLeave = () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "50%");
    };

    element.addEventListener("mousemove", onMove);
    element.addEventListener("mouseleave", onLeave);
    disposers.push(() => {
      element.removeEventListener("mousemove", onMove);
      element.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => disposers.forEach((dispose) => dispose());
}

function bindScrollProgress() {
  const update = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight <= 0 ? 0 : window.scrollY / scrollHeight;
    document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("motion-ready");
    const cleanupMagnetic = bindMagneticEffects();
    const cleanupReveal = bindRevealObserver();
    const cleanupParallax = bindParallaxCursor();
    const cleanupTilt = bindSurfaceTilt();
    const cleanupScroll = bindScrollProgress();

    return () => {
      document.body.classList.remove("motion-ready");
      cleanupMagnetic();
      cleanupReveal();
      cleanupParallax();
      cleanupTilt();
      cleanupScroll();
    };
  }, [pathname]);

  return null;
}
