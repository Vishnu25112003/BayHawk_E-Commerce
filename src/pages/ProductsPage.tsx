import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { SlidersHorizontal, Grid3X3, List, ChevronDown, ShoppingBag, Fish, Drumstick, Tag, DollarSign, Star, Package } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { products, categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ProductsPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const typeParam = searchParams.get("type")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [productType, setProductType] = useState<"seafood" | "other" | "all">(
    typeParam === "other" ? "other" : "seafood"
  )
  const [priceRange, setPriceRange] = useState([0, 3000])
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(true)
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const seafoodCategories = categories.filter(c => 
    ['marine', 'water', 'shell', 'fry', 'combo', 'exotics'].includes(c.id)
  )
  const otherCategories = categories.filter(c => 
    ['chicken', 'mutton', 'eggs', 'spices'].includes(c.id)
  )

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by product type
    if (productType === "seafood") {
      result = result.filter((p) => ['marine', 'water', 'shell', 'fry', 'combo', 'exotics'].includes(p.category))
    } else if (productType === "other") {
      result = result.filter((p) => ['chicken', 'mutton', 'eggs', 'spices'].includes(p.category))
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Filter by price
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by rating
    result = result.filter((p) => p.rating >= minRating)

    // Filter by stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    // Sort - in-stock first by default
    result.sort((a, b) => {
      if (a.inStock !== b.inStock) return a.inStock ? -1 : 1
      return 0
    })

    // Additional sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // Assuming newer products have higher IDs
        result.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
    }

    return result
  }, [selectedCategories, priceRange, minRating, inStockOnly, sortBy])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
    )
  }

  const FilterContent = () => (
    <div className="space-y-4">
      {/* Active Filters Summary */}
      {(selectedCategories.length > 0 || minRating > 0 || !inStockOnly || priceRange[0] > 0 || priceRange[1] < 2000) && (
        <div className="bg-[#0A4D8C]/10 border border-[#0A4D8C]/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#0A4D8C]">Active Filters</p>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-[#0A4D8C] hover:text-[#0A4D8C]/80"
              onClick={() => {
                setSelectedCategories([])
                setPriceRange([0, 2000])
                setMinRating(0)
                setInStockOnly(true)
              }}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((catId) => {
              const cat = categories.find(c => c.id === catId)
              return (
                <span key={catId} className="bg-white text-xs px-2 py-1 rounded-full border border-[#0A4D8C]/30 text-[#0A4D8C] font-medium">
                  {cat?.name}
                </span>
              )
            })}
            {minRating > 0 && (
              <span className="bg-white text-xs px-2 py-1 rounded-full border border-[#0A4D8C]/30 text-[#0A4D8C] font-medium">
                {minRating}+ ★
              </span>
            )}
          </div>
        </div>
      )}

      {/* Product Type Selector */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A4D8C]/10 flex items-center justify-center">
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
          </div>
          Product Type
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setProductType("seafood")
              setSelectedCategories([])
            }}
            className={cn(
              "w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all border text-left",
              productType === "seafood"
                ? "bg-[#0A4D8C] text-white border-[#0A4D8C] shadow-md"
                : "bg-white border-gray-200 hover:border-[#0A4D8C]/50 hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0",
              productType === "seafood" ? "bg-white/20" : "bg-[#0A4D8C]/10"
            )}>
              <Fish className={cn("h-4 w-4 sm:h-5 sm:w-5", productType === "seafood" ? "text-white" : "text-[#0A4D8C]")} />
            </div>
            <span className="text-xs sm:text-sm font-medium flex-1">Seafood Products</span>
          </button>
          <button
            onClick={() => {
              setProductType("other")
              setSelectedCategories([])
            }}
            className={cn(
              "w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all border text-left",
              productType === "other"
                ? "bg-[#0A4D8C] text-white border-[#0A4D8C] shadow-md"
                : "bg-white border-gray-200 hover:border-[#0A4D8C]/50 hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0",
              productType === "other" ? "bg-white/20" : "bg-[#0A4D8C]/10"
            )}>
              <Drumstick className={cn("h-4 w-4 sm:h-5 sm:w-5", productType === "other" ? "text-white" : "text-[#0A4D8C]")} />
            </div>
            <span className="text-xs sm:text-sm font-medium flex-1">Other Products</span>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A4D8C]/10 flex items-center justify-center">
            <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
          </div>
          Categories
        </h3>
        <div className="space-y-2">
          {(productType === "seafood" ? seafoodCategories : otherCategories).map((cat) => (
            <label
              key={cat.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border",
                selectedCategories.includes(cat.id)
                  ? "bg-[#0A4D8C]/10 border-[#0A4D8C] shadow-sm"
                  : "bg-white border-gray-200 hover:border-[#0A4D8C]/50 hover:bg-gray-50"
              )}
            >
              <Checkbox
                id={cat.id}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
                className="data-[state=checked]:bg-[#0A4D8C] data-[state=checked]:border-[#0A4D8C]"
              />
              <span className="text-sm font-medium flex-1">{cat.name}</span>
              {selectedCategories.includes(cat.id) && (
                <span className="text-[#0A4D8C] font-bold">✓</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A4D8C]/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
          </div>
          Price Range
        </h3>
        <Slider 
          value={priceRange} 
          onValueChange={setPriceRange} 
          min={0} 
          max={2000} 
          step={50} 
          className="mb-4" 
        />
        <div className="flex justify-between items-center">
          <div className="bg-white px-3 py-2 rounded border border-gray-200">
            <span className="text-xs text-gray-500">Min</span>
            <p className="font-semibold text-sm">₹{priceRange[0]}</p>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="bg-white px-3 py-2 rounded border border-gray-200">
            <span className="text-xs text-gray-500">Max</span>
            <p className="font-semibold text-sm">₹{priceRange[1]}</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2 text-gray-900">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A4D8C]/10 flex items-center justify-center">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
          </div>
          Minimum Rating
        </h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                className="data-[state=checked]:bg-[#0A4D8C] data-[state=checked]:border-[#0A4D8C]"
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex-1 font-medium flex items-center gap-1">
                {rating}+ 
                <span className="text-yellow-500">★</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 p-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A4D8C]/10 flex items-center justify-center shrink-0">
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-[#0A4D8C]" />
          </div>
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
            className="data-[state=checked]:bg-[#0A4D8C] data-[state=checked]:border-[#0A4D8C]"
          />
          <Label htmlFor="in-stock" className="text-xs sm:text-sm cursor-pointer font-medium flex-1">
            Show In Stock Only
          </Label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full h-12 border-2 border-[#0A4D8C] text-[#0A4D8C] hover:bg-[#0A4D8C] hover:text-white font-semibold transition-colors"
        onClick={() => {
          setSelectedCategories([])
          setPriceRange([0, 2000])
          setMinRating(0)
          setInStockOnly(false)
        }}
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
            {categoryParam && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {categories.find((c: { id: string; name: string }) => c.id === categoryParam)?.name || categoryParam}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-xl border border-border">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Filters</span>
                      {(selectedCategories.length > 0 || minRating > 0 || !inStockOnly) && (
                        <span className="ml-1 bg-[#0A4D8C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {selectedCategories.length + (minRating > 0 ? 1 : 0) + (!inStockOnly ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0 flex flex-col top-[72px] h-[calc(100vh-72px)]">
                    <SheetHeader className="border-b pb-4 px-6 pt-6 shrink-0">
                      <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
                      <p className="text-sm text-muted-foreground">
                        {filteredProducts.length} products found
                      </p>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-sm text-muted-foreground">{filteredProducts.length} products found</span>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort by
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("featured")}>Featured</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("rating")}>Top Rated</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* View Mode Toggle - Now visible on mobile */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-none h-9 w-9", viewMode === "grid" && "bg-secondary")}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-none h-9 w-9", viewMode === "list" && "bg-secondary")}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 2000])
                    setMinRating(0)
                    setInStockOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingElements />
    </div>
  )
}

