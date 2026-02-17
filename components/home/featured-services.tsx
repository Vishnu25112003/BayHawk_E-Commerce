import { Clock, Truck, Home, Scale, CheckCircle } from "lucide-react"

const services = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Order online in minutes, skip the market trips",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Truck,
    title: "Delivered from SSH",
    description: "Sea to Home within 52 hours guaranteed freshness",
    color: "text-[#0A4D8C]",
    bgColor: "bg-[#0A4D8C]/10",
  },
  {
    icon: Home,
    title: "Home Delivery",
    description: "Contactless delivery right to your doorstep",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Scale,
    title: "Price Comparison",
    description: "Compare prices and get the best deals",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description: "100% quality guarantee on all products",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

export function FeaturedServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Featured <span className="text-[#0A4D8C]">Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here you will get some extra services which you will get only here!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-[#0A4D8C] transition-all text-center hover:shadow-lg"
            >
              <div className={`w-16 h-16 rounded-full ${service.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <service.icon className={`h-8 w-8 ${service.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

