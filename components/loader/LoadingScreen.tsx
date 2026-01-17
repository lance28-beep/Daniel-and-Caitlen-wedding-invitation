import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/content/site';
import { Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400'],
});

const armoire = localFont({
  src: '../../armoire-1-0-trial/armoire-1.0-regular-TRIAL.otf',
  variable: '--font-armoire',
  display: 'swap',
});

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    // Generate stars distributed across the screen, with more at the top
    const starCount = 150;
    const newStars = Array.from({ length: starCount }, () => {
      // More stars at the top, fewer at the bottom
      const randomY = Math.random();
      let y: number;
      if (randomY < 0.6) {
        // 60% of stars in top 40% of screen
        y = Math.random() * 40;
      } else if (randomY < 0.85) {
        // 25% of stars in middle 40% of screen
        y = Math.random() * 40 + 40;
      } else {
        // 15% of stars in bottom 20% of screen
        y = Math.random() * 20 + 80;
      }
      
      return {
        x: Math.random() * 100, // 0-100% of width
        y: y, // Distributed across screen
        size: Math.random() * 1 + 0.5, // 0.5-1.5px (smaller)
        opacity: Math.random() * 0.7 + 0.3, // 0.3-1.0 (more variation)
      };
    });
    setStars(newStars);
  }, []);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 160);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0C1230, #1D2A73, #163693)'
        }}
      />

      {/* Star particles */}
      <div className="absolute inset-0 pointer-events-none">
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

      <div className="relative flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/monogram-new.png"
              alt="Monogram"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center w-full max-w-sm sm:max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Couple names */}
          <div
            className={`${armoire.className} text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 leading-tight flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3`}
            style={{ fontWeight: 400 }}
          >
            <span style={{ color: '#FFFFFF' }}>{siteConfig.couple.groomNickname}</span>
            <span style={{ color: '#FFFFFF' }}>and</span>
            <span style={{ color: '#FFD83F' }}>{siteConfig.couple.brideNickname}</span>
          </div>

          {/* Wedding date */}
          <div className="mb-6 sm:mb-8">
            <p
              className={`${cormorant.className} text-lg sm:text-xl md:text-2xl`}
              style={{ color: '#FFFFFF', fontWeight: 400 }}
            >
              {siteConfig.wedding.date}
            </p>
          </div>

          {/* Message */}
          <div className="mb-6 sm:mb-8">
            <p
              className="text-base sm:text-lg tracking-wide"
              style={{ fontFamily: 'var(--font-inter), "Helvetica Neue", "Arial", sans-serif', fontWeight: 300, color: '#FFFFFF', letterSpacing: '0.1em' }}
            >
              Preparing something beautiful for you
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-0.5 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#FFFFFF' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-inter), "Helvetica Neue", "Arial", sans-serif', fontWeight: 300, color: '#FFFFFF' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};