"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    image: "/Website Source Files/Banners/Ads Banner/1-Banner-Design.jpg",
    alt: "Banner Ad 1"
  },
  {
    id: 2,
    image: "/Website Source Files/Banners/Ads Banner/2-Banner-Design.jpg",
    alt: "Banner Ad 2"
  },
  {
    id: 3,
    image: "/Website Source Files/Banners/Ads Banner/3-Banner-Design.jpg",
    alt: "Banner Ad 3"
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const next = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden">
          {/* Carousel Images */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "transition-opacity duration-700",
                index === current ? "opacity-100" : "opacity-0 absolute inset-0"
              )}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover object-center"
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all"
            onClick={prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 h-10 w-10 rounded-full flex items-center justify-center shadow-lg transition-all"
            onClick={next}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 rounded-full transition-all",
                  index === current ? "bg-white w-8" : "bg-white/60 w-2"
                )}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
