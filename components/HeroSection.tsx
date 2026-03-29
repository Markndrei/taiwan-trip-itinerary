"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { tripStats } from "@/data/tripData";

const BrushStroke = () => (
  <svg viewBox="0 0 400 20" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <path
      d="M0,10 Q50,2 100,10 Q150,18 200,10 Q250,2 300,10 Q350,18 400,10"
      stroke="var(--vermillion)"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

const MountainSVG = () => (
  <svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <path
      d="M0,300 L0,180 L80,120 L160,160 L280,60 L400,140 L500,80 L600,130 L720,20 L840,100 L920,50 L1040,130 L1140,70 L1240,120 L1360,90 L1440,110 L1440,300 Z"
      fill="var(--ink)"
      opacity="0.06"
    />
    <path
      d="M0,300 L0,220 L120,170 L240,190 L380,110 L500,170 L600,130 L720,80 L840,150 L960,120 L1080,160 L1200,100 L1320,140 L1440,160 L1440,300 Z"
      fill="var(--ink)"
      opacity="0.04"
    />
  </svg>
);

const CirclePattern = () => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute"
    style={{ width: 320, height: 320, opacity: 0.04 }}
  >
    {[20, 40, 60, 80, 100].map((r) => (
      <circle
        key={r}
        cx="100"
        cy="100"
        r={r}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="0.5"
      />
    ))}
    <line x1="0" y1="100" x2="200" y2="100" stroke="var(--ink)" strokeWidth="0.3" />
    <line x1="100" y1="0" x2="100" y2="200" stroke="var(--ink)" strokeWidth="0.3" />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const cnCharRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Background grid fade
    tl.fromTo(
      bgGridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" }
    );

    // Chinese characters slide in from left
    tl.fromTo(
      cnCharRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=1.5"
    );

    // Line animate width
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1, ease: "power2.inOut" },
      "-=0.8"
    );

    // Title split animation
    const titleWords = titleRef.current?.querySelectorAll(".word");
    if (titleWords) {
      tl.fromTo(
        titleWords,
        { y: 100, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.4"
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.4"
    );

    // Stats
    const statItems = statsRef.current?.querySelectorAll(".stat-item");
    if (statItems) {
      tl.fromTo(
        statItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.1"
    );

    // Floating scroll indicator loop
    gsap.to(scrollIndicatorRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.4,
      ease: "power1.inOut",
      delay: 2.5,
    });
  }, []);

  const stats = [
    { value: tripStats.duration, label: "Duration", cn: "天數" },
    { value: tripStats.cities, label: "Cities", cn: "城市" },
    { value: tripStats.places, label: "Destinations", cn: "景點" },
    { value: "Spring", label: "Season", cn: "季節" },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      {/* Background grid */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0,
        }}
      />

      {/* Circle pattern - top right */}
      <div className="absolute top-20 right-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <CirclePattern />
      </div>

      {/* Chinese characters vertical - left edge */}
      <div
        ref={cnCharRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          letterSpacing: "0.3em",
          color: "var(--ash)",
          opacity: 0.4,
        }}
      >
        台灣旅行計畫二〇二七年
      </div>

      {/* Mountain silhouette - bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <MountainSVG />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-16 pt-24 pb-20">
        {/* Top label */}
        <div ref={lineRef} className="mb-10 flex items-center gap-4 overflow-hidden">
          <div
            className="h-px flex-1 max-w-xs"
            style={{ background: "var(--vermillion)", transformOrigin: "left" }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: "var(--ash)", letterSpacing: "0.25em" }}
          >
            A Banging BB Journey
          </span>
        </div>

        {/* Main title */}
        <div
          ref={titleRef}
          className="font-display mb-6 overflow-hidden"
          style={{ perspective: "800px" }}
        >
          <div className="flex flex-wrap gap-x-6 items-baseline">
            <div className="word inline-block" style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.9, fontWeight: 300, letterSpacing: "-0.02em" }}>
              Taiwan
            </div>
            <div
              className="word inline-block font-display"
              style={{
                fontSize: "clamp(4rem, 12vw, 10rem)",
                lineHeight: 0.9,
                fontWeight: 300,
                color: "var(--vermillion)",
                letterSpacing: "-0.02em",
              }}
            >
              2027
            </div>
          </div>
          <div
            className="word inline-block font-display mt-2"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
              lineHeight: 1.1,
              fontWeight: 300,
              color: "var(--ash)",
              letterSpacing: "0.1em",
            }}
          >
            台灣之旅
          </div>
        </div>

        {/* Brush stroke */}
        <div className="max-w-xs mb-10">
          <BrushStroke />
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="max-w-xl mb-16">
          <p
            className="font-body"
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "var(--ash)",
              fontWeight: 300,
            }}
          >
            Seven days across four cities — from Taipei&apos;s electric night markets to 
            Taroko&apos;s marble gorges, through misty mountain lakes and ancient temple streets. 
            A journey into the heart of the beautiful island.
          </p>
          <p
            className="mt-3 font-body"
            style={{ fontSize: "0.85rem", color: "var(--ash)", opacity: 0.6 }}
          >
            January 2027 · Spring Season · 5 Days
          </p>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-0 max-w-6xl"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item py-6 px-6 flex flex-col gap-1"
              style={{
                borderLeft: i === 0 ? "2px solid var(--vermillion)" : "1px solid var(--border)",
                borderRight: i === stats.length - 1 ? "none" : undefined,
              }}
            >
              <span
                className="font-display"
                style={{ fontSize: "2rem", fontWeight: 400, lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span
                className="font-mono uppercase tracking-widest"
                style={{ fontSize: "0.6rem", color: "var(--ash)" }}
              >
                {stat.label}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.7rem", color: "var(--ash)", opacity: 0.5 }}
              >
                {stat.cn}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex items-center gap-6">
          <button
            onClick={() => document.getElementById("places")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 transition-all duration-300"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>Explore Places</span>
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-2">
              <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={() => document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2"
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--ash)",
            }}
          >
            <span className="group-hover:text-ink transition-colors">View Itinerary</span>
            <span style={{ color: "var(--vermillion)" }}>→</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span
          className="font-mono"
          style={{
            writingMode: "vertical-rl",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "var(--ash)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, var(--ash), transparent)" }}
        />
      </div>

      {/* Stamp decoration */}
      <div
        className="absolute bottom-16 left-16 hidden lg:block"
        style={{ opacity: 0.07 }}
      >
        <div
          className="font-display"
          style={{
            fontSize: "8rem",
            fontWeight: 700,
            color: "var(--vermillion)",
            lineHeight: 1,
            transform: "rotate(-15deg)",
          }}
        >
          台
        </div>
      </div>
    </section>
  );
}