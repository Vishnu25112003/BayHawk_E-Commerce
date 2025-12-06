"use client"

import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Package, Mail, Bell, XCircle, Clock, AlertTriangle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { notification } from "@/lib/notification"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get("orderId") || "FC" + Date.now()
  const [showAnimation, setShowAnimation] = useState(true)
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [canCancel, setCanCancel] = useState(true)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000)
    return () => clearTimeout(timer)
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
      router.push("/products")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6 text-center">
            {/* Success Animation */}
            <div className={`mb-6 transition-all duration-500 ${showAnimation ? "scale-150" : "scale-100"}`}>
              <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">Thank you for your order. We are preparing your fresh catch!</p>

            {/* Order ID */}
            <div className="bg-secondary p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-bold font-mono">{orderId}</p>
            </div>

            {/* Notifications */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg text-green-700">
                <Mail className="h-5 w-5" />
                <span className="text-sm">Confirmation email sent</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#0A4D8C]/5 rounded-lg text-[#0A4D8C]/80">
                <Bell className="h-5 w-5" />
                <span className="text-sm">Push notification enabled for updates</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg text-accent">
                <Package className="h-5 w-5" />
                <span className="text-sm">Expected delivery: Today, 4 PM - 7 PM</span>
              </div>
            </div>

            {/* Cancel Order Section */}
            {canCancel && (
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-900">Cancel Window</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-orange-300">
                    <Clock className="h-4 w-4 text-orange-600 animate-pulse" />
                    <span className="text-lg font-bold font-mono text-orange-600">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-orange-700 mb-3">
                  You can cancel this order within 20 minutes of placing it
                </p>
                <Button
                  variant="destructive"
                  className="w-full gap-2 bg-red-600 hover:bg-red-700"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <XCircle className="h-4 w-4" />
                  Cancel Order
                </Button>
              </div>
            )}

            {!canCancel && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm font-medium">Cancellation window has expired</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your order is being prepared. Contact support for assistance.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/account/orders" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  View Order
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button className="w-full">Continue Shopping</Button>
              </Link>
            </div>

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
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
