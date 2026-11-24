"use client";

import { useEffect, useRef } from "react";
import type { CommunityPost } from "@/lib/data";

const embedScript = "https://embed.reddit.com/widgets.js";

/** Reddit's script swaps each blockquote for an embedded post. If it can't load, the plain link stays. */
export function CommunityPosts({ posts }: { posts: CommunityPost[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  // Not next/script: it loads a script once, but this one must run again when the list is remounted.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let script: HTMLScriptElement | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        script = document.createElement("script");
        script.src = embedScript;
        script.async = true;
        document.body.append(script);
      },
      { rootMargin: "400px" },
    );
    observer.observe(list);
    return () => {
      observer.disconnect();
      script?.remove();
    };
  }, []);

  return (
    <ul ref={listRef} className={`grid items-start gap-4 ${posts.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
      {posts.map((post) => (
        <li key={post.url} className="min-w-0">
          <blockquote className="reddit-embed-bq rounded-panel bg-subtle p-6" data-embed-theme="light">
            <a href={post.url} className="break-words underline">
              {post.title}
            </a>
          </blockquote>
          {/* Outside the embed, so it stays when Reddit shows an error inside its frame. */}
          <p className="mt-3">
            <a href={post.url} className="underline">
              View on Reddit<span className="sr-only">: {post.title}</span>
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}
