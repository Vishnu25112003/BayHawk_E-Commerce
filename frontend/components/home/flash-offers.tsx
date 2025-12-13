import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Clock, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FlashOffer {
  id: string
  title: string
  discount: string
  code: string
  bgColor: string
  endTime: number
}

const flashOffers: FlashOffer[] = [
  {
    id: "1",
    title: "Flash Sale on Prawns",
    discount: "30% OFF",
    code: "PRAWN30",
    bgColor: "bg-gradient-to-r from-accent to-accent/70",
    endTime: 3600, // 1 hour in seconds
  },
  {
    id: "2",
    title: "Weekend Special",
    discount: "₹100 OFF",
    code: "WEEKEND100",
    bgColor: "bg-gradient-to-r from-primary to-primary/70",
    endTime: 7200, // 2 hours
  },
]

export function FlashOffers() {
  const [currentOffer, setCurrentOffer] = useState(0)
  const [timeLeft, setTimeLeft] = useState(flashOffers[0].endTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next offer
          setCurrentOffer((c) => (c + 1) % flashOffers.length)
          return flashOffers[(currentOffer + 1) % flashOffers.length].endTime
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentOffer])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const offer = flashOffers[currentOffer]

  return (
    <div className={`${offer.bgColor} text-white`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 animate-pulse" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold">{offer.title}</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {offer.discount}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <Link to={`/products?code=${offer.code}`}>
              <Button size="sm" variant="secondary" className="gap-1">
                Shop Now
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
