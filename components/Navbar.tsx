"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { id: "hero",       label: "Overview",  cn: "概覽", num: "00" },
  { id: "places",     label: "Places",    cn: "景點", num: "01" },
  { id: "itinerary",  label: "Itinerary", cn: "行程", num: "02" },
  { id: "food",       label: "Food",      cn: "美食", num: "03" },
  { id: "essentials", label: "Tips",      cn: "提示", num: "04" },
];

export default function Navbar() {
  const navRef        = useRef<HTMLElement>(null);
  const drawerRef     = useRef<HTMLDivElement>(null);
  const drawerBgRef   = useRef<HTMLDivElement>(null);
  const drawerItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const burgerRef     = useRef<HTMLButtonElement>(null);
  const line1Ref      = useRef<HTMLSpanElement>(null);
  const line2Ref      = useRef<HTMLSpanElement>(null);
  const line3Ref      = useRef<HTMLSpanElement>(null);

  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen]       = useState(false);

  // ── Initial nav entrance ────────────────────────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.8 }
    );
  }, []);

  // ── Scroll tracking ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Menu open/close animation ───────────────────────────────────────────────
  useEffect(() => {
    const drawer = drawerRef.current;
    const bg     = drawerBgRef.current;
    const items  = drawerItemsRef.current.filter(Boolean);

    if (menuOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      // Slide drawer in from right
      gsap.set(drawer, { display: "flex" });
      gsap.fromTo(drawer, { x: "100%" }, { x: "0%", duration: 0.55, ease: "power3.out" });

      // Fade backdrop
      gsap.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.35 });

      // Stagger menu items up
      gsap.fromTo(
        items,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.45, ease: "power2.out", delay: 0.15 }
      );

      // Burger → X
      gsap.to(line1Ref.current, { y: 6, rotate: 45,  duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { opacity: 0,         duration: 0.15 });
      gsap.to(line3Ref.current, { y: -6, rotate: -45, duration: 0.3, ease: "power2.inOut" });
    } else {
      document.body.style.overflow = "";

      gsap.to(drawer, {
        x: "100%",
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => { if (drawer) drawer.style.display = "none"; },
      });
      gsap.to(bg, { opacity: 0, duration: 0.3 });

      // X → Burger
      gsap.to(line1Ref.current, { y: 0, rotate: 0,  duration: 0.3, ease: "power2.inOut" });
      gsap.to(line2Ref.current, { opacity: 1,        duration: 0.25, delay: 0.05 });
      gsap.to(line3Ref.current, { y: 0, rotate: 0,  duration: 0.3, ease: "power2.inOut" });
    }
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, menuOpen ? 500 : 0);
  };

  const navBg = scrolled
    ? "rgba(245,240,232,0.94)"
    : "transparent";
  const navBorder = scrolled ? "1px solid rgba(13,13,13,0.1)" : "none";

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: navBorder,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 border flex items-center justify-center flex-shrink-0"
              style={{ borderColor: "var(--vermillion)", color: "var(--vermillion)" }}
            >
              <span className="font-mono text-xs">台</span>
            </div>
            <span
              className="font-display hidden sm:block"
              style={{ letterSpacing: "0.25em", fontSize: "0.7rem", textTransform: "uppercase" }}
            >
              Taiwan 2027
            </span>
          </button>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
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

          {/* ── Right: date chip + burger ── */}
          <div className="flex items-center gap-4">
            <div
              className="hidden md:flex items-center px-4 py-1.5 border"
              style={{ borderColor: "var(--border-heavy)", fontSize: "0.65rem" }}
            >
              <span className="font-mono tracking-widest uppercase" style={{ color: "var(--ash)" }}>
                January 2027
              </span>
            </div>

            {/* Burger button — mobile only */}
            <button
              ref={burgerRef}
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-0 relative z-[60]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                ref={line1Ref}
                className="block"
                style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 2, marginBottom: 5, transformOrigin: "center" }}
              />
              <span
                ref={line2Ref}
                className="block"
                style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 2, marginBottom: 5 }}
              />
              <span
                ref={line3Ref}
                className="block"
                style={{ width: 22, height: 1.5, background: "var(--ink)", borderRadius: 2, transformOrigin: "center" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer backdrop ── */}
      <div
        ref={drawerBgRef}
        className="fixed inset-0 z-[55] md:hidden"
        style={{ background: "rgba(13,13,13,0.5)", backdropFilter: "blur(4px)", opacity: 0, pointerEvents: menuOpen ? "auto" : "none" }}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Mobile drawer ── */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 bottom-0 z-[58] md:hidden flex-col"
        style={{
          width: "min(320px, 88vw)",
          background: "var(--paper)",
          borderLeft: "1px solid var(--border-heavy)",
          display: "none",
          transform: "translateX(100%)",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-7 pt-6 pb-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <div
              className="font-mono"
              style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--vermillion)", textTransform: "uppercase" }}
            >
              Navigation
            </div>
            <div
              className="font-display mt-0.5"
              style={{ fontSize: "1.1rem", fontWeight: 400, letterSpacing: "0.1em" }}
            >
              Taiwan 2027
            </div>
          </div>
          {/* Decorative kanji */}
          <div
            className="font-display select-none"
            style={{ fontSize: "2.5rem", fontWeight: 700, color: "rgba(13,13,13,0.07)", lineHeight: 1 }}
          >
            台
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-6 pt-6 pb-4 gap-0">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              ref={(el) => { drawerItemsRef.current[i] = el; }}
              onClick={() => scrollTo(link.id)}
              className="flex items-center gap-5 py-5 text-left group"
              style={{
                borderBottom: "1px solid var(--border)",
                background: "none",
              }}
            >
              {/* Number */}
              <span
                className="font-mono flex-shrink-0"
                style={{ fontSize: "0.55rem", color: "var(--vermillion)", letterSpacing: "0.15em", width: 24 }}
              >
                {link.num}
              </span>

              {/* Label */}
              <div className="flex-1">
                <div
                  className="font-display transition-colors duration-200"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: activeSection === link.id ? "var(--vermillion)" : "var(--ink)",
                    lineHeight: 1.1,
                  }}
                >
                  {link.label}
                </div>
                <div
                  className="font-body mt-0.5"
                  style={{ fontSize: "0.75rem", color: "var(--ash)", letterSpacing: "0.08em" }}
                >
                  {link.cn}
                </div>
              </div>

              {/* Arrow */}
              <svg
                width="16" height="8" viewBox="0 0 16 8" fill="none"
                className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: activeSection === link.id ? "var(--vermillion)" : "var(--ash)", opacity: 0.5 }}
              >
                <path d="M0 4H14M14 4L11 1M14 4L11 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </nav>

        {/* Drawer footer */}
        <div
          className="mt-auto px-7 py-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="font-mono" style={{ fontSize: "0.55rem", color: "var(--ash)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
            Trip Dates
          </div>
          <div className="font-display" style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)" }}>
            January 11–15, 2027
          </div>
          <div className="font-body mt-1" style={{ fontSize: "0.75rem", color: "var(--ash)", fontWeight: 300 }}>
            5 days · 17 destinations
          </div>

          {/* Decorative line */}
          <div className="mt-5 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "var(--vermillion)", opacity: 0.3 }} />
            <span className="font-mono" style={{ fontSize: "0.55rem", color: "var(--ash)", opacity: 0.4, letterSpacing: "0.1em" }}>
              台灣 · TAIWAN
            </span>
          </div>
        </div>
      </div>
    </>
  );
}