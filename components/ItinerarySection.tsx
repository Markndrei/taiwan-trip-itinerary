"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { itinerary, places, Place } from "@/data/tripData";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

const themeColors: Record<string, string> = {
  arrival: "var(--jade)",
  culture: "var(--gold)",
  heritage: "var(--vermillion)",
  nature: "var(--jade)",
  history: "var(--ash)",
  departure: "var(--ash)",
};

const themeLabels: Record<string, string> = {
  arrival: "Arrival",
  culture: "Culture",
  heritage: "Heritage",
  nature: "Nature",
  history: "History",
  departure: "Departure",
};

export default function ItinerarySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeDay, setActiveDay] = useState(0);
  const dayPanelRef = useRef<HTMLDivElement>(null);
  const [expandedPlace, setExpandedPlace] = useState<Place | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      headerRef.current?.querySelectorAll(".header-anim") || [],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );
  }, []);

  const handleDaySelect = (index: number) => {
    if (index === activeDay) return;
    gsap.fromTo(
      dayPanelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
    setActiveDay(index);
    setExpandedPlace(null);
    setShowMap(false);
  };

  const currentDay = itinerary[activeDay];
  const dayPlaces = currentDay.places
    .map((id) => places.find((p) => p.id === id))
    .filter(Boolean) as Place[];

  const mapPlaces = dayPlaces.map((p) => ({ lat: p.lat, lng: p.lng, name: p.name }));
  const centerLat =
    dayPlaces.length > 0
      ? dayPlaces.reduce((sum, p) => sum + p.lat, 0) / dayPlaces.length
      : 23.5;
  const centerLng =
    dayPlaces.length > 0
      ? dayPlaces.reduce((sum, p) => sum + p.lng, 0) / dayPlaces.length
      : 121.0;

  return (
    <section
      id="itinerary"
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "var(--paper)" }}
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-16">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-16">
          <div className="header-anim flex items-center gap-4 mb-6">
            <span
              className="font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--vermillion)", letterSpacing: "0.25em" }}
            >
              03 — Schedule
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-heavy)" }} />
          </div>
          <h2
            className="header-anim font-display"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.05 }}
          >
            Day by Day
          </h2>
          <p
            className="header-anim font-body mt-3"
            style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7, maxWidth: "32rem" }}
          >
            Select a day to explore the full schedule — including interactive maps, place details,
            and travel notes for each stop.
          </p>
        </div>

        {/* ── Day Tab Strip ── */}
        <div
          className="flex overflow-x-auto"
          style={{ borderBottom: "1px solid var(--border)", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {itinerary.map((day, i) => {
            const isActive = i === activeDay;
            const color = themeColors[day.theme];
            return (
              <button
                key={day.day}
                onClick={() => handleDaySelect(i)}
                className="group flex-shrink-0 flex flex-col items-start transition-all duration-300 text-left relative"
                style={{ padding: "16px 24px 14px", background: isActive ? "var(--ink)" : "transparent", minWidth: 140 }}
              >
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: "var(--vermillion)" }}
                  />
                )}
                <div
                  className="font-mono mb-1"
                  style={{ color: isActive ? "var(--vermillion)" : "var(--ash)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                >
                  DAY {String(day.day).padStart(2, "0")}
                </div>
                <div
                  className="font-display"
                  style={{ fontSize: "0.85rem", fontWeight: 500, color: isActive ? "var(--paper)" : "var(--ink)", lineHeight: 1.3, whiteSpace: "nowrap" }}
                >
                  {day.title.split("—")[0].trim()}
                </div>
                <div
                  className="font-mono mt-2 px-2 py-0.5"
                  style={{
                    fontSize: "0.5rem",
                    background: isActive ? color : "transparent",
                    color: isActive ? "var(--paper)" : "var(--ash)",
                    border: isActive ? "none" : `1px solid ${color}`,
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {themeLabels[day.theme]}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Day Detail Panel ── */}
        <div
          ref={dayPanelRef}
          className="flex flex-col"
          style={{ border: "1px solid var(--border)", borderTop: "none" }}
        >
          {/* Day header */}
          <div className="p-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-2"
                  style={{ color: "var(--ash)", letterSpacing: "0.2em" }}
                >
                  {currentDay.date}
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {currentDay.title}
                </h3>
                <p className="font-body mt-1" style={{ fontSize: "1rem", color: "var(--ash)" }}>
                  {currentDay.chineseTitle}
                </p>
              </div>

              {/* Map toggle */}
              {dayPlaces.length > 0 && (
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 transition-all"
                  style={{
                    border: "1px solid var(--border-heavy)",
                    background: showMap ? "var(--ink)" : "transparent",
                    color: showMap ? "var(--paper)" : "var(--ash)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="9" y="7" width="4" height="4" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 11L5 7M9 3L13 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  {showMap ? "Hide Map" : "Day Map"}
                </button>
              )}
            </div>

            {/* Notes */}
            <p
              className="font-body mt-4"
              style={{ fontSize: "0.9rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7, maxWidth: "56rem" }}
            >
              {currentDay.notes}
            </p>

            {/* Logistics bar */}
            {currentDay.logistics && (
              <div
                className="mt-4 flex items-start gap-3"
                style={{
                  padding: "10px 14px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--vermillion)",
                }}
              >
                {/* Train icon */}
                <svg
                  className="flex-shrink-0 mt-0.5"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{ color: "var(--vermillion)" }}
                >
                  <rect x="1" y="1" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M1 6h10" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M3 9l-1 2M9 9l1 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M4 3.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p
                  className="font-mono"
                  style={{ fontSize: "0.65rem", color: "var(--ash)", lineHeight: 1.6, letterSpacing: "0.02em" }}
                >
                  {currentDay.logistics}
                </p>
              </div>
            )}
          </div>

          {/* Map view */}
          {showMap && dayPlaces.length > 0 && (
            <div style={{ height: 300, borderBottom: "1px solid var(--border)" }}>
              <MapView lat={centerLat} lng={centerLng} name={currentDay.title} allPlaces={mapPlaces} />
            </div>
          )}

          {/* ── Places list ── */}
          <div className="divide-y" style={{ borderColor: "var(--border)" }}>
            {dayPlaces.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                  className="font-display mb-3"
                  style={{ fontSize: "3rem", fontWeight: 300, color: "var(--ash)", opacity: 0.3 }}
                >
                  —
                </div>
                <p className="font-body" style={{ fontSize: "0.95rem", color: "var(--ash)", fontWeight: 300 }}>
                  Travel and transit day
                </p>
              </div>
            ) : (
              dayPlaces.map((place, i) => {
                const isExpanded = expandedPlace?.id === place.id;
                const isLast = i === dayPlaces.length - 1;

                return (
                  <div key={place.id}>
                    {/* ── Place row ── */}
                    <button
                      onClick={() => setExpandedPlace(isExpanded ? null : place)}
                      className="w-full flex items-stretch gap-0 text-left group transition-colors duration-200"
                      style={{ background: isExpanded ? "var(--mist)" : "transparent", cursor: "pointer" }}
                    >
                      {/* Time column */}
                      <div
                        className="flex-shrink-0 flex flex-col items-center justify-start pt-6 pb-4"
                        style={{
                          width: 88,
                          borderRight: "1px solid var(--border)",
                          background: isExpanded ? "rgba(0,0,0,0.02)" : "transparent",
                          padding: "20px 12px",
                        }}
                      >
                        {/* Time badge */}
                        <span
                          className="font-mono"
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            color: isExpanded ? "var(--vermillion)" : "var(--ink)",
                            letterSpacing: "0.05em",
                            lineHeight: 1,
                          }}
                        >
                          {place.time
                            ? place.time.replace(":00", "").replace(" AM", "am").replace(" PM", "pm")
                            : "—"}
                        </span>
                        {/* Vertical timeline connector */}
                        <div className="flex flex-col items-center flex-1 mt-3">
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: isExpanded ? "var(--vermillion)" : "var(--border-heavy)",
                              flexShrink: 0,
                            }}
                          />
                          {!isLast && (
                            <div
                              style={{
                                width: 1,
                                flex: 1,
                                minHeight: 20,
                                background: "var(--border)",
                                marginTop: 4,
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0 flex items-center gap-4 px-6 py-5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span
                              className="font-display"
                              style={{ fontSize: "1.05rem", fontWeight: 500, lineHeight: 1.2 }}
                            >
                              {place.name}
                            </span>
                            <span className="font-body" style={{ fontSize: "0.78rem", color: "var(--ash)" }}>
                              {place.chineseName}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--ash)", letterSpacing: "0.04em" }}>
                              {place.city}
                            </span>
                            <span style={{ color: "var(--border-heavy)", fontSize: "0.55rem" }}>·</span>
                            {/* Clock icon + duration */}
                            <span
                              className="flex items-center gap-1 font-mono"
                              style={{ fontSize: "0.6rem", color: "var(--ash)", letterSpacing: "0.04em" }}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5 }}>
                                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1"/>
                                <path d="M5 2.5V5L6.5 6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                              </svg>
                              {place.duration}
                            </span>
                            {/* Category pill */}
                            <span
                              className="font-mono px-2 py-0.5"
                              style={{
                                fontSize: "0.5rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: themeColors[place.category.toLowerCase()] || "var(--ash)",
                                border: `1px solid ${themeColors[place.category.toLowerCase()] || "var(--border)"}`,
                              }}
                            >
                              {place.category}
                            </span>
                          </div>
                        </div>

                        {/* Chevron */}
                        <div
                          className="flex-shrink-0 transition-transform duration-300"
                          style={{ color: "var(--ash)", transform: isExpanded ? "rotate(180deg)" : "none" }}
                        >
                          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* ── Expanded detail ── */}
                    {isExpanded && (
                      <div
                        className="px-8 pb-8"
                        style={{ background: "var(--mist)", borderTop: "1px solid var(--border)" }}
                      >
                        <div className="flex flex-col lg:flex-row gap-8 pt-6">
                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-body"
                              style={{ fontSize: "0.95rem", lineHeight: 1.8, fontWeight: 300, color: "var(--ink)" }}
                            >
                              {place.longDescription}
                            </p>

                            <div className="mt-5">
                              <div
                                className="font-mono text-xs uppercase tracking-widest mb-3"
                                style={{ color: "var(--ash)", letterSpacing: "0.2em" }}
                              >
                                Must Experience
                              </div>
                              <div className="space-y-1">
                                {place.mustTry.map((item, j) => (
                                  <div key={j} className="flex items-start gap-3">
                                    <span
                                      className="font-mono flex-shrink-0"
                                      style={{ fontSize: "0.6rem", color: "var(--vermillion)", marginTop: 3 }}
                                    >
                                      ▸
                                    </span>
                                    <span className="font-body" style={{ fontSize: "0.85rem", fontWeight: 300 }}>
                                      {item}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div
                              className="mt-5 p-4"
                              style={{ borderLeft: "3px solid var(--gold)", background: "rgba(212, 160, 23, 0.05)" }}
                            >
                              <span
                                className="font-mono text-xs uppercase tracking-widest"
                                style={{ color: "var(--gold)", fontSize: "0.6rem" }}
                              >
                                Tip
                              </span>
                              <p
                                className="font-body mt-1"
                                style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.7 }}
                              >
                                {place.tips}
                              </p>
                            </div>
                          </div>

                          {/* Mini map */}
                          <div className="flex-shrink-0 w-full lg:w-72" style={{ minHeight: 200 }}>
                            <div
                              className="overflow-hidden"
                              style={{ height: 220, border: "1px solid var(--border-heavy)" }}
                            >
                              <MapView lat={place.lat} lng={place.lng} name={place.name} />
                            </div>
                            <div
                              className="font-mono text-xs mt-1 text-center"
                              style={{ fontSize: "0.55rem", color: "var(--ash)", opacity: 0.6 }}
                            >
                              {place.lat.toFixed(4)}°N · {place.lng.toFixed(4)}°E
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div
          className="reveal mt-12 pt-8 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="font-body" style={{ fontSize: "0.85rem", color: "var(--ash)", fontWeight: 300 }}>
            Click any destination to expand full details and map view.
          </p>
          <span className="font-mono text-xs" style={{ color: "var(--ash)", opacity: 0.4, fontSize: "0.65rem" }}>
            行程表
          </span>
        </div>
      </div>
    </section>
  );
}