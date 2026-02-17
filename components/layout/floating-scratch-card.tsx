import { useState, useMemo } from "react"
import { X, Gift, Copy, Check, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import ScratchCard from "@/components/reward/ScratchCard"
import { Link } from "react-router-dom"
import confetti from "canvas-confetti"

export function FloatingScratchCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const addReward = useStore((state) => state.addReward)
  const addWalletBalance = useStore((state) => state.addWalletBalance)

  // Generate a random reward when modal opens
  const reward = useMemo(() => {
    const rewards = [
      { code: "FRESH20", amount: "₹20", type: "Cashback", value: 20 },
      { code: "FRESH50", amount: "₹50", type: "Discount", value: 50 },
      { code: "BAYHAWK10", amount: "10%", type: "Discount", value: 0 },
      { code: "FREE_DEL", amount: "FREE", type: "Delivery", value: 0 },
    ]
    return rewards[Math.floor(Math.random() * rewards.length)]
  }, [isOpen])

  const handleScratchComplete = () => {
    setIsScratched(true)
    
    // Add to store
    addReward({
      id: `floating-${Date.now()}`,
      icon: "Gift",
      title: "Scratch Card Reward",
      points: reward.value.toString(),
      description: `Coupon Code: ${reward.code} - ${reward.amount} ${reward.type}`,
      isScratched: true,
      type: reward.type as any,
      value: reward.amount,
      rewardType: 'Primary',
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    })

    if (reward.type === "Cashback") {
        addWalletBalance(reward.value)
    }

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFA500", "#FF4500"]
    })
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(reward.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <>
      {/* Floating Gift Button */}
      <button
        data-onboarding="scratch-card-button"
        className="fixed bottom-6 right-0 h-16 w-16 rounded-l-2xl shadow-xl z-40 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center group"
        onClick={() => setIsOpen(true)}
      >
        <Gift className="h-8 w-8 text-white group-hover:scale-110 transition-transform animate-pulse" />
      </button>

      {/* Modal */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20" />
                </div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Scratch & Win</h3>
                      <p className="text-white/90 text-sm">Exclusive Reward</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scratch Card */}
              <div className="p-6">
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg flex justify-center py-4">
                  {/* Scratch Card Component */}
                  <div className="relative">
                    <ScratchCard
                        coverImage="/images/offer-scratch.png"
                        revealImage="/images/offer-scratch-coupon.png"
                        width={320}
                        height={240}
                        onComplete={handleScratchComplete}
                        className="shadow-2xl"
                    >
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <span className="text-3xl font-black text-[#0A4D8C] drop-shadow-sm font-mono">
                                {reward.code}
                            </span>
                            <span className="text-sm font-bold text-[#0A4D8C]/80 mt-1 uppercase">
                                {reward.amount} {reward.type}
                            </span>
                        </div>
                    </ScratchCard>
                  </div>

                  {/* Success Badge */}
                  {isScratched && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-40">
                      <Check className="w-4 h-4" />
                      Unlocked!
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-4 space-y-2">
                    {isScratched && (
                    <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
                        onClick={handleCopyCode}
                    >
                        {copiedCode ? (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Code Copied!
                        </>
                        ) : (
                        <>
                            <Copy className="w-5 h-5 mr-2" />
                            Copy Coupon Code
                        </>
                        )}
                    </Button>
                    )}

                    <Link to="/account/rewards" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                            View All Rewards
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Info */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    {isScratched 
                      ? "🎉 Apply at checkout to get your reward! Valid for 24 hours."
                      : "✨ Scratch the card above to reveal your exclusive reward!"
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
