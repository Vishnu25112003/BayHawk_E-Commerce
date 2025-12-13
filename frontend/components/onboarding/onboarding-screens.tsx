import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Fish, ShieldCheck, Truck, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const onboardingSlides = [
  {
    id: 1,
    icon: Fish,
    title: "Welcome to BayHawk",
    subtitle: "Your Premium Seafood Marketplace",
    description: "Experience the finest selection of fresh seafood delivered straight from the ocean to your doorstep.",
    bgGradient: "from-[#0A4D8C] via-[#0d5fa3] to-[#0A4D8C]",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    features: [
      "Fresh catch within 52 hours",
      "Sustainably sourced seafood",
      "Expert quality selection"
    ]
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    subtitle: "100% Chemical-Free & Hygienic",
    description: "Every product undergoes rigorous quality checks by our expert team to ensure you get only the best.",
    bgGradient: "from-emerald-600 via-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
    features: [
      "Expert quality inspection",
      "No preservatives or chemicals",
      "Hygienically packed & sealed"
    ]
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast & Reliable Delivery",
    subtitle: "Track Your Order in Real-Time",
    description: "Free delivery on orders above ₹500. Get live updates and track your order from ocean to doorstep.",
    bgGradient: "from-blue-600 via-blue-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
    features: [
      "Free delivery above ₹500",
      "Real-time order tracking",
      "Cold chain maintained"
    ]
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Exclusive Member Benefits",
    subtitle: "Join Our Premium Community",
    description: "Unlock special discounts, early access to new products, and personalized recommendations.",
    bgGradient: "from-purple-600 via-purple-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    features: [
      "Member-only discounts",
      "Priority customer support",
      "Personalized recommendations"
    ]
  },
  {
    id: 5,
    icon: Heart,
    title: "Ready to Get Started?",
    subtitle: "Fresh Seafood Awaits You",
    description: "Join thousands of happy customers who trust BayHawk for their daily seafood needs.",
    bgGradient: "from-orange-600 via-orange-500 to-amber-600",
    image: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?w=800&q=80",
    features: [
      "Easy ordering process",
      "Multiple payment options",
      "24/7 customer support"
    ]
  },
]

export function OnboardingScreens() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShowOnboarding(false)
  }

  const handleNext = () => {
    if (currentSlide === onboardingSlides.length - 1) {
      handleSkip()
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  if (!showOnboarding) return null

  const slide = onboardingSlides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="fixed inset-0 z-[90] bg-white flex flex-col overflow-hidden">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-20">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSkip} 
          className="text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur-sm shadow-sm"
        >
          Skip
          <X className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left side - Image/Visual */}
        <div className={cn(
          "relative lg:w-1/2 h-64 lg:h-auto bg-gradient-to-br overflow-hidden",
          slide.bgGradient
        )}>
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          {/* Icon */}
          <div className="relative z-10 h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 backdrop-blur-md shadow-2xl mb-6 animate-float">
                <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" />
              </div>
              <div className="text-white space-y-2">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
                  {currentSlide + 1} of {onboardingSlides.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-10 lg:p-12 bg-white">
          <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
            {/* Logo/Brand */}
            <div className="mb-8">
              <img 
                src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg" 
                alt="BayHawk" 
                className="h-8 md:h-10"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-[#0A4D8C] font-semibold">
                  {slide.subtitle}
                </p>
              </div>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {slide.description}
              </p>

              {/* Features */}
              <div className="space-y-3 pt-4">
                {slide.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-8 space-y-6">
            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {onboardingSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSlide 
                      ? "bg-[#0A4D8C] w-12" 
                      : "bg-gray-300 w-2 hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {currentSlide > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrev} 
                  className="flex-1 h-12 text-base border-2 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                className={cn(
                  "h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all",
                  currentSlide === 0 ? "w-full" : "flex-1",
                  currentSlide === onboardingSlides.length - 1 
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                    : "bg-[#0A4D8C] hover:bg-[#083d6f]"
                )}
              >
                {currentSlide === onboardingSlides.length - 1 ? (
                  <>
                    Get Started
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
