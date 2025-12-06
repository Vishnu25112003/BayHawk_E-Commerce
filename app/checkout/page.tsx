"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Clock, CreditCard, Wallet, Gift, CloudRain, Plus, Check, Loader2 } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { notification } from "@/lib/notification"

const savedAddresses = [
  {
    id: "1",
    name: "Home",
    address: "123 Marine Drive, Apt 4B",
    city: "Mumbai",
    pincode: "400001",
    phone: "9876543210",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    address: "456 Tech Park, Building C",
    city: "Mumbai",
    pincode: "400051",
    phone: "9876543210",
    isDefault: false,
  },
]

const timeSlots = [
  { id: "1", time: "7 AM - 10 AM", available: true },
  { id: "2", time: "10 AM - 1 PM", available: true },
  { id: "3", time: "1 PM - 4 PM", available: false },
  { id: "4", time: "4 PM - 7 PM", available: true },
  { id: "5", time: "7 PM - 9 PM", available: true },
]

const paymentMethods = [
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "card", name: "Card", icon: "💳" },
  { id: "netbanking", name: "Net Banking", icon: "🏦" },
  { id: "wallet", name: "Wallets", icon: "👛" },
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, walletBalance, clearCart } = useStore()

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0].id)
  const [orderForOther, setOrderForOther] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [useWallet, setUseWallet] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const discount = appliedCoupon === "FRESH20" ? subtotal * 0.2 : 0
  const walletDeduction = useWallet ? Math.min(walletBalance, subtotal + deliveryFee - discount) : 0
  const total = subtotal + deliveryFee - discount - walletDeduction

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FRESH20") {
      setAppliedCoupon("FRESH20")
      notification.success("Coupon applied successfully! You got 20% off", "Coupon Applied")
    } else {
      notification.error("Invalid coupon code. Please try again.", "Invalid Coupon")
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show fortune wheel spinner
    setShowSpinner(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))

    clearCart()
    router.push("/order-success?orderId=FC" + Date.now())
  }

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

        {/* Rain Alert */}
        <div className="bg-[#0A4D8C]/5 border border-[#0A4D8C]/20 rounded-lg p-4 mb-6 flex items-center gap-3">
          <CloudRain className="h-5 w-5 text-[#0A4D8C]" />
          <div>
            <p className="text-sm font-medium text-[#0A4D8C]">Weather Alert</p>
            <p className="text-sm text-[#0A4D8C]/80">
              Light rain expected in your area. Delivery might be delayed by 30 minutes.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                        selectedAddress === addr.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => setSelectedAddress(addr.id)}
                    >
                      <RadioGroupItem value={addr.id} id={addr.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{addr.name}</span>
                          {addr.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{addr.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {addr.city} - {addr.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Name</Label>
                          <Input placeholder="Home, Office, etc." />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input placeholder="Phone number" />
                        </div>
                      </div>
                      <div>
                        <Label>Address</Label>
                        <Input placeholder="Street address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>City</Label>
                          <Input placeholder="City" />
                        </div>
                        <div>
                          <Label>Pincode</Label>
                          <Input placeholder="Pincode" />
                        </div>
                      </div>
                      <Button className="w-full">Save Address</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="order-other"
                    checked={orderForOther}
                    onCheckedChange={(checked) => setOrderForOther(checked as boolean)}
                  />
                  <Label htmlFor="order-other" className="text-sm cursor-pointer">
                    Order for someone else
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Slot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Delivery Slot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedSlot === slot.id ? "default" : "outline"}
                      className={cn(!slot.available && "opacity-50")}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">Schedule your delivery up to 1 month in advance</p>
              </CardContent>
            </Card>

            {/* Offers & Coupons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Offers & Coupons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} disabled={!!appliedCoupon}>
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="h-4 w-4" />
                    <span className="text-sm">Coupon {appliedCoupon} applied!</span>
                  </div>
                )}

                {/* Scratch Card */}
                <div className="p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg border border-accent/20">
                  <p className="font-medium text-foreground">Scratch Card Reward</p>
                  <p className="text-sm text-muted-foreground">
                    Complete this order to unlock a surprise scratch card!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Wallet Balance */}
                {walletBalance > 0 && (
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Wallet Balance</p>
                        <p className="text-sm text-muted-foreground">₹{walletBalance}</p>
                      </div>
                    </div>
                    <Checkbox checked={useWallet} onCheckedChange={(checked) => setUseWallet(checked as boolean)} />
                  </div>
                )}

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50",
                      )}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <RadioGroupItem value={method.id} />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.selectedVariant} x {item.quantity}
                          </p>
                          <p className="font-medium">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
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
                        <span>Coupon Discount</span>
                        <span>-₹{discount.toFixed(0)}</span>
                      </div>
                    )}
                    {walletDeduction > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Wallet</span>
                        <span>-₹{walletDeduction}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total.toFixed(0)}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Fortune Wheel Spinner Modal */}
      <Dialog open={showSpinner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Congratulations!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-accent to-primary animate-spin mb-6" />
            <p className="text-lg font-medium">Spinning the Fortune Wheel...</p>
            <p className="text-muted-foreground">You won 50 wallet points!</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
