"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Section } from "@/components/section"
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
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
  const [selectedOption, setSelectedOption] = useState<"gcash" | "smgift">("gcash")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [touchStart, setTouchStart] = useState<{ touches: TouchList | null; initialZoom: number; initialPosition: { x: number; y: number } }>({
    touches: null,
    initialZoom: 1,
    initialPosition: { x: 0, y: 0 },
  })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      setZoom((prev) => Math.max(0.5, Math.min(5, prev + delta)))
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getCenter = (touch1: Touch, touch2: Touch) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      // Single touch - pan
      if (zoom > 1) {
        setIsDragging(true)
        setTouchStart({
          touches: e.touches,
          initialZoom: zoom,
          initialPosition: { x: position.x, y: position.y },
        })
        setDragStart({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        })
      }
    } else if (e.touches.length === 2) {
      // Two touches - pinch to zoom
      e.preventDefault()
      setTouchStart({
        touches: e.touches,
        initialZoom: zoom,
        initialPosition: { x: position.x, y: position.y },
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1) {
      // Single touch - pan
      e.preventDefault()
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      })
    } else if (e.touches.length === 2 && touchStart.touches) {
      // Two touches - pinch to zoom
      e.preventDefault()
      const initialDistance = getDistance(touchStart.touches[0], touchStart.touches[1])
      const currentDistance = getDistance(e.touches[0], e.touches[1])
      const scale = currentDistance / initialDistance
      const newZoom = Math.max(0.5, Math.min(5, touchStart.initialZoom * scale))
      setZoom(newZoom)

      // Adjust position to zoom towards the center of the pinch
      const initialCenter = getCenter(touchStart.touches[0], touchStart.touches[1])
      const currentCenter = getCenter(e.touches[0], e.touches[1])
      
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const offsetX = (currentCenter.x - initialCenter.x) / newZoom
        const offsetY = (currentCenter.y - initialCenter.y) / newZoom
        
        setPosition({
          x: touchStart.initialPosition.x + offsetX,
          y: touchStart.initialPosition.y + offsetY,
        })
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTouchStart({
      touches: null,
      initialZoom: 1,
      initialPosition: { x: 0, y: 0 },
    })
  }

  useEffect(() => {
    if (!isModalOpen) {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
    }
  }, [isModalOpen])

  useEffect(() => {
    if (zoom === 1) {
      setPosition({ x: 0, y: 0 })
    }
  }, [zoom])

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
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4 sm:mb-6">
              <button
                onClick={() => setSelectedOption("gcash")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  selectedOption === "gcash"
                    ? "bg-[#1D2A73] text-white shadow-lg scale-105"
                    : "bg-white/80 text-[#1D2A73] hover:bg-white/90 border-2 border-[#1D2A73]/40"
                }`}
              >
                GCash
              </button>
              <button
                onClick={() => setSelectedOption("smgift")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  selectedOption === "smgift"
                    ? "bg-[#1D2A73] text-white shadow-lg scale-105"
                    : "bg-white/80 text-[#1D2A73] hover:bg-white/90 border-2 border-[#1D2A73]/40"
                }`}
              >
                SM Gift
              </button>
            </div>

            <div className="relative bg-white rounded-xl sm:rounded-2xl border-2 border-dashed border-[#1D2A73]/40 p-5 sm:p-6 md:p-8 text-center shadow-[0_6px_24px_rgba(29,42,115,0.15)] max-w-md">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm border-2 border-[#1D2A73]/50 text-xs font-semibold tracking-[0.2em] text-[#1D2A73] uppercase">
                {selectedOption === "gcash" ? "GCash:" : "SM Gift:"}
              </div>
              <div className="flex flex-col items-center gap-4 w-full mt-4">
                <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-dashed border-[#1D2A73]/40 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white relative overflow-hidden">
                  <Image
                    src={selectedOption === "gcash" ? "/QR/GcashNew.png" : "/QR/SMGIft.png"}
                    alt={selectedOption === "gcash" ? "GCash QR code" : "SM Gift QR code"}
                    fill
                    sizes="256px"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>

            {/* Registry Image */}
            <div 
              className="relative w-full max-w-md mt-6 sm:mt-8 rounded-xl sm:rounded-2xl overflow-hidden border border-[#1D2A73]/40 bg-white shadow-[0_6px_24px_rgba(29,42,115,0.15)] cursor-pointer hover:shadow-[0_8px_32px_rgba(29,42,115,0.25)] transition-shadow duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative w-full aspect-auto">
                <Image
                  src="/Details/theRegistry.png"
                  alt="The Registry"
                  width={800}
                  height={600}
                  className="object-contain w-full h-auto"
                  sizes="(min-width: 1024px) 700px, (min-width: 640px) 600px, 100vw"
                />
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

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6 md:p-8"
          onClick={() => setIsModalOpen(false)}
          onMouseUp={handleMouseUp}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomIn()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm border border-white/20"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleZoomOut()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm border border-white/20"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleResetZoom()
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm border border-white/20"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm">
            {Math.round(zoom * 100)}%
          </div>

          {/* Image Container */}
          <div
            ref={imageRef}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center overflow-hidden touch-none"
            onClick={(e) => {
              if (zoom === 1) {
                e.stopPropagation()
              }
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              className="relative flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              <Image
                src="/Details/theRegistry.png"
                alt="The Registry - Full Screen"
                width={1200}
                height={900}
                className="object-contain max-w-full max-h-[90vh] select-none"
                sizes="100vw"
                priority
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
