"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Place } from "@/data/tripData";

interface PlaceCardProps {
  place: Place;
  index: number;
  onClick: (place: Place) => void;
  onPhotoClick: (place: Place) => void;
}

const categoryColors: Record<string, string> = {
  Culture: "var(--jade)",
  Heritage: "var(--gold)",
  Nature: "var(--jade)",
  Food: "var(--vermillion)",
  Spirituality: "var(--gold)",
  History: "var(--ash)",
  Shopping: "var(--vermillion)",
};

// ─── Photo database — 3–5 real images per place ──────────────────────────────
export const placePhotos: Record<string, { primary: string; gallery: string[]; credit: string }> = {

  // ── Day 1: Taipei City Core ────────────────────────────────────────────────

  "chiang-kai-shek": {
    primary: "/place/chiang-kai-shek-2.jpg",
    gallery: [
      "/place/chiang-kai-shek-3.jpg",
      "/place/chiang-kai-shek-2.jpg",
      "/place/chiang-kai-shek-4.jpg",
      "/place/chiang-kai-shek-5.jpg",
    ],
    credit: "© Wikimedia Commons contributors · Zhongzheng, Taipei",
  },

  "ximending": {
    primary: "/place/ximending-2.jpeg",
    gallery: [
      "/place/ximending-3.jpg",
      "/place/ximending-5.jpeg",
      "/place/ximending-4.webp",
      "/place/ximending-2.jpeg",
    ],
    credit: "© Wikimedia Commons · Wanhua District, Taipei",
  },

  "longshan-temple": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Longshan_Temple_Taipei.jpg/1280px-Longshan_Temple_Taipei.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Longshan_Temple_Taipei.jpg/1280px-Longshan_Temple_Taipei.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Longshan_Temple_interior.jpg/1280px-Longshan_Temple_interior.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Longshan_Temple_incense.jpg/1280px-Longshan_Temple_incense.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Longshan_Temple_dragon_column.jpg/1280px-Longshan_Temple_dragon_column.jpg",
    ],
    credit: "© Wikimedia Commons contributors · Wanhua, Taipei",
  },

  "taipei-101": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Taipei_101_from_afar.jpg/800px-Taipei_101_from_afar.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Taipei_101_from_afar.jpg/800px-Taipei_101_from_afar.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Taipei_101_at_night.jpg/800px-Taipei_101_at_night.jpg",
      "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Taipei_101_Mass_Damper.jpg/800px-Taipei_101_Mass_Damper.jpg",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=85",
    ],
    credit: "© Wikimedia Commons & Unsplash · Xinyi District, Taipei",
  },

  "shilin-night-market": {
    primary: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Shilin_Night_Market_Taipei.jpg/1280px-Shilin_Night_Market_Taipei.jpg",
      "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1200&q=85",
    ],
    credit: "© Unsplash & Wikimedia Commons · Shilin District, Taipei",
  },

  // ── Day 2: North Coast ─────────────────────────────────────────────────────

  "yehliu-geopark": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Yehliu_Geopark_-_Queen%27s_Head.jpg/1280px-Yehliu_Geopark_-_Queen%27s_Head.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Yehliu_Geopark_-_Queen%27s_Head.jpg/1280px-Yehliu_Geopark_-_Queen%27s_Head.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Yehliu_Geopark_mushroom_rocks.jpg/1280px-Yehliu_Geopark_mushroom_rocks.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Yehliu_coastal_formations.jpg/1280px-Yehliu_coastal_formations.jpg",
      "https://images.unsplash.com/photo-1559628233-100c798642d5?w=1200&q=85",
    ],
    credit: "© Wikimedia Commons · Wanli District, New Taipei",
  },

  "shifen-old-street": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Shifen_Old_Street_lantern.jpg/1280px-Shifen_Old_Street_lantern.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Shifen_Old_Street_lantern.jpg/1280px-Shifen_Old_Street_lantern.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Shifen_sky_lanterns_rising.jpg/1280px-Shifen_sky_lanterns_rising.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Pingxi_line_Shifen_train.jpg/1280px-Pingxi_line_Shifen_train.jpg",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=85",
    ],
    credit: "© Wikimedia Commons · Shifen, New Taipei",
  },

  "shifen-waterfall": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Shifen_Waterfall.jpg/960px-Shifen_Waterfall.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Shifen_Waterfall.jpg/960px-Shifen_Waterfall.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Shifen_Waterfall_curtain.jpg/1280px-Shifen_Waterfall_curtain.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Shifen_Waterfall_mist.jpg/1280px-Shifen_Waterfall_mist.jpg",
    ],
    credit: "© Wikimedia Commons · Shifen, New Taipei",
  },

  "jiufen": {
    primary: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&q=85",
      "https://images.unsplash.com/photo-1566440504903-e59fffcd5832?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Jiufen_Old_Street_night.jpg/1280px-Jiufen_Old_Street_night.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jiufen_teahouse_view.jpg/1280px-Jiufen_teahouse_view.jpg",
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1200&q=85",
    ],
    credit: "© Unsplash & Wikimedia Commons · Jiufen, New Taipei",
  },

  // ── Day 3: Beitou + Yangmingshan + Maokong ────────────────────────────────

  "xinbeitou-station": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Xinbeitou_Historic_Station.jpg/1280px-Xinbeitou_Historic_Station.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Xinbeitou_Historic_Station.jpg/1280px-Xinbeitou_Historic_Station.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Xinbeitou_Station_platform.jpg/1280px-Xinbeitou_Station_platform.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Xinbeitou_hot_spring_street.jpg/1280px-Xinbeitou_hot_spring_street.jpg",
    ],
    credit: "© Wikimedia Commons · Beitou District, Taipei",
  },

  "beitou-thermal-valley": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Beitou_Thermal_Valley.jpg/1280px-Beitou_Thermal_Valley.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Beitou_Thermal_Valley.jpg/1280px-Beitou_Thermal_Valley.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Beitou_thermal_valley_steam.jpg/1280px-Beitou_thermal_valley_steam.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Beitou_Hot_Spring_Museum.jpg/1280px-Beitou_Hot_Spring_Museum.jpg",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&q=85",
    ],
    credit: "© Wikimedia Commons & Unsplash · Beitou, Taipei",
  },

  "qingtiangang": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Qingtiangang_grassland_Yangmingshan.jpg/1280px-Qingtiangang_grassland_Yangmingshan.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Qingtiangang_grassland_Yangmingshan.jpg/1280px-Qingtiangang_grassland_Yangmingshan.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Yangmingshan_water_buffalo.jpg/1280px-Yangmingshan_water_buffalo.jpg",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Yangmingshan_National_Park_panorama.jpg/1280px-Yangmingshan_National_Park_panorama.jpg",
    ],
    credit: "© Wikimedia Commons & Unsplash · Yangmingshan, Taipei",
  },

  "maokong-gondola": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Maokong_Gondola_Taipei.jpg/1280px-Maokong_Gondola_Taipei.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Maokong_Gondola_Taipei.jpg/1280px-Maokong_Gondola_Taipei.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Maokong_crystal_cabin.jpg/1280px-Maokong_crystal_cabin.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Maokong_tea_plantation.jpg/1280px-Maokong_tea_plantation.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Maokong_teahouse_view.jpg/1280px-Maokong_teahouse_view.jpg",
    ],
    credit: "© Wikimedia Commons · Wenshan District, Taipei",
  },

  "zhinan-temple": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Zhinan_Temple_Taipei.jpg/1280px-Zhinan_Temple_Taipei.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Zhinan_Temple_Taipei.jpg/1280px-Zhinan_Temple_Taipei.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Zhinan_Temple_hillside.jpg/1280px-Zhinan_Temple_hillside.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Zhinan_Temple_panorama.jpg/1280px-Zhinan_Temple_panorama.jpg",
    ],
    credit: "© Wikimedia Commons · Wenshan District, Taipei",
  },

  "raohe-night-market": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Raohe_Street_Night_Market.jpg/1280px-Raohe_Street_Night_Market.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Raohe_Street_Night_Market.jpg/1280px-Raohe_Street_Night_Market.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Raohe_pepper_bun_stall.jpg/1280px-Raohe_pepper_bun_stall.jpg",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Ciyou_Temple_Raohe.jpg/1280px-Ciyou_Temple_Raohe.jpg",
    ],
    credit: "© Wikimedia Commons & Unsplash · Songshan, Taipei",
  },

  // ── Day 4: Wulai + Zhongshe + Sun Moon Lake ──────────────────────────────

  "wulai": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Wulai_village_valley.jpg/1280px-Wulai_village_valley.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Wulai_village_valley.jpg/1280px-Wulai_village_valley.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Wulai_waterfall.jpg/1280px-Wulai_waterfall.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wulai_hot_spring_river.jpg/1280px-Wulai_hot_spring_river.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Wulai_Atayal_old_street.jpg/1280px-Wulai_Atayal_old_street.jpg",
    ],
    credit: "© Wikimedia Commons · Wulai District, New Taipei",
  },

  "zhongshe-flower-market": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Zhongshe_flower_market_Taichung.jpg/1280px-Zhongshe_flower_market_Taichung.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Zhongshe_flower_market_Taichung.jpg/1280px-Zhongshe_flower_market_Taichung.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Zhongshe_tulips_Taiwan.jpg/1280px-Zhongshe_tulips_Taiwan.jpg",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=1200&q=85",
      "https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=1200&q=85",
    ],
    credit: "© Wikimedia Commons & Unsplash · Houli District, Taichung",
  },

  "sun-moon-lake": {
    primary: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Sun_Moon_Lake_aerial.jpg/1280px-Sun_Moon_Lake_aerial.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Sun_Moon_Lake_Wenwu_Temple.jpg/1280px-Sun_Moon_Lake_Wenwu_Temple.jpg",
      "https://images.unsplash.com/photo-1559628233-100c798642d5?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sun_Moon_Lake_cycling.jpg/1280px-Sun_Moon_Lake_cycling.jpg",
    ],
    credit: "© Unsplash & Wikimedia Commons · Nantou County",
  },

  // ── Day 5: Alishan + Rainbow Village + Taipei 101 ─────────────────────────

  "alishan": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Alishan_sunrise_sea_of_clouds.jpg/1280px-Alishan_sunrise_sea_of_clouds.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Alishan_sunrise_sea_of_clouds.jpg/1280px-Alishan_sunrise_sea_of_clouds.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Alishan_Forest_Railway.jpg/1280px-Alishan_Forest_Railway.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Alishan_cypress_forest_trail.jpg/1280px-Alishan_cypress_forest_trail.jpg",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Alishan_cloud_sea.jpg/1280px-Alishan_cloud_sea.jpg",
    ],
    credit: "© Wikimedia Commons & Unsplash · Alishan, Chiayi County",
  },

  "rainbow-village": {
    primary: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rainbow_Village_Taichung.jpg/1280px-Rainbow_Village_Taichung.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Rainbow_Village_Taichung.jpg/1280px-Rainbow_Village_Taichung.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Rainbow_Village_mural_wall.jpg/1280px-Rainbow_Village_mural_wall.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Rainbow_Village_ground_art.jpg/1280px-Rainbow_Village_ground_art.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rainbow_Village_Huang_Yung-fu.jpg/1280px-Rainbow_Village_Huang_Yung-fu.jpg",
    ],
    credit: "© Wikimedia Commons · Nantun District, Taichung",
  },

  "carrefour-taipei": {
    primary: "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=1200&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1470219556762-1771e7f9427d?w=1200&q=85",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=85",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Taipei_101_at_night.jpg/800px-Taipei_101_at_night.jpg",
    ],
    credit: "© Unsplash contributors · Xinyi District, Taipei",
  },
};

// ─── Fallback gradients (shown while image loads / on error) ─────────────────
const fallbackGradients: Record<string, string> = {
  "chiang-kai-shek":        "linear-gradient(135deg,#E8E0D4,#C4B8A8)",
  "ximending":               "linear-gradient(135deg,#1A1018,#3D1535)",
  "longshan-temple":         "linear-gradient(135deg,#E8D4B8,#A87840)",
  "taipei-101":              "linear-gradient(135deg,#1A2030,#2A3040)",
  "shilin-night-market":     "linear-gradient(135deg,#1A0A08,#3D2010)",
  "yehliu-geopark":          "linear-gradient(135deg,#B8C8D0,#607080)",
  "shifen-old-street":       "linear-gradient(135deg,#F0E8D8,#C04020)",
  "shifen-waterfall":        "linear-gradient(135deg,#B8D8C0,#407060)",
  "jiufen":                  "linear-gradient(135deg,#1A1010,#5D2525)",
  "xinbeitou-station":       "linear-gradient(135deg,#E0D4C8,#A89080)",
  "beitou-thermal-valley":   "linear-gradient(135deg,#C8E0C0,#408040)",
  "qingtiangang":            "linear-gradient(135deg,#C0D8B0,#608050)",
  "maokong-gondola":         "linear-gradient(135deg,#D0E8C8,#507050)",
  "zhinan-temple":           "linear-gradient(135deg,#E8D8B8,#986030)",
  "raohe-night-market":      "linear-gradient(135deg,#180808,#502010)",
  "wulai":                   "linear-gradient(135deg,#B0C8A8,#405838)",
  "zhongshe-flower-market":  "linear-gradient(135deg,#F0D8E8,#D060A0)",
  "sun-moon-lake":           "linear-gradient(135deg,#C8D8E8,#4A90B0)",
  "alishan":                 "linear-gradient(135deg,#102020,#204840)",
  "rainbow-village":         "linear-gradient(135deg,#F0E010,#E84020)",
  "carrefour-taipei":        "linear-gradient(135deg,#1A2030,#2A3040)",
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function PlaceCard({ place, index, onClick, onPhotoClick }: PlaceCardProps) {
  const cardRef        = useRef<HTMLDivElement>(null);
  const imageRef       = useRef<HTMLDivElement>(null);
  const overlayRef     = useRef<HTMLDivElement>(null);
  const hoverDetailsRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);
  const [hovered, setHovered]     = useState(false);

  const photo = placePhotos[place.id];
  const color = categoryColors[place.category] || "var(--ash)";

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(imageRef.current, { scale: 1.07, duration: 0.75, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(hoverDetailsRef.current, { y: 0, opacity: 1, duration: 0.38, ease: "power2.out" });
    gsap.to(cardRef.current, {
      y: -7,
      boxShadow: "0 24px 48px rgba(13,13,13,0.16)",
      duration: 0.38,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(imageRef.current, { scale: 1, duration: 0.65, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(hoverDetailsRef.current, { y: 12, opacity: 0, duration: 0.25 });
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 0 0 rgba(13,13,13,0)",
      duration: 0.38,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="place-card group cursor-pointer relative flex flex-col"
      style={{ border: "1px solid var(--border)", background: "var(--paper)", overflow: "visible" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(place)}
    >
      {/* ─── Image container ─── */}
      <div
        className="relative overflow-hidden"
        style={{ height: 248, background: fallbackGradients[place.id] || "var(--mist)" }}
      >
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
          style={{ transformOrigin: "center center" }}
        >
          {photo && !imgError ? (
            <img
              src={photo.primary}
              alt={place.name}
              className="w-full h-full object-cover"
              style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s ease" }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : null}
        </div>

        {/* Base gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.72) 0%, rgba(13,13,13,0.18) 45%, transparent 75%)",
          }}
        />

        {/* Hover dark veil */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(13,13,13,0.28)", opacity: 0 }}
        />

        {/* ── Top badges ── */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-auto">
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

          {/* Photo count button */}
          <button
            onClick={(e) => { e.stopPropagation(); onPhotoClick(place); }}
            className="flex items-center gap-1.5 transition-all duration-200"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 10px",
              background: "rgba(245,240,232,0.93)",
              color: "var(--ink)",
              border: "1px solid rgba(13,13,13,0.15)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <rect x="0.5" y="2" width="10" height="7.5" rx="1" stroke="currentColor" strokeWidth="1" />
              <circle cx="5.5" cy="5.75" r="1.75" stroke="currentColor" strokeWidth="1" />
              <rect x="7.5" y="2.5" width="1.5" height="1" rx="0.5" fill="currentColor" />
            </svg>
            {photo?.gallery?.length ?? 0} Photos
          </button>
        </div>

        {/* City tag */}
        <div
          className="absolute bottom-4 left-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "2px 8px",
            background: "rgba(13,13,13,0.65)",
            color: "rgba(245,240,232,0.85)",
          }}
        >
          {place.city}
        </div>

        {/* Hover description slides up */}
        <div
          ref={hoverDetailsRef}
          className="absolute bottom-4 left-4 right-4 pointer-events-none"
          style={{ transform: "translateY(12px)", opacity: 0 }}
        >
          <p
            className="font-body"
            style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.9)", fontWeight: 300, lineHeight: 1.55, marginBottom: 6 }}
          >
            {place.description}
          </p>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--vermillion)",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            Full details
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
              <path d="M0 3H10M10 3L8 1M10 3L8 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Card body ─── */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 500, lineHeight: 1.2 }}>
              {place.name}
            </h3>
            <p className="font-body mt-0.5" style={{ fontSize: "0.77rem", color: "var(--ash)" }}>
              {place.chineseName}
            </p>
          </div>
          <div
            className="flex-shrink-0 flex items-center gap-1 font-mono mt-0.5"
            style={{ fontSize: "0.57rem", color: "var(--ash)" }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1" />
              <path d="M4.5 2.5V4.5L5.5 5.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            {place.duration}
          </div>
        </div>

        {/* Accent bar */}
        <div
          className="h-px mb-3 transition-all duration-500 ease-out"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${color} 0%, var(--border) 100%)`
              : "var(--border)",
          }}
        />

        {/* Must-try tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {place.mustTry.slice(0, 3).map((item) => (
            <span
              key={item}
              className="font-mono"
              style={{
                fontSize: "0.57rem",
                letterSpacing: "0.04em",
                padding: "2px 8px",
                background: "var(--mist)",
                color: "var(--ash)",
              }}
            >
              {item.split("(")[0].trim()}
            </span>
          ))}
        </div>

        {/* Bottom: coords + arrow */}
        <div
          className="mt-auto pt-3 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="font-mono"
            style={{ fontSize: "0.54rem", color: "var(--ash)", opacity: 0.5, letterSpacing: "0.04em" }}
          >
            {place.lat.toFixed(3)}°N · {place.lng.toFixed(3)}°E
          </span>
          <div
            className="flex items-center gap-1.5 font-mono transition-all duration-300"
            style={{
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: hovered ? "var(--vermillion)" : "var(--ash)",
            }}
          >
            Details
            <svg
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.3s" }}
            >
              <path d="M0 3.5H12M12 3.5L9 1M12 3.5L9 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}