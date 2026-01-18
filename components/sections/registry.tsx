"use client"

import Image from "next/image"
import { Section } from "@/components/section"
import localFont from "next/font/local"

const armoire = localFont({
  src: "../../armoire-1-0-trial/armoire-1.0-regular-TRIAL.otf",
  variable: "--font-armoire",
  display: "swap",
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

export function Registry() {
  return (
    <Section
      id="registry"
      className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
    >
      <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
        
        <h2 className={`${yasashiiBold.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 sm:mb-3 md:mb-4`} style={{ fontWeight: 700 }}>
          Gift Guide
        </h2>
        
        <p className={`${helveticaCondensed.className} text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-2`}>
          Your presence is the greatest gift to us, but if you wish to give, a monetary gift or traditional gift through our gift registry would be well appreciated.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white/95 backdrop-blur-md border border-[#1D2A73]/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(29,42,115,0.15)] p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1D2A73]/20 via-transparent to-[#1D2A73]/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-dashed border-[#1D2A73]/40 p-5 sm:p-6 md:p-8 text-center shadow-[0_6px_24px_rgba(29,42,115,0.15)] max-w-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border-2 border-[#1D2A73]/50 text-xs font-semibold tracking-[0.2em] text-[#1D2A73] uppercase">
                GCash:
              </div>
              <div className="flex flex-col items-center gap-4 w-full mt-4">
                <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-[#1D2A73]/40 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white relative overflow-hidden">
                  <Image
                    src="/QR/newQR.png"
                    alt="GCash QR code"
                    fill
                    sizes="256px"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-white/90 italic">
            Thank you from the bottom of our hearts.
          </p>
        </div>
      </div>
    </Section>
  )
}
