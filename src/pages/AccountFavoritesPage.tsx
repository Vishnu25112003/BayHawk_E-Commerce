import { Link } from "react-router-dom"
import { Heart, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export default function AccountFavoritesPage() {
  const { wishlist } = useStore()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Favorites</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">Add items to your favorites to see them here</p>
            <Link to="/products">
              <Button>Explore Products</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
