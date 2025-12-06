import type React from "react"

import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Package, CheckCircle, Clock, MapPin, Phone, MessageSquare, FileText, Edit, User, Star } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface TrackingStep {
  status: string
  title: string
  time: string
  completed: boolean
  current: boolean
}

const trackingSteps: TrackingStep[] = [
  { status: "placed", title: "Order Placed", time: "Today, 10:30 AM", completed: true, current: false },
  { status: "confirmed", title: "Order Confirmed", time: "Today, 10:35 AM", completed: true, current: false },
  { status: "preparing", title: "Preparing Your Order", time: "Today, 11:00 AM", completed: true, current: false },
  { status: "shipped", title: "Out for Delivery", time: "Today, 2:00 PM", completed: true, current: true },
  { status: "delivered", title: "Delivered", time: "Expected by 4:00 PM", completed: false, current: false },
]

const orderItems = [
  { name: "Fresh Pomfret", quantity: 2, price: 599, image: "/pomfret-fish.jpg" },
  { name: "Tiger Prawns", quantity: 1, price: 449, image: "/tiger-prawns.png" },
]

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get("id") || ""

  const [searchOrderId, setSearchOrderId] = useState(orderId)
  const [showTracking, setShowTracking] = useState(!!orderId)
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [callbackRequested, setCallbackRequested] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchOrderId.trim()) {
      setShowTracking(true)
    }
  }

  const handleRequestCallback = () => {
    setCallbackRequested(true)
    setTimeout(() => setCallbackRequested(false), 3000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Track Your Order</h1>

        {/* Search Order */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="Enter Order ID (e.g., FC1234567890)"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Track Order</Button>
            </form>
          </CardContent>
        </Card>

        {showTracking && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tracking Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Tracking Map */}
              <Card className="overflow-hidden">
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-50 to-cyan-50">
                  {/* Simulated Map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-[#0A4D8C] rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-[#0A4D8C] text-white rounded-full p-6 shadow-2xl">
                          <Package className="h-12 w-12 animate-bounce" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-lg">Your order is on the way!</p>
                        <p className="text-sm text-gray-600">Estimated arrival: 30 minutes</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          <span>2.5 km away from your location</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative route line */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
                    <path
                      d="M 50 250 Q 150 200, 200 150 T 350 50"
                      stroke="#0A4D8C"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="10,5"
                      className="animate-pulse"
                    />
                  </svg>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle>Order #{searchOrderId || "FC1234567890"}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Placed on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <Badge className="bg-green-500 text-white px-3 py-1">Out for Delivery</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Timeline */}
                  <div className="relative space-y-6">
                    {trackingSteps.map((step, index) => (
                      <div key={step.status} className="relative flex gap-4">
                        {/* Connecting Line */}
                        {index < trackingSteps.length - 1 && (
                          <div className="absolute left-5 top-12 w-0.5 h-full -ml-px">
                            <div className={cn(
                              "h-full w-full",
                              step.completed ? "bg-gradient-to-b from-green-500 to-green-300" : "bg-gray-200"
                            )} />
                          </div>
                        )}

                        {/* Icon */}
                        <div className="relative z-10">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                              step.completed
                                ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
                                : step.current
                                ? "bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] text-white shadow-lg ring-4 ring-[#0A4D8C]/20 animate-pulse"
                                : "bg-gray-200 text-gray-400",
                            )}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : step.current ? (
                              <Package className="h-5 w-5 animate-bounce" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className={cn(
                          "flex-1 pb-6 transition-all duration-300",
                          step.current && "bg-[#0A4D8C]/5 -ml-2 pl-4 pr-4 py-3 rounded-lg"
                        )}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={cn(
                                "font-semibold text-base",
                                step.current && "text-[#0A4D8C]",
                                step.completed && "text-green-700"
                              )}>
                                {step.title}
                              </p>
                              <p className="text-sm text-gray-600 mt-1">{step.time}</p>
                              {step.current && (
                                <p className="text-xs text-[#0A4D8C] mt-2 font-medium">
                                  🚚 Your order is currently being delivered
                                </p>
                              )}
                            </div>
                            {step.completed && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                Done
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  {/* Delivery Person */}
                  <div className="bg-gradient-to-r from-[#0A4D8C]/10 to-blue-50 rounded-xl p-5 border border-[#0A4D8C]/20">
                    <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">Your Delivery Partner</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] flex items-center justify-center shadow-lg">
                            <User className="h-7 w-7 text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Rahul Kumar</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">4.9 (250+ deliveries)</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" className="bg-green-500 hover:bg-green-600 text-white shadow-lg">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" className="bg-[#0A4D8C] hover:bg-[#083d6f] text-white shadow-lg">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₹{item.price}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Contact Delivery Person */}
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <Phone className="h-4 w-4" />
                    Contact Delivery Person
                  </Button>

                  {/* Request Callback */}
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 bg-transparent"
                    onClick={handleRequestCallback}
                    disabled={callbackRequested}
                  >
                    <MessageSquare className="h-4 w-4" />
                    {callbackRequested ? "Callback Requested!" : "Request Callback"}
                  </Button>

                  {/* Modify Delivery Instructions */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <Edit className="h-4 w-4" />
                        Modify Delivery Instructions
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delivery Instructions</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm text-muted-foreground">
                          Note: You can modify instructions up to 30 minutes before delivery.
                        </p>
                        <div>
                          <Label>Instructions</Label>
                          <Textarea
                            placeholder="E.g., Leave at door, call before delivery..."
                            value={deliveryInstructions}
                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                          />
                        </div>
                        <Button className="w-full">Save Instructions</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* View Bill/Invoice */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                        <FileText className="h-4 w-4" />
                        View Bill / Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Invoice</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="text-center border-b pb-4">
                          <h3 className="font-bold text-lg">FreshCatch</h3>
                          <p className="text-sm text-muted-foreground">Order #{searchOrderId || "FC1234567890"}</p>
                          <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="space-y-2">
                          {orderItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>FREE</span>
                          </div>
                          <div className="flex justify-between font-bold text-base pt-2">
                            <span>Total</span>
                            <span>₹{orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full bg-transparent">
                          Download Invoice
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Rate Order (if delivered) */}
              <Card>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Rate after delivery to help us improve</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Quality", "Service", "Packing", "Delivery"].map((category) => (
                      <div key={category} className="flex items-center justify-between p-2 bg-secondary rounded">
                        <span className="text-sm">{category}</span>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Home</p>
                  <p className="text-sm text-muted-foreground">
                    123 Marine Drive, Apt 4B
                    <br />
                    Mumbai - 400001
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {!showTracking && (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Track Your Seafood Delivery</h2>
            <p className="text-muted-foreground mb-6">Enter your order ID above to see real-time delivery status</p>
            <Link to="/account/orders">
              <Button variant="outline">View All Orders</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
