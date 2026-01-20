import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OfferCountdownBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target time to 1 day from now
    const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#0A4D8C] via-[#0d5fa3] to-[#0A4D8C] text-white py-2 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="container mx-auto flex items-center justify-center gap-4 relative z-10">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center text-center">
          <span className="text-xs md:text-sm font-semibold animate-pulse">
            SPECIAL OFFER!
          </span>
          <span className="text-xs md:text-sm">
            <span className="hidden sm:inline">
              Get 20% OFF on all orders above ₹999
            </span>
            <span className="sm:hidden">20% OFF above ₹999</span>
          </span>

          <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1">
            <span className="text-xs md:text-sm font-medium hidden sm:inline">
              Ends in:
            </span>
            <span className="text-xs font-medium sm:hidden">Ends:</span>
            <div className="flex gap-1">
              <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[28px] md:min-w-[32px] text-center">
                <span className="text-sm md:text-base font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm md:text-base font-bold">:</span>
              <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[28px] md:min-w-[32px] text-center">
                <span className="text-sm md:text-base font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="text-sm md:text-base font-bold">:</span>
              <div className="bg-white text-[#0A4D8C] rounded px-1.5 md:px-2 py-0.5 min-w-[28px] md:min-w-[32px] text-center">
                <span className="text-sm md:text-base font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-white/20 text-white"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
