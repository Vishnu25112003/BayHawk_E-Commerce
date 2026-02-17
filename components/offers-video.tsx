"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function OffersVideo({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isVisible, setIsVisible] = useState(true)
  const [showVideo, setShowVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  if (!isVisible || !showVideo) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-[10rem] md:max-w-[10rem] lg:max-w-[12rem]">
      <div className="relative bg-black rounded-lg shadow-lg overflow-hidden aspect-[9/16]">
        <video
          ref={videoRef}
          src="/offers-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none"></div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 text-white bg-black/30 hover:bg-black/50 rounded-full"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
