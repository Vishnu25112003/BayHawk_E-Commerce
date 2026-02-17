import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function PromoBanner() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary">
          <div className="absolute inset-0 opacity-20">
            <img src="/placeholder.svg" alt="Pattern" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/80 text-sm font-medium mb-2">Limited Time Offer</p>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Get 20% Off Your First Order
              </h3>
              <p className="text-primary-foreground/90">
                Use code: <span className="font-bold">FRESH20</span> at checkout
              </p>
            </div>
            <Link to="/products">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 shrink-0">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
