
import { Button } from "@/components/ui/button"
import { Copy, Check, Gift } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/lib/store"
import type { Reward } from "@/lib/store"

const availableRewards: Reward[] = [
  {
    id: "promo-25",
    icon: "Gift",
    title: "25% Off Your Next Order",
    points: "500",
    description: "Get a 25% discount on your next purchase of any of our fresh seafood products.",
    isScratched: true,
    type: 'Coupon',
    value: '25% OFF',
    rewardType: 'Secondary',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "promo-free-shipping",
    icon: "Star",
    title: "Free Shipping",
    points: "1000",
    description: "Enjoy free shipping on your next order, no minimum purchase required.",
    isScratched: true,
    type: 'Coupon',
    value: 'FREE SHIPPING',
    rewardType: 'Secondary',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "promo-recipe",
    icon: "Trophy",
    title: "Exclusive Recipe Book",
    points: "2500",
    description: "Unlock a digital recipe book with exclusive seafood recipes from top chefs.",
    isScratched: true,
    type: 'Coupon',
    value: 'RECIPE BOOK',
    rewardType: 'Secondary',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
]

export function CouponBanner() {
  const [copied, setCopied] = useState(false)
  const addReward = useStore((state) => state.addReward)
  const couponCode = "Dayhawk15"

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCollectReward = () => {
    const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)]
    addReward({
        ...randomReward,
        id: `${randomReward.id}-${Date.now()}`
    })
    alert("Reward collected! Check your rewards page.")
  }

  return (
    <section className="py-6">
      <div className="w-4/5 mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
            <img
              src="Website Source Files/Banners/OfferBanner.jpg"
              alt="Seafood Variety"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2 sm:px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                Get 15% offer! Min Order of ₹350
              </h3>
              
              {/* Coupon Code with Dotted Box */}
              <div className="border-2 border-dotted border-white rounded-lg px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-black/20 backdrop-blur-sm">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-mono font-bold text-sm sm:text-base md:text-lg lg:text-xl">{couponCode}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:bg-white/20"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
                    ) : (
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCollectReward}
                    className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:bg-white/20"
                  >
                    <Gift className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
