"use client"

import { useState, useEffect } from "react"
import MasonryGallery from "@/components/masonry-gallery"
import { siteConfig } from "@/content/site"

export default function GalleryPageClient({ images }: { images: Array<{ src: string; category: "mobile" | "desktop" | "gallery" }> }) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    // Generate stars distributed across the screen, with more at the top
    const starCount = 150;
    const newStars = Array.from({ length: starCount }, () => {
      const randomY = Math.random();
      let y: number;
      if (randomY < 0.6) {
        y = Math.random() * 40;
      } else if (randomY < 0.85) {
        y = Math.random() * 40 + 40;
      } else {
        y = Math.random() * 20 + 80;
      }
      
      return {
        x: Math.random() * 100,
        y: y,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
      };
    });
    setStars(newStars);
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(to bottom, #0C1230, #1D2A73, #163693)",
        }}
      />

      {/* Star particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, ${star.opacity * 0.6})`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
          <h1
            className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-2 sm:mb-3 md:mb-4"
          >
            Our Love Story Gallery
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white font-light max-w-xl mx-auto leading-relaxed px-2">
            Every photograph tells a story of {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}'s journey to forever
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center text-white/90">
            <p className="font-light">
              No images found. Add files to{" "}
              <code className="px-2 py-1 bg-white/20 rounded border border-white/30 text-white">
                public/mobile-background, public/desktop-background, or public/gallery
              </code>
              .
            </p>
          </div>
        ) : (
          <MasonryGallery images={images} />
        )}


      </section>
    </main>
  )
}

