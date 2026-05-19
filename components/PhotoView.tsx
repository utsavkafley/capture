"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  url: string;
  alt: string;
}

export default function PhotoView({ url, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(16px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <Image
        src={url}
        alt={alt}
        width={1600}
        height={1067}
        className="w-full h-auto"
        sizes="(max-width: 768px) 100vw, 85vw"
      />
    </div>
  );
}
