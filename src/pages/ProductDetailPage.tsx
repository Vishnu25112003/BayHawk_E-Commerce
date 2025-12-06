import { useState } from "react"
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
import { products, categories } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const weights = ["250g", "500g", "1kg"]

export default function ProductDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, clearCart } = useStore()

  const product = products.find((p: { id: string }) => p.id === params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState(product?.weight || "500g")
  const [quantity, setQuantity] = useState(1)
  
  // Review state
  const [reviews, setReviews] = useState([
    { name: "Rahul M.", rating: 5, text: "Excellent quality! Very fresh and tasty.", date: "2 days ago" },
    { name: "Priya S.", rating: 4, text: "Good product, delivery was on time.", date: "1 week ago" },
    { name: "Amit K.", rating: 5, text: "Best fish I have ordered online. Will order again!", date: "2 weeks ago" },
  ])
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [newReview, setNewReview] = useState({ name: "", rating: 5, text: "" })

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

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && <Badge className="bg-accent text-accent-foreground">{product.badge}</Badge>}
                {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
              </div>
              {/* Share Button */}
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4"
                onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === index ? "border-primary" : "border-border",
                  )}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice}</span>
                  <Badge variant="destructive">Save ₹{product.originalPrice - product.price}</Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                Out of Stock
              </Badge>
            )}

            {/* Variants - Weight */}
            <div>
              <h3 className="font-semibold mb-3">Select Weight</h3>
              <div className="flex flex-wrap gap-2">
                {weights.map((weight) => (
                  <Button
                    key={weight}
                    variant={selectedWeight === weight ? "default" : "outline"}
                    onClick={() => setSelectedWeight(weight)}
                  >
                    {weight}
                  </Button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary rounded-lg">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pieces</p>
                <p className="font-semibold">{product.pieces}</p>
              </div>
              <div className="text-center border-x border-border">
                <p className="text-sm text-muted-foreground">Serves</p>
                <p className="font-semibold">{product.serves}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-semibold">{selectedWeight}</p>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "h-12 w-12 shrink-0",
                  inWishlist && "bg-accent text-accent-foreground hover:bg-accent/90",
                )}
                onClick={handleWishlist}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 gap-2 bg-transparent"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button className="flex-1 h-12" onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs - Description & Reviews */}
        <Tabs defaultValue="description" className="mt-12">
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

