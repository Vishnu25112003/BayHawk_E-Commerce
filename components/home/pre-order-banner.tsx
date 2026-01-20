import { Link } from "react-router-dom"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PreOrderBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-6 md:p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Pre-Order Fresh Seafood</h3>
                <p className="text-muted-foreground">
                  Schedule your order up to 1 month in advance. Get the freshest catch delivered on your preferred date.
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="h-4 w-4" />
                    <span>52-hour delivery</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <span>100% Fresh Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/products?preorder=true">
              <Button size="lg" className="gap-2 shrink-0">
                Pre-Order Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
