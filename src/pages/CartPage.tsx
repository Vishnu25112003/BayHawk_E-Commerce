import { useState } from "react"
import { Link } from "react-router-dom"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Share2, Copy, Check } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { products } from "@/lib/data"
import { useStore } from "@/lib/store"
import { notification } from "@/lib/notification"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const discount = appliedCoupon === "FRESH20" ? subtotal * 0.2 : 0
  const total = subtotal + deliveryFee - discount
  const savings = discount + (subtotal > 500 ? 40 : 0)

  const frequentlyBought = products.filter((p) => p.inStock && !cart.some((item) => item.id === p.id)).slice(0, 4)

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FRESH20") {
      setAppliedCoupon("FRESH20")
      notification.success("Coupon applied successfully! You got 20% off", "Coupon Applied")
    } else {
      notification.error("Invalid coupon code. Please try again.", "Invalid Coupon")
    }
  }

  const handleShareCart = () => {
    const cartData = cart.map((item) => `${item.id}:${item.quantity}`).join(",")
    const link = `${window.location.origin}/cart?share=${btoa(cartData)}`
    setShareLink(link)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you have not added anything to your cart yet</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedVariant}`}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                {/* Image */}
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item.id}`}
                    className="font-semibold text-foreground hover:text-primary line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.selectedVariant}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-lg">₹{item.price}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() =>
                          item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={handleShareCart}>
                    <Share2 className="h-4 w-4" />
                    Share Cart
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Cart</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      Share this link with friends or family to let them see your cart items.
                    </p>
                    <div className="flex gap-2">
                      <Input value={shareLink} readOnly className="flex-1" />
                      <Button onClick={handleCopyLink} variant="outline">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card p-6 rounded-xl border border-border space-y-4">
              <h2 className="font-bold text-lg">Order Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={!!appliedCoupon}
                />
                <Button variant="outline" onClick={handleApplyCoupon} disabled={!!appliedCoupon}>
                  Apply
                </Button>
              </div>
              {appliedCoupon && <p className="text-sm text-green-600">Coupon {appliedCoupon} applied! 20% off</p>}

              <Separator />

              {/* Price Details */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                {savings > 0 && (
                  <p className="text-sm text-green-600 text-center">You save ₹{savings.toFixed(0)} on this order!</p>
                )}
              </div>

              {deliveryFee === 0 && <p className="text-sm text-green-600">You are eligible for free delivery!</p>}

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link to="/checkout" className="block">
                  <Button className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        {frequentlyBought.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-6">Frequently Bought Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {frequentlyBought.map((product) => (
                <ProductCard key={product.id} product={product} />
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

