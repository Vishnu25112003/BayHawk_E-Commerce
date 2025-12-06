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
import { notification } from "@/lib/notification"

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const orderId = searchParams.get("orderId") || "FC" + Date.now()
  const [showAnimation, setShowAnimation] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
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
            <div className={`inline-flex items-center justify-center mb-6 transition-all duration-700 ${showAnimation ? "scale-0 rotate-180" : "scale-100 rotate-0"}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-6 shadow-2xl">
                  <CheckCircle className="h-16 w-16 md:h-20 md:h-20 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Order Placed Successfully! 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
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

              {/* Delivery Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-[#0A4D8C]" />
                    Delivery Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: Package, title: "Order Confirmed", time: "Just now", status: "completed" },
                      { icon: Package, title: "Preparing Order", time: "In 30 mins", status: "active" },
                      { icon: Truck, title: "Out for Delivery", time: "In 2-3 hours", status: "pending" },
                      { icon: MapPin, title: "Delivered", time: "Today, 4 PM - 7 PM", status: "pending" },
                    ].map((step, index) => {
                      const Icon = step.icon
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            step.status === 'completed' ? 'bg-green-500 text-white' :
                            step.status === 'active' ? 'bg-[#0A4D8C] text-white animate-pulse' :
                            'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold ${step.status === 'pending' ? 'text-gray-500' : 'text-gray-900'}`}>
                              {step.title}
                            </p>
                            <p className="text-sm text-gray-500">{step.time}</p>
                          </div>
                        </div>
                      )
                    })}
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
                      You can cancel this order within 20 minutes of placing it
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
      
      {/* Confetti Animation CSS */}
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
      `}</style>
    </div>
  )
}

