"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OffersVideo({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isVisible, setIsVisible] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const videoClosed = localStorage.getItem("offersVideoClosed") === "true"
    if (videoClosed && !isLoggedIn) {
      setIsVisible(false)
      setShowVideo(false)
    } else {
      setIsVisible(true)
      setShowVideo(true)
    }
  }, [isLoggedIn])

  const handleClose = () => {
    localStorage.setItem("offersVideoClosed", "true")
    setIsVisible(false)
    setShowVideo(false)
  }

  if (!isVisible || !showVideo) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-[20rem] md:max-w-xs lg:max-w-sm">
      <div className="relative bg-black rounded-lg shadow-lg overflow-hidden aspect-video">
        <video
          src="/offers-video.mp4" // Placeholder video URL
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
