import { useState, useEffect } from "react"
import { X, Tag, Clock, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem("offerPopupShown")
    
    if (!popupShown) {
      // Show popup after 1 second delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem("offerPopupShown", "true")
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Set target time to 1 day from now
    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetTime - now

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg p-0 gap-0 overflow-hidden border-0 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full bg-white/90 p-1.5 sm:p-2 hover:bg-white transition-colors shadow-lg"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-700" />
        </button>

        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-br from-[#0A4D8C] via-[#0d5fa3] to-[#0A4D8C] text-white p-4 sm:p-6 md:p-8 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
              <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-semibold">SPECIAL OFFER</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2">
              Get 20% OFF
            </h2>
            <p className="text-white/90 text-xs sm:text-sm md:text-base">
              On all orders above ₹999
            </p>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
            <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-700">
              Offer Ends In
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] text-white rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1 sm:mt-2 font-medium">Hours</span>
            </div>

            <div className="flex items-center text-lg sm:text-2xl md:text-3xl font-bold text-[#0A4D8C] pb-4 sm:pb-6">:</div>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] text-white rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1 sm:mt-2 font-medium">Minutes</span>
            </div>

            <div className="flex items-center text-lg sm:text-2xl md:text-3xl font-bold text-[#0A4D8C] pb-4 sm:pb-6">:</div>

            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] text-white rounded-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                <span className="text-lg sm:text-2xl md:text-3xl font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1 sm:mt-2 font-medium">Seconds</span>
            </div>
          </div>

          {/* Offer Details */}
          <div className="bg-white border-2 border-dashed border-[#0A4D8C]/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0A4D8C] mt-0.5 sm:mt-1 text-sm sm:text-base">✓</span>
                <span>Valid on all fresh seafood products</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0A4D8C] mt-0.5 sm:mt-1 text-sm sm:text-base">✓</span>
                <span>Free delivery on orders above ₹500</span>
              </li>
              <li className="flex items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#0A4D8C] mt-0.5 sm:mt-1 text-sm sm:text-base">✓</span>
                  <span>Use code: <span className="font-bold text-[#0A4D8C]">FRESH20</span></span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-xs"
                  onClick={() => {
                    navigator.clipboard.writeText("FRESH20");
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                >
                  {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <Button
              className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-gradient-to-r from-[#0A4D8C] to-[#0d5fa3] hover:from-[#083d6f] hover:to-[#0A4D8C]"
              onClick={() => {
                setIsOpen(false)
                window.location.href = "/products"
              }}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
