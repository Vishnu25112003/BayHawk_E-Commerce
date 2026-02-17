import { Clock, Truck, Home, PiggyBank } from "lucide-react"

const services = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Order online in minutes, skip the market trips",
    color: "text-[#0A4D8C]",
    bgColor: "bg-[#0A4D8C]/10",
  },
  {
    icon: Truck,
    title: "S2H Delivery",
    description: "Sea to Home within 52 hours guaranteed freshness",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Home,
    title: "Home Delivery",
    description: "Contactless delivery right to your doorstep",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: PiggyBank,
    title: "Best Prices",
    description: "Compare and save - best prices guaranteed",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ServicesSection() {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Services</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-14 h-14 rounded-full ${service.bgColor} flex items-center justify-center mx-auto mb-4`}
              >
                <service.icon className={`h-7 w-7 ${service.color}`} />
              </div>
              <h3 className="font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
