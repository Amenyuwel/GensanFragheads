"use client";

import { useEffect, useRef } from "react";

/** Full-width panel with a perfumer-at-work loop behind the page title. */
export function Hero() {
  const video = useRef<HTMLVideoElement>(null);

  // Started from code rather than `autoPlay` so visitors who ask for reduced motion keep the still
  // poster and never download the video. If the browser blocks playback, the poster stays too.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.play().catch(() => {});
    }
  }, []);

  return (
    <section
      className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden bg-green px-4"
      aria-labelledby="hero-title"
    >
      <video
        ref={video}
        src="/videos/HeroSectionVideo.mp4"
        poster="/videos/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* The footage is mostly white, so darken it enough for white text to stay readable. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
      <h1 id="hero-title" className="relative text-center text-3xl tracking-[0.12em] text-white uppercase sm:text-5xl">
        The GenSan fragrance guide
      </h1>
    </section>
  );
}
