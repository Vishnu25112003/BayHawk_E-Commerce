import { Link } from "react-router-dom"
import { categories } from "@/lib/data"

export function CategoryIcons() {
  return (
    <section className="py-12 bg-secondary">
      <div className="w-4/5 mx-auto px-4">
        {/* Title and Subtitle */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            What's your cooking <span className="text-[#0A4D8C]">today?</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Freshest seafood and much more!
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/products?category=${cat.id}`} 
              className="flex flex-col items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-lg group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-card border-2 border-border overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}