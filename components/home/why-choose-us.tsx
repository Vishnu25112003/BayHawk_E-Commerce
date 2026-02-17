import { Truck, Clock, MapPin, BadgePercent } from "lucide-react"

const reasons = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Skip the market, order online in minutes",
  },
  {
    icon: Truck,
    title: "52H Delivery",
    description: "Fresh catch delivered within 52 hours",
  },
  {
    icon: MapPin,
    title: "Home Delivery",
    description: "Doorstep delivery across major cities",
  },
  {
    icon: BadgePercent,
    title: "Best Prices",
    description: "Compare and save on every order",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                <reason.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
