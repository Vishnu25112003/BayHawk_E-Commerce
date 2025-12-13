import { Fish, ShoppingCart, Truck, Clock } from "lucide-react"

const services = [
  {
    icon: Fish,
    title: "Daily Fresh Catches",
    description: "Fresh seafood delivered daily",
  },
  {
    icon: ShoppingCart,
    title: "Easy & Quick Checkout",
    description: "Simple and fast ordering process",
  },
  {
    icon: Truck,
    title: "Free Home Delivery",
    description: "Free delivery on orders above ₹500",
  },
  {
    icon: Clock,
    title: "52 Hour Freshness",
    description: "From sea to your home in 52 hours",
  },
]

export function ServiceCards() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gray-900">
            Featured Services
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Here you will get some extra services which you will get only here!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[#0A4D8C]/10 flex items-center justify-center mb-4">
                <service.icon className="h-8 w-8 text-[#0A4D8C]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

