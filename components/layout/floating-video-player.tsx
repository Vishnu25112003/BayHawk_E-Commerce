import { useState, useRef, useEffect } from "react"
import { X, Volume2, VolumeX, Maximize2, Minimize2, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function FloatingVideoPlayer() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed z-40 transition-all duration-500 ease-in-out",
        isExpanded
          ? "bottom-4 left-4 w-[50vw] h-[88vw] md:w-[320px] md:h-[568px]"
          : "bottom-6 left-6 w-[120px] h-[213px] md:w-[200px] md:h-[355px]"
      )}
    >
      {/* Professional Box Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Decorative Border Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0A4D8C] via-blue-500 to-cyan-400 opacity-20 blur-xl"></div>
        
        {/* Main Video Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 backdrop-blur-sm">
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

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none"></div>
          
          {/* Top Bar - Header */}
          <div className="absolute top-0 left-0 right-0 p-1.5 md:p-2 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent z-10">
            <div className="flex items-center gap-1">
              <Badge className="bg-red-600 hover:bg-red-600 text-white text-[8px] md:text-xs font-bold px-1 md:px-2 py-0.5 animate-pulse">
                LIVE
              </Badge>
              {isExpanded && (
                <span className="text-white text-[8px] md:text-xs font-semibold drop-shadow-lg">
                  Fresh Catch
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-0.5 md:gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 md:h-8 md:w-8 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpand()
                }}
              >
                {isExpanded ? (
                  <Minimize2 className="h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <Maximize2 className="h-3 w-3 md:h-4 md:w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 md:h-8 md:w-8 bg-white/10 hover:bg-red-500/80 text-white rounded-lg backdrop-blur-md transition-all p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClose()
                }}
              >
                <X className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>

          {/* Bottom Bar - Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2 bg-gradient-to-t from-black/80 to-transparent z-10">
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 md:h-9 md:w-9 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePlay()
                  }}
                >
                  {isPlaying ? (
                    <Pause className="h-3 w-3 md:h-4 md:w-4" />
                  ) : (
                    <Play className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 md:h-9 md:w-9 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                >
                  {isMuted ? (
                    <VolumeX className="h-3 w-3 md:h-4 md:w-4" />
                  ) : (
                    <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                </Button>
              </div>

              {/* Right Info */}
              {isExpanded && (
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-1.5 md:px-2 py-1 border border-white/20">
                  <span className="text-white text-[8px] md:text-xs font-semibold drop-shadow-lg">
                    🐟 Fresh Seafood
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Animated Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#0A4D8C]/30 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-tr-full pointer-events-none"></div>
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0A4D8C] via-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-lg -z-10 animate-pulse"></div>
      </div>
    </div>
  )
}
