"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  url: string;
  alt: string;
  priority?: boolean;
  blurDataURL?: string;
}

export default function PhotoView({ url, alt, priority, blurDataURL }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // First image is already visible — no scroll trigger needed
    if (priority) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={ref}
      style={{
        opacity: priority ? 1 : 0,
        transform: priority ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src={url}
        alt={alt}
        width={1600}
        height={1067}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        style={{
          // Constrains to viewport — handles both landscape and portrait
          // naturally. Neither dimension ever escapes the viewport.
          maxHeight: "88vh",
          maxWidth: "min(80vw, 1440px)",
          width: "auto",
          height: "auto",
        }}
        sizes="(max-width: 768px) 95vw, min(80vw, 1440px)"
      />
    </div>
  );
}
