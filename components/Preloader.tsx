"use client";

import { useEffect, useRef, useState } from "react";

const KANJI_SEQUENCE = ["台", "灣", "旅", "行"];

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentKanji, setCurrentKanji] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    // Cycle through kanji every 400ms
    let idx = 0;
    const kanjiTimer = setInterval(() => {
      idx++;
      if (idx < KANJI_SEQUENCE.length) {
        setCurrentKanji(idx);
      } else {
        clearInterval(kanjiTimer);
      }
    }, 400);

    // After ~2s, animate out with GSAP
    const exitTimer = setTimeout(async () => {
      const mod = await import("gsap");
      const gsap = mod.gsap || mod.default;

      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          document.body.style.overflow = "";
        },
      });

      // Panels split apart (top goes up, bottom goes down)
      tl.to(".preloader-top", {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      })
        .to(
          ".preloader-bottom",
          {
            yPercent: 100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "<"
        )
        .to(
          ".preloader-content",
          { opacity: 0, duration: 0.3, ease: "power2.out" },
          "<0.1"
        );
    }, 2200);

    return () => {
      clearInterval(kanjiTimer);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      {/* Top half panel */}
      <div
        className="preloader-top absolute top-0 left-0 right-0 h-1/2"
        style={{ background: "#0D0D0D" }}
      />
      {/* Bottom half panel */}
      <div
        className="preloader-bottom absolute bottom-0 left-0 right-0 h-1/2"
        style={{ background: "#0D0D0D" }}
      />

      {/* Center content (sits above both panels) */}
      <div className="preloader-content absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
        {/* Animated kanji */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Rotating ring */}
          <svg
            className="absolute inset-0"
            viewBox="0 0 144 144"
            style={{ animation: "spinRing 2s linear infinite" }}
          >
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="rgba(196,30,58,0.25)"
              strokeWidth="1"
              strokeDasharray="6 10"
            />
          </svg>
          {/* Outer solid ring */}
          <svg className="absolute inset-0" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="rgba(196,30,58,0.12)"
              strokeWidth="1"
            />
          </svg>

          {/* Kanji character */}
          <span
            key={currentKanji}
            className="font-display font-black text-paper select-none"
            style={{
              fontSize: "72px",
              lineHeight: 1,
              animation: "kanjiPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
          >
            {KANJI_SEQUENCE[currentKanji]}
          </span>
        </div>

        {/* Loading bar */}
        <div className="w-40 h-px bg-paper/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-crimson rounded-full"
            style={{
              animation: "loadBar 2s ease forwards",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-xs text-paper/30 tracking-[0.25em] uppercase">
            Taiwan 2027
          </span>
          <span className="font-display text-xs text-paper/15 tracking-widest">
            五天台灣之旅
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinRing {
          to { transform: rotate(360deg); }
        }
        @keyframes kanjiPop {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes loadBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
