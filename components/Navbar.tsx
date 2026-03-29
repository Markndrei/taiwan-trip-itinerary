"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.8 }
    );

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ["hero", "places", "itinerary", "food", "essentials"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "hero", label: "Overview", cn: "概覽" },
    { id: "places", label: "Places", cn: "景點" },
    { id: "itinerary", label: "Itinerary", cn: "行程" },
    { id: "food", label: "Food", cn: "美食" },
    { id: "essentials", label: "Tips", cn: "提示" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(245, 240, 232, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,13,13,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-3 group"
        >
          <div
            className="w-8 h-8 border border-current flex items-center justify-center"
            style={{ color: "var(--vermillion)" }}
          >
            <span className="text-xs font-mono">台</span>
          </div>
          <span
            className="font-display text-sm tracking-[0.2em] uppercase hidden sm:block"
            style={{ letterSpacing: "0.25em", fontSize: "0.7rem" }}
          >
            Taiwan 2027
          </span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative group flex flex-col items-center"
            >
              <span
                className="font-mono text-xs tracking-widest uppercase transition-colors duration-200"
                style={{
                  color: activeSection === link.id ? "var(--vermillion)" : "var(--ash)",
                  letterSpacing: "0.15em",
                }}
              >
                {link.label}
              </span>
              <span
                className="text-xs opacity-50 transition-opacity group-hover:opacity-100"
                style={{ fontSize: "0.55rem", fontFamily: "var(--font-body)" }}
              >
                {link.cn}
              </span>
              <span
                className="absolute -bottom-1 left-0 h-px bg-current transition-all duration-300"
                style={{
                  width: activeSection === link.id ? "100%" : "0",
                  color: "var(--vermillion)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Date chip */}
        <div
          className="hidden md:flex items-center gap-2 px-4 py-1.5 border"
          style={{ borderColor: "var(--border-heavy)", fontSize: "0.65rem" }}
        >
          <span className="font-mono tracking-widest uppercase" style={{ color: "var(--ash)" }}>
            January 2027
          </span>
        </div>
      </div>
    </nav>
  );
}