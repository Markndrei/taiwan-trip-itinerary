"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX  = 0;
    let ringY  = 0;

    // ── Detect whether cursor is over a dark-bg element ──────────────────────
    const DARK_SELECTORS = [
      '[style*="var(--ink)"]',
      '[style*="background: var(--ink)"]',
      '[style*="background:var(--ink)"]',
      ".dark-section",        // add this class to any other dark sections
      "section[style]",       // we'll check inline bg colour below
    ];

    function isDarkUnderCursor(x: number, y: number): boolean {
      const el = document.elementFromPoint(x, y);
      if (!el) return false;
      // Walk up the DOM and check computed background
      let node: Element | null = el;
      while (node && node !== document.body) {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          // Parse rgb/rgba
          const match = bg.match(/[\d.]+/g);
          if (match && match.length >= 3) {
            const [r, g, b] = match.map(Number);
            // Relative luminance — dark if < 0.15
            const lum = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
            return lum < 0.15;
          }
        }
        node = node.parentElement;
      }
      return false;
    }

    function applyTheme(dark: boolean) {
      if (dark) {
        // Light cursor on dark background
        gsap.to(dot, {
          backgroundColor: "var(--vermillion)",
          duration: 0.2,
        });
        gsap.to(ring, {
          borderColor: "rgba(245,240,232,0.55)",
          duration: 0.2,
        });
        gsap.to(label, {
          color: "var(--ink)",
          backgroundColor: "var(--paper)",
          borderColor: "rgba(245,240,232,0.3)",
          duration: 0.2,
        });
        if (dot) {
          dot.style.mixBlendMode = "normal";
        }
      } else {
        // Dark cursor on light background
        gsap.to(dot, {
          backgroundColor: "var(--vermillion)",
          duration: 0.2,
        });
        gsap.to(ring, {
          borderColor: "var(--ink)",
          duration: 0.2,
        });
        gsap.to(label, {
          color: "var(--ink)",
          backgroundColor: "var(--paper)",
          borderColor: "var(--border-heavy)",
          duration: 0.2,
        });
        if (dot) {
          dot.style.mixBlendMode = "multiply";
        }
      }
    }

    // ── Mouse move ────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      if (mouseX === 0 && mouseY === 0) {
        gsap.set([dot, ring], { opacity: 1 });
      }
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.set(dot,   { x: mouseX, y: mouseY });
      gsap.set(label, { x: mouseX + 18, y: mouseY + 18 });

      applyTheme(isDarkUnderCursor(mouseX, mouseY));
    };

    // ── Smooth ring follow ────────────────────────────────────────────────────
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);

    // ── Hover states ──────────────────────────────────────────────────────────
    const onEnterClickable = (e: Event) => {
      const el     = e.currentTarget as HTMLElement;
      const cursor = el.dataset.cursor;
      const dark   = isDarkUnderCursor(mouseX, mouseY);

      gsap.to(ring,  { scale: 2.2, opacity: 0.5, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,   { scale: 0.4, duration: 0.25 });

      if (cursor) {
        label.textContent = cursor;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25 });
      }
    };

    const onLeaveClickable = () => {
      gsap.to(ring,  { scale: 1, opacity: 0.6, duration: 0.35, ease: "power2.out" });
      gsap.to(dot,   { scale: 1, duration: 0.25 });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };

    const onMouseDown = () => gsap.to(ring, { scale: 0.8, duration: 0.15 });
    const onMouseUp   = () => gsap.to(ring, { scale: 1, duration: 0.25, ease: "back.out(2)" });

    // ── Attach listeners ──────────────────────────────────────────────────────
    const clickables = document.querySelectorAll("button, a, [data-cursor], .group");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterClickable);
      el.addEventListener("mouseleave", onLeaveClickable);
    });

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);

    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterClickable);
        el.removeEventListener("mouseleave", onLeaveClickable);
      });
    };
  }, []);

  return (
    <>
      {/* Small dot */}
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
        }}
      />

      {/* Outer ring — starts with ink colour, switches dynamically */}
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