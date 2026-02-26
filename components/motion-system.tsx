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
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
  targets.forEach((target) => target.classList.add("reveal-init"));

  if (typeof IntersectionObserver === "undefined") {
    targets.forEach((target) => target.classList.add("is-visible"));
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
  );

  targets.forEach((target) => observer.observe(target));
  const fallback = window.setTimeout(() => {
    targets.forEach((target) => target.classList.add("is-visible"));
  }, 1400);

  return () => {
    observer.disconnect();
    window.clearTimeout(fallback);
  };
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

export default function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("motion-ready");
    const cleanupMagnetic = bindMagneticEffects();
    const cleanupReveal = bindRevealObserver();
    const cleanupParallax = bindParallaxCursor();
    return () => {
      document.body.classList.remove("motion-ready");
      cleanupMagnetic();
      cleanupReveal();
      cleanupParallax();
    };
  }, [pathname]);

  return null;
}
