import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { categories, products } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BestSellerProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const bestSellers = products.filter((p) => p.inStock).slice(0, 10);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        {/* Title and Subtitle for Categories */}
        <div className="text-center mb-8 md:mb-10 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            What's your cooking <span className="text-[#0A4D8C]">today?</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600">
            Freshest seafood and much more!
          </p>
        </div>

        {/* Category Icons */}
        <div className="mb-10 w-full lg:w-4/5 mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.id ? null : cat.id,
                  )
                }
                className={cn(
                  "flex flex-col items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:bg-white/50 group",
                  "w-[calc(33.333%-0.5rem)] sm:w-[calc(33.333%-0.67rem)] md:w-[calc(25%-1rem)] lg:w-[calc(16.666%-1.25rem)]",
                  selectedCategory === cat.id
                    ? "bg-white shadow-lg scale-105 border-2 border-[#0A4D8C]"
                    : "hover:shadow-md border-2 border-transparent",
                )}
              >
                <div
                  className={cn(
                    "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-3 transition-all duration-300 shadow-sm group-hover:shadow-md",
                    selectedCategory === cat.id
                      ? "border-[#0A4D8C] ring-2 ring-[#0A4D8C]/20"
                      : "border-gray-200 group-hover:border-gray-300",
                  )}
                >
                  <img
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <span
                  className={cn(
                    "text-sm sm:text-base font-medium transition-colors text-center leading-tight",
                    selectedCategory === cat.id
                      ? "text-[#0A4D8C] font-semibold"
                      : "text-gray-700 group-hover:text-gray-900",
                  )}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Our Best Seller <span className="text-[#0A4D8C]">Products</span>
          </h2>
          <p className="text-gray-600">Freshest sea meats and much more!</p>
        </div>
        {/* Products Grid */}
        <div className="relative px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bestSellers
              .filter(
                (p) => !selectedCategory || p.category === selectedCategory,
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
