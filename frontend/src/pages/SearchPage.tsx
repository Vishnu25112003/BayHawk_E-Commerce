import { useState } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search, X, Camera, SlidersHorizontal } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { products } from "@/lib/data"
import { notification } from "@/lib/notification"

const categoryFilters = [
  { id: "marine", label: "Marine Fish" },
  { id: "shell", label: "Shell Fish" },
  { id: "water", label: "Fresh Water" },
]

const cutTypeFilters = [
  { id: "uncleaned", label: "Uncleaned" },
  { id: "cleaned", label: "Cut & Cleaned" },
  { id: "boneless", label: "Boneless" },
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCutTypes, setSelectedCutTypes] = useState<string[]>([])


  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    return matchesQuery && matchesCategory
  })

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const toggleCutType = (id: string) => {
    setSelectedCutTypes((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedCutTypes([])
  }

  const handleImageSearch = () => {

    // In a real app, this would open camera/file picker
    notification.info(
      "In a real app, this would allow you to upload an image of fish to identify and find similar products.",
      "Image Search Feature"
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filters */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categoryFilters.map((filter) => (
            <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(filter.id)}
                onCheckedChange={() => toggleCategory(filter.id)}
              />
              <span className="text-sm">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cut Type Filters */}
      <div>
        <h3 className="font-semibold mb-3">Cut Type</h3>
        <div className="space-y-2">
          {cutTypeFilters.map((filter) => (
            <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCutTypes.includes(filter.id)}
                onCheckedChange={() => toggleCutType(filter.id)}
              />
              <span className="text-sm">{filter.label}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedCategories.length > 0 || selectedCutTypes.length > 0) && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          Clear Filters
        </Button>
      )}
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
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Search Results</h1>
              {searchQuery && (
                <p className="text-muted-foreground">
                  Showing results for <span className="text-foreground font-medium">"{searchQuery}"</span>
                </p>
              )}
            </div>

            {/* Image Search Button */}
            <Button variant="outline" onClick={handleImageSearch} className="gap-2 bg-transparent">
              <Camera className="h-4 w-4" />
              Search by Image
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedCutTypes.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1">
                  {categoryFilters.find((f) => f.id === cat)?.label}
                  <button onClick={() => toggleCategory(cat)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedCutTypes.map((cut) => (
                <Badge key={cut} variant="secondary" className="gap-1">
                  {cutTypeFilters.find((f) => f.id === cut)?.label}
                  <button onClick={() => toggleCutType(cut)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-xl border border-border">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard product={product} />
                      {/* Availability Badge */}
                      {product.inStock ? (
                        <Badge className="absolute top-2 left-2 bg-green-500 text-white">In Stock</Badge>
                      ) : (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">Out of Stock</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-bold mb-2">No results found</h2>
                <p className="text-muted-foreground mb-6">We could not find any products matching your search.</p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Suggestions:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link to="/products?category=marine">
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        Marine Fish
                      </Badge>
                    </Link>
                    <Link to="/products?category=shell">
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        Shell Fish
                      </Badge>
                    </Link>
                    <Link to="/products?category=combo">
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        Combo Packs
                      </Badge>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

    </div>
  )
}

