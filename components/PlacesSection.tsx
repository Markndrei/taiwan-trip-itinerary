"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { places, Place } from "@/data/tripData";
import PlaceCard from "./PlaceCard";
import PlaceModal from "./PlaceModal";
import PhotoLightbox from "./PhotoLightBox";

const categories = ["All", "Culture", "Heritage", "Nature", "Food", "Spirituality", "History"];

export default function PlacesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [photoPlace, setPhotoPlace] = useState<Place | null>(null);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    if (!header) return;
    gsap.fromTo(
      header.querySelectorAll(".header-anim"),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: header, start: "top 80%" },
      }
    );
  }, []);

  // Animate cards in on every filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".place-card");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.065, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, [selectedCategory]);

  const filteredPlaces =
    selectedCategory === "All"
      ? places
      : places.filter((p) => p.category === selectedCategory);

  const handleOpenPlace = (place: Place) => {
    setModalKey((k) => k + 1);
    setSelectedPlace(place);
    document.body.style.overflow = "hidden";
  };

  const handleOpenPhoto = (place: Place) => {
    setPhotoPlace(place);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedPlace(null);
    document.body.style.overflow = "";
  };

  const handleClosePhoto = () => {
    setPhotoPlace(null);
    document.body.style.overflow = "";
  };

  return (
    <section
      id="places"
      ref={sectionRef}
      className="relative py-32"
      style={{ background: "var(--cream)" }}
    >
      {/* Side label */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3 pointer-events-none"
        style={{ writingMode: "vertical-rl" }}
      >
        <div className="h-12 w-px" style={{ background: "var(--vermillion)" }} />
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--ash)", letterSpacing: "0.25em" }}>
          Destinations
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="header-anim flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--vermillion)", letterSpacing: "0.25em" }}>
              02 — Places
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-heavy)" }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="header-anim font-display" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.05 }}>
                Places to Visit
              </h2>
              <p className="header-anim font-body mt-3 max-w-lg" style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7 }}>
                Eight handpicked destinations spanning temples, gorges, night markets,
                and highland lakes — each offering a different layer of Taiwan&apos;s character.
              </p>
            </div>
            <div className="header-anim flex-shrink-0 flex items-baseline gap-2" style={{ fontFamily: "var(--font-display)" }}>
              <span style={{ fontSize: "4rem", fontWeight: 300, lineHeight: 1, color: "var(--vermillion)" }}>
                {filteredPlaces.length}
              </span>
              <span style={{ fontSize: "1rem", color: "var(--ash)" }}>
                destination{filteredPlaces.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Filter pills */}
          <div className="header-anim flex flex-wrap gap-2 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="category-pill transition-all duration-200"
                style={{
                  color: selectedCategory === cat ? "var(--paper)" : "var(--ash)",
                  borderColor: selectedCategory === cat ? "var(--ink)" : "var(--border-heavy)",
                  background: selectedCategory === cat ? "var(--ink)" : "transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tip bar */}
        <div className="mb-8 flex items-center gap-3 py-3 px-5" style={{ background: "rgba(13,13,13,0.04)", border: "1px solid var(--border)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="var(--vermillion)" strokeWidth="1" />
            <path d="M7 6v4M7 4.5V5" stroke="var(--vermillion)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="font-body" style={{ fontSize: "0.8rem", color: "var(--ash)", fontWeight: 300 }}>
            Hover any card to preview · Click <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Details</strong> for full info & map · Click <strong style={{ color: "var(--ink)", fontWeight: 500 }}>Photos</strong> for the gallery
          </p>
        </div>

        {/* Card grid — no reveal class, GSAP handles it per filter */}
        <div
          ref={gridRef}
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {filteredPlaces.map((place, i) => (
            <PlaceCard
              key={place.id}
              place={place}
              index={i}
              onClick={handleOpenPlace}
              onPhotoClick={handleOpenPhoto}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="font-body" style={{ fontSize: "0.85rem", color: "var(--ash)", fontWeight: 300 }}>
            All photos via Unsplash — free to use.
          </p>
          <span className="font-mono text-xs" style={{ color: "var(--ash)", opacity: 0.5, fontSize: "0.65rem" }}>
            景點資訊
          </span>
        </div>
      </div>

      {selectedPlace && (
        <PlaceModal
          key={modalKey}
          place={selectedPlace}
          onClose={handleCloseModal}
          onOpenGallery={() => setPhotoPlace(selectedPlace)}
        />
      )}

      {photoPlace && (
        <PhotoLightbox
          place={photoPlace}
          onClose={handleClosePhoto}
        />
      )}
    </section>
  );
}