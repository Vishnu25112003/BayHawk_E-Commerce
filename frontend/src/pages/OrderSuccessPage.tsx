import { useEffect, useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { CheckCircle, Package, Mail, Bell, Truck, MapPin, Phone, Download, Share2, Gift, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notification } from "@/lib/notification"

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const orderId = searchParams.get("orderId") || "FC" + Date.now()
  const [showAnimation, setShowAnimation] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [canCancel, setCanCancel] = useState(true)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1500)
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000)
    return () => {
      clearTimeout(timer)
      clearTimeout(confettiTimer)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanCancel(false)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanCancel(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCancelOrder = async () => {
    setIsCancelling(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsCancelling(false)
    setShowCancelDialog(false)
    notification.success("Your order has been cancelled successfully. Refund will be processed within 3-5 business days.", "Order Cancelled")
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/products")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-white">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
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
              <BreadcrumbLink asChild>
                <Link to="/checkout">Checkout</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Order Success</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 6)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center mb-6 transition-all duration-1000 ease-out ${showAnimation ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}>
              <div className="relative">
                {/* Animated Rings */}
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-ping"></div>
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                
                {/* Main Circle */}
                <div className="relative bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-full p-4 sm:p-6 md:p-8 shadow-2xl">
                  {/* Checkmark with draw animation */}
                  <div className="relative">
                    <CheckCircle 
                      className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white animate-check-draw" 
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 transition-all duration-700 delay-300 ${showAnimation ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              Order Placed Successfully! 🎉
            </h1>
            <p className={`text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-500 ${showAnimation ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              Thank you for your order! We're preparing your fresh seafood with care.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order ID Card */}
              <Card className="border-2 border-green-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="text-2xl font-bold font-mono text-[#0A4D8C]">{orderId}</p>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm">
                      Confirmed
                    </Badge>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <p className="font-semibold">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Time</p>
                      <p className="font-semibold">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Timeline - Amazon Style */}
              <Card className="border-2 border-gray-200">
                <CardHeader className="bg-gradient-to-r from-[#0A4D8C]/5 to-blue-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Truck className="h-5 w-5 text-[#0A4D8C]" />
                      Delivery Timeline
                    </CardTitle>
                    <Badge className="bg-green-600 text-white">On Track</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">Estimated Delivery: Today, 4:00 PM - 7:00 PM</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="relative">
                    {/* Vertical Progress Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-[#0A4D8C] to-gray-300" />
                    
                    <div className="space-y-8">
                      {/* Step 1: Order Placed */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-green-100">
                          <CheckCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">Order Placed</h4>
                            <span className="text-xs text-gray-500">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Your order has been confirmed and received</p>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
                            <p className="text-xs text-green-800"><span className="font-semibold">Order ID:</span> {orderId}</p>
                            <p className="text-xs text-green-800"><span className="font-semibold">Payment:</span> Completed via UPI</p>
                            <p className="text-xs text-green-800"><span className="font-semibold">Invoice:</span> Sent to your email</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Order Processing */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-[#0A4D8C] flex items-center justify-center shrink-0 shadow-lg ring-4 ring-blue-100 animate-pulse">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">Order Processing</h4>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">In Progress</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">We're preparing your items with care</p>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              <p className="text-xs text-blue-800">Quality check in progress</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              <p className="text-xs text-blue-800">Packaging your fresh seafood</p>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue-600 h-1.5 rounded-full animate-progress" style={{ width: '60%' }} />
                            </div>
                            <p className="text-xs text-blue-700 font-semibold mt-1">Expected completion: 30 minutes</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Ready for Dispatch */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0 shadow-md">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-600">Ready for Dispatch</h4>
                            <span className="text-xs text-gray-500">Upcoming</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Order will be handed to delivery partner</p>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <p className="text-xs text-gray-600">Expected: In 1-2 hours</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Out for Delivery */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0 shadow-md">
                          <Truck className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-600">Out for Delivery</h4>
                            <span className="text-xs text-gray-500">Upcoming</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Your order is on the way</p>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
                            <p className="text-xs text-gray-600"><span className="font-semibold">Delivery Partner:</span> Will be assigned soon</p>
                            <p className="text-xs text-gray-600"><span className="font-semibold">Contact:</span> Available after dispatch</p>
                            <p className="text-xs text-gray-600"><span className="font-semibold">Live Tracking:</span> Enabled once dispatched</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 5: Delivered */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center shrink-0 shadow-md">
                          <MapPin className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-600">Delivered</h4>
                            <span className="text-xs text-gray-500">Upcoming</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Order will be delivered to your doorstep</p>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1">
                            <p className="text-xs text-gray-600"><span className="font-semibold">Delivery Address:</span></p>
                            <p className="text-xs text-gray-700">123 Marine Drive, Apt 4B</p>
                            <p className="text-xs text-gray-700">Mumbai - 400001</p>
                            <p className="text-xs text-gray-600 mt-2"><span className="font-semibold">Time Slot:</span> 4:00 PM - 7:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900 mb-1">Delivery Instructions</p>
                          <p className="text-xs text-amber-800">Please keep your phone accessible. Our delivery partner will call you before arrival.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#0A4D8C]" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">Confirmation Email Sent</p>
                      <p className="text-xs text-green-700">Check your inbox for order details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-600 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Push Notifications Enabled</p>
                      <p className="text-xs text-blue-700">Get real-time updates on your order</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              {/* Cancel Order Card */}
              {canCancel && (
                <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span className="text-sm font-semibold text-orange-900">Cancel Order</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border-2 border-orange-300 shadow-sm">
                        <Clock className="h-4 w-4 text-orange-600 animate-pulse" />
                        <span className="text-lg font-bold font-mono text-orange-600">
                          {formatTime(timeLeft)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-orange-700 mb-4">
                      You can cancel this order within 15 minutes of placing it
                    </p>
                    <Button
                      variant="destructive"
                      className="w-full gap-2 bg-red-600 hover:bg-red-700 h-12"
                      onClick={() => setShowCancelDialog(true)}
                    >
                      <XCircle className="h-5 w-5" />
                      Cancel Order
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!canCancel && (
                <Card className="border-2 border-gray-200 bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span className="text-sm font-semibold">Cancellation Expired</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your order is being prepared. Contact support for assistance.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/account/orders" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 h-12">
                      <Package className="h-4 w-4" />
                      View Order Details
                    </Button>
                  </Link>
                  <Link to="/track-order" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 h-12">
                      <MapPin className="h-4 w-4" />
                      Track Order
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start gap-2 h-12">
                    <Download className="h-4 w-4" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 h-12">
                    <Share2 className="h-4 w-4" />
                    Share Order
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <Link to="/products" className="block">
                    <Button className="w-full h-12 bg-[#0A4D8C] hover:bg-[#083d6f]">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Support Card */}
              <Card className="bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] text-white">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <Phone className="h-8 w-8 mx-auto" />
                    <h3 className="font-semibold text-lg">Need Help?</h3>
                    <p className="text-sm text-white/90">Our support team is here for you</p>
                    <Button variant="secondary" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Card */}
              <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200">
                <CardContent className="p-6 text-center">
                  <Gift className="h-10 w-10 mx-auto text-amber-600 mb-3" />
                  <h3 className="font-semibold text-amber-900 mb-2">Reward Unlocked!</h3>
                  <p className="text-sm text-amber-800 mb-3">
                    You earned 50 points with this order
                  </p>
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    View Rewards
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Cancel Order?
            </DialogTitle>
            <DialogDescription className="pt-4">
              Are you sure you want to cancel this order?
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">Order ID: {orderId}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Refund will be processed within 3-5 business days
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isCancelling}
              className="w-full sm:w-auto"
            >
              Keep Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelOrder}
              disabled={isCancelling}
              className="w-full sm:w-auto gap-2"
            >
              {isCancelling ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Yes, Cancel Order
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Animations CSS */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 60%;
          }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        @keyframes check-draw {
          0% {
            stroke-dasharray: 0 100;
            opacity: 0;
            transform: scale(0.8) rotate(-45deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100 100;
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        .animate-check-draw {
          animation: check-draw 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

