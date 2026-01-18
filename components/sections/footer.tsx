"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { Instagram, Twitter, Facebook, MapPin, Calendar, Clock, Heart, Music2 } from "lucide-react"
import { siteConfig } from "@/content/site"
import { Cormorant_Garamond } from "next/font/google"
import localFont from "next/font/local"

const armoire = localFont({
  src: "../../armoire-1-0-trial/armoire-1.0-regular-TRIAL.otf",
  variable: "--font-armoire",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const yasashiiBold = localFont({
  src: "../../Fonts/Fonts_Package_5767477d99d0c7d14eafd5a0b83e7934/YasashiiW03-Bold/web/font/YasashiiW03-Bold.woff2",
  weight: "700",
  display: "swap",
})

const helveticaCondensed = localFont({
  src: "../../Fonts/helvetica-condensed-regular_lWeSi (1)/Helvetica Condensed Regular/Helvetica Condensed Regular.ttf",
  display: "swap",
})

const neutrafaceText = localFont({
  src: [
    {
      path: "../../Fonts/neutraface-text/Neutraface Text Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../Fonts/neutraface-text/Neutraface Text Demi.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../Fonts/neutraface-text/Neutraface Text Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
})

// Helper function to convert text to title case (first letter of each word uppercase)
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function Footer() {
  const year = new Date().getFullYear()
  const ceremonyDate = siteConfig.ceremony.date
  const ceremonyTime = siteConfig.ceremony.time
  const receptionTime = siteConfig.reception.time
  const ceremonyVenue = siteConfig.ceremony.venue
  const receptionVenue = siteConfig.reception.venue
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  // Format date with comma: "February 8 2026" -> "February 8, 2026"
  const formattedDate = ceremonyDate.replace(/(\w+ \d+) (\d+)/, "$1, $2")

  const [ceremonyMonth = "December", ceremonyDayRaw = "21", ceremonyYear = "2025"] = ceremonyDate.split(" ")
  const ceremonyDayNumber = ceremonyDayRaw.replace(/[^0-9]/g, "") || "21"

  const quotes = [
    `"I have found the one whom my soul loves." – Song of Solomon 3:4`,
    "Welcome to our wedding website! We've found a love that's a true blessing, and we give thanks to God for writing the beautiful story of our journey together.",
    "Thank you for your love, prayers, and support. We can't wait to celebrate this joyful day together!",
  ]

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Generate star particles
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
      }, 3000)
      return () => clearTimeout(pauseTimeout)
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 30)
        return () => clearTimeout(deleteTimeout)
      } else {
        setIsDeleting(false)
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex]
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1))
        }, 50)
        return () => clearTimeout(typeTimeout)
      } else {
        setIsPaused(true)
        setIsDeleting(true)
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Events", href: "#details" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#guest-list" },
  ] as const

  return (
    <footer 
      className="relative z-20 mt-12 sm:mt-16 overflow-hidden"
    >
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
      
      {/* Monogram / Couple Illustration - centered at top */}
      <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-8 md:pt-10 mb-5 sm:mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 opacity-95">
            <Image
              src="/monogram/monogram-new.png"
              alt={`${siteConfig.couple.groomNickname} & ${siteConfig.couple.brideNickname} monogram`}
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        </motion.div>

        {/* Names & Date below illustration */}
        <div className="mt-3 sm:mt-4 md:mt-5 text-center">
          <p
            className={`${neutrafaceText.className} tracking-[0.25em] sm:tracking-[0.3em] text-xs sm:text-sm md:text-base text-white uppercase`}
            style={{ fontWeight: 400 }}
          >
            {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}
          </p>
          <p
            className={`${helveticaCondensed.className} text-sm sm:text-base md:text-lg text-white mt-1 sm:mt-2`}
          >
            {ceremonyDate}
          </p>
          <p
            className={`${helveticaCondensed.className} text-xs sm:text-sm md:text-base text-white mt-1 sm:mt-2`}
          >
            {siteConfig.ceremony.venue}
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-8 pb-6 sm:pb-8 md:pb-10">
        <motion.div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10" variants={staggerChildren} initial="initial" animate="animate">
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-5 sm:mb-6 md:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/95 rounded-full flex items-center justify-center border border-white/40 flex-shrink-0 shadow-md">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-white" fill="white" />
                </div>
                <h3 className={`${yasashiiBold.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white`} style={{ fontWeight: 700 }}>{siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname}</h3>
              </div>
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className} text-white`}>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-medium">{ceremonyDate}</span>
                </div>
                <div className={`flex items-center gap-2 sm:gap-2.5 md:gap-3 ${cormorant.className} text-white`}>
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base leading-relaxed">{toTitleCase(ceremonyVenue)}</span>
                </div>
              </div>
            </div>

            <motion.div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-[#1D2A73]/40 shadow-[0_18px_45px_rgba(0,0,0,0.15)]" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <blockquote className={`${cormorant.className} text-[#1D2A73] italic text-sm sm:text-base md:text-lg leading-relaxed min-h-[60px] sm:min-h-[70px] md:min-h-[80px]`}>
                "{displayedText}
                <span className="inline-block w-0.5 h-4 sm:h-5 md:h-6 bg-[#1D2A73] ml-1 animate-pulse">|</span>"
              </blockquote>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1D2A73] rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1D2A73]/60 rounded-full" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1D2A73] rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-3 sm:space-y-4 md:space-y-5" variants={fadeInUp}>
            <motion.div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#1D2A73]/40 hover:bg-white transition-all duration-300 shadow-[0_14px_40px_rgba(0,0,0,0.15)]" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-[#1D2A73]/40 flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#1D2A73]" />
                </div>
                <h4 className={`${cormorant.className} font-semibold text-base sm:text-lg md:text-xl text-[#1D2A73]`}>Ceremony</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-[#1D2A73] text-xs sm:text-sm leading-relaxed`}>
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D2A73] flex-shrink-0 mt-0.5" />
                  <span>{toTitleCase(ceremonyVenue)}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D2A73] flex-shrink-0" />
                  <span>{ceremonyTime}</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 border border-[#1D2A73]/40 hover:bg-white transition-all duration-300 shadow-[0_14px_40px_rgba(0,0,0,0.15)]" whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 mb-2.5 sm:mb-3 md:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center border border-[#1D2A73]/40 flex-shrink-0">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-[#1D2A73]" fill="#1D2A73" />
                </div>
                <h4 className={`${cormorant.className} font-semibold text-base sm:text-lg md:text-xl text-[#1D2A73]`}>Reception</h4>
              </div>
              <div className={`space-y-2 sm:space-y-2.5 md:space-y-3 ${cormorant.className} text-[#1D2A73] text-xs sm:text-sm leading-relaxed`}>
                <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D2A73] flex-shrink-0 mt-0.5" />
                  <span>{toTitleCase(receptionVenue)}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1D2A73] flex-shrink-0" />
                  <span>{receptionTime}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-5 sm:space-y-6 md:space-y-7" variants={fadeInUp}>
            <div>
              <h4 className={`${cormorant.className} font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5 flex items-center gap-2 sm:gap-2.5 md:gap-3 text-white`}>
                <div className="w-1.5 sm:w-2 h-6 sm:h-7 md:h-8 bg-white rounded-full" /> Follow Us
              </h4>
              <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 flex-wrap">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 ring-1 ring-[#1D2A73]/40 hover:bg-white hover:ring-[#1D2A73] transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D2A73]" />
                </a>
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 ring-1 ring-[#1D2A73]/40 hover:bg-white hover:ring-[#1D2A73] transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D2A73]" />
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 ring-1 ring-[#1D2A73]/40 hover:bg-white hover:ring-[#1D2A73] transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Music2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D2A73]" />
                </a>
                <a 
                  href="https://x.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/95 ring-1 ring-[#1D2A73]/40 hover:bg-white hover:ring-[#1D2A73] transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D2A73]" />
                </a>
              </div>
            </div>

            <div>
              <h5 className={`${cormorant.className} font-semibold text-sm sm:text-base md:text-lg mb-2.5 sm:mb-3 md:mb-4 text-white`}>Quick Links</h5>
              <div className="space-y-1.5 sm:space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`block text-white/90 hover:text-white transition-colors duration-200 ${cormorant.className} text-xs sm:text-sm leading-relaxed`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div className="border-t border-white/40 pt-5 sm:pt-6 md:pt-7" variants={fadeInUp}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-5">
            <div className="text-center md:text-left">
              <p className={`text-white ${cormorant.className} text-xs sm:text-sm leading-relaxed`}>
                © {year} {siteConfig.couple.groomNickname} & {siteConfig.couple.brideNickname} — crafted with love, prayers, and gratitude.
              </p>
              <p className={`text-white/85 ${cormorant.className} text-xs sm:text-sm mt-1 leading-relaxed`}>
                This celebration site was designed to share our story and joy with you.
              </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className={`text-white/85 ${cormorant.className} text-xs sm:text-sm`}>
                Developed by{" "}
                <a 
                  href="https://lance28-beep.github.io/portfolio-website/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/60 hover:decoration-white/80"
                >
                  Lance Valle
                </a>
              </p>
              <p className={`text-white/85 ${cormorant.className} text-xs sm:text-sm`}>
                Want a website like this? Visit{" "}
                <a 
                  href="https://www.facebook.com/WeddingInvitationNaga" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors duration-200 underline decoration-white/60 hover:decoration-white/80"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
