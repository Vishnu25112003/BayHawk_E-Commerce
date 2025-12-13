import { useState, useRef } from "react"
import { X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WheelSegment {
  id: number
  text: string
  color: string
  icon: string
}

const segments: WheelSegment[] = [
  { id: 1, text: "30 days Free Delivery", color: "#9b87f5", icon: "🚚" },
  { id: 2, text: "Upgrade to Premium Pro", color: "#7c3aed", icon: "⭐" },
  { id: 3, text: "₹100 OFF", color: "#8b5cf6", icon: "💰" },
  { id: 4, text: "Free Fresh Prawns", color: "#a78bfa", icon: "🦐" },
  { id: 5, text: "50% OFF Next Order", color: "#7c3aed", icon: "🎁" },
  { id: 6, text: "₹50 Wallet Cash", color: "#9b87f5", icon: "💳" },
  { id: 7, text: "Free Fish Cleaning", color: "#8b5cf6", icon: "🐟" },
  { id: 8, text: "₹200 Instant Discount", color: "#a78bfa", icon: "💵" },
]

export function FloatingSpinWheel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [winner, setWinner] = useState<WheelSegment | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    // Random number of full rotations (5-8) plus random segment
    const randomSpin = Math.floor(Math.random() * 360) + 1800 + (Math.random() * 360)
    const newRotation = rotation + randomSpin

    setRotation(newRotation)

    // Calculate winner after spin
    setTimeout(() => {
      const normalizedRotation = newRotation % 360
      const segmentAngle = 360 / segments.length
      const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length
      setWinner(segments[winningIndex])
      setIsSpinning(false)
    }, 4000)
  }

  const resetWheel = () => {
    setWinner(null)
    setRotation(0)
  }

  return (
    <>
      {/* Floating Gift Box Button */}
      <button
        className="fixed bottom-6 right-0 h-16 w-16 rounded-l-2xl shadow-xl z-40 bg-gradient-to-br from-pink-400 via-purple-400 to-purple-500 hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 transition-all duration-300 flex items-center justify-center group"
        onClick={() => setIsOpen(true)}
      >
        <Gift className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 z-50 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Header */}
              <div className="text-center pt-8 pb-4 px-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Spin To Win
                </h2>
                <p className="text-sm sm:text-base text-gray-300">
                  Spin the wheel to grab exclusive assured rewards
                </p>
              </div>

              {/* Spinning Wheel */}
              <div className="relative flex items-center justify-center py-8 px-4">
                {/* Pointer */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-yellow-400 drop-shadow-lg"></div>
                </div>

                {/* Wheel Container */}
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
                  {/* Center Circle with Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                    <span className="text-2xl sm:text-3xl">💰</span>
                  </div>

                  {/* Wheel */}
                  <div
                    ref={wheelRef}
                    className="w-full h-full rounded-full relative transition-transform duration-[4000ms] ease-out"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      background: `conic-gradient(
                        ${segments.map((seg, i) => {
                          const startAngle = (i * 360) / segments.length
                          const endAngle = ((i + 1) * 360) / segments.length
                          return `${seg.color} ${startAngle}deg ${endAngle}deg`
                        }).join(', ')}
                      )`
                    }}
                  >
                    {/* Segments with text */}
                    {segments.map((segment, index) => {
                      const angle = (360 / segments.length) * index
                      return (
                        <div
                          key={segment.id}
                          className="absolute top-1/2 left-1/2 origin-left"
                          style={{
                            transform: `rotate(${angle + 22.5}deg) translateX(60px)`,
                            width: '100px',
                          }}
                        >
                          <div className="flex flex-col items-center text-center">
                            <span className="text-xl sm:text-2xl mb-1">{segment.icon}</span>
                            <span className="text-[9px] sm:text-[10px] font-bold text-white leading-tight">
                              {segment.text}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Spin Button */}
              <div className="px-6 pb-6">
                {!winner ? (
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-lg font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSpinning ? "Spinning..." : "Spin now"}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    {/* Small Winner Text */}
                    <p className="text-center text-green-400 text-sm font-semibold mb-2">
                      🎉 You won: {winner.text.replace('\n', ' ')}
                    </p>
                    <Button
                      onClick={() => setIsOpen(false)}
                      className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-xl"
                    >
                      Claim Reward
                    </Button>
                    <button
                      onClick={resetWheel}
                      className="w-full text-sm text-gray-400 hover:text-white transition-colors py-2"
                    >
                      Spin Again
                    </button>
                  </div>
                )}
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-gray-500 pb-4 px-6">
                *Terms and conditions apply
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
