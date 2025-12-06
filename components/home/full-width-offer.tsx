import { Button } from "@/components/ui/button"

export function FullWidthOffer() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1400&h=250&fit=crop"
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center">
            <div className="container mx-auto px-8">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                Get 30% Offer with 30% of 2025
              </h3>
              <p className="text-white/90 mb-4 text-sm md:text-base">Limited time offer on all seafood products</p>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
