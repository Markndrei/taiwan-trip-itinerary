"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const tips = [
  {
    category: "Transport",
    cn: "交通",
    icon: "🚄",
    items: [
      { title: "EasyCard (悠遊卡)", desc: "Top up at any convenience store. Works on MRT, buses, and some taxis across Taiwan." },
      { title: "HSR Pass", desc: "Buy the Taiwan HSR 3-Day Pass for unlimited high-speed rail between cities. Saves significantly." },
      { title: "Taiwan Rail (TRA)", desc: "Slower but scenic for Hualien/East Coast routes. Book Puyuma Express online in advance." },
    ],
  },
  {
    category: "Money",
    cn: "金錢",
    icon: "💴",
    items: [
      { title: "Cash is King", desc: "Many night market stalls and small temples are cash-only. Withdraw NT$ at 7-Eleven ATMs (lowest fees)." },
      { title: "Budget Guide", desc: "Street food: NT$40–120/item. Sit-down: NT$150–400. Hotels: NT$1,500–4,000/night." },
      { title: "Tipping", desc: "Not customary in Taiwan. High-end restaurants may add a 10% service charge automatically." },
    ],
  },
  {
    category: "Language",
    cn: "語言",
    icon: "🗣",
    items: [
      { title: "Mandarin & Taiwanese", desc: "Mandarin is official. Most younger people and hotel staff speak English. Google Translate camera works wonders." },
      { title: "Key Phrases", desc: "謝謝 (Xièxiè) = Thank you · 多少錢 (Duōshǎo qián) = How much? · 廁所 (Cèsuǒ) = Toilet" },
      { title: "Traditional Characters", desc: "Taiwan uses Traditional Chinese, not Simplified. Apps like Pleco are invaluable for reading menus." },
    ],
  },
  {
    category: "Connectivity",
    cn: "網路",
    icon: "📶",
    items: [
      { title: "SIM Card", desc: "Buy a prepaid data SIM at TPE airport arrivals — Chunghwa, FarEasTone, or Taiwan Star. 10 days unlimited ~NT$300." },
      { title: "7-Eleven WiFi", desc: "Free WiFi at all convenience stores. Taiwan has the world's highest 7-Eleven density." },
      { title: "Google Maps", desc: "Works excellently in Taiwan. Download offline maps for Hualien/Taroko where signal drops in the gorge." },
    ],
  },
  {
    category: "Health",
    cn: "健康",
    icon: "🏥",
    items: [
      { title: "NHI & Travel Insurance", desc: "Get travel insurance with medical coverage. Taiwan hospitals are excellent and affordable but insurance is essential." },
      { title: "Convenience Stores", desc: "7-Eleven and FamilyMart sell basic medicine (pain relief, antidiarrheals, plasters) around the clock." },
      { title: "Sun & Heat", desc: "March in Taiwan is mild (18–24°C) but carry sunscreen — UV index is high year-round." },
    ],
  },
  {
    category: "Culture",
    cn: "文化",
    icon: "🏮",
    items: [
      { title: "Temple Etiquette", desc: "Dress modestly (cover shoulders/knees). Don't point at deities. Step over — not on — threshold beams." },
      { title: "Night Market Order", desc: "Order, receive a receipt or token, collect when called. Don't skip queues — they're orderly and respected." },
      { title: "Betel Nut", desc: "Red-stained sidewalks are from betel nut juice, not blood. A common stimulant especially in rural areas." },
    ],
  },
];

export default function EssentialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headerRef.current?.querySelectorAll(".hdr") || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.1, duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
      }
    );

    const cards = sectionRef.current?.querySelectorAll(".tip-card") || [];
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.08, duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      }
    );
  }, []);

  const handleCategoryClick = (i: number) => {
    if (i === activeCategory) return;
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, x: 12 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
    setActiveCategory(i);
  };

  const active = tips[activeCategory];

  return (
    <section
      ref={sectionRef}
      id="essentials"
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
              04 — Essentials
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-heavy)" }} />
          </div>
          <h2
            className="hdr font-display"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, lineHeight: 1.05 }}
          >
            Travel Tips
          </h2>
          <p
            className="hdr font-body mt-3 max-w-lg"
            style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7 }}
          >
            Everything you need to know before you go — transport, money, language, 
            connectivity, and cultural customs.
          </p>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-0 border" style={{ borderColor: "var(--border-heavy)" }}>
          {/* Category sidebar */}
          <div
            className="flex-shrink-0 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible"
            style={{
              borderRight: "1px solid var(--border)",
              minWidth: 180,
            }}
          >
            {tips.map((tip, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(i)}
                className="tip-card flex items-center gap-3 text-left px-5 py-4 transition-all duration-200 whitespace-nowrap"
                style={{
                  background: i === activeCategory ? "var(--ink)" : "transparent",
                  borderBottom: "1px solid var(--border)",
                  minWidth: 160,
                }}
              >
                <span style={{ fontSize: "1rem" }}>{tip.icon}</span>
                <div>
                  <div
                    className="font-mono text-xs uppercase tracking-wide"
                    style={{
                      color: i === activeCategory ? "var(--paper)" : "var(--ink)",
                      letterSpacing: "0.1em",
                      fontSize: "0.65rem",
                    }}
                  >
                    {tip.category}
                  </div>
                  <div
                    className="font-body"
                    style={{
                      fontSize: "0.7rem",
                      color: i === activeCategory ? "rgba(245,240,232,0.4)" : "var(--ash)",
                    }}
                  >
                    {tip.cn}
                  </div>
                </div>
                {i === activeCategory && (
                  <div
                    className="ml-auto"
                    style={{ color: "var(--vermillion)" }}
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M0 4H10M10 4L7 1M10 4L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div ref={panelRef} className="flex-1 p-8 lg:p-12">
            <div className="mb-8 flex items-center gap-4">
              <span style={{ fontSize: "2rem" }}>{active.icon}</span>
              <div>
                <h3
                  className="font-display"
                  style={{ fontSize: "1.8rem", fontWeight: 400 }}
                >
                  {active.category}
                </h3>
                <span
                  className="font-body"
                  style={{ fontSize: "0.9rem", color: "var(--ash)" }}
                >
                  {active.cn}
                </span>
              </div>
            </div>

            <div className="space-y-0">
              {active.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-6 py-6"
                  style={{ borderBottom: i < active.items.length - 1 ? "1px solid var(--border)" : "none" }}
                >
                  {/* Number */}
                  <div
                    className="flex-shrink-0 font-mono pt-0.5"
                    style={{ fontSize: "0.6rem", color: "var(--vermillion)", width: 24, letterSpacing: "0.1em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-display mb-2"
                      style={{ fontSize: "1.15rem", fontWeight: 500 }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="font-body"
                      style={{ fontSize: "0.9rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.75 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick reference row */}
        <div
          className="reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-0"
          style={{ border: "1px solid var(--border)" }}
        >
          {[
            { label: "Currency", value: "NT$ (NTD)", cn: "新台幣" },
            { label: "Voltage", value: "110V / 60Hz", cn: "電壓" },
            { label: "Time Zone", value: "UTC+8 (CST)", cn: "時區" },
            { label: "Emergency", value: "110 / 119", cn: "緊急電話" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 flex flex-col gap-1"
              style={{
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--ash)", fontSize: "0.6rem", letterSpacing: "0.2em" }}
              >
                {item.label}
              </span>
              <span
                className="font-display"
                style={{ fontSize: "1.3rem", fontWeight: 400 }}
              >
                {item.value}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "0.7rem", color: "var(--ash)", opacity: 0.5 }}
              >
                {item.cn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}