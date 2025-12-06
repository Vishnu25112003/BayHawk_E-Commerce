import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingVideoPlayer() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Auto-play prevented:", error)
      })
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-40 transition-all duration-300 ease-in-out",
        isExpanded 
          ? "w-[90vw] h-[50vh] md:w-[600px] md:h-[340px]" 
          : "w-[280px] h-[160px] md:w-[320px] md:h-[180px]"
      )}
    >
      <div className="relative w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-white/20">
        {/* Video */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          autoPlay
        >
          {/* Realistic seafood/fish video - Replace with your actual video URL */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with controls - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300">
          {/* Top controls */}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-black/70 hover:bg-black/90 text-white rounded-full shadow-lg"
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-black/70 hover:bg-black/90 text-white rounded-full shadow-lg"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/70 hover:bg-black/90 text-white rounded-full shadow-lg"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {!isExpanded && (
              <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                <span className="text-white text-xs font-semibold">
                  Fresh Seafood 🐟
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Pulsing border animation */}
        <div className="absolute inset-0 rounded-lg border-2 border-[#0A4D8C] animate-pulse pointer-events-none"></div>
      </div>


    </div>
  )
}
