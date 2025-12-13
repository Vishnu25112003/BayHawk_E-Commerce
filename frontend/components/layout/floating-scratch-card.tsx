import { useState, useRef, useEffect } from "react"
import { X, Gift, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingScratchCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const [isScratching, setIsScratching] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const couponCode = "FRESH50"

  useEffect(() => {
    if (isOpen && !isScratched) {
      // Delay canvas initialization to ensure proper sizing
      setTimeout(() => initCanvas(), 100)
    }
  }, [isOpen])

  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match display size exactly
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Create blue gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#3b82f6")
    gradient.addColorStop(0.5, "#2563eb")
    gradient.addColorStop(1, "#1d4ed8")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add "Scratch Here" text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 18px Arial"
    ctx.textAlign = "center"
    ctx.fillText("🎁 Scratch Here", canvas.width / 2, canvas.height / 2 - 15)
    ctx.font = "14px Arial"
    ctx.fillText("to reveal your", canvas.width / 2, canvas.height / 2 + 5)
    ctx.font = "bold 16px Arial"
    ctx.fillText("Special Offer!", canvas.width / 2, canvas.height / 2 + 30)
  }

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || isScratched) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ('touches' in e) {
      // For touch events
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      // For mouse events
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    // Scale coordinates to match canvas internal size
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    x = x * scaleX
    y = y * scaleY

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 30, 0, Math.PI * 2)
    ctx.fill()

    // Check if enough is scratched
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
      {/* Floating Gift Box Button */}
      <button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-2xl shadow-xl z-40 bg-gradient-to-br from-pink-400 via-purple-400 to-purple-500 hover:from-pink-500 hover:via-purple-500 hover:to-purple-600 transition-all duration-300 flex items-center justify-center group"
        onClick={() => setIsOpen(true)}
      >
        <Gift className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6" />
                  <span className="font-bold text-lg">Special Offer for You!</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scratch Card Content */}
              <div className="p-6">
                {/* Scratch Card */}
                <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border-2 border-blue-200 mb-4">
                  {/* Offer Content */}
                  <div className="p-6 text-center min-h-[220px] flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      50% OFF
                    </div>
                    <div className="text-base text-gray-700 mb-4">
                      On your next order
                    </div>
                    <div className="bg-white rounded-lg px-6 py-3 border-2 border-dashed border-blue-300">
                      <div className="text-xs text-gray-600 mb-1">Coupon Code</div>
                      <div className="text-xl font-bold text-blue-600 font-mono">
                        {couponCode}
                      </div>
                    </div>
                  </div>

                  {/* Scratch Canvas Overlay */}
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

                  {/* Revealed Badge */}
                  {isScratched && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Revealed!
                    </div>
                  )}
                </div>

                {/* Copy Button */}
                {isScratched && (
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    onClick={handleCopyCode}
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Code
                      </>
                    )}
                  </Button>
                )}

                {/* Info Text */}
                <p className="text-sm text-center text-gray-600 mt-4">
                  {isScratched 
                    ? "🎉 Apply this code at checkout to get your discount!"
                    : "✨ Scratch the card above to reveal your exclusive discount!"
                  }
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
