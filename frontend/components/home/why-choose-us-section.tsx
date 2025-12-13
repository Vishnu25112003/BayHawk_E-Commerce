import { useEffect, useRef, useState } from "react"

export function WhyChooseUsSection() {
  const reasons = [
    {
      number: "01",
      title: "Freshness Guaranteed",
      description: "We ensure the freshest catch delivered to your doorstep within 52 hours",
    },
    {
      number: "02",
      title: "Wide Variety & Availability",
      description: "Extensive selection of marine and freshwater fish, shellfish, and more",
    },
    {
      number: "03",
      title: "Competitive Pricing",
      description: "Best prices in the market with regular offers and discounts",
    },
    {
      number: "04",
      title: "Expert Handling & Packaging",
      description: "Professional handling and insulated packaging to maintain freshness",
    },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getAnimationClass = (index: number) => {
    return `animate-number delay-${index}`
  }

  return (
    <section ref={sectionRef} className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Images */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <img src="/crab-icon.svg" alt="" className="w-32 h-32" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <img src="/lobster-icon.svg" alt="" className="w-32 h-32" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Why to Choose <span className="text-[#0A4D8C]">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the reasons why we think we're the best choice for you and your family!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center group">
              <div className={`text-6xl font-bold text-[#0A4D8C] mb-4 opacity-20 transition-all duration-500 ${isVisible ? getAnimationClass(index) : 'opacity-0'}`}>
                {reason.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0A4D8C] transition-colors">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes number-animate {
          0% { 
            transform: translateY(30px) scale(0.8); 
            opacity: 0; 
          }
          60% { 
            transform: translateY(-5px) scale(1.05); 
            opacity: 0.35; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.2; 
          }
        }
        
        .animate-number {
          animation: number-animate 0.8s ease-out forwards;
        }
        
        .delay-0 { animation-delay: 0s; }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
      `}</style>
    </section>
  )
}

