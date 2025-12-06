import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  { id: "1", time: "7 AM - 9 AM", available: true },
  { id: "2", time: "1 PM - 3 PM", available: true },
  { id: "3", time: "7 PM - 9 PM", available: true },
]

const paymentMethods = [
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "card", name: "Card", icon: "💳" },
  { id: "netbanking", name: "Net Banking", icon: "🏦" },
  { id: "wallet", name: "Wallets", icon: "👛" },
  { id: "cod", name: "Cash on Delivery", icon: "💵" },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, walletBalance, clearCart, user } = useStore()
  
  // Check if this is a direct checkout (Buy Now) or cart checkout
  const searchParams = new URLSearchParams(window.location.search)
  const isDirectCheckout = searchParams.get('direct') === 'true'

  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0].id)
  const [orderForOther, setOrderForOther] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [useWallet, setUseWallet] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinResult, setSpinResult] = useState<string | null>(null)
  const [orderCompleted, setOrderCompleted] = useState(false)
  
  // Check if user is premium (you can adjust this logic based on your user model)
  const isPremiumUser = user?.isPremium || false

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

  const spinWheel = () => {
    setIsSpinning(true)
    
    // Spin for 3 seconds
    setTimeout(() => {
      setIsSpinning(false)
      // Random offer selection
      const offers = [
        "10% OFF on next order",
        "₹50 Wallet Credit",
        "Free Delivery",
        "20% OFF on next order",
        "₹100 Wallet Credit",
        "Buy 1 Get 1 Free",
        "15% OFF on next order",
        "₹75 Wallet Credit"
      ]
      const randomOffer = offers[Math.floor(Math.random() * offers.length)]
      setSpinResult(randomOffer)
    }, 3000)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setOrderCompleted(true) // Mark order as completed to prevent cart redirect

    // Simulate payment processing animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show fortune wheel spinner
    setShowSpinner(true)
    spinWheel()
  }
  
  const handleCloseSpinner = () => {
    setShowSpinner(false)
    setSpinResult(null)
    clearCart()
    navigate("/order-success?orderId=FC" + Date.now())
  }

  // Only redirect to cart if cart is empty AND order is not completed
  if (cart.length === 0 && !orderCompleted) {
    navigate("/cart")
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={selectedSlot === slot.id ? "default" : "outline"}
                      className={cn(
                        "h-auto py-3 flex flex-col gap-1",
                        !slot.available && "opacity-50"
                      )}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                    >
                      <span className="text-sm font-semibold">{slot.time}</span>
                    </Button>
                  ))}
                </div>
                
                {/* Premium Schedule Delivery */}
                {isPremiumUser ? (
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">
                        Premium
                      </Badge>
                      <span className="font-semibold text-amber-900">Schedule Your Delivery</span>
                    </div>
                    <p className="text-sm text-amber-800 mb-3">
                      As a premium member, schedule your delivery up to 1 month in advance!
                    </p>
                    <Input 
                      type="date" 
                      className="bg-white border-amber-300"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Want to schedule delivery?</p>
                        <p className="text-sm text-gray-600">Upgrade to Premium to unlock this feature</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#0A4D8C] text-[#0A4D8C] hover:bg-[#0A4D8C] hover:text-white"
                        onClick={() => navigate("/membership")}
                      >
                        Upgrade
                      </Button>
                    </div>
                  </div>
                )}
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
                  <div className="flex items-center justify-between">
                    <CardTitle>Order Summary</CardTitle>
                    {isDirectCheckout && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/cart')}
                        className="text-xs"
                      >
                        View Cart
                      </Button>
                    )}
                  </div>
                  {isDirectCheckout && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Direct checkout - Want to add more items? View cart to continue shopping.
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
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
      <Dialog open={showSpinner} onOpenChange={setShowSpinner}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl max-h-[95vh] p-0 overflow-y-auto border-0">
          {/* Background with confetti effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 opacity-50 pointer-events-none"></div>
          
          <div className="relative">
            <DialogHeader className="p-3 sm:p-4 md:p-6 pb-2 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
              <DialogTitle className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {spinResult ? "🎉 Congratulations! 🎉" : "✨ Spin to Win! ✨"}
              </DialogTitle>
              {!spinResult && (
                <p className="text-center text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base px-2">
                  Complete your order and win exciting rewards!
                </p>
              )}
            </DialogHeader>
            
            <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 pt-2 pb-4 sm:pb-6">
              {/* Spin Wheel */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] mb-3 sm:mb-4 md:mb-6">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 blur-xl opacity-30 animate-pulse"></div>
                
                {/* Wheel Container */}
                <div 
                  className={cn(
                    "absolute inset-2 sm:inset-3 rounded-full shadow-2xl overflow-hidden",
                    isSpinning && "animate-spin-wheel"
                  )}
                  style={{
                    animationDuration: isSpinning ? "3s" : "0s",
                    animationTimingFunction: "cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                  }}
                >
                  {/* Wheel Segments */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      {/* Gradients for each segment */}
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#dc2626", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#2563eb", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#ec4899", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#db2777", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#ea580c", stopOpacity: 1 }} />
                      </linearGradient>
                      <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#14b8a6", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#0d9488", stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    
                    {/* 8 Segments */}
                    {[
                      { fill: "url(#grad1)", text: "10% OFF", angle: 0 },
                      { fill: "url(#grad2)", text: "₹50", angle: 45 },
                      { fill: "url(#grad3)", text: "Free Ship", angle: 90 },
                      { fill: "url(#grad4)", text: "20% OFF", angle: 135 },
                      { fill: "url(#grad5)", text: "₹100", angle: 180 },
                      { fill: "url(#grad6)", text: "BOGO", angle: 225 },
                      { fill: "url(#grad7)", text: "15% OFF", angle: 270 },
                      { fill: "url(#grad8)", text: "₹75", angle: 315 },
                    ].map((segment, index) => {
                      const angle = (360 / 8) * index
                      const nextAngle = angle + (360 / 8)
                      const startRad = (angle - 90) * (Math.PI / 180)
                      const endRad = (nextAngle - 90) * (Math.PI / 180)
                      
                      const x1 = 100 + 100 * Math.cos(startRad)
                      const y1 = 100 + 100 * Math.sin(startRad)
                      const x2 = 100 + 100 * Math.cos(endRad)
                      const y2 = 100 + 100 * Math.sin(endRad)
                      
                      const textAngle = angle + 22.5
                      const textRad = (textAngle - 90) * (Math.PI / 180)
                      const textX = 100 + 65 * Math.cos(textRad)
                      const textY = 100 + 65 * Math.sin(textRad)
                      
                      return (
                        <g key={index}>
                          <path
                            d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                            fill={segment.fill}
                            stroke="white"
                            strokeWidth="2"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                            className="select-none"
                          >
                            {segment.text}
                          </text>
                        </g>
                      )
                    })}
                    
                    {/* Center circle with border */}
                    <circle cx="100" cy="100" r="25" fill="white" stroke="#0A4D8C" strokeWidth="4" />
                  </svg>
                  
                  {/* Center Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Gift className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#0A4D8C]" />
                  </div>
                </div>
                
                {/* Pointer/Arrow */}
                <div className="absolute -top-4 sm:-top-5 md:-top-6 left-1/2 -translate-x-1/2 z-30">
                  <div className="relative">
                    <div className="w-0 h-0 border-l-[18px] sm:border-l-[22px] md:border-l-[26px] border-l-transparent border-r-[18px] sm:border-r-[22px] md:border-r-[26px] border-r-transparent border-t-[36px] sm:border-t-[44px] md:border-t-[52px] border-t-red-600 drop-shadow-2xl"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] sm:border-l-[18px] md:border-l-[22px] border-l-transparent border-r-[15px] sm:border-r-[18px] md:border-r-[22px] border-r-transparent border-t-[30px] sm:border-t-[36px] md:border-t-[44px] border-t-red-500"></div>
                  </div>
                </div>
                
                {/* Decorative dots around wheel */}
                {[...Array(12)].map((_, i) => {
                  const angle = (360 / 12) * i
                  const rad = (angle - 90) * (Math.PI / 180)
                  const x = 50 + 48 * Math.cos(rad)
                  const y = 50 + 48 * Math.sin(rad)
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  )
                })}
              </div>

              {/* Result */}
              {spinResult ? (
                <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 w-full animate-in fade-in zoom-in duration-500 px-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 blur-xl opacity-30"></div>
                    <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 sm:border-3 md:border-4 border-green-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 md:mb-4">🎊</div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 mb-2 sm:mb-3">You Won!</p>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent break-words">
                        {spinResult}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3 md:mt-4">
                        Your reward will be automatically applied
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCloseSpinner}
                    className="w-full h-12 sm:h-13 md:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                    size="lg"
                  >
                    Continue to Order Success
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-3 sm:space-y-4 px-2">
                  {isSpinning ? (
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-center">
                        <Loader2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 animate-spin text-purple-600" />
                      </div>
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
                        Spinning the wheel...
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Good luck! 🍀
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                        Get ready for your reward!
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        The wheel will spin automatically
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Custom CSS for wheel animation */}
      <style>{`
        @keyframes spin-wheel {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(1800deg);
          }
        }
        .animate-spin-wheel {
          animation: spin-wheel 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
        }
      `}</style>
    </div>
  )
}
