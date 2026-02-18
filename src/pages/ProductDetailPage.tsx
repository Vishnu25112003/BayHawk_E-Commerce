import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Star, Minus, Plus, ChevronLeft, Share2 } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { products, categories } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"


export default function ProductDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, clearCart } = useStore()

  const product = products.find((p: { id: string }) => p.id === params.id)
  const [selectedWeight] = useState(product?.weight || "500g")
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id || "")
  const [quantity, setQuantity] = useState(1)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [showIndicator, setShowIndicator] = useState(true)

  const [calculatedPieces, setCalculatedPieces] = useState(product?.pieces);
  const [calculatedServes, setCalculatedServes] = useState(product?.serves);
  const [calculatedNutrition, setCalculatedNutrition] = useState(product?.nutrition);
  const [calculatedWeight, setCalculatedWeight] = useState(selectedWeight);

  useEffect(() => {
    if (product) {
      const baseWeightInGrams = parseFloat(product.weight.replace('g', ''));
      const newWeightInGrams = baseWeightInGrams * quantity;
      setCalculatedWeight(`${newWeightInGrams}g`);

      if (product.pieces) {
        const piecesMatch = product.pieces.match(/(\d+(?:-\d+)?)/);
        if (piecesMatch) {
          const basePieces = piecesMatch[1];
          if (basePieces.includes('-')) {
            const [min, max] = basePieces.split('-').map(Number);
            setCalculatedPieces(`${min * quantity}-${max * quantity} Pieces`);
          } else {
            setCalculatedPieces(`${parseInt(basePieces) * quantity} Pieces`);
          }
        }
      }
      if (product.serves) {
        const servesMatch = product.serves.match(/(\d+(?:-\d+)?)/);
        if (servesMatch) {
          const baseServes = servesMatch[1];
          if (baseServes.includes('-')) {
            const [min, max] = baseServes.split('-').map(Number);
            setCalculatedServes(`${min * quantity}-${max * quantity}`);
          } else {
            setCalculatedServes(`${parseInt(baseServes) * quantity}`);
          }
        }
      }
      if (product.nutrition) {
        setCalculatedNutrition({
          calories: Number((product.nutrition.calories * quantity).toFixed(2)),
          protein: Number((product.nutrition.protein * quantity).toFixed(2)),
          fat: Number((product.nutrition.fat * quantity).toFixed(2)),
          omega3: product.nutrition.omega3 ? Number((product.nutrition.omega3 * quantity).toFixed(2)) : undefined,
        });
      }
    }
  }, [quantity, product]);

  // Get current variant details
  const currentVariant = product?.variants?.find(v => v.id === selectedVariant)
  const currentPrice = currentVariant?.price || product?.price || 0
  
  // Review state
  const [reviews, setReviews] = useState([
    { name: "Rahul M.", rating: 5, text: "Excellent quality! Very fresh and tasty.", date: "2 days ago" },
    { name: "Priya S.", rating: 4, text: "Good product, delivery was on time.", date: "1 week ago" },
    { name: "Amit K.", rating: 5, text: "Best fish I have ordered online. Will order again!", date: "2 weeks ago" },
  ])
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" })

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
      }, 2000) // Hide after 2 seconds
      return () => clearTimeout(timer)
    }
  }, [showIndicator, current])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const category = categories.find((c: { id: string }) => c.id === product.category)
  const relatedProducts = products.filter((p: { category: string; id: string }) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Mock multiple images
  const images = [product.image, product.image, product.image, product.image]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedWeight)
    }
  }

  const handleBuyNow = () => {
    // Clear cart and add only this product for direct checkout
    clearCart()
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedWeight)
    }
    // Navigate directly to checkout
    navigate("/checkout?direct=true")
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

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
              <BreadcrumbLink to="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {category && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink to={`/products?category=${category.id}`}>{category.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button - Mobile */}
        <Button variant="ghost" className="mb-4 lg:hidden" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Side - Compact Image */}
          <div className="space-y-3">
          <Carousel setApi={setApi} className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[50vh] md:h-[70vh] rounded-lg overflow-hidden bg-secondary border border-gray-200">
              <img
                src={img || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.badge && <Badge className="bg-accent text-accent-foreground text-xs px-2 py-0.5">{product.badge}</Badge>}
                {discount > 0 && <Badge variant="destructive" className="text-xs px-2 py-0.5">{discount}% OFF</Badge>}
              </div>
              {/* Share Button */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
              >
                <Share2 className="h-3 w-3" />
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-300",
        showIndicator ? "opacity-100" : "opacity-0"
      )}>
        {images.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full bg-white transition-all duration-300",
              current === index ? "w-4 bg-opacity-100" : "bg-opacity-50"
            )}
          />
        ))}
      </div>
    </Carousel>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col space-y-3 h-[50vh] md:h-[70vh] overflow-y-auto pr-2">
            {/* Product Name & Rating */}
            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                  <Star className="h-3.5 w-3.5 fill-green-600 text-green-600" />
                  <span className="font-semibold text-xs text-green-700">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-600">({product.reviews} reviews)</span>
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs py-0">In Stock</Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600 border-red-600 text-xs py-0">Out of Stock</Badge>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-100">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl md:text-3xl font-bold text-gray-900">₹{currentPrice}</span>
                {product.originalPrice && currentPrice < product.originalPrice && (
                  <>
                    <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                    <Badge variant="destructive" className="text-xs py-0">
                      {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {product.originalPrice && currentPrice < product.originalPrice && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  You save ₹{product.originalPrice - currentPrice}
                </p>
              )}
            </div>

            {/* Variants Section - Compact */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
                <h3 className="font-semibold text-xs mb-2 text-gray-900">Select Type</h3>
                <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
                  {product.variants.map((variant) => (
                    <label
                      key={variant.id}
                      className={cn(
                        "flex items-center justify-between p-1.5 rounded cursor-pointer transition-all",
                        selectedVariant === variant.id
                          ? "bg-[#0A4D8C] text-white"
                          : "bg-white hover:bg-gray-100 border border-gray-200",
                        !variant.inStock && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className={cn(
                          "w-3.5 h-3.5 rounded-full border-2 flex-shrink-0",
                          selectedVariant === variant.id
                            ? "border-white bg-white"
                            : "border-gray-300"
                        )}>
                          {selectedVariant === variant.id && (
                            <div className="w-full h-full rounded-full bg-[#0A4D8C] scale-50"></div>
                          )}
                        </div>
                        <span className={cn(
                          "text-xs font-medium truncate",
                          selectedVariant === variant.id ? "text-white" : "text-gray-900"
                        )}>
                          {variant.name}
                        </span>
                      </div>
                      <span className={cn(
                        "text-xs font-bold ml-1.5 flex-shrink-0",
                        selectedVariant === variant.id ? "text-white" : "text-[#0A4D8C]"
                      )}>
                        ₹{variant.price}
                      </span>
                      <input
                        type="radio"
                        name="variant"
                        value={variant.id}
                        checked={selectedVariant === variant.id}
                        onChange={() => setSelectedVariant(variant.id)}
                        disabled={!variant.inStock}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Product Details - Compact */}
            <div className="grid grid-cols-3 gap-2 p-2 bg-secondary rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Pieces</p>
                <p className="font-semibold text-xs">{calculatedPieces}</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-xs text-muted-foreground mb-0.5">Serves</p>
                <p className="font-semibold text-xs">{calculatedServes}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Weight</p>
                <p className="font-semibold text-xs">{calculatedWeight}</p>
              </div>
            </div>

            {/* Quantity - Compact */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 border border-gray-200">
              <h3 className="font-semibold text-xs text-gray-900">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex gap-2 pt-1">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "h-9 w-9 shrink-0",
                  inWishlist && "bg-accent text-accent-foreground hover:bg-accent/90",
                )}
                onClick={handleWishlist}
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-9 gap-1.5 bg-transparent text-xs"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </Button>
              <Button className="flex-1 h-9 text-xs" onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>

            {/* Nutritional Values - Grid View */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold mb-2">Nutritional Information (per 100g)</h3>
              {calculatedNutrition ? (
                <>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-secondary rounded-lg p-2 text-center">
                      <p className="text-muted-foreground mb-1">Energy</p>
                      <p className="font-semibold">{calculatedNutrition.calories}</p>
                    </div>
                    
                    <div className="bg-secondary rounded-lg p-2 text-center">
                      <p className="text-muted-foreground mb-1">Protein</p>
                      <p className="font-semibold">{calculatedNutrition.protein}g</p>
                    </div>
                    
                    <div className="bg-secondary rounded-lg p-2 text-center">
                      <p className="text-muted-foreground mb-1">Fat</p>
                      <p className="font-semibold">{calculatedNutrition.fat}g</p>
                    </div>
                    
                    {calculatedNutrition.omega3 ? (
                      <div className="bg-secondary rounded-lg p-2 text-center">
                        <p className="text-muted-foreground mb-1">Omega-3</p>
                        <p className="font-semibold text-green-600">{calculatedNutrition.omega3}g</p>
                      </div>
                    ) : (
                      <div className="bg-secondary rounded-lg p-2 text-center">
                        <p className="text-muted-foreground mb-1">Other</p>
                        <p className="font-semibold">-</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">
                    * Approx values
                  </p>
                </>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-xs text-muted-foreground">Nutritional information is not available.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs - Description, Nutritional Values & Reviews */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground">{product.description}</p>
              <h4 className="font-semibold mt-4 mb-2 text-foreground">Product Highlights</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Freshly caught and delivered within 52 hours</li>
                <li>Cleaned and ready to cook</li>
                <li>No preservatives or chemicals</li>
                <li>Rich in Omega-3 fatty acids</li>
                <li>Sustainably sourced</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Add Review Button */}
              <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mb-4">Write a Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Write Your Review</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="reviewName">Your Name</Label>
                      <Input
                        id="reviewName"
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <div className="flex gap-2 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-6 w-6 cursor-pointer transition-colors",
                              i < newReview.rating ? "fill-accent text-accent" : "text-muted-foreground"
                            )}
                            onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="reviewText">Your Review</Label>
                      <Textarea
                        id="reviewText"
                        value={newReview.text}
                        onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                        placeholder="Share your experience with this product"
                        rows={4}
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (newReview.name && newReview.text) {
                          setReviews([
                            { ...newReview, date: "Just now" },
                            ...reviews
                          ])
                          setNewReview({ name: "", rating: 5, text: "" })
                          setIsReviewDialogOpen(false)
                        }
                      }}
                    >
                      Submit Review
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Reviews List */}
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.name}</span>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating ? "fill-accent text-accent" : "text-muted-foreground",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingElements />
    </div>
  )
}

