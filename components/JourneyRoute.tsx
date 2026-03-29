"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { itinerary, places } from "@/data/tripData";

// ─── Map coordinate system (0–120 viewBox) ───────────────────────────────────
const cityCoords: Record<string, { x: number; y: number; label: string; cn: string }> = {
  Taipei:    { x: 72,  y: 14,  label: "Taipei",      cn: "台北" },
  "New Taipei": { x: 78, y: 10, label: "New Taipei", cn: "新北" },
  Hualien:   { x: 88,  y: 38,  label: "Hualien",     cn: "花蓮" },
  Nantou:    { x: 60,  y: 52,  label: "Nantou",      cn: "南投" },
  Tainan:    { x: 44,  y: 76,  label: "Tainan",      cn: "台南" },
  Taichung:  { x: 52,  y: 60,  label: "Taichung",    cn: "台中" },
  Chiayi:    { x: 48,  y: 68,  label: "Chiayi",      cn: "嘉義" },
};

// Map each place to its closest "city node"
const placeCity: Record<string, string> = {
  "chiang-kai-shek":      "Taipei",
  "ximending":            "Taipei",
  "longshan-temple":      "Taipei",
  "taipei-101":           "Taipei",
  "shilin-night-market":  "Taipei",
  "yehliu-geopark":       "New Taipei",
  "shifen-old-street":    "New Taipei",
  "shifen-waterfall":     "New Taipei",
  "jiufen":               "New Taipei",
  "xinbeitou-station":    "Taipei",
  "beitou-thermal-valley":"Taipei",
  "qingtiangang":         "Taipei",
  "maokong-gondola":      "Taipei",
  "zhinan-temple":        "Taipei",
  "raohe-night-market":   "Taipei",
  "wulai":                "New Taipei",
  "zhongshe-flower-market":"Taichung",
  "sun-moon-lake":        "Nantou",
  "alishan":              "Chiayi",
  "rainbow-village":      "Taichung",
  "carrefour-taipei":     "Taipei",
};

// ─── Build unique city stops per day ─────────────────────────────────────────
function getDayStops(day: typeof itinerary[0]) {
  const seen = new Set<string>();
  const stops: { city: string; coords: typeof cityCoords[string] }[] = [];
  for (const pid of day.places) {
    const city = placeCity[pid];
    if (city && !seen.has(city) && cityCoords[city]) {
      seen.add(city);
      stops.push({ city, coords: cityCoords[city] });
    }
  }
  return stops;
}

function buildPath(stops: ReturnType<typeof getDayStops>) {
  if (stops.length === 0) return "";
  return stops
    .map((s, i) => {
      if (i === 0) return `M ${s.coords.x} ${s.coords.y}`;
      const prev = stops[i - 1].coords;
      const cx = (prev.x + s.coords.x) / 2;
      const cy = (prev.y + s.coords.y) / 2;
      return `Q ${cx} ${prev.y} ${s.coords.x} ${s.coords.y}`;
    })
    .join(" ");
}

// ─── Day accent colours ───────────────────────────────────────────────────────
const DAY_COLORS = [
  "#E84923", // D1 — vermillion
  "#E8A023", // D2 — amber
  "#23A0E8", // D3 — sky
  "#23E89A", // D4 — teal
  "#B823E8", // D5 — violet
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function JourneyRoute() {
  const [activeDay, setActiveDay] = useState(0);
  const sectionRef    = useRef<HTMLElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const pathRef       = useRef<SVGPathElement>(null);
  const dotsRef       = useRef<(SVGCircleElement | null)[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const day   = itinerary[activeDay];
  const stops = getDayStops(day);
  const pathD = buildPath(stops);
  const color = DAY_COLORS[activeDay];

  // Animate path + dots whenever activeDay changes
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();

    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" });

    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.4, ease: "back.out(2)", delay: i * 0.25 + 0.3 });
    });
  }, [activeDay, pathD]);

  // Scroll-trigger for header on mount
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      headerRef.current?.querySelectorAll(".hdr") || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" } }
    );
  }, []);

  const dayPlaces = day.places.map(id => places.find(p => p.id === id)).filter(Boolean);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--ink)" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,240,232,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,232,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Watermark */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display pointer-events-none select-none"
        style={{ fontSize: "40vw", fontWeight: 700, color: "rgba(245,240,232,0.015)", lineHeight: 1 }}
      >
        路
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-16 relative z-10">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-14">
          <div className="hdr flex items-center gap-4 mb-5">
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--vermillion)", letterSpacing: "0.25em" }}
            >
              The Route
            </span>
            <div className="h-px flex-1 max-w-12" style={{ background: "rgba(245,240,232,0.15)" }} />
          </div>

          <h2
            className="hdr font-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--paper)", lineHeight: 1.05 }}
          >
            The Journey
            <br />
            <span style={{ color: "var(--vermillion)" }}>Across Taiwan</span>
          </h2>

          <p
            className="hdr font-body mt-5 max-w-lg"
            style={{ fontSize: "0.95rem", color: "rgba(245,240,232,0.45)", fontWeight: 300, lineHeight: 1.8 }}
          >
            A 5-day arc from Taipei&apos;s urban pulse through mountain gorges, alpine lakes,
            and ancient streets. Select a day to explore its route.
          </p>
        </div>

        {/* ── Day Tab Selector ── */}
        <div className="flex gap-0 mb-10 overflow-x-auto" style={{ borderBottom: "1px solid rgba(245,240,232,0.08)" }}>
          {itinerary.map((d, i) => {
            const isActive = i === activeDay;
            const c = DAY_COLORS[i];
            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="relative flex-shrink-0 pb-4 pt-3 px-6 font-mono text-xs transition-all duration-300 cursor-pointer"
                style={{
                  letterSpacing: "0.15em",
                  color: isActive ? c : "rgba(245,240,232,0.3)",
                  background: "none",
                  border: "none",
                  outline: "none",
                }}
              >
                <span style={{ display: "block", fontSize: "0.55rem", marginBottom: 2, opacity: 0.6 }}>
                  DAY
                </span>
                <span style={{ fontSize: "1.1rem", fontWeight: 500 }}>0{d.day}</span>

                {/* Active indicator bar */}
                <span
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                  style={{
                    height: 2,
                    background: isActive ? c : "transparent",
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* ── Main content: left list + right map ── */}
        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* ── Left: day detail ── */}
          <div className="flex-1 min-w-0 max-w-lg">

            {/* Day title */}
            <div className="mb-8">
              <div
                className="font-mono text-xs mb-2"
                style={{ color, letterSpacing: "0.2em", fontSize: "0.6rem" }}
              >
                {day.date}
              </div>
              <h3
                className="font-display"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "var(--paper)", lineHeight: 1.1 }}
              >
                {day.title}
              </h3>
              <div
                className="font-body mt-1"
                style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", letterSpacing: "0.08em" }}
              >
                {day.chineseTitle}
              </div>
            </div>

            {/* Places list */}
            <div className="space-y-0">
              {dayPlaces.map((place, i) => (
                <div
                  key={place!.id}
                  className="flex items-start gap-5 py-4 group"
                  style={{ borderBottom: "1px solid rgba(245,240,232,0.06)" }}
                >
                  {/* Index */}
                  <div
                    className="flex-shrink-0 font-mono mt-0.5"
                    style={{ fontSize: "0.55rem", color, letterSpacing: "0.15em", width: 28, paddingTop: 2 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Dot with vertical line */}
                  <div className="flex-shrink-0 flex flex-col items-center" style={{ paddingTop: 6 }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    {i < dayPlaces.length - 1 && (
                      <div className="w-px flex-1 mt-1" style={{ minHeight: 20, background: `${color}25` }} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pb-1">
                    <div
                      className="font-display"
                      style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--paper)", lineHeight: 1.3 }}
                    >
                      {place!.name}
                    </div>
                    <div
                      className="font-body mt-1"
                      style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)", lineHeight: 1.5 }}
                    >
                      {place!.chineseName} · {place!.category} · {place!.time}
                    </div>
                    <div
                      className="font-body mt-1.5"
                      style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.6 }}
                    >
                      {place!.description}
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div
                    className="flex-shrink-0 font-mono text-right"
                    style={{ fontSize: "0.55rem", color: "rgba(245,240,232,0.2)", letterSpacing: "0.05em", paddingTop: 4, minWidth: 52 }}
                  >
                    {place!.duration}
                  </div>
                </div>
              ))}
            </div>

            {/* Logistics note */}
            <div
              className="mt-8 p-4 rounded"
              style={{ background: "rgba(245,240,232,0.03)", border: `1px solid ${color}20` }}
            >
              <div
                className="font-mono text-xs mb-2"
                style={{ color, letterSpacing: "0.15em", fontSize: "0.55rem" }}
              >
                LOGISTICS
              </div>
              <p
                className="font-body"
                style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.75 }}
              >
                {day.logistics}
              </p>
            </div>
          </div>

          {/* ── Right: Taiwan map ── */}
          <div ref={mapContainerRef} className="flex-shrink-0 relative lg:sticky lg:top-8" style={{ width: "min(360px, 100%)" }}>

            {/* Map label */}
            <div
              className="font-mono text-xs mb-4 flex items-center gap-3"
              style={{ color: "rgba(245,240,232,0.2)", letterSpacing: "0.2em", fontSize: "0.55rem" }}
            >
              <span style={{ color }}>DAY {day.day} ROUTE</span>
              <span>·</span>
              <span>{stops.map(s => s.city).join(" → ")}</span>
            </div>

            <svg
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              style={{ filter: `drop-shadow(0 0 40px ${color}12)` }}
            >
              {/* Taiwan island shape */}
              <path
                d="M72,8 L78,12 L82,18 L85,26 L86,34 L87,42 L85,50 L82,58 L78,66 L74,72 L68,78 L62,83 L56,87 L50,90 L44,92 L38,90 L34,86 L32,80 L34,74 L38,68 L42,62 L44,56 L44,50 L46,44 L48,38 L50,32 L54,26 L58,20 L64,14 Z"
                fill="rgba(245,240,232,0.04)"
                stroke="rgba(245,240,232,0.12)"
                strokeWidth="0.7"
              />

              {/* All city nodes — dimmed */}
              {Object.entries(cityCoords).map(([city, c]) => {
                const isActive = stops.some(s => s.city === city);
                return (
                  <circle
                    key={city}
                    cx={c.x}
                    cy={c.y}
                    r={1.5}
                    fill={isActive ? "none" : "rgba(245,240,232,0.1)"}
                    stroke={isActive ? "none" : "rgba(245,240,232,0.08)"}
                    strokeWidth="0.5"
                  />
                );
              })}

              {/* Animated route path */}
              {pathD && (
                <path
                  ref={pathRef}
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 2"
                  opacity="0.85"
                />
              )}

              {/* Active stop dots */}
              {stops.map((stop, i) => (
                <g key={stop.city}>
                  {/* Pulse ring */}
                  <circle
                    cx={stop.coords.x}
                    cy={stop.coords.y}
                    r={6}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    opacity="0.25"
                  />
                  {/* Main dot */}
                  <circle
                    ref={(el) => { dotsRef.current[i] = el; }}
                    cx={stop.coords.x}
                    cy={stop.coords.y}
                    r={2.5}
                    fill={color}
                  />
                  {/* White center */}
                  <circle cx={stop.coords.x} cy={stop.coords.y} r={1} fill="var(--paper)" />

                  {/* City label */}
                  <text
                    x={stop.coords.x + (stop.coords.x > 60 ? 5 : -5)}
                    y={stop.coords.y + 1}
                    textAnchor={stop.coords.x > 60 ? "start" : "end"}
                    style={{
                      fontSize: "3.5px",
                      fontFamily: "var(--font-mono), monospace",
                      fill: color,
                      letterSpacing: "0.05em",
                      opacity: 0.9,
                    }}
                  >
                    {stop.coords.label.toUpperCase()}
                  </text>

                  {/* Stop number badge */}
                  <text
                    x={stop.coords.x}
                    y={stop.coords.y - 5}
                    textAnchor="middle"
                    style={{
                      fontSize: "2.8px",
                      fontFamily: "var(--font-mono), monospace",
                      fill: color,
                      opacity: 0.7,
                    }}
                  >
                    {i + 1}
                  </text>
                </g>
              ))}

              {/* North indicator */}
              <g transform="translate(10, 10)">
                <line x1="0" y1="5" x2="0" y2="-5" stroke="rgba(245,240,232,0.25)" strokeWidth="0.6" />
                <polygon points="0,-5 -1.5,-1 1.5,-1" fill="rgba(245,240,232,0.35)" />
                <text x="0" y="9" textAnchor="middle" style={{ fontSize: "3px", fill: "rgba(245,240,232,0.2)", fontFamily: "monospace" }}>N</text>
              </g>

              {/* Scale bar */}
              <line x1="10" y1="108" x2="40" y2="108" stroke="rgba(245,240,232,0.15)" strokeWidth="0.6" />
              <text x="25" y="113" textAnchor="middle" style={{ fontSize: "2.8px", fill: "rgba(245,240,232,0.15)", fontFamily: "monospace" }}>100 KM</text>
            </svg>

            {/* Corner decoration */}
            <div
              className="absolute -top-4 -right-4 font-mono text-xs"
              style={{ color: "rgba(245,240,232,0.1)", fontSize: "0.6rem", letterSpacing: "0.15em", writingMode: "vertical-rl" }}
            >
              TAIWAN · 台灣
            </div>

            {/* Day summary stats */}
            <div className="mt-6 grid grid-cols-3 gap-0" style={{ borderTop: "1px solid rgba(245,240,232,0.07)" }}>
              {[
                { label: "STOPS", value: dayPlaces.length },
                { label: "CITIES", value: stops.length },
                { label: "THEME", value: day.theme.toUpperCase().slice(0, 7) },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="pt-4 text-center"
                  style={{ borderRight: i < 2 ? "1px solid rgba(245,240,232,0.07)" : "none" }}
                >
                  <div className="font-mono" style={{ fontSize: "0.55rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.15em" }}>
                    {stat.label}
                  </div>
                  <div
                    className="font-display mt-1"
                    style={{ fontSize: "1.3rem", fontWeight: 300, color: "var(--paper)" }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Overall trip summary bar ── */}
        <div
          className="mt-16 flex flex-wrap items-center gap-8 pt-8"
          style={{ borderTop: "1px solid rgba(245,240,232,0.07)" }}
        >
          <div>
            <div className="font-mono text-xs" style={{ color: "rgba(245,240,232,0.25)", letterSpacing: "0.15em", fontSize: "0.55rem" }}>
              TOTAL DISTANCE
            </div>
            <div className="font-display mt-1" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--paper)" }}>
              ~850 km
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(245,240,232,0.08)" }} />
          <div>
            <div className="font-mono text-xs" style={{ color: "rgba(245,240,232,0.25)", letterSpacing: "0.15em", fontSize: "0.55rem" }}>
              TRANSPORT
            </div>
            <div className="font-body mt-1" style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", fontWeight: 300 }}>
              HSR · Train · Bus · Taxi
            </div>
          </div>
          <div className="h-10 w-px" style={{ background: "rgba(245,240,232,0.08)" }} />
          <div>
            <div className="font-mono text-xs" style={{ color: "rgba(245,240,232,0.25)", letterSpacing: "0.15em", fontSize: "0.55rem" }}>
              TOTAL PLACES
            </div>
            <div className="font-body mt-1" style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.5)", fontWeight: 300 }}>
              17 destinations
            </div>
          </div>

          {/* Day colour legend */}
          <div className="ml-auto flex items-center gap-3 flex-wrap">
            {itinerary.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="flex items-center gap-2 cursor-pointer"
                style={{ background: "none", border: "none", outline: "none" }}
              >
                <div
                  className="w-2 h-2 rounded-full transition-transform duration-200"
                  style={{
                    background: DAY_COLORS[i],
                    transform: activeDay === i ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.1em",
                    color: activeDay === i ? DAY_COLORS[i] : "rgba(245,240,232,0.2)",
                  }}
                >
                  D{d.day}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}