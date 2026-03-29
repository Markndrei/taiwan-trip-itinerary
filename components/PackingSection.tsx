"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const packingList = [
  {
    category: "Clothing",
    cn: "衣物",
    items: [
      "Lightweight layers (18–24°C in March)",
      "Rain jacket / compact umbrella",
      "Comfortable walking shoes",
      "Temple-appropriate cover-ups",
      "Warmer layer for Taroko / Sun Moon Lake",
    ],
  },
  {
    category: "Documents",
    cn: "文件",
    items: [
      "Passport (6+ months validity)",
      "Taiwan visa if required for your nationality",
      "Travel insurance documents",
      "Digital copies of all bookings",
      "Emergency contact card",
    ],
  },
  {
    category: "Tech",
    cn: "電子",
    items: [
      "Universal adapter (Taiwan uses US-style plugs)",
      "Power bank (essential for long days)",
      "Headphones for trains",
      "Offline maps downloaded",
      "Translation app (Pleco / Google)",
    ],
  },
  {
    category: "Health",
    cn: "健康",
    items: [
      "Sunscreen SPF 50+",
      "Motion sickness tablets (winding mountain roads)",
      "Basic first aid kit",
      "Any prescription medications (bring extra)",
      "Hand sanitizer / wet wipes",
    ],
  },
];

const weatherData = [
  { month: "Jan", high: 19, low: 14, rain: 3 },
  { month: "Feb", high: 20, low: 15, rain: 4 },
  { month: "Mar", high: 22, low: 17, rain: 3 },
  { month: "Apr", high: 25, low: 20, rain: 4 },
  { month: "May", high: 28, low: 23, rain: 7 },
  { month: "Jun", high: 32, low: 26, rain: 9 },
];

export default function PackingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headerRef.current?.querySelectorAll(".hdr") || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    const cards = sectionRef.current?.querySelectorAll(".pack-card") || [];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );

    // Animate temperature bars
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const targetWidth = bar.dataset.width || "0%";
      gsap.fromTo(
        bar,
        { width: 0 },
        {
          width: targetWidth,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    });
  }, []);

  const maxTemp = Math.max(...weatherData.map((d) => d.high));

  return (
    <section
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "var(--cream)" }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="hdr flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--vermillion)", letterSpacing: "0.25em" }}
            >
              06 — Preparation
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-heavy)" }} />
          </div>
          <h2
            className="hdr font-display"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.05 }}
          >
            Packing & Weather
          </h2>
          <p
            className="hdr font-body mt-3 max-w-lg"
            style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7 }}
          >
            March in Taiwan is spring — warm, occasionally rainy, and perfect for sightseeing. 
            Here&apos;s what to pack.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Packing cards */}
          <div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-0"
            style={{ border: "1px solid var(--border)" }}
          >
            {packingList.map((section, i) => (
              <div
                key={i}
                className="pack-card p-6"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <h3
                    className="font-display"
                    style={{ fontSize: "1.2rem", fontWeight: 500 }}
                  >
                    {section.category}
                  </h3>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.75rem", color: "var(--ash)" }}
                  >
                    {section.cn}
                  </span>
                </div>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span style={{ color: "var(--vermillion)", fontSize: "0.6rem", marginTop: 4, flexShrink: 0 }}>
                        ▸
                      </span>
                      <span
                        className="font-body"
                        style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.5, color: "var(--ink)" }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Weather panel */}
          <div className="flex-shrink-0" style={{ width: "min(340px, 100%)" }}>
            {/* Spring note */}
            <div
              className="p-6 mb-6"
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
              }}
            >
              <div
                className="font-mono text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
              >
                March Conditions
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display" style={{ fontSize: "3.5rem", fontWeight: 300 }}>22°C</span>
                <span className="font-body" style={{ color: "rgba(245,240,232,0.4)", fontSize: "0.85rem" }}>avg high</span>
              </div>
              <p
                className="font-body"
                style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", fontWeight: 300, lineHeight: 1.7 }}
              >
                Mild and partly cloudy. Occasional spring showers — light jacket recommended.
                Perfect outdoor weather for hiking and temple visits.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "High", value: "22°C" },
                  { label: "Low", value: "17°C" },
                  { label: "Rain", value: "3 days" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="font-display"
                      style={{ fontSize: "1.2rem", fontWeight: 400 }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ fontSize: "0.55rem", color: "rgba(245,240,232,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Temperature chart */}
            <div
              className="p-6"
              style={{ border: "1px solid var(--border)" }}
            >
              <div
                className="font-mono text-xs uppercase tracking-widest mb-5"
                style={{ color: "var(--ash)", letterSpacing: "0.2em" }}
              >
                Avg Temp — Jan to Jun
              </div>

              <div className="space-y-3">
                {weatherData.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="font-mono flex-shrink-0 text-right"
                      style={{ fontSize: "0.65rem", color: "var(--ash)", width: 26 }}
                    >
                      {d.month}
                    </div>
                    <div className="flex-1 relative h-5 flex items-center">
                      {/* High bar */}
                      <div
                        ref={(el) => { barsRef.current[i * 2] = el; }}
                        className="absolute h-full"
                        data-width={`${(d.high / maxTemp) * 100}%`}
                        style={{
                          background: i === 0 ? "var(--vermillion)" : "rgba(13,13,13,0.15)",
                          width: 0,
                        }}
                      />
                      {/* Marker if this is our month */}
                      {i === 0 && (
                        <div
                          className="absolute right-1 font-mono"
                          style={{
                            fontSize: "0.55rem",
                            color: "var(--paper)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Our Trip
                        </div>
                      )}
                    </div>
                    <div
                      className="font-mono flex-shrink-0"
                      style={{ fontSize: "0.65rem", color: "var(--ash)", width: 28 }}
                    >
                      {d.high}°
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}