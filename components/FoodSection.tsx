"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const dayFoods = [
  {
    day: 1,
    label: "Taipei",
    cn: "台北",
    color: "#E84923",
    intro: "Your first day is a crash-course in Taipei classics — from street carts to the city's most famous night market.",
    items: [
      {
        name: "Beef Noodle Soup",
        cn: "紅燒牛肉麵",
        tag: "Lunch / Dinner",
        price: "NT$150–280",
        where: "Lin Dong Fang, Da'an District",
        desc: "The unofficial national dish — slow-braised beef in a rich, spiced soy broth with hand-pulled noodles. Seek it out on Day 1 while you're navigating central Taipei.",
        tip: "Go at lunch to avoid the dinner queue.",
        img: "/beef-noodle-soup.webp",
        mustTry: true,
      },
      {
        name: "Scallion Pancake",
        cn: "蔥抓餅",
        tag: "Breakfast / Street",
        price: "NT$35–55",
        where: "Street stalls near Ximending",
        desc: "Flaky, layered flatbread stuffed with scallions — often topped with egg, cheese, or chili. Grab one from a Ximending street cart at lunch.",
        tip: "Egg added = 10 NT extra and absolutely worth it.",
        img: "/scallion-pancake.webp",
        mustTry: false,
      },
      {
        name: "XXL Crispy Chicken",
        cn: "大雞排",
        tag: "Evening — Shilin",
        price: "NT$70–100",
        where: "Shilin Night Market",
        desc: "A freshly fried full half-bird, pounded thin, seasoned with basil salt and white pepper. The definitive Shilin night market eat.",
        tip: "Eat immediately — it loses its crunch fast.",
        img: "/shilin-chicken.jpg",
        mustTry: true,
      },
      {
        name: "Oyster Omelette",
        cn: "蚵仔煎",
        tag: "Evening — Shilin",
        price: "NT$60–100",
        where: "Shilin Night Market underground",
        desc: "Fresh oysters bound in a chewy starch dough, pan-fried and topped with a sweet red sauce. A classic Taiwanese night market dish you must tick off on Day 1.",
        tip: "Order at the underground section — more comfortable seating.",
        img: "/oyster-omelette.jpg",
        mustTry: true,
      },
    ],
  },
  {
    day: 2,
    label: "North Coast",
    cn: "北海岸",
    color: "#E8A023",
    intro: "The north coast loop is as much a food trail as a sightseeing one — braised pork on train tracks, taro balls above the Pacific.",
    items: [
      {
        name: "Braised Pork Rice",
        cn: "滷肉飯",
        tag: "Lunch — Shifen",
        price: "NT$45–70",
        where: "Street stalls, Shifen Old Street",
        desc: "The definitive Taiwanese comfort food — minced pork belly slow-braised in soy and five spice, spooned over steamed white rice. Grab a bowl between sky lantern releases.",
        tip: "Get a braised egg on the side — it's always simmered in the same pot.",
        img: "/braised-pork-rice.jpg",
        mustTry: false,
      },
      {
        name: "Taro Ball Soup",
        cn: "芋圓",
        tag: "Afternoon — Jiufen",
        price: "NT$60–80",
        where: "A-Zhu, Jiufen Old Street",
        desc: "Chewy, jewel-coloured spheres of taro and sweet potato in warm ginger syrup — Jiufen's most famous sweet. Eat them at a cliffside teahouse as the lanterns ignite.",
        tip: "A-Zhu is the original — look for the queue, not the sign.",
        img: "/taro-balls.webp",
        mustTry: true,
      },
      {
        name: "Fish Ball Soup",
        cn: "魚丸湯",
        tag: "Evening — Jiufen",
        price: "NT$50–70",
        where: "Jishan Street stalls",
        desc: "Springy, hand-formed fish balls in a delicate clear broth — the street food that locals grab between teahouse visits on Jiufen's famous stone steps.",
        tip: "The best stalls are mid-lane, not at the entrance.",
        img: "/Fish-Ball-Noodle-Soup.jpg",
        mustTry: false,
      },
    ],
  },
  {
    day: 3,
    label: "Hot Springs & Tea",
    cn: "溫泉茶香",
    color: "#23A0E8",
    intro: "Day 3 is the tea and temple route — hot spring eggs at dawn, tieguanyin in the hills, and Raohe's legendary baked buns at dusk.",
    items: [
      {
        name: "Hot Spring Boiled Eggs",
        cn: "溫泉蛋",
        tag: "Morning — Beitou",
        price: "NT$20–30",
        where: "Adjacent stall, Thermal Valley",
        desc: "Eggs slow-cooked in the 98°C sulphurous spring water beside the jade-green lake. A simple, ritual pleasure — eat them watching the lake bubble.",
        tip: "Buy directly from the stall at the Thermal Valley entrance.",
        img: "/boiled-eggs.jpg",
        mustTry: false,
      },
      {
        name: "Tieguanyin Tea",
        cn: "鐵觀音",
        tag: "Afternoon — Maokong",
        price: "NT$150–300 (pot)",
        where: "Hilltop teahouses, Maokong",
        desc: "Taiwan's most celebrated oolong — roasted to a deep amber, with notes of orchid and toasted grain. Drink it slowly at a hillside teahouse with the city below.",
        tip: "Order tea-braised dishes too — tea eggs, tea duck, tea chicken.",
        img: "/tieguanyin-tea.jpg",
        mustTry: true,
      },
      {
        name: "Black Pepper Bun",
        cn: "胡椒餅",
        tag: "Dinner — Raohe",
        price: "NT$55–65",
        where: "Entrance stall, Raohe Night Market",
        desc: "Pork and scallion filling baked inside a sesame-crusted dough ball in a clay tandoor — blackened, blistered, and devastatingly good. The dish Raohe is famous for.",
        tip: "Queue by 6:30 PM. Eat standing up, immediately.",
        img: "/pepper-bun.jpg",
        mustTry: true,
      },
      {
        name: "Medicinal Herb Soup",
        cn: "藥燉排骨",
        tag: "Dinner — Raohe",
        price: "NT$80–120",
        where: "Mid-lane stalls, Raohe Night Market",
        desc: "Pork ribs slow-simmered with a blend of traditional Chinese medicinal herbs — warming, earthy, and restorative. A favourite on cold January evenings.",
        tip: "Pairs perfectly with a bowl of braised rice.",
        img: "/herb-soup.jpg",
        mustTry: false,
      },
    ],
  },
  {
    day: 4,
    label: "Valleys & The Lake",
    cn: "峽谷湖光",
    color: "#23E89A",
    intro: "From Atayal wild boar in the mountain village to indigenous lake-side cuisine — Day 4 is your most distinct food day.",
    items: [
      {
        name: "Wild Boar Sausage",
        cn: "山豬肉香腸",
        tag: "Morning — Wulai",
        price: "NT$60–80",
        where: "Atayal stalls, Wulai Old Street",
        desc: "Grilled over charcoal, these Atayal indigenous sausages are gamier and more deeply flavoured than standard Taiwanese pork sausage. A genuine taste of mountain food culture.",
        tip: "Pair with a mochi from the next stall — the sweetness cuts through the smoke.",
        img: "/sausage.webp",
        mustTry: true,
      },
      {
        name: "Fresh-Pounded Mochi",
        cn: "麻糬",
        tag: "Morning — Wulai",
        price: "NT$30–50",
        where: "Wulai Old Street",
        desc: "Sticky glutinous rice pounded to a silken, elastic dough and rolled in peanut sugar or sesame. Watch it being made in the street — the pounding is half the show.",
        tip: "Eat within minutes — it hardens quickly as it cools.",
        img: "/fresh-mochi.jpg",
        mustTry: false,
      },
      {
        name: "Red Jade Tea",
        cn: "紅玉紅茶",
        tag: "Evening — Sun Moon Lake",
        price: "NT$80–150",
        where: "Ita Thao Village, Sun Moon Lake",
        desc: "Taiwan's most celebrated black tea — a cross between local wild tea and Burmese varietal, with a natural cinnamon-and-mint finish. The essential Sun Moon Lake drink.",
        tip: "Buy loose leaves in gift packaging at Ita Thao — excellent souvenir.",
        img: "/red-jade-tea.webp",
        mustTry: true,
      },
    ],
  },
  {
    day: 5,
    label: "Alishan & Departure",
    cn: "阿里山晨曦",
    color: "#B823E8",
    intro: "Your last morning is at altitude — high-mountain tea at sunrise, then a final souvenir sweep at Taipei 101 before the airport.",
    items: [
      {
        name: "High-Mountain Tea",
        cn: "高山茶",
        tag: "Morning — Alishan",
        price: "NT$200–500 (gift pack)",
        where: "Village tea shops, Alishan",
        desc: "Grown above 1,500m in persistent cloud cover, Alishan oolong develops an extraordinary floral sweetness. Buy it straight from the source at the summit village shops.",
        tip: "Look for vacuum-sealed half-jin (150g) gift packs — they clear airport security easily.",
        img: "/high-mountain-tea.webp",
        mustTry: true,
      },
      {
        name: "Bubble Milk Tea",
        cn: "珍珠奶茶",
        tag: "Taichung — Origin",
        price: "NT$45–80",
        where: "Chun Shui Tang, Taichung",
        desc: "Invented in Taiwan in the 1980s. Chewy black tapioca pearls in sweetened iced milk tea. Since your route passes through Taichung HSR on Day 5, make time for the original.",
        tip: "Chun Shui Tang is the birthplace — Taichung branch is 10 min by taxi from HSR.",
        img: "/bubble-tea.webp",
        mustTry: true,
      },
      {
        name: "Pineapple Cake",
        cn: "鳳梨酥",
        tag: "Departure — Taipei 101 B1",
        price: "NT$35–60 each",
        where: "Jason's Market, Taipei 101 B1",
        desc: "The essential Taiwan edible souvenir — buttery shortcrust pastry around a sweet pineapple jam filling. Stock up at Jason's Market before heading to the airport.",
        tip: "Chia Te and SunnyHills are the most-coveted brands.",
        img: "/pineapple-cake.jpg",
        mustTry: true,
      },
      {
        name: "Coffin Bread",
        cn: "棺材板",
        tag: "Look out for it",
        price: "NT$70–100",
        where: "Night market stalls (Tainan specialty)",
        desc: "Thick-cut toast hollowed and filled with creamy seafood chowder — invented in Tainan in 1940. Your itinerary doesn't reach Tainan, so hunt for it at Shilin or Raohe if you can.",
        tip: "A Tainan pilgrimage food — worth planning a future southern trip for.",
        img: "/coffin-bread.jpg",
        mustTry: false,
      },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function FoodSection() {
  const [activeDay, setActiveDay] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  const current = dayFoods[activeDay];

  // Header scroll animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      headerRef.current?.querySelectorAll(".hdr") || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%" } }
    );
  }, []);

  // Animate cards on day switch
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".food-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.55, ease: "power2.out" }
    );
  }, [activeDay]);

  return (
    <section
      ref={sectionRef}
      id="food"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      {/* Decorative kanji */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display select-none pointer-events-none"
        style={{ fontSize: "clamp(12rem,25vw,22rem)", fontWeight: 700, color: "rgba(13,13,13,0.025)", lineHeight: 1 }}
      >
        食
      </div>

      <div className="max-w-7xl mx-auto px-8 sm:px-16 relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-14">
          <div className="hdr flex items-center gap-4 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--vermillion)", letterSpacing: "0.25em" }}>
              05 — Food
            </span>
            <div className="h-px flex-1 max-w-24" style={{ background: "var(--border-heavy)" }} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div>
              <h2
                className="hdr font-display"
                style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 300, lineHeight: 1.05 }}
              >
                Must-Eat
                <br />
                <span style={{ color: "var(--vermillion)" }}>By Day</span>
              </h2>
              <p className="hdr font-body mt-4 max-w-lg" style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.7 }}>
                Taiwan&apos;s food culture is its greatest treasure. These dishes are mapped 
                directly to your daily route — eat them exactly where they come from.
              </p>
            </div>
            <div className="hdr flex-shrink-0 font-display" style={{ fontSize: "1rem", color: "var(--ash)", fontWeight: 300 }}>
              <span style={{ fontSize: "3rem", fontWeight: 300, color: "var(--vermillion)", lineHeight: 1 }}>
                {dayFoods.reduce((acc, d) => acc + d.items.length, 0)}
              </span>
              <br />
              essential dishes
            </div>
          </div>
        </div>

        {/* ── Day Tab Selector ── */}
        <div className="flex gap-0 mb-10 overflow-x-auto" style={{ borderBottom: "1px solid var(--border)" }}>
          {dayFoods.map((d, i) => {
            const isActive = i === activeDay;
            return (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="relative flex-shrink-0 pb-4 pt-3 px-5 cursor-pointer transition-all duration-300"
                style={{ background: "none", border: "none", outline: "none" }}
              >
                <span
                  className="font-mono block"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: isActive ? d.color : "var(--ash)", opacity: isActive ? 1 : 0.5 }}
                >
                  D{String(d.day).padStart(2, "0")}
                </span>
                <span
                  className="font-display block mt-0.5"
                  style={{ fontSize: "0.85rem", fontWeight: 500, color: isActive ? d.color : "var(--ink)", whiteSpace: "nowrap" }}
                >
                  {d.label}
                </span>
                <span
                  className="font-body block"
                  style={{ fontSize: "0.65rem", color: "var(--ash)", opacity: 0.5, marginTop: 1 }}
                >
                  {d.cn}
                </span>
                {/* Active bar */}
                <span
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                  style={{ height: 2, background: isActive ? d.color : "transparent", borderRadius: "2px 2px 0 0" }}
                />
              </button>
            );
          })}
        </div>

        {/* ── Day intro ── */}
        <div className="mb-10 flex items-start gap-5">
          <div
            className="flex-shrink-0 w-1 self-stretch rounded-full"
            style={{ background: current.color, opacity: 0.6 }}
          />
          <p className="font-body" style={{ fontSize: "0.95rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.75 }}>
            {current.intro}
          </p>
        </div>

        {/* ── Food grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: "1px solid var(--border)" }}
        >
          {current.items.map((food, i) => {
            const isHovered = hoveredCard === i;
            const isOdd = current.items.length % 2 !== 0;
            const isLast = i === current.items.length - 1;
            const isLastOdd = isOdd && isLast;

            return (
              <div
                key={`${activeDay}-${i}`}
                className="food-card group relative flex flex-col overflow-hidden cursor-pointer"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < current.items.length - (isLastOdd ? 1 : 2) ? "1px solid var(--border)" : "none",
                  gridColumn: isLastOdd ? "1 / -1" : undefined,
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: isLastOdd ? 260 : 220 }}>
                  <Image
                    src={food.img}
                    alt={food.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 60%, rgba(245,240,232,0.95) 100%)`,
                    }}
                  />

                  {/* Must-try badge */}
                  {food.mustTry && (
                    <div
                      className="absolute top-3 left-3 font-mono text-xs px-2 py-1"
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        background: current.color,
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      MUST TRY
                    </div>
                  )}

                  {/* Tag pill */}
                  <div
                    className="absolute top-3 right-3 font-mono text-xs px-2 py-1"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      background: "rgba(245,240,232,0.92)",
                      color: "var(--ink)",
                      border: "1px solid var(--border-heavy)",
                    }}
                  >
                    {food.tag}
                  </div>

                  {/* Price — bottom of image */}
                  <div
                    className="absolute bottom-3 right-3 font-mono"
                    style={{ fontSize: "0.65rem", color: "var(--ash)", letterSpacing: "0.05em" }}
                  >
                    {food.price}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3
                    className="font-display mb-0.5 transition-colors duration-300"
                    style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.2, color: isHovered ? current.color : "var(--ink)" }}
                  >
                    {food.name}
                  </h3>
                  <p className="font-body mb-3" style={{ fontSize: "0.78rem", color: "var(--ash)" }}>
                    {food.cn}
                  </p>

                  <p className="font-body flex-1" style={{ fontSize: "0.88rem", color: "var(--ink)", fontWeight: 300, lineHeight: 1.75 }}>
                    {food.desc}
                  </p>

                  {/* Tip */}
                  <div
                    className="mt-4 flex items-start gap-2 py-3 px-3 rounded"
                    style={{ background: `${current.color}08`, borderLeft: `2px solid ${current.color}40` }}
                  >
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: current.color, letterSpacing: "0.1em", flexShrink: 0, paddingTop: 2 }}>
                      TIP
                    </span>
                    <span className="font-body" style={{ fontSize: "0.78rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.5 }}>
                      {food.tip}
                    </span>
                  </div>

                  {/* Where */}
                  <div className="mt-4 pt-4 flex items-start gap-2" style={{ borderTop: "1px solid var(--border)" }}>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0, marginTop: 2, color: current.color }}>
                      <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 6 3a1.5 1.5 0 0 1 0 3.5z" fill="currentColor" />
                    </svg>
                    <span className="font-body" style={{ fontSize: "0.78rem", color: "var(--ash)", fontWeight: 300, lineHeight: 1.5 }}>
                      {food.where}
                    </span>
                  </div>
                </div>

                {/* Hover bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ width: 0, background: current.color }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="font-body" style={{ fontSize: "0.85rem", color: "var(--ash)", fontWeight: 300 }}>
            Prices in New Taiwan Dollar. Multiply by ~1.89 for PHP equivalent.
          </p>

          {/* Day legend dots */}
          <div className="flex items-center gap-4">
            {dayFoods.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="flex items-center gap-2 cursor-pointer"
                style={{ background: "none", border: "none", outline: "none" }}
              >
                <div
                  className="rounded-full transition-transform duration-200"
                  style={{
                    width: 7,
                    height: 7,
                    background: d.color,
                    transform: activeDay === i ? "scale(1.6)" : "scale(1)",
                  }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.1em", color: activeDay === i ? d.color : "var(--ash)", opacity: activeDay === i ? 1 : 0.5 }}
                >
                  D{d.day}
                </span>
              </button>
            ))}
          </div>

          <span className="font-mono text-xs" style={{ color: "var(--ash)", opacity: 0.35, fontSize: "0.65rem" }}>
            台灣美食
          </span>
        </div>
      </div>
    </section>
  );
}