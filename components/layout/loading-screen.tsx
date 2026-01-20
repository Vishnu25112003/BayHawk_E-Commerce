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
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 transition-opacity duration-500",
        !isLoading && "opacity-0 pointer-events-none",
      )}
    >
      {/* Animated Logo with Wave Effect */}
      <div className="relative mb-8">
        {/* Floating Logo */}
        <div className="relative z-10 animate-float">
          <img 
            src="/bayhawk-logo.svg" 
            alt="BayHawk Loading" 
            className="w-32 h-32 object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Animated Circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-40 h-40 rounded-full border-2 border-primary/20 animate-pulse-ring" style={{ animationDelay: '0s' }} />
          <div className="absolute w-40 h-40 rounded-full border-2 border-primary/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
          <div className="absolute w-40 h-40 rounded-full border-2 border-primary/20 animate-pulse-ring" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Text with Gradient */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-gradient">
        FreshCatch
      </h1>
      <p className="text-gray-600 mb-8 animate-fade-in">Fresh from sea to your home</p>

      {/* Modern Dots Loader */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0s' }} />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0.2s' }} />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce-dot" style={{ animationDelay: '0.4s' }} />
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-bounce-dot {
          animation: bounce-dot 1.4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}
