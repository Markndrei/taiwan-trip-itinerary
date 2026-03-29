"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlacesSection from "@/components/PlacesSection";
import JourneyRoute from "@/components/JourneyRoute";
import ItinerarySection from "@/components/ItinerarySection";
import FoodSection from "@/components/FoodSection";
import EssentialsSection from "@/components/EssentialsSection";
import PackingSection from "@/components/PackingSection";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    gsap.registerPlugin(ScrollTrigger);

    if (!isTouchDevice) {
      document.body.style.cursor = "none";
    }

    gsap.to(".hero-parallax", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.style.cursor = "";
    };
  }, [loaded, isTouchDevice]);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      {!isTouchDevice && loaded && <CustomCursor />}

      <div
        style={{
          visibility: loaded ? "visible" : "hidden",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <PlacesSection />
          <JourneyRoute />
          <ItinerarySection />
          <FoodSection />
          <EssentialsSection />
          <PackingSection />
        </main>
        <Footer />
      </div>
    </>
  );
}