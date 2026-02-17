import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Clock, CreditCard, Wallet, Gift, CloudRain, Plus, Check, Loader2, Smartphone, Building2, Banknote } from "lucide-react"
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { notification } from "@/lib/notification"
import { Link } from "react-router-dom"


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
  { 
    id: "upi", 
    name: "UPI", 
    description: "Pay via Google Pay, PhonePe, Paytm",
    icon: Smartphone,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  { 
    id: "card", 
    name: "Credit / Debit Card", 
    description: "Visa, Mastercard, Rupay, Amex",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  { 
    id: "netbanking", 
    name: "Net Banking", 
    description: "All major banks supported",
    icon: Building2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  { 
    id: "wallet", 
    name: "Digital Wallets", 
    description: "Paytm, Amazon Pay, Freecharge",
    icon: Wallet,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  { 
    id: "cod", 
    name: "Cash on Delivery", 
    description: "Pay when you receive",
    icon: Banknote,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
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
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState<"single" | "multiple">("single")
  const [productDeliverySlots, setProductDeliverySlots] = useState<Record<string, string>>({})
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  
  // Check if user is premium (you can adjust this logic based on your user model)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const discount = appliedCoupon === "FRESH20" ? subtotal * 0.2 : 0
  
  // Wallet Logic: 10% of cart value up to ₹100
  const maxWalletDeduction = Math.min(subtotal * 0.1, 100)
  const walletDeduction = useWallet ? Math.min(walletBalance, maxWalletDeduction) : 0
  
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
    if (!user) {
      navigate('/login')
      return
    }
    
    setIsProcessing(true)
    
    // Create order object
    const newOrder = {
      id: "FC" + Date.now(),
      items: [...cart],
      total: total,
      date: new Date().toISOString()
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // Use the store's addOrder method (imported from useStore)
    useStore.getState().addOrder(newOrder)

    setOrderCompleted(true)
    clearCart()
    navigate("/order-success?orderId=" + newOrder.id)
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/cart">Shopping Cart</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

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
            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Single Shipment */}
                <div
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-colors",
                    deliveryOption === "single"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setDeliveryOption("single")}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Single Delivery</span>
                        <Badge variant="secondary" className="text-xs">All items together</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Get all items in one shipment</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1",
                      deliveryOption === "single" ? "border-primary" : "border-gray-300"
                    )}>
                      {deliveryOption === "single" && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>

                  {deliveryOption === "single" && (
                    <div className="space-y-3 pt-3 border-t">
                      <p className="text-sm font-medium">Select delivery slot:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant={selectedSlot === slot.id ? "default" : "outline"}
                            size="sm"
                            className="h-auto py-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              slot.available && setSelectedSlot(slot.id)
                            }}
                            disabled={!slot.available}
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Multiple Deliveries */}
                <div
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-colors",
                    deliveryOption === "multiple"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => setDeliveryOption("multiple")}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Multiple Deliveries</span>
                        <Badge variant="secondary" className="text-xs">Flexible</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Choose delivery time for each product</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      deliveryOption === "multiple" ? "border-primary" : "border-gray-300"
                    )}>
                      {deliveryOption === "multiple" && (
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      )}
                    </div>
                  </div>

                  {deliveryOption === "multiple" && (
                    <div className="space-y-3 pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-3">Select delivery slot for each product:</p>
                      
                      {cart.map((item, index) => (
                        <div 
                          key={`${item.id}-${item.selectedVariant}-delivery`} 
                          className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg"
                        >
                          {/* Product Info */}
                          <div className="flex gap-3 items-start mb-3">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 border-2 border-gray-200">
                              <img 
                                src={item.image || "/placeholder.svg"} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base font-medium line-clamp-2">{item.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.selectedVariant} × {item.quantity}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                Product {index + 1}
                              </Badge>
                            </div>
                          </div>

                          {/* Time Slot Selection */}
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-gray-600">Choose delivery time:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {timeSlots.map((slot) => {
                                const productKey = `${item.id}-${item.selectedVariant}`;
                                const isSelected = productDeliverySlots[productKey] === slot.id;
                                
                                return (
                                  <Button
                                    key={slot.id}
                                    variant={isSelected ? "default" : "outline"}
                                    size="sm"
                                    className={cn(
                                      "h-auto py-2 px-3 text-xs sm:text-sm whitespace-normal",
                                      isSelected && "bg-primary text-primary-foreground shadow-md"
                                    )}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (slot.available) {
                                        setProductDeliverySlots(prev => ({
                                          ...prev,
                                          [productKey]: slot.id
                                        }));
                                      }
                                    }}
                                    disabled={!slot.available}
                                  >
                                    <div className="flex flex-col items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{slot.time}</span>
                                    </div>
                                  </Button>
                                );
                              })}
                            </div>
                            
                            {/* Show selected slot */}
                            {productDeliverySlots[`${item.id}-${item.selectedVariant}`] && (
                              <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                                <Check className="h-3 w-3" />
                                <span>
                                  Delivery scheduled: {timeSlots.find(s => s.id === productDeliverySlots[`${item.id}-${item.selectedVariant}`])?.time}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Summary of deliveries */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-semibold text-blue-900 mb-2">📦 Delivery Summary:</p>
                        <div className="space-y-1">
                          {Object.keys(productDeliverySlots).length === 0 ? (
                            <p className="text-xs text-blue-700">Please select delivery times for your products</p>
                          ) : (
                            <>
                              <p className="text-xs text-blue-700">
                                {Object.keys(productDeliverySlots).length} of {cart.length} products scheduled
                              </p>
                              {Object.keys(productDeliverySlots).length === cart.length && (
                                <div className="flex items-center gap-1 text-xs text-green-700 font-medium">
                                  <Check className="h-3 w-3" />
                                  All products scheduled!
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

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
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {/* Current Location Button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-2 border-primary/50 hover:bg-primary/5"
                        onClick={() => {
                          if (!navigator.geolocation) {
                            notification.error("Geolocation is not supported by your browser.", "Not Supported")
                            return
                          }

                          notification.info("Detecting your location...", "Please Wait")

                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords
                              notification.success(
                                `Location detected: Lat ${latitude.toFixed(4)}, Long ${longitude.toFixed(4)}`,
                                "Location Found"
                              )
                              // Here you can use reverse geocoding API to get address from coordinates
                            },
                            (error) => {
                              let errorMessage = "Unable to get your location."
                              
                              switch(error.code) {
                                case error.PERMISSION_DENIED:
                                  errorMessage = "Location permission denied. Please allow location access in your browser settings."
                                  break
                                case error.POSITION_UNAVAILABLE:
                                  errorMessage = "Location information is unavailable. Please check your device settings."
                                  break
                                case error.TIMEOUT:
                                  errorMessage = "Location request timed out. Please try again."
                                  break
                                default:
                                  errorMessage = "An unknown error occurred while getting location."
                              }
                              
                              notification.error(errorMessage, "Location Error")
                            },
                            {
                              enableHighAccuracy: true,
                              timeout: 10000,
                              maximumAge: 0
                            }
                          )
                        }}
                      >
                        <MapPin className="h-4 w-4 text-primary" />
                        Use Current Location
                      </Button>

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
                        <Label>Search Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Search for area, street name..." 
                            className="pl-10"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Start typing to search for your location
                        </p>
                      </div>

                      <div>
                        <Label>Complete Address</Label>
                        <Input placeholder="House/Flat No, Building Name, Street" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Landmark</Label>
                          <Input placeholder="Nearby landmark" />
                        </div>
                        <div>
                          <Label>Area</Label>
                          <Input placeholder="Area/Locality" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>City</Label>
                          <Input placeholder="City" defaultValue="Chennai" />
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
                  <div className={cn(
                    "relative p-4 rounded-xl border-2 transition-all duration-200",
                    useWallet 
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md" 
                      : "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-lg",
                          useWallet ? "bg-green-100" : "bg-gray-100"
                        )}>
                          <Wallet className={cn("h-6 w-6", useWallet ? "text-green-600" : "text-gray-500")} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-base text-gray-900">Wallet Balance</p>
                            {useWallet && (
                              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                Applied
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Available: <span className="font-semibold text-green-600">₹{walletBalance}</span>
                          </p>
                        </div>
                      </div>
                      <Checkbox 
                        checked={useWallet} 
                        onCheckedChange={(checked) => setUseWallet(checked as boolean)}
                        className="h-5 w-5"
                      />
                    </div>
                    {useWallet && (
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <p className="text-xs text-green-700 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          ₹{Math.min(walletBalance, total).toFixed(0)} will be deducted from your wallet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">Select payment method</p>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      
                      return (
                        <div
                          key={method.id}
                          className={cn(
                            "relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            isSelected
                              ? `${method.borderColor} ${method.bgColor} shadow-md`
                              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",
                          )}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          {/* Radio Button */}
                          <div className="flex items-center pt-0.5">
                            <RadioGroupItem value={method.id} className="h-5 w-5" />
                          </div>

                          {/* Icon */}
                          <div className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-lg transition-colors",
                            isSelected ? method.bgColor : "bg-gray-50"
                          )}>
                            <Icon className={cn("h-6 w-6", isSelected ? method.color : "text-gray-400")} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn(
                                "font-semibold text-base",
                                isSelected ? "text-gray-900" : "text-gray-700"
                              )}>
                                {method.name}
                              </span>
                              {isSelected && (
                                <Badge className={cn("text-xs", method.color, method.bgColor, "border-0")}>
                                  Selected
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {method.description}
                            </p>
                          </div>

                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="absolute top-3 right-3">
                              <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center",
                                method.bgColor
                              )}>
                                <Check className={cn("h-4 w-4", method.color)} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
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

                  {/* Offers & Coupons */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">Offers & Coupons</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={!!appliedCoupon}
                        className="h-9 text-sm"
                      />
                      <Button variant="outline" onClick={handleApplyCoupon} disabled={!!appliedCoupon} size="sm">
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
                    <div className="p-3 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg border border-accent/20">
                      <p className="font-medium text-sm text-foreground">Scratch Card Reward</p>
                      <p className="text-xs text-muted-foreground">
                        Complete this order to unlock a surprise scratch card!
                      </p>
                    </div>
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

              {/* Delivery Instructions Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4 text-primary" />
                    Delivery Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-instructions" className="text-xs font-medium text-gray-700">
                       You can modifiy instructions upto 30 minutes before the delivery 
                    </Label>
                    <textarea
                      id="delivery-instructions"
                      placeholder="E.g., Ring the doorbell, Call before delivery, Leave at gate..."
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      className="w-full min-h-[80px] px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A4D8C] focus:border-transparent resize-none"
                      maxLength={200}
                    />
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Help us deliver smoothly</span>
                      <span>{deliveryInstructions.length}/200</span>
                    </div>
                  </div>
                  
                  {/* Quick Suggestions */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-600">Quick add:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Ring doorbell",
                        "Call first",
                        "Leave at gate",
                        "Don't ring",
                        "Contactless"
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 px-2 hover:bg-[#0A4D8C] hover:text-white transition-colors"
                          onClick={() => {
                            if (deliveryInstructions) {
                              setDeliveryInstructions(deliveryInstructions + ", " + suggestion)
                            } else {
                              setDeliveryInstructions(suggestion)
                            }
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
