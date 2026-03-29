"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBotRef = useRef<HTMLDivElement>(null);
  const cnRef = useRef<HTMLDivElement>(null);
  const enRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(loaderRef.current, { display: "none" });
        onComplete();
      },
    });

    // Count up 00 → 100
    let count = { val: 0 };
    tl.to(count, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(count.val)).padStart(3, "0");
        }
      },
    });

    // Chinese characters appear
    tl.fromTo(
      cnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.4
    );

    // EN title
    tl.fromTo(
      enRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      0.7
    );

    // Line draw
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "center" },
      { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
      1.0
    );

    // Split panels out
    tl.to(
      panelTopRef.current,
      { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
      1.8
    );
    tl.to(
      panelBotRef.current,
      { yPercent: 100, duration: 0.9, ease: "power4.inOut" },
      1.8
    );
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
    >
      {/* Top panel */}
      <div
        ref={panelTopRef}
        className="absolute top-0 left-0 right-0 h-1/2 flex flex-col items-center justify-end pb-4"
        style={{ background: "var(--ink)" }}
      >
        <div
          ref={cnRef}
          className="font-display text-center"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            color: "var(--paper)",
            lineHeight: 1,
            letterSpacing: "0.15em",
            opacity: 0,
          }}
        >
          台灣之旅
        </div>
      </div>

      {/* Bottom panel */}
      <div
        ref={panelBotRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col items-center justify-start pt-4"
        style={{ background: "var(--ink)" }}
      >
        {/* Red divider line */}
        <div
          ref={lineRef}
          className="w-48 h-px mb-4"
          style={{ background: "var(--vermillion)", transformOrigin: "center" }}
        />

        <div
          ref={enRef}
          className="font-mono text-center"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--ash)",
            opacity: 0,
          }}
        >
          A Journey Through Taiwan · Spring 2027
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-8 right-10 font-mono"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: "rgba(245,240,232,0.25)",
          }}
        >
          <span ref={countRef}>000</span>
          <span style={{ opacity: 0.4 }}> %</span>
        </div>

        {/* Decorative vermillion char */}
        <div
          className="absolute bottom-6 left-10 font-display"
          style={{
            fontSize: "4rem",
            fontWeight: 700,
            color: "var(--vermillion)",
            opacity: 0.15,
            lineHeight: 1,
          }}
        >
          行
        </div>
      </div>
    </div>
  );
}