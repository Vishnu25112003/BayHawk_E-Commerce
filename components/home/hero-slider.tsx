import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Fresh From The Ocean",
    subtitle: "To Your Kitchen",
    description: "Premium quality seafood delivered within 52 hours of catch",
    cta: "Shop Now",
    href: "/products",
    image: "/fresh-ocean-seafood-fish-market.jpg",
  },
  {
    id: 2,
    title: "Pre-Order Fresh Catches",
    subtitle: "Never Miss Out",
    description: "Book your favorite seafood in advance and get the freshest catch",
    cta: "Pre-Order",
    href: "/products?preorder=true",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 3,
    title: "Festive Special",
    subtitle: "Up to 30% Off",
    description: "Celebrate with premium seafood combos for the whole family",
    cta: "View Offers",
    href: "/products?category=combo",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => setCurrent(index)
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  const next = () => setCurrent((prev) => (prev + 1) % slides.length)

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === current ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Background Image */}
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/50" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <p className="text-accent font-medium mb-2">{slide.subtitle}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 text-balance">
                  {slide.title}
                </h1>
                <p className="text-lg text-background/90 mb-6">{slide.description}</p>
                <Link to={slide.href}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-background h-12 w-12 rounded-full"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-background h-12 w-12 rounded-full"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === current ? "bg-background w-8" : "bg-background/50",
            )}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  )
}
