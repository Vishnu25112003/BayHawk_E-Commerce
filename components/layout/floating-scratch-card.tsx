import { useState, useRef, useEffect } from "react"
import { X, Gift, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingScratchCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const couponCode = "FRESH50"
  const cashbackAmount = "₹50"

  useEffect(() => {
    if (isOpen && !isScratched) {
      setTimeout(() => initCanvas(), 100)
    }
  }, [isOpen])

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Modern gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#6366f1")
    gradient.addColorStop(0.5, "#8b5cf6")
    gradient.addColorStop(1, "#d946ef")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add pattern overlay
    ctx.globalAlpha = 0.1
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1

    // Scratch text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 20px system-ui"
    ctx.textAlign = "center"
    ctx.fillText("✨ Scratch to Win", canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = "14px system-ui"
    ctx.fillText("Your Reward Awaits!", canvas.width / 2, canvas.height / 2 + 15)
  }

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || isScratched) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    x = x * scaleX
    y = y * scaleY

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparent = 0

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++
    }

    const scratchedPercentage = (transparent / (pixels.length / 4)) * 100

    if (scratchedPercentage > 50 && !isScratched) {
      setIsScratched(true)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode)
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
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  {/* Revealed Content */}
                  <div className="p-8 text-center min-h-[240px] flex flex-col items-center justify-center">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4 mb-4 shadow-lg">
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {cashbackAmount}
                    </div>
                    <div className="text-lg text-gray-700 font-medium mb-4">
                      Cashback Reward
                    </div>
                    <div className="bg-white rounded-xl px-6 py-3 shadow-md border-2 border-dashed border-purple-300">
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Coupon Code</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-mono">
                        {couponCode}
                      </div>
                    </div>
                  </div>

                  {/* Scratch Canvas */}
                  {!isScratched && (
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                      onMouseDown={() => setIsScratching(true)}
                      onMouseUp={() => setIsScratching(false)}
                      onMouseMove={(e) => isScratching && handleScratch(e)}
                      onTouchStart={() => setIsScratching(true)}
                      onTouchEnd={() => setIsScratching(false)}
                      onTouchMove={(e) => isScratching && handleScratch(e)}
                    />
                  )}

                  {/* Success Badge */}
                  {isScratched && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Check className="w-4 h-4" />
                      Unlocked!
                    </div>
                  )}
                </div>

                {/* Copy Button */}
                {isScratched && (
                  <Button
                    size="lg"
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
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
