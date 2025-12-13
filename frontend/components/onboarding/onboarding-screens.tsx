import { useState, useEffect } from "react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  targetSelector: string
  tooltipPosition: "top" | "bottom" | "left" | "right"
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to BayHawk!",
    description: "Click on our logo to return to the home page anytime",
    targetSelector: "[data-onboarding='logo']",
    tooltipPosition: "bottom"
  },
  {
    id: 2,
    title: "Login / Profile",
    description: "Login to access your account, track orders, and manage your profile",
    targetSelector: "[data-onboarding='login-button'], [data-onboarding='profile-button']",
    tooltipPosition: "bottom"
  },
  {
    id: 3,
    title: "Need Help?",
    description: "Chat with us anytime for instant support",
    targetSelector: "[data-onboarding='chatbot-button']",
    tooltipPosition: "left"
  },
  {
    id: 4,
    title: "Daily Rewards",
    description: "Scratch daily to win exciting offers and discounts!",
    targetSelector: "[data-onboarding='scratch-card-button']",
    tooltipPosition: "left"
  },
]

export function OnboardingScreens() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [elementRect, setElementRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      // Small delay to ensure page elements are loaded
      setTimeout(() => {
        setShowOnboarding(true)
        // Dispatch event to hide video and popups
        window.dispatchEvent(new CustomEvent('onboardingActive', { detail: { active: true } }))
      }, 500)
    }
  }, [])

  useEffect(() => {
    // Update onboarding state when it changes
    if (showOnboarding) {
      window.dispatchEvent(new CustomEvent('onboardingActive', { detail: { active: true } }))
    } else {
      window.dispatchEvent(new CustomEvent('onboardingActive', { detail: { active: false } }))
    }
  }, [showOnboarding])

  // Get element position whenever step changes
  useEffect(() => {
    if (!showOnboarding) return

    const updateElementPosition = () => {
      const step = onboardingSteps[currentStep]
      const element = document.querySelector(step.targetSelector)
      
      if (element) {
        const rect = element.getBoundingClientRect()
        setElementRect(rect)
      }
    }

    // Update position immediately and on resize
    updateElementPosition()
    window.addEventListener('resize', updateElementPosition)
    window.addEventListener('scroll', updateElementPosition)

    return () => {
      window.removeEventListener('resize', updateElementPosition)
      window.removeEventListener('scroll', updateElementPosition)
    }
  }, [currentStep, showOnboarding])

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (currentStep === onboardingSteps.length - 1) {
      handleComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShowOnboarding(false)
    window.dispatchEvent(new CustomEvent('onboardingActive', { detail: { active: false } }))
  }

  if (!showOnboarding || !elementRect) return null

  const step = onboardingSteps[currentStep]

  // Calculate tooltip position based on element position and preferred side
  const padding = 16
  const tooltipWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 320
  const tooltipHeight = 250 // Approximate height of tooltip

  let tooltipStyle: React.CSSProperties = {}

  switch (step.tooltipPosition) {
    case "bottom":
      // For elements on the right side of screen, align tooltip to the right
      const isRightSide = elementRect.left > window.innerWidth / 2
      
      if (isRightSide) {
        // Align tooltip to right edge of element
        tooltipStyle = {
          top: `${elementRect.bottom + padding}px`,
          right: `${window.innerWidth - elementRect.right}px`,
        }
      } else {
        // Align tooltip to left edge of element
        tooltipStyle = {
          top: `${elementRect.bottom + padding}px`,
          left: `${Math.max(padding, Math.min(elementRect.left, window.innerWidth - tooltipWidth - padding))}px`,
        }
      }
      break
    case "top":
      tooltipStyle = {
        bottom: `${window.innerHeight - elementRect.top + padding}px`,
        left: `${Math.max(padding, Math.min(elementRect.left, window.innerWidth - tooltipWidth - padding))}px`,
      }
      break
    case "left":
      // Check if tooltip would go off bottom of screen
      const spaceBelow = window.innerHeight - elementRect.top
      const spaceAbove = elementRect.bottom
      
      if (spaceBelow < tooltipHeight && spaceAbove > spaceBelow) {
        // Position from bottom if not enough space below
        tooltipStyle = {
          bottom: `${window.innerHeight - elementRect.bottom}px`,
          right: `${window.innerWidth - elementRect.left + padding}px`,
        }
      } else {
        // Default: align with top of element, but ensure it doesn't go off screen
        const topPosition = Math.min(
          elementRect.top,
          window.innerHeight - tooltipHeight - padding
        )
        tooltipStyle = {
          top: `${Math.max(padding, topPosition)}px`,
          right: `${window.innerWidth - elementRect.left + padding}px`,
        }
      }
      break
    case "right":
      tooltipStyle = {
        top: `${Math.max(padding, elementRect.top)}px`,
        left: `${elementRect.right + padding}px`,
      }
      break
  }

  // Calculate arrow position based on element and tooltip positions
  const getArrow = () => {
    let arrowStyle: React.CSSProperties = {}
    let arrowSvg: React.ReactNode = null

    switch (step.tooltipPosition) {
      case "bottom":
        // Arrow points up to element
        arrowSvg = (
          <svg className="w-12 h-12 text-[#0A4D8C]" viewBox="0 0 24 24">
            <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        )
        
        // Position arrow to point at center of element
        const elementCenterX = elementRect.left + (elementRect.width / 2)
        
        if (tooltipStyle.right) {
          // Tooltip aligned to right
          const tooltipRight = parseFloat(tooltipStyle.right as string) || 0
          const tooltipRightEdge = window.innerWidth - tooltipRight
          const arrowRight = tooltipRightEdge - elementCenterX - 24 // 24 = half of arrow width
          arrowStyle = {
            position: 'absolute' as const,
            top: '-32px',
            right: `${Math.max(16, arrowRight)}px`
          }
        } else {
          // Tooltip aligned to left
          const tooltipLeft = parseFloat(tooltipStyle.left as string) || 0
          const arrowLeft = elementCenterX - tooltipLeft - 24 // 24 = half of arrow width
          arrowStyle = {
            position: 'absolute' as const,
            top: '-32px',
            left: `${Math.max(16, Math.min(arrowLeft, tooltipWidth - 64))}px`
          }
        }
        break
      
      case "left":
        // Arrow points right to element
        arrowSvg = (
          <svg className="w-12 h-12 text-[#0A4D8C]" viewBox="0 0 24 24">
            <path d="M13 7L18 12L13 17M6 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        )
        // Position arrow to point at vertical center of element
        const elementCenter = elementRect.top + (elementRect.height / 2)
        
        if (tooltipStyle.bottom) {
          // Tooltip positioned from bottom
          const tooltipBottom = parseFloat(tooltipStyle.bottom as string) || 0
          const arrowFromBottom = window.innerHeight - elementCenter - tooltipBottom - 24
          arrowStyle = {
            position: 'absolute' as const,
            right: '-40px',
            bottom: `${arrowFromBottom}px`
          }
        } else {
          // Tooltip positioned from top
          const tooltipTop = parseFloat(tooltipStyle.top as string) || 0
          const arrowTop = elementCenter - tooltipTop - 24 // 24 = half of arrow height
          arrowStyle = {
            position: 'absolute' as const,
            right: '-40px',
            top: `${Math.max(20, arrowTop)}px`
          }
        }
        break
    }

    return arrowSvg ? <div style={arrowStyle}>{arrowSvg}</div> : null
  }

  return (
    <>
      {/* Overlay with spotlight cutout */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect 
                x={elementRect.left}
                y={elementRect.top}
                width={elementRect.width}
                height={elementRect.height}
                rx="8"
                fill="black"
              />
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="rgba(0, 0, 0, 0.7)" 
            mask="url(#spotlight-mask)"
            className="animate-in fade-in duration-300"
          />
        </svg>
      </div>

      {/* Spotlight ring animation */}
      <div 
        className="fixed z-[100] pointer-events-none border-[6px] border-[#0A4D8C] animate-pulse rounded-lg shadow-lg shadow-[#0A4D8C]/50"
        style={{
          left: `${elementRect.left - 2}px`,
          top: `${elementRect.top - 2}px`,
          width: `${elementRect.width + 4}px`,
          height: `${elementRect.height + 4}px`,
        }}
      />

      {/* Tooltip */}
      <div 
        className="fixed z-[101] animate-in zoom-in duration-300 max-w-[90vw] sm:max-w-none"
        style={tooltipStyle}
      >
        <div className="relative bg-white rounded-xl shadow-2xl p-4 sm:p-5 md:p-6 w-full sm:w-80 md:w-96 border-2 border-[#0A4D8C]/20">
          {/* Arrow pointing to element */}
          {getArrow()}

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-semibold text-[#0A4D8C] bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
            {step.description}
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full h-10 sm:h-11 bg-[#0A4D8C] hover:bg-[#083d6f] text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center"
          >
            {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </>
  )
}
