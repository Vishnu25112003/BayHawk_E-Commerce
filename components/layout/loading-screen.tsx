import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        !isLoading && "opacity-0 pointer-events-none",
      )}
    >
      {/* Logo Animation */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-bounce">
              <span className="text-4xl">🐟</span>
            </div>
          </div>
        </div>
        {/* Water ripple effect */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">FreshCatch</h1>
      <p className="text-muted-foreground mb-6">Fresh from sea to your home</p>

      <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{
            animation: "loadingBar 2s ease-in-out forwards",
          }}
        />
      </div>
    </div>
  )
}
