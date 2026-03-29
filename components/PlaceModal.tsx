"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Place } from "@/data/tripData";
import { placePhotos } from "./PlaceCard";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface PlaceModalProps {
  place: Place | null;
  onClose: () => void;
  onOpenGallery?: () => void;
}

const categoryColors: Record<string, string> = {
  Culture: "var(--jade)",
  Heritage: "var(--gold)",
  Nature: "var(--jade)",
  Food: "var(--vermillion)",
  Spirituality: "var(--gold)",
  History: "var(--ash)",
};

export default function PlaceModal({ place, onClose, onOpenGallery }: PlaceModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"info" | "map">("info");
  const [heroLoaded, setHeroLoaded] = useState(false);

  const photo = place ? placePhotos[place.id] : null;
  const color = place ? (categoryColors[place.category] || "var(--ash)") : "var(--ash)";

  useEffect(() => {
    if (place) {
      setActiveTab("info");
      setHeroLoaded(false);
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      tl.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: 0, duration: 0.55, ease: "power3.out" },
        "-=0.1"
      );
      tl.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: "power2.out" },
        "-=0.25"
      );
    }
  }, [place]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { x: "100%", duration: 0.4, ease: "power2.in" });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!place) return null;

  const getDirections = () => {
    if (place.city === "Taipei") return "Accessible by Taipei MRT. Taipei's metro system covers all major attractions efficiently.";
    if (place.city === "New Taipei") return "Take a bus or taxi from Taipei Main Station. Approximately 1–1.5 hours depending on traffic.";
    if (place.city === "Hualien") return "Take the Puyuma Express train from Taipei Main Station (~2 hours). Book tickets in advance.";
    if (place.city === "Nantou") return "Bus from Taichung HSR station to Shuishe Pier (~1.5 hours). HSR from Taipei to Taichung is 50 min.";
    return "Take the HSR (High Speed Rail) to the nearest station, then local bus or taxi.";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: "rgba(13,13,13,0.55)", backdropFilter: "blur(5px)" }}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex flex-col"
        style={{
          width: "min(620px, 100vw)",
          background: "var(--paper)",
          borderLeft: "1px solid var(--border-heavy)",
          overflowY: "auto",
          transform: "translateX(100%)",
        }}
      >
        {/* ─── Hero photo banner ─── */}
        <div className="relative overflow-hidden" style={{ height: 220, flexShrink: 0 }}>
          {photo ? (
            <>
              <img
                src={photo.primary}
                alt={place.name}
                className="w-full h-full object-cover"
                style={{
                  opacity: heroLoaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                  transform: "scale(1.04)",
                }}
                onLoad={() => setHeroLoaded(true)}
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(13,13,13,0.75) 0%, rgba(13,13,13,0.1) 55%, transparent 100%)",
                }}
              />
            </>
          ) : (
            <div className="w-full h-full" style={{ background: "var(--mist)" }} />
          )}

          {/* Overlay: category pill + close */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 10px",
                border: `1px solid ${color}`,
                color,
                background: "rgba(245,240,232,0.93)",
              }}
            >
              {place.category}
            </div>
            <button
              onClick={handleClose}
              className="w-9 h-9 flex items-center justify-center transition-colors"
              style={{
                background: "rgba(245,240,232,0.9)",
                border: "1px solid rgba(13,13,13,0.15)",
                color: "var(--ink)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Bottom: title + view all photos button */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between gap-3">
            <div>
              <h2
                className="font-display"
                style={{ fontSize: "1.7rem", fontWeight: 400, lineHeight: 1.1, color: "var(--paper)" }}
              >
                {place.name}
              </h2>
              <p className="font-body mt-0.5" style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)" }}>
                {place.chineseName} · {place.city}
              </p>
            </div>

            {onOpenGallery && photo && (
              <button
                onClick={onOpenGallery}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 transition-all hover:scale-105"
                style={{
                  background: "rgba(245,240,232,0.15)",
                  border: "1px solid rgba(245,240,232,0.3)",
                  color: "var(--paper)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <rect x="0.5" y="2" width="10" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
                  <circle cx="5.5" cy="5.75" r="1.75" stroke="currentColor" strokeWidth="1" />
                </svg>
                {photo.gallery.length} Photos
              </button>
            )}
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div
          className="flex sticky top-0 z-20"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--paper)" }}
        >
          {(["info", "map"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors"
              style={{
                letterSpacing: "0.15em",
                color: activeTab === tab ? "var(--ink)" : "var(--ash)",
                borderBottom: activeTab === tab ? "2px solid var(--vermillion)" : "2px solid transparent",
                fontSize: "0.62rem",
                background: "transparent",
              }}
            >
              {tab === "info" ? "Details" : "Map & Route"}
            </button>
          ))}
        </div>

        {/* ─── Tab Content ─── */}
        <div ref={contentRef} className="flex-1 p-7">
          {activeTab === "info" ? (
            <div className="space-y-7">
              {/* Long description */}
              <p
                className="font-body"
                style={{ fontSize: "0.97rem", lineHeight: 1.9, color: "var(--ink)", fontWeight: 300 }}
              >
                {place.longDescription}
              </p>

              {/* Duration + location stat row */}
              <div
                className="grid grid-cols-2 gap-0"
                style={{ border: "1px solid var(--border)" }}
              >
                {[
                  { label: "Visit Duration", value: place.duration },
                  { label: "Location", value: place.city },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{ borderRight: i === 0 ? "1px solid var(--border)" : "none" }}
                  >
                    <div
                      className="font-mono text-xs uppercase tracking-widest mb-1"
                      style={{ color: "var(--ash)", fontSize: "0.58rem", letterSpacing: "0.2em" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="font-display"
                      style={{ fontSize: "1.35rem", fontWeight: 400 }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Must try */}
              <div>
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-4"
                  style={{ color: "var(--ash)", letterSpacing: "0.2em", fontSize: "0.6rem" }}
                >
                  Must Experience
                </div>
                <div className="space-y-1">
                  {place.mustTry.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 py-3"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <span
                        className="font-mono flex-shrink-0 w-5 text-right"
                        style={{ fontSize: "0.65rem", color: "var(--vermillion)", marginTop: 2 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body" style={{ fontSize: "0.92rem", fontWeight: 300 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local tip */}
              <div
                className="p-5"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-2"
                  style={{ color: "var(--gold)", letterSpacing: "0.2em", fontSize: "0.6rem" }}
                >
                  ✦ Local Tip
                </div>
                <p
                  className="font-body"
                  style={{ fontSize: "0.88rem", lineHeight: 1.75, fontWeight: 300 }}
                >
                  {place.tips}
                </p>
              </div>

              {/* Coordinates + map link */}
              <div
                className="flex items-center justify-between"
                style={{ fontSize: "0.75rem", color: "var(--ash)" }}
              >
                <span className="font-mono" style={{ opacity: 0.6, fontSize: "0.6rem" }}>
                  {place.lat.toFixed(5)}°N · {place.lng.toFixed(5)}°E
                </span>
                <button
                  onClick={() => setActiveTab("map")}
                  className="font-mono flex items-center gap-1.5 transition-colors hover:text-ink"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--vermillion)" }}
                >
                  Open map →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p
                  className="font-body mb-1"
                  style={{ fontSize: "0.88rem", color: "var(--ash)", fontWeight: 300 }}
                >
                  {place.name} — {place.city}, Taiwan
                </p>
                <div className="font-mono" style={{ fontSize: "0.6rem", color: "var(--ash)", opacity: 0.6 }}>
                  {place.lat.toFixed(6)}°N · {place.lng.toFixed(6)}°E
                </div>
              </div>

              <div
                className="overflow-hidden"
                style={{ height: 340, border: "1px solid var(--border-heavy)" }}
              >
                <MapView lat={place.lat} lng={place.lng} name={place.name} />
              </div>

              <div
                className="p-5"
                style={{ background: "var(--mist)", border: "1px solid var(--border)" }}
              >
                <div
                  className="font-mono text-xs uppercase tracking-widest mb-2"
                  style={{ color: "var(--ash)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
                >
                  Getting There
                </div>
                <p className="font-body" style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.75 }}>
                  {getDirections()}
                </p>
              </div>

              {/* Google Maps link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono transition-all hover:opacity-70"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--vermillion)",
                }}
              >
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                  <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 6 3a1.5 1.5 0 0 1 0 3.5z" fill="currentColor" />
                </svg>
                Open in Google Maps ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}