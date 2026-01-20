import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Package, CheckCircle, Clock, MapPin, Phone, MessageSquare, FileText, Edit, User, Star, Truck, AlertTriangle, ChevronDown } from "lucide-react"
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Order {
  id: string
  date: string
  status: string
  total: number
  deliveryInstructions?: string
  items: Array<{
    name: string
    nameTamil?: string
    quantity: number
    price: number
    image: string
  }>
  address: {
    name: string
    address: string
    city: string
    pincode: string
    phone: string
  }
  deliverySlot: string
  paymentMethod: string
}

// Mock orders data - in real app, this would come from API
const mockOrders: Order[] = [
  {
    id: "FC1234567890",
    date: "2025-01-20",
    status: "Out for Delivery",
    total: 1299,
    deliveryInstructions: "Ring the doorbell twice, Leave at gate if no one answers",
    items: [
      { name: "Fresh Pomfret", nameTamil: "வெள்ளி வாவல் மீன்", quantity: 2, price: 699, image: "/Website Source Files/sample/8.jpg" },
      { name: "Tiger Prawns", nameTamil: "புலி இறால்", quantity: 1, price: 600, image: "/Website Source Files/sample/3.jpg" },
    ],
    address: {
      name: "Home",
      address: "123 Marine Drive, Apt 4B",
      city: "Mumbai",
      pincode: "400001",
      phone: "9876543210",
    },
    deliverySlot: "7 PM - 9 PM",
    paymentMethod: "UPI",
  },
  {
    id: "FC1234567891",
    date: "2025-01-15",
    status: "Delivered",
    total: 599,
    deliveryInstructions: "Call before delivery",
    items: [
      { name: "King Fish Steaks", nameTamil: "கிங் மீன் ஸ்டீக்ஸ்", quantity: 1, price: 599, image: "/Website Source Files/sample/4.jpg" }
    ],
    address: {
      name: "Office",
      address: "456 Tech Park, Building C",
      city: "Mumbai",
      pincode: "400051",
      phone: "9876543210",
    },
    deliverySlot: "1 PM - 3 PM",
    paymentMethod: "Card",
  },
  {
    id: "FC1234567892",
    date: "2025-01-18",
    status: "Processing",
    total: 849,
    deliveryInstructions: "Please call 30 minutes before delivery",
    items: [
      { name: "Fresh Crab", nameTamil: "நண்டு", quantity: 1, price: 849, image: "/fresh-crab.jpg" }
    ],
    address: {
      name: "Home",
      address: "123 Marine Drive, Apt 4B",
      city: "Mumbai",
      pincode: "400001",
      phone: "9876543210",
    },
    deliverySlot: "5 PM - 7 PM",
    paymentMethod: "UPI",
  },
  {
    id: "FC1234567893",
    date: "2025-01-12",
    status: "Delivered",
    total: 1450,
    items: [
      { name: "Seafood Combo", nameTamil: "கடல் உணவு காம்போ", quantity: 1, price: 749, image: "/seafood-combo-pack.jpg" },
      { name: "Fresh Prawns", nameTamil: "இறால்", quantity: 1, price: 701, image: "/prawns.jpg" }
    ],
    address: {
      name: "Home",
      address: "123 Marine Drive, Apt 4B",
      city: "Mumbai",
      pincode: "400001",
      phone: "9876543210",
    },
    deliverySlot: "6 PM - 8 PM",
    paymentMethod: "Card",
  },
  {
    id: "FC1234567894",
    date: "2025-01-08",
    status: "Delivered",
    total: 950,
    items: [
      { name: "King Fish", nameTamil: "வஞ்சிரம்", quantity: 2, price: 950, image: "/king-fish.jpg" }
    ],
    address: {
      name: "Office",
      address: "456 Tech Park, Building C",
      city: "Mumbai",
      pincode: "400051",
      phone: "9876543210",
    },
    deliverySlot: "12 PM - 2 PM",
    paymentMethod: "UPI",
  },
]

const statusColors: Record<string, string> = {
  "Delivered": "bg-green-600 text-white",
  "Processing": "bg-blue-600 text-white",
  "Out for Delivery": "bg-orange-600 text-white",
  "Shipped": "bg-yellow-600 text-white",
}

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const urlOrderId = searchParams.get("id") || ""

  const [searchOrderId, setSearchOrderId] = useState(urlOrderId)
  const [showTracking, setShowTracking] = useState(!!urlOrderId)
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null)
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [callbackRequested, setCallbackRequested] = useState(false)
  const [deliveryPartnerExpanded, setDeliveryPartnerExpanded] = useState(false)

  // Sort orders by date (latest first)
  const sortedOrders = [...mockOrders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Load order data when orderId changes
  useEffect(() => {
    if (urlOrderId) {
      const order = mockOrders.find(o => o.id === urlOrderId)
      if (order) {
        setCurrentOrder(order)
        setDeliveryInstructions(order.deliveryInstructions || "")
        setSearchOrderId(urlOrderId)
        setShowTracking(true)
      }
    } else {
      // Auto-load latest order if no order ID in URL
      if (sortedOrders.length > 0) {
        const latestOrder = sortedOrders[0]
        setCurrentOrder(latestOrder)
        setDeliveryInstructions(latestOrder.deliveryInstructions || "")
        setSearchOrderId(latestOrder.id)
        setShowTracking(true)
      }
    }
  }, [urlOrderId])

  const handleOrderSelect = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId)
    if (order) {
      setCurrentOrder(order)
      setDeliveryInstructions(order.deliveryInstructions || "")
      setSearchOrderId(orderId)
      setShowTracking(true)
      navigate(`/track-order?id=${orderId}`)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchOrderId.trim()) {
      const order = mockOrders.find(o => o.id === searchOrderId)
      if (order) {
        setCurrentOrder(order)
        setDeliveryInstructions(order.deliveryInstructions || "")
        setShowTracking(true)
      } else {
        setShowTracking(false)
        setCurrentOrder(null)
      }
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Track Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-2xl md:text-3xl font-bold mb-6">Track Your Order</h1>

        {/* Latest Orders Dropdown - Professional */}
        {sortedOrders.length > 0 && (
          <Card className="mb-4 border-2 border-[#0A4D8C]/20 bg-gradient-to-r from-[#0A4D8C]/5 to-blue-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 min-w-fit">
                  <Package className="h-5 w-5 text-[#0A4D8C]" />
                  <Label className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Your Recent Orders:
                  </Label>
                </div>
                <Select 
                  value={currentOrder?.id || sortedOrders[0].id} 
                  onValueChange={handleOrderSelect}
                >
                  <SelectTrigger className="w-full sm:flex-1 h-11 bg-white border-2 border-gray-200 hover:border-[#0A4D8C] transition-colors">
                    {currentOrder ? (
                      <div className="flex items-center gap-2 w-full">
                        <span className="font-mono font-semibold text-sm">#{currentOrder.id}</span>
                        <Badge 
                          className={cn(
                            "text-xs h-5 px-2",
                            statusColors[currentOrder.status]
                          )}
                        >
                          {currentOrder.status}
                        </Badge>
                      </div>
                    ) : (
                      <SelectValue placeholder="Select an order to track" />
                    )}
                  </SelectTrigger>
                  <SelectContent className="max-w-[calc(100vw-2rem)] sm:max-w-none">
                    {sortedOrders.map((order) => (
                      <SelectItem 
                        key={order.id} 
                        value={order.id}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-4 py-1 w-full">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-semibold text-sm">#{order.id}</span>
                              <Badge 
                                className={cn(
                                  "text-xs h-5 px-2",
                                  statusColors[order.status]
                                )}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(order.date).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </span>
                              <span>•</span>
                              <span className="font-semibold text-gray-700">₹{order.total}</span>
                              <span>•</span>
                              <span className="truncate max-w-[150px]">
                                {order.items.length} item{order.items.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Order */}
        <Card className="mb-6">
          <CardContent className="pt-4 pb-4">
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

              <Card className="border-2 border-gray-200">
                <CardHeader className="bg-gradient-to-r from-[#0A4D8C]/5 to-blue-50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle>Order #{currentOrder?.id || searchOrderId}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {currentOrder ? new Date(currentOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge className={cn("px-3 py-1", currentOrder ? statusColors[currentOrder.status] : "bg-green-600 text-white")}>
                      {currentOrder?.status || "On Track"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-700 font-medium">
                      Estimated Delivery: Today, {currentOrder?.deliverySlot || "4:00 PM - 7:00 PM"}
                    </span>
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
                            <p className="text-xs text-green-800"><span className="font-semibold">Order ID:</span> {currentOrder?.id || searchOrderId}</p>
                            <p className="text-xs text-green-800"><span className="font-semibold">Payment:</span> Completed via {currentOrder?.paymentMethod || "UPI"}</p>
                            <p className="text-xs text-green-800"><span className="font-semibold">Invoice:</span> Sent to your email</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 2: Order Processing */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-green-100">
                          <CheckCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">Order Processed</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Completed</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Your items were prepared with care</p>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <p className="text-xs text-green-800">Quality check completed</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <p className="text-xs text-green-800">Packaging completed</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step 3: Ready for Dispatch */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-lg ring-4 ring-green-100">
                          <CheckCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">Ready for Dispatch</h4>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Completed</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Order handed to delivery partner</p>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs text-green-800">Dispatched at 2:30 PM</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 4: Out for Delivery */}
                      <div className="relative flex gap-4">
                        <div className="relative z-10 w-10 h-10 rounded-full bg-[#0A4D8C] flex items-center justify-center shrink-0 shadow-lg ring-4 ring-blue-100 animate-pulse">
                          <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">Out for Delivery</h4>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">In Progress</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Your order is on the way</p>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              <p className="text-xs text-blue-800">Currently 2.5 km away</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              <p className="text-xs text-blue-800">Estimated arrival: 30 minutes</p>
                            </div>
                            <div className="w-full bg-blue-200 rounded-full h-1.5 mt-2">
                              <div className="bg-blue-600 h-1.5 rounded-full animate-progress-delivery" style={{ width: '75%' }} />
                            </div>
                            <p className="text-xs text-blue-800 font-semibold mt-2">
                              <span className="font-semibold">Delivery Partner:</span> Rahul Kumar
                            </p>
                            <p className="text-xs text-blue-800">
                              <span className="font-semibold">Contact:</span> +91 98765 43210
                            </p>
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
                            <p className="text-xs text-gray-700">{currentOrder?.address.address || "123 Marine Drive, Apt 4B"}</p>
                            <p className="text-xs text-gray-700">{currentOrder?.address.city || "Mumbai"} - {currentOrder?.address.pincode || "400001"}</p>
                            <p className="text-xs text-gray-600 mt-2"><span className="font-semibold">Time Slot:</span> {currentOrder?.deliverySlot || "4:00 PM - 7:00 PM"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {currentOrder?.deliveryInstructions && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-amber-900 mb-1">Delivery Instructions</p>
                            <p className="text-xs text-amber-800">{currentOrder.deliveryInstructions}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />

                  {/* Delivery Partner - Collapsible */}
                  <Collapsible 
                    open={deliveryPartnerExpanded}
                    onOpenChange={setDeliveryPartnerExpanded}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between h-10 mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span className="font-semibold">Delivery Partner Details</span>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform",
                          deliveryPartnerExpanded && "rotate-180"
                        )} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-gradient-to-r from-[#0A4D8C]/10 to-blue-50 rounded-lg p-4 border border-[#0A4D8C]/20">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] flex items-center justify-center shadow-lg">
                                <User className="h-6 w-6 text-white" />
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <p className="font-bold text-base">Rahul Kumar</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                                <span className="text-xs text-gray-600">4.9 (250+ deliveries)</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">+91 98765 43210</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white shadow-md h-9">
                              <Phone className="h-3.5 w-3.5 mr-1.5" />
                              Call
                            </Button>
                            <Button size="sm" className="bg-[#0A4D8C] hover:bg-[#083d6f] text-white shadow-md h-9">
                              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Order Items - Compact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Order Items ({currentOrder?.items.length || 0})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {(currentOrder?.items || []).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs md:text-sm text-gray-900 truncate">{item.name}</p>
                        {item.nameTamil && (
                          <p className="text-xs text-sky-500 truncate">{item.nameTamil}</p>
                        )}
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold pt-1">
                    <span>Total</span>
                    <span className="text-[#0A4D8C]">₹{currentOrder?.total || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions Sidebar - Compact */}
            <div className="space-y-3">
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Contact Delivery Person */}
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9 text-xs">
                    <Phone className="h-3.5 w-3.5" />
                    Contact Delivery Person
                  </Button>

                  {/* View Packed Photos */}
                  {(currentOrder?.status === "Shipped" || currentOrder?.status === "Out for Delivery" || currentOrder?.status === "Delivered") && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9 text-xs">
                          <Package className="h-3.5 w-3.5" />
                          View Packed Photos
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-base">Packed Product Photos</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-xs text-muted-foreground">
                            These photos were taken just before your order was dispatched to ensure quality and completeness.
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {(currentOrder?.items || []).map((item, index) => (
                              <div key={index} className="space-y-1">
                                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                  <img 
                                    src={item.image || "/placeholder.svg"} 
                                    alt={`Packed ${item.name}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <p className="text-xs font-medium text-center truncate px-1">{item.name}</p>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full" onClick={() => document.querySelector('[data-state="open"]')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}>
                            Close
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* Request Callback */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 h-9 text-xs"
                    onClick={handleRequestCallback}
                    disabled={callbackRequested}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    {callbackRequested ? "Callback Requested!" : "Request Callback"}
                  </Button>

                  {/* Modify Delivery Instructions */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9 text-xs">
                        <Edit className="h-3.5 w-3.5" />
                        Modify Instructions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">Delivery Instructions</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          Note: You can modify instructions only within 30 minutes of placing the order.
                        </p>
                        <div>
                          <Label className="text-xs">Instructions</Label>
                          <Textarea
                            placeholder="E.g., Leave at door, call before delivery..."
                            value={deliveryInstructions}
                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                            maxLength={200}
                            className="min-h-[100px] text-xs"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {deliveryInstructions.length}/200 characters
                          </p>
                        </div>
                        <Button size="sm" className="w-full">Save Instructions</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* View Bill/Invoice */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-2 h-9 text-xs">
                        <FileText className="h-3.5 w-3.5" />
                        View Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">Invoice</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <div className="text-center border-b pb-3">
                          <h3 className="font-bold">FreshCatch</h3>
                          <p className="text-xs text-muted-foreground">Order #{currentOrder?.id || searchOrderId}</p>
                          <p className="text-xs text-muted-foreground">
                            Date: {currentOrder ? new Date(currentOrder.date).toLocaleDateString() : new Date().toLocaleDateString()}
                          </p>
                        </div>

                        <div className="space-y-1.5">
                          {(currentOrder?.items || []).map((item, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="truncate mr-2">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="font-semibold">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{currentOrder ? currentOrder.total - 40 : 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>₹40</span>
                          </div>
                          <div className="flex justify-between font-bold text-sm pt-1.5">
                            <span>Total</span>
                            <span className="text-[#0A4D8C]">₹{currentOrder?.total || 0}</span>
                          </div>
                          <div className="pt-1.5 border-t mt-1.5">
                            <p className="text-xs text-muted-foreground">
                              Payment: <span className="font-semibold text-gray-900">{currentOrder?.paymentMethod || "UPI"}</span>
                            </p>
                          </div>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          Download Invoice
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Delivery Address - Collapsible */}
              <Card>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
                      <CardTitle className="text-base flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>Delivery Address</span>
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 text-xs">
                      <p className="font-medium text-sm">{currentOrder?.address.name || "Home"}</p>
                      <p className="text-muted-foreground mt-1">
                        {currentOrder?.address.address || "123 Marine Drive, Apt 4B"}
                        <br />
                        {currentOrder?.address.city || "Mumbai"} - {currentOrder?.address.pincode || "400001"}
                      </p>
                      <p className="text-muted-foreground mt-1.5">
                        Phone: {currentOrder?.address.phone || "9876543210"}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
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
      
      {/* Custom Animations */}
      <style>{`
        @keyframes progress-delivery {
          0% {
            width: 0%;
          }
          100% {
            width: 75%;
          }
        }
        .animate-progress-delivery {
          animation: progress-delivery 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
