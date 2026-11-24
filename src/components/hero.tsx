"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { Button } from "@/components/button";
import { sectionHref, sections, site } from "@/lib/site";

const POSTER = "/videos/hero-poster.jpg";
const DESKTOP_VIDEO = "/videos/HeroSectionVideo.mp4";
const MOBILE_VIDEO = "/videos/HeroSectionVideo-mobile.mp4";

/** Rounded panel with a perfumer-at-work loop behind the page title. */
export function Hero() {
  // The poster is the largest visible element, so fetch it ahead of the rest of the page.
  preload(POSTER, { as: "image", fetchPriority: "high" });

  const video = useRef<HTMLVideoElement>(null);
  // Follows the video's own play/pause events, so it stays correct if the browser blocks playback.
  const [isPlaying, setIsPlaying] = useState(false);

  // Source is set from code rather than in markup so visitors who ask for reduced motion keep the
  // still poster and never download any video, and phones get the smaller file. If the browser
  // blocks playback, the poster stays too.
  function startVideo(element: HTMLVideoElement) {
    if (!element.getAttribute("src")) {
      element.src = window.matchMedia("(max-width: 639px)").matches ? MOBILE_VIDEO : DESKTOP_VIDEO;
    }
    element.play().catch(() => {});
  }

  useEffect(() => {
    const element = video.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    startVideo(element);
  }, []);

  function togglePlayback() {
    const element = video.current;
    if (!element) return;

    if (element.paused) startVideo(element);
    else element.pause();
  }

  return (
    <section className="page-width pt-3 sm:pt-6" aria-labelledby="hero-title">
      <div className="relative overflow-hidden rounded-panel bg-ink">
        <video
          ref={video}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* The footage is mostly white, so darken it enough for white text to stay readable. */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/75" />
        <div className="relative flex min-h-104 flex-col justify-end px-6 pt-16 pb-6 text-white sm:min-h-120 sm:p-12 sm:pt-24">
          <h1 id="hero-title" className="max-w-3xl text-display">
            Find, sniff and share in GenSan
          </h1>
          <p className="mt-5 max-w-xl text-lg sm:text-xl">{site.description}</p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button href={sectionHref(sections.scentMap.id)}>Explore the Scent Map</Button>
            <Button href={site.subredditUrl} variant="outlineOnDark">
              Join the subreddit
            </Button>
          </div>
        </div>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-control bg-white text-ink transition-ui hover:bg-accent-bright sm:top-6 sm:right-6"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            {isPlaying ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M7 4.5v15l12-7.5z" />}
          </svg>
        </button>
      </div>
    </section>
  );
}
