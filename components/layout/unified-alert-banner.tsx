import { useState, useEffect } from "react"
import { X, CloudRain, AlertTriangle, Ban, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AlertType = "offer" | "rain" | "ban" | null

interface AlertData {
  type: AlertType
  priority: number // Higher priority shows first
  message: string
  severity?: "low" | "moderate" | "high"
  countdown?: {
    hours: number
    minutes: number
    seconds: number
  }
}

export function UnifiedAlertBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Check for various alerts and prioritize them
    const checkAlerts = () => {
      const alerts: AlertData[] = []

      // Check for ban period (highest priority)
      const isBanPeriod = false // Set based on your logic
      if (isBanPeriod) {
        alerts.push({
          type: "ban",
          priority: 3,
          message: "Alcohol sales restricted during ban period. Other items available for delivery.",
          severity: "high",
        })
      }

      // Check for rain (high priority)
      const hasRain = Math.random() > 0.7 // Simulate rain detection
      if (hasRain) {
        const severities: Array<"low" | "moderate" | "high"> = ["low", "moderate", "high"]
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)]
        
        const messages = {
          low: "Light rain expected. Deliveries running on schedule.",
          moderate: "Moderate rain in your area. Deliveries may be delayed by 30-60 minutes.",
          high: "Heavy rain alert! Deliveries may be significantly delayed. Stay safe!",
        }
        
        alerts.push({
          type: "rain",
          priority: 2,
          message: messages[randomSeverity],
          severity: randomSeverity,
        })
      }

      // Check for offers (normal priority)
      const hasOffer = true // Always show offer if no higher priority alerts
      if (hasOffer) {
        alerts.push({
          type: "offer",
          priority: 1,
          message: "Get 20% OFF on all orders above ₹999",
        })
      }

      // Sort by priority and show highest
      alerts.sort((a, b) => b.priority - a.priority)
      if (alerts.length > 0) {
        setCurrentAlert(alerts[0])
      }
    }

    checkAlerts()
    // Recheck every 5 minutes
    const interval = setInterval(checkAlerts, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Countdown timer for offers
  useEffect(() => {
    if (currentAlert?.type !== "offer") return

    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetTime - now

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [currentAlert])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem(`alert-${currentAlert?.type}-dismissed`, "true")
  }

  if (!isVisible || !currentAlert) return null

  // Alert configurations
  const alertConfigs = {
    offer: {
      bg: "bg-gradient-to-r from-[#0A4D8C] via-[#0d5fa3] to-[#0A4D8C]",
      text: "text-white",
      icon: Gift,
      iconColor: "text-white",
      emoji: "🎉",
    },
    rain: {
      low: {
        bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
        text: "text-white",
        icon: CloudRain,
        iconColor: "text-white",
        emoji: "🌧️",
      },
      moderate: {
        bg: "bg-gradient-to-r from-orange-500 to-amber-500",
        text: "text-white",
        icon: CloudRain,
        iconColor: "text-white",
        emoji: "⛈️",
      },
      high: {
        bg: "bg-gradient-to-r from-red-500 to-rose-600",
        text: "text-white",
        icon: AlertTriangle,
        iconColor: "text-white animate-pulse",
        emoji: "🚨",
      },
    },
    ban: {
      bg: "bg-gradient-to-r from-gray-700 to-gray-900",
      text: "text-white",
      icon: Ban,
      iconColor: "text-red-400",
      emoji: "⚠️",
    },
  }

  let config
  if (currentAlert.type === "rain" && currentAlert.severity) {
    config = alertConfigs.rain[currentAlert.severity]
  } else if (currentAlert.type === "offer") {
    config = alertConfigs.offer
  } else if (currentAlert.type === "ban") {
    config = alertConfigs.ban
  } else {
    config = alertConfigs.offer
  }

  const Icon = config.icon

  return (
    <div className={cn("relative overflow-hidden", config.bg)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className={cn("container mx-auto px-3 md:px-4 py-2 relative z-10", config.text)}>
        <div className="flex items-center justify-center gap-2 md:gap-4 relative">
          {/* Icon */}
          <Icon className={cn("h-4 w-4 md:h-5 md:w-5 flex-shrink-0", config.iconColor)} />

          {/* Content */}
          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center text-center flex-1 min-w-0">
            {currentAlert.type === "offer" && (
              <>
                <span className="text-xs md:text-sm font-semibold animate-pulse">
                  {config.emoji} SPECIAL OFFER!
                </span>
                <span className="text-xs md:text-sm">
                  <span className="hidden sm:inline">{currentAlert.message}</span>
                  <span className="sm:hidden">20% OFF above ₹999</span>
                </span>
                
                {/* Countdown */}
                <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1">
                  <span className="text-xs md:text-sm font-medium hidden sm:inline">Ends in:</span>
                  <span className="text-xs font-medium sm:hidden">Ends:</span>
                  <div className="flex gap-1">
                    <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[24px] md:min-w-[28px] text-center">
                      <span className="text-xs md:text-sm font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
                    </div>
                    <span className="text-xs md:text-sm font-bold">:</span>
                    <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[24px] md:min-w-[28px] text-center">
                      <span className="text-xs md:text-sm font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    </div>
                    <span className="text-xs md:text-sm font-bold">:</span>
                    <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[24px] md:min-w-[28px] text-center">
                      <span className="text-xs md:text-sm font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentAlert.type === "rain" && (
              <>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded">
                  {config.emoji} {currentAlert.severity === "high" ? "Weather Alert" : "Rain Update"}
                </span>
                <span className="text-xs md:text-sm font-medium">
                  {currentAlert.message}
                </span>
              </>
            )}

            {currentAlert.type === "ban" && (
              <>
                <span className="text-xs md:text-sm font-bold uppercase tracking-wide bg-red-500/30 px-2 py-0.5 rounded">
                  {config.emoji} Ban Period
                </span>
                <span className="text-xs md:text-sm font-medium">
                  {currentAlert.message}
                </span>
              </>
            )}
          </div>

          {/* Dismiss Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 md:h-7 md:w-7 hover:bg-white/20 text-white flex-shrink-0 rounded-full"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
