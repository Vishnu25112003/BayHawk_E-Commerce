import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Star, Minus, Plus, Weight, Users, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { type Product, useStore } from "@/lib/store"

interface ProductCardProps {
  product: Product
  className?: string
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, className, viewMode = "grid" }: ProductCardProps) {
  const { cart, addToCart, updateQuantity, removeFromCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [showIndicator, setShowIndicator] = useState(false)

  const inWishlist = isInWishlist(product.id)
  const cartItem = cart.find(item => item.id === product.id)
  const quantity = cartItem?.quantity || 0
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const images = [product.image, product.image, product.image]

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setShowIndicator(true)
    }

    api.on("select", handleSelect)

    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  useEffect(() => {
    if (showIndicator) {
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showIndicator, current])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.weight)
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (cartItem) {
      updateQuantity(product.id, quantity + 1)
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (cartItem) {
      if (quantity > 1) {
        updateQuantity(product.id, quantity - 1)
      } else {
        removeFromCart(product.id)
      }
    }
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  // List View Layout
  if (viewMode === "list") {
    return (
      <Link to={`/products/${product.id}`}>
        <div
          className={cn(
            "group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-[#0A4D8C]",
            !product.inStock && "opacity-60",
            className,
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-3 md:gap-4 p-3 md:p-4">
            <div className="relative">
              <Carousel setApi={setApi} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gray-50">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div
                  className={cn(
                    "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 transition-opacity duration-300",
                    isHovered || showIndicator ? "opacity-100" : "opacity-0"
                  )}
                >
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full bg-white transition-all duration-300",
                        current === index ? "w-3 bg-opacity-100" : "bg-opacity-50"
                      )}
                    />
                  ))}
                </div>
              </Carousel>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "absolute top-2 left-2 h-7 w-7 rounded-full bg-white/90 hover:bg-white shadow-md z-10",
                  inWishlist && "bg-red-500 text-white hover:bg-red-600"
                )}
                onClick={handleWishlist}
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm md:text-lg text-gray-900 line-clamp-1">{product.name}</h3>
                    {product.nameTamil && (
                      <p className="text-xs md:text-sm text-sky-500 font-semibold mt-0.5">{product.nameTamil}</p>
                    )}
                  </div>
                </div>

                <p className="hidden md:block text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-700">{product.rating}</span>
                    <span className="hidden sm:inline">({product.reviews})</span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>{product.weight}</span>
                  {product.pieces && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{product.pieces}</span>
                    </>
                  )}
                  {product.serves && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">Serves {product.serves}</span>
                    </>
                  )}
                </div>

                {product.nutrition && (
                  <div className="hidden md:grid grid-cols-4 gap-2 mb-2">
                    <div className="bg-secondary rounded-md p-2 text-center border border-gray-100">
                      <p className="text-[9px] text-muted-foreground leading-none mb-1">Energy</p>
                      <p className="text-xs font-semibold text-gray-900">{product.nutrition.calories}</p>
                    </div>
                    <div className="bg-secondary rounded-md p-2 text-center border border-gray-100">
                      <p className="text-[9px] text-muted-foreground leading-none mb-1">Protein</p>
                      <p className="text-xs font-semibold text-gray-900">{product.nutrition.protein}g</p>
                    </div>
                    <div className="bg-secondary rounded-md p-2 text-center border border-gray-100">
                      <p className="text-[9px] text-muted-foreground leading-none mb-1">Fat</p>
                      <p className="text-xs font-semibold text-gray-900">{product.nutrition.fat}g</p>
                    </div>
                    {product.nutrition.omega3 && (
                      <div className="bg-secondary rounded-md p-2 text-center border border-gray-100">
                        <p className="text-[9px] text-muted-foreground leading-none mb-1">Omega-3</p>
                        <p className="text-xs font-semibold text-green-700">{product.nutrition.omega3}g</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  {product.originalPrice && (
                    <span className="text-xs md:text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-lg md:text-2xl font-bold text-gray-900">₹{product.price}</span>
                </div>

                {product.inStock && (
                  quantity > 0 ? (
                    <div className="flex items-center gap-1 md:gap-2 bg-[#0A4D8C] rounded" onClick={(e) => e.preventDefault()}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 md:h-10 w-8 md:w-10 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-l"
                        onClick={handleDecrement}
                      >
                        <Minus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <span className="text-xs md:text-sm font-bold text-white px-2 min-w-[24px] md:min-w-[32px] text-center">{quantity}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 md:h-10 w-8 md:w-10 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-r"
                        onClick={handleIncrement}
                      >
                        <Plus className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-[#0A4D8C] hover:bg-[#0A4D8C]/90 text-white gap-1 md:gap-2 h-8 md:h-10 text-xs md:text-sm px-2 md:px-4"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid View Layout (default)
  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <div
        className={cn(
          "group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-[#0A4D8C] h-full flex flex-col",
          !product.inStock && "opacity-60",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel setApi={setApi} className="w-full relative">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className={cn(
              "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 transition-opacity duration-300",
              isHovered || showIndicator ? "opacity-100" : "opacity-0"
            )}
          >
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full bg-white transition-all duration-300",
                  current === index ? "w-3 bg-opacity-100" : "bg-opacity-50"
                )}
              />
            ))}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute top-2 left-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/90 hover:bg-white shadow-md z-10",
              inWishlist && "bg-red-500 text-white hover:bg-red-600"
            )}
            onClick={handleWishlist}
          >
            <Heart className={cn("h-3.5 w-3.5 sm:h-4 sm:w-4", inWishlist && "fill-current")} />
          </Button>
        </Carousel>

        {/* Compact Content */}
        <div className="p-2.5 sm:p-3 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1.5 sm:mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
              {product.nameTamil && (
                <p className="text-[10px] sm:text-xs text-sky-500 font-semibold mt-0.5">{product.nameTamil}</p>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
              <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>

          {/* Product Info with Icons */}
          <div className="flex items-center gap-2 sm:gap-3 mb-2 border border-gray-200 rounded-md p-1.5 sm:p-2">
            <div className="flex items-center gap-1 flex-1">
              <Weight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600" />
              <span className="text-[10px] sm:text-xs text-gray-700 font-medium">{product.weight}</span>
            </div>
            {product.pieces && (
              <>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center gap-1 flex-1">
                  <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600" />
                  <span className="text-[10px] sm:text-xs text-gray-700 font-medium">{product.pieces}</span>
                </div>
              </>
            )}
            {product.serves && (
              <>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center gap-1 flex-1">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-600" />
                  <span className="text-[10px] sm:text-xs text-gray-700 font-medium">Serves {product.serves}</span>
                </div>
              </>
            )}
          </div>

          {/* Spacer to push price/button to bottom */}
          <div className="flex-1"></div>

          {/* Price and Add to Cart */}
          <div className="flex items-end justify-between gap-2 mt-auto pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-[#0A4D8C]">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-[9px] sm:text-[10px] font-semibold text-green-600">
                  Save {discount}%
                </span>
              )}
            </div>

            {product.inStock && (
              quantity > 0 ? (
                <div className="flex items-center gap-0.5 sm:gap-1 bg-[#0A4D8C] rounded flex-shrink-0" onClick={(e) => e.preventDefault()}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-l"
                    onClick={handleDecrement}
                  >
                    <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                  <span className="text-[10px] sm:text-xs font-bold text-white px-1 min-w-[16px] sm:min-w-[20px] text-center">{quantity}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-r"
                    onClick={handleIncrement}
                  >
                    <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  className="h-7 sm:h-8 px-2 sm:px-3 bg-[#0A4D8C] hover:bg-[#0A4D8C]/90 text-white text-[10px] sm:text-xs font-medium rounded-md flex-shrink-0 shadow-sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
