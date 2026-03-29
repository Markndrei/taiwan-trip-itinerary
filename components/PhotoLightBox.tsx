"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Place } from "@/data/tripData";
import { placePhotos } from "./PlaceCard";

interface PhotoLightboxProps {
  place: Place;
  onClose: () => void;
}

export default function PhotoLightbox({ place, onClose }: PhotoLightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>([false, false, false]);
  const [transitioning, setTransitioning] = useState(false);

  const photos = placePhotos[place.id];
  if (!photos) return null;

  const allPhotos = photos.gallery;

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    tl.fromTo(
      panelRef.current,
      { scale: 0.96, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
      "-=0.1"
    );
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { scale: 0.96, opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.15");
  }, [onClose]);

  const navigateTo = useCallback((idx: number) => {
    if (transitioning || idx === activeIdx) return;
    setTransitioning(true);
    gsap.to(imgRef.current, {
      opacity: 0,
      x: idx > activeIdx ? -20 : 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveIdx(idx);
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, x: idx > activeIdx ? 20 : -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => setTransitioning(false),
          }
        );
      },
    });
  }, [activeIdx, transitioning]);

  const prev = useCallback(() => navigateTo((activeIdx - 1 + allPhotos.length) % allPhotos.length), [activeIdx, allPhotos.length, navigateTo]);
  const next = useCallback(() => navigateTo((activeIdx + 1) % allPhotos.length), [activeIdx, allPhotos.length, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, prev, next]);

  const markLoaded = (idx: number) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const place_detail_rows = [
    { label: "City", value: place.city },
    { label: "Duration", value: place.duration },
    { label: "Category", value: place.category },
    { label: "Coordinates", value: `${place.lat.toFixed(4)}°N, ${place.lng.toFixed(4)}°E` },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(8px)" }}
        onClick={handleClose}
      />

      {/* Main panel */}
      <div
        ref={panelRef}
        className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl"
        style={{
          maxHeight: "92vh",
          background: "var(--paper)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Left: photo viewer ─── */}
        <div
          className="flex-1 relative flex flex-col"
          style={{ background: "#0D0D0D", minHeight: 340 }}
        >
          {/* Main image */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center" style={{ minHeight: 300 }}>
            {/* Loading shimmer */}
            {!loaded[activeIdx] && (
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, #161616 25%, #222 50%, #161616 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            )}

            <img
              ref={imgRef}
              src={allPhotos[activeIdx]}
              alt={`${place.name} photo ${activeIdx + 1}`}
              className="w-full h-full object-cover"
              style={{ maxHeight: "60vh", objectFit: "cover" }}
              onLoad={() => markLoaded(activeIdx)}
              loading="eager"
            />

            {/* Prev / Next arrows */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(245,240,232,0.12)",
                    border: "1px solid rgba(245,240,232,0.2)",
                    color: "var(--paper)",
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M15 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(245,240,232,0.12)",
                    border: "1px solid rgba(245,240,232,0.2)",
                    color: "var(--paper)",
                  }}
                >
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <path d="M1 7H15M15 7L9 1M15 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </>
            )}

            {/* Counter */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "rgba(245,240,232,0.5)",
                background: "rgba(13,13,13,0.5)",
                padding: "4px 12px",
              }}
            >
              {String(activeIdx + 1).padStart(2, "0")} / {String(allPhotos.length).padStart(2, "0")}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            className="flex gap-1.5 p-3"
            style={{ background: "#0A0A0A", borderTop: "1px solid rgba(245,240,232,0.06)" }}
          >
            {allPhotos.map((url, i) => (
              <button
                key={i}
                onClick={() => navigateTo(i)}
                className="flex-1 relative overflow-hidden transition-all duration-200"
                style={{
                  height: 56,
                  border: i === activeIdx ? "2px solid var(--vermillion)" : "2px solid transparent",
                  opacity: i === activeIdx ? 1 : 0.5,
                }}
              >
                <img
                  src={`${url.split("?")[0]}?w=200&q=60`}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Photo credit */}
          <div
            className="px-4 py-2 font-mono"
            style={{
              fontSize: "0.52rem",
              letterSpacing: "0.08em",
              color: "rgba(245,240,232,0.2)",
              background: "#0A0A0A",
            }}
          >
            {photos.credit} · Free to use via Unsplash
          </div>
        </div>

        {/* ─── Right: place info panel ─── */}
        <div
          className="flex flex-col"
          style={{
            width: "100%",
            maxWidth: 320,
            borderLeft: "1px solid var(--border)",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div
            className="p-6 pb-5 flex items-start justify-between gap-3"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <div
                className="font-mono text-xs mb-2"
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--vermillion)",
                }}
              >
                📍 {place.city}, Taiwan
              </div>
              <h2
                className="font-display"
                style={{ fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.15 }}
              >
                {place.name}
              </h2>
              <p className="font-body mt-1" style={{ fontSize: "0.82rem", color: "var(--ash)" }}>
                {place.chineseName}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center border transition-colors"
              style={{
                borderColor: "var(--border-heavy)",
                color: "var(--ash)",
              }}
              aria-label="Close"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Description */}
          <div className="p-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <p
              className="font-body"
              style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--ink)", fontWeight: 300 }}
            >
              {place.longDescription}
            </p>
          </div>

          {/* Quick facts */}
          <div className="p-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--ash)", letterSpacing: "0.2em", fontSize: "0.58rem" }}
            >
              Quick Facts
            </div>
            <div className="space-y-3">
              {place_detail_rows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-3">
                  <span
                    className="font-mono text-xs"
                    style={{ fontSize: "0.6rem", color: "var(--ash)", letterSpacing: "0.1em", flexShrink: 0 }}
                  >
                    {row.label}
                  </span>
                  <span
                    className="font-body text-right"
                    style={{ fontSize: "0.82rem", fontWeight: 300 }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Must try */}
          <div className="p-6 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
            <div
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--ash)", letterSpacing: "0.2em", fontSize: "0.58rem" }}
            >
              Must Experience
            </div>
            <div className="space-y-2">
              {place.mustTry.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: "0.58rem", color: "var(--vermillion)", marginTop: 3 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-body"
                    style={{ fontSize: "0.84rem", fontWeight: 300, lineHeight: 1.5 }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Local tip */}
          <div className="p-6">
            <div
              className="font-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--gold)", letterSpacing: "0.2em", fontSize: "0.58rem" }}
            >
              ✦ Local Tip
            </div>
            <p
              className="font-body"
              style={{ fontSize: "0.84rem", lineHeight: 1.7, fontWeight: 300, color: "var(--ash)" }}
            >
              {place.tips}
            </p>
          </div>

          {/* Keyboard hint */}
          <div
            className="mt-auto px-6 py-4 flex items-center gap-3"
            style={{ borderTop: "1px solid var(--border)", background: "var(--mist)" }}
          >
            <kbd
              className="font-mono"
              style={{
                fontSize: "0.55rem",
                padding: "2px 6px",
                border: "1px solid var(--border-heavy)",
                background: "var(--paper)",
                letterSpacing: "0.05em",
              }}
            >
              ←
            </kbd>
            <kbd
              className="font-mono"
              style={{
                fontSize: "0.55rem",
                padding: "2px 6px",
                border: "1px solid var(--border-heavy)",
                background: "var(--paper)",
                letterSpacing: "0.05em",
              }}
            >
              →
            </kbd>
            <span
              className="font-mono"
              style={{ fontSize: "0.55rem", color: "var(--ash)", opacity: 0.6, letterSpacing: "0.08em" }}
            >
              Navigate · ESC to close
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}