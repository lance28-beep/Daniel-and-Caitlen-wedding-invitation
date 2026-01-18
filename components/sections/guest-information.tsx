"use client"

import { Section } from "@/components/section"
import { Car, Navigation, MapPin } from "lucide-react"
import { Cormorant_Garamond } from "next/font/google"
import localFont from "next/font/local"
import Image from "next/image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

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

export function GuestInformation() {

  return (
    <Section
      id="guest-information"
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Header */}
      <div className="relative z-30 text-center mb-6 sm:mb-9 md:mb-12 px-3 sm:px-4">
        {/* Small label */}
        <p
          className={`${neutrafaceText.className} text-[0.7rem] sm:text-xs md:text-sm uppercase tracking-[0.28em] text-white mb-2`}
          style={{ fontWeight: 400 }}
        >
          Important Guidelines
        </p>

        <h2
          className={`${yasashiiBold.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-3 md:mb-4`}
          style={{ fontWeight: 700 }}
        >
          Guest Information
        </h2>

        <p className={`${helveticaCondensed.className} text-xs sm:text-sm md:text-base text-white font-light max-w-xl mx-auto leading-relaxed px-2 mb-2 sm:mb-3`}>
          Everything you need to know to make your experience smooth and enjoyable
        </p>

        {/* Decorative element below subtitle */}
        <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
          <div className="w-8 sm:w-12 md:w-16 h-px bg-white/60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mb-4 sm:mb-7 max-w-4xl mx-auto px-3 sm:px-5">
        {/* Important Information Header */}
        <div className="text-center mb-3 sm:mb-5">
          <h3 className={`${yasashiiBold.className} text-base sm:text-xl md:text-2xl mb-1 sm:mb-2 text-white`} style={{ fontWeight: 700 }}>
            Important Information
          </h3>
          <p className={`${helveticaCondensed.className} text-[11px] sm:text-xs md:text-sm text-white max-w-xl mx-auto leading-relaxed`}>
            Kindly take note of these details to help the day flow smoothly and beautifully.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {/* Attire Guidelines */}
          <div className="relative rounded-2xl border border-[#1D2A73]/40 bg-white backdrop-blur-lg shadow-[0_18px_40px_rgba(29,42,115,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="mb-2.5 sm:mb-3 relative z-10 text-center">
              <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#1D2A73]">
                Attire &amp; Motif
              </h4>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden border border-[#1D2A73]/40 shadow-xl bg-white p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="text-center space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-[#1D2A73]">
                  Formal/Smart Casual Attire
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] rounded-xl overflow-hidden border border-[#1D2A73]/40 bg-white mb-3">
                <Image
                  src="/Details/attire.png"
                  alt="Attire guideline"
                  fill
                  className="object-contain"
                  sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                  priority={false}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#1D2A73] leading-relaxed">
                  <p className="text-center">
                    We warmly invite you to dress in <span className="font-semibold">Formal/Smart Casual attire</span> for our special day. Feel free to express your personal style while incorporating our wedding color palette to create a harmonious and elegant celebration.
                  </p>
                  <p className="text-center">
                    Whether you choose a sophisticated blouse and trousers, a chic dress, or a polished casual ensemble, we encourage you to use our color palette as inspiration for your outfit.
                  </p>
                </div>

                {/* Color Palette */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] sm:text-xs font-semibold text-[#1D2A73] uppercase tracking-wide text-left">
                    Color Palette
                  </p>
                  <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-2.5">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1D2A73]/20 shadow-sm" style={{ backgroundColor: '#272561' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1D2A73]/20 shadow-sm" style={{ backgroundColor: '#40357B' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1D2A73]/20 shadow-sm" style={{ backgroundColor: '#564591' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1D2A73]/20 shadow-sm" style={{ backgroundColor: '#233483' }} />
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#1D2A73]/20 shadow-sm" style={{ backgroundColor: '#2043A2' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrival Time & Reception Guidelines */}
          <div className="relative rounded-2xl border border-[#1D2A73]/40 bg-white backdrop-blur-lg shadow-[0_18px_40px_rgba(29,42,115,0.15)] p-3.5 sm:p-5 overflow-hidden">
            <div className="space-y-4 sm:space-y-5">
              {/* Arrival Time */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#1D2A73]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#1D2A73] mb-3">
                    Arrival Time
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#1D2A73] leading-relaxed">
                      Kindly arrive by <span className="font-semibold text-[#1D2A73]">12:30 PM</span>. The ceremony starts at <span className="font-semibold text-[#1D2A73]">1:30 PM</span>.
                    </p>
                    <p className="text-xs sm:text-sm text-[#1D2A73] leading-relaxed">
                      Your punctuality means so much to us — and don&apos;t forget to have a light snack beforehand so you can enjoy the celebration comfortably!
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception Guidelines */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#1D2A73]/40 shadow-xl bg-white p-4 sm:p-6">
                <div className="mb-3 sm:mb-4">
                  <h4 className="text-[0.75rem] sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-[#1D2A73] mb-3">
                    Reception Guidelines
                  </h4>
                  <div className="space-y-2 sm:space-y-2.5">
                    <p className="text-xs sm:text-sm text-[#1D2A73] leading-relaxed">
                      The seating will be formal, RSVP-style. That&apos;s why we&apos;re asking you to fill out this invitation form to secure your spot. Kindly do not bring plus ones unless explicitly stated in your invitation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Travel & Parking - Compact */}
          <div className="relative rounded-2xl border border-[#1D2A73]/40 bg-white backdrop-blur-lg shadow-[0_18px_40px_rgba(29,42,115,0.15)] p-3.5 sm:p-5 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3 relative z-10">
              <div className="p-1.5 rounded-full shadow-md bg-white border border-[#1D2A73]/40">
                <Car className="w-3.5 h-3.5 text-[#1D2A73]" />
              </div>
              <h4 className="font-semibold text-xs sm:text-base text-[#1D2A73]">Parking &amp; Travel</h4>
            </div>

            <div className="space-y-3 relative z-10">
              {/* Parking */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#1D2A73]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1D2A73] text-white">
                    <Car className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#1D2A73]">Parking Available</p>
                    <p className="text-[10px] sm:text-xs text-[#1D2A73]/85">
                      Parking is available at the venue. Please arrive early to find a comfortable spot.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportation */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#1D2A73]/40 bg-white shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#1D2A73] text-white">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] sm:text-sm font-semibold text-[#1D2A73]">Transportation</p>
                    <p className="text-[10px] sm:text-xs text-[#1D2A73]/85">
                      Private vehicles and local transport are welcome. Coordinate with friends or family and plan your
                      route ahead of time.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-xl p-2.5 sm:p-3 border border-[#1D2A73]/40 bg-white">
                <p className="text-[11px] sm:text-sm font-semibold mb-2 flex items-center gap-2 text-[#1D2A73]">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1D2A73]/10 text-[#1D2A73]">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  Quick Tips
                </p>
                <ul className="text-[10px] sm:text-xs space-y-1 text-[#1D2A73]/90">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1D2A73] mt-0.5">•</span>
                    <span>Plan your route ahead to avoid unexpected delays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1D2A73] mt-0.5">•</span>
                    <span>Please avoid walking during the ceremony. Approach the coordinator or wait to be guided.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1D2A73] mt-0.5">•</span>
                    <span>Coordinate carpooling with friends or family when possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

