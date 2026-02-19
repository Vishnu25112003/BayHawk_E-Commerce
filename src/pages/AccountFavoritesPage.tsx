import { Link } from "react-router-dom"
import { Heart, ShoppingCart } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useStore } from "@/lib/store"

export default function AccountFavoritesPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product, product.weight)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink to="/account">My Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Favorites</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Favorites</h1>
          {wishlist.length > 0 && (
            <span className="text-sm text-muted-foreground">{wishlist.length} items</span>
          )}
        </div>

        {wishlist.length > 0 ? (
          <div className="grid gap-4">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <Link to={`/products/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                    />
                  </Link>
                  
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 hover:text-primary line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      {product.nameTamil && (
                        <p className="text-sm text-sky-500 font-semibold">{product.nameTamil}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                        <span>{product.weight}</span>
                        {product.pieces && (
                          <>
                            <span>•</span>
                            <span>{product.pieces}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemove(product.id)}
                        >
                          <Heart className="h-4 w-4 fill-current mr-1" />
                          Remove
                        </Button>
                        {product.inStock && (
                          <Button
                            size="sm"
                            className="bg-[#0A4D8C] hover:bg-[#0A4D8C]/90"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Start adding products to your favorites</p>
            <Link to="/products">
              <Button className="bg-[#0A4D8C] hover:bg-[#0A4D8C]/90">Explore Products</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
