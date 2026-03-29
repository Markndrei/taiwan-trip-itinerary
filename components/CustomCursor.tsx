"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // null = detection pending, true = touch device, false = mouse device
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  // ── Step 1: Detect touch vs mouse ──────────────────────────────────────────
  useEffect(() => {
    // pointer: coarse = finger/stylus. hover: none = no hover capability.
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasNoHover      = window.matchMedia("(hover: none)").matches;

    if (isCoarsePointer || hasNoHover) {
      setIsTouch(true);
      return;
    }

    // Belt-and-suspenders: first touchstart wins
    const onTouch = () => setIsTouch(true);
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });

    // First real mousemove confirms mouse
    const onMouse = () => setIsTouch((prev) => prev === null ? false : prev);
    window.addEventListener("mousemove", onMouse, { once: true });

    return () => {
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("mousemove",  onMouse);
    };
  }, []);

  // ── Step 2: Wire up cursor only when confirmed mouse device ────────────────
  useEffect(() => {
    if (isTouch !== false) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Hide the native cursor globally
    document.documentElement.style.cursor = "none";

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, rafId: number;

    // ── Luminance check ──────────────────────────────────────────────────────
    function isDarkUnderCursor(x: number, y: number): boolean {
      const el = document.elementFromPoint(x, y);
      if (!el) return false;
      let node: Element | null = el;
      while (node && node !== document.body) {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const m = bg.match(/[\d.]+/g);
          if (m && m.length >= 3) {
            const [r, g, b] = m.map(Number);
            const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
            return lum < 0.15;
          }
        }
        node = node.parentElement;
      }
      return false;
    }

    // ── Theme ────────────────────────────────────────────────────────────────
    function applyTheme(dark: boolean) {
      if (!dot || !ring || !label) return;
      if (dark) {
        gsap.to(dot,   { backgroundColor: "var(--vermillion)", duration: 0.2 });
        gsap.to(ring,  { borderColor: "rgba(245,240,232,0.6)", duration: 0.2 });
        gsap.to(label, {
          color: "var(--ink)",
          backgroundColor: "var(--paper)",
          borderColor: "rgba(245,240,232,0.3)",
          duration: 0.2,
        });
        dot.style.mixBlendMode = "normal";
      } else {
        gsap.to(dot,   { backgroundColor: "var(--vermillion)", duration: 0.2 });
        gsap.to(ring,  { borderColor: "var(--ink)", duration: 0.2 });
        gsap.to(label, {
          color: "var(--ink)",
          backgroundColor: "var(--paper)",
          borderColor: "var(--border-heavy)",
          duration: 0.2,
        });
        dot.style.mixBlendMode = "multiply";
      }
    }

    // ── Mouse move ────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (mouseX === 0 && mouseY === 0) gsap.set([dot, ring], { opacity: 1 });
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot,   { x: mouseX, y: mouseY });
      gsap.set(label, { x: mouseX + 18, y: mouseY + 18 });
      applyTheme(isDarkUnderCursor(mouseX, mouseY));
    };

    // ── Ring follow ───────────────────────────────────────────────────────────
    const tick = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Hover expand ─────────────────────────────────────────────────────────
    const onEnter = (e: Event) => {
      const el     = e.currentTarget as HTMLElement;
      const cursor = el.dataset.cursor;
      gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,  { scale: 0.4, duration: 0.25 });
      if (cursor) {
        label.textContent = cursor;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
      }
    };
    const onLeave = () => {
      gsap.to(ring,  { scale: 1, opacity: 0.6, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,   { scale: 1, duration: 0.25 });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onUp   = () => gsap.to(ring, { scale: 1, duration: 0.25, ease: "back.out(2)" });

    const onDocLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onDocEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    const clickables = document.querySelectorAll("button, a, [data-cursor], .group");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isTouch]);

  // ── Render nothing on touch, pending, or SSR ───────────────────────────────
  if (isTouch !== false) return null;

  return (
    <>
      {/* Dot — snaps to cursor position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--vermillion)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          willChange: "transform",
        }}
      />

      {/* Ring — lags behind with easing */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1.5px solid var(--ink)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          willChange: "transform",
        }}
      />

      {/* Context label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] font-mono"
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--ink)",
          background: "var(--paper)",
          padding: "3px 8px",
          border: "1px solid var(--border-heavy)",
          opacity: 0,
          transform: "scale(0.8)",
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}