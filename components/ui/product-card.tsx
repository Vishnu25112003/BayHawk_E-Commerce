import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, Share2, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { type Product, useStore } from "@/lib/store"

interface ProductCardProps {
  product: Product
  className?: string
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, className, viewMode = "grid" }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [isHovered, setIsHovered] = useState(false)

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.weight)
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

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on FreshCatch`,
        url: window.location.origin + `/products/${product.id}`,
      })
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
            {/* Image */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Badges */}
              <div className="absolute top-1 left-1 md:top-2 md:left-2 flex flex-col gap-1">
                {discount > 0 && (
                  <div className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                    {discount}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="bg-gray-800 text-white text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                    Sold
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1 md:mb-2">
                  <h3 className="font-semibold text-sm md:text-lg text-gray-900 line-clamp-2">{product.name}</h3>
                  <div className="hidden sm:flex gap-1 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className={cn(
                        "h-7 w-7 md:h-8 md:w-8 rounded-full",
                        inWishlist && "bg-red-500 text-white hover:bg-red-600",
                      )}
                      onClick={handleWishlist}
                    >
                      <Heart className={cn("h-3 w-3 md:h-4 md:w-4", inWishlist && "fill-current")} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 md:h-8 md:w-8 rounded-full"
                      onClick={handleShare}
                    >
                      <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
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
                      <span className="hidden sm:inline">{product.pieces} pcs</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  {product.originalPrice && (
                    <span className="text-xs md:text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                  )}
                  <span className="text-lg md:text-2xl font-bold text-gray-900">₹{product.price}</span>
                </div>

                {product.inStock && (
                  <Button
                    size="sm"
                    className="bg-[#0A4D8C] hover:bg-[#0A4D8C]/90 text-white gap-1 md:gap-2 h-8 md:h-10 text-xs md:text-sm px-2 md:px-4"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
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
    <Link to={`/products/${product.id}`}>
      <div
        className={cn(
          "group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-[#0A4D8C] max-w-xs",
          !product.inStock && "opacity-60",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Compact Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top Badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {discount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                {discount}%
              </div>
            )}
            {!product.inStock && (
              <div className="bg-gray-800 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                Sold
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className={cn(
            "absolute top-2 right-2 flex gap-1 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "h-6 w-6 rounded-full bg-white/90 hover:bg-white transition-all",
                inWishlist && "bg-red-500 text-white hover:bg-red-600",
              )}
              onClick={handleWishlist}
            >
              <Heart className={cn("h-3 w-3", inWishlist && "fill-current")} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full bg-white/90 hover:bg-white transition-all"
              onClick={handleShare}
            >
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Compact Content */}
        <div className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{product.weight}</span>
                {product.pieces && <span>• {product.pieces} pcs</span>}
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
            </div>

            {product.inStock && (
              <Button
                size="sm"
                className="h-7 px-2 bg-[#0A4D8C] hover:bg-[#0A4D8C]/90 text-white text-xs font-medium rounded"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
