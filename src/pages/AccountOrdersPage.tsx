import { useState } from "react"
import { Link } from "react-router-dom"
import { Package, Star, Eye, MessageSquare, Check, Phone, User, ChevronDown, MapPin, CreditCard } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
  deliveryPartner?: {
    name: string
    phone: string
    rating: number
  }
  rating?: {
    quality: number
    service: number
    packing: number
    delivery: number
    comment?: string
  }
}

const orders: Order[] = [
  {
    id: "FC1234567893",
    date: new Date().toISOString(),
    status: "Processing",
    total: 899,
    deliveryInstructions: "Leave at the front door.",
    items: [
      { name: "Fresh Crab", nameTamil: "நண்டு", quantity: 1, price: 899, image: "/Website Source Files/sample/1.jpg" },
    ],
    address: {
      name: "Home",
      address: "123 Marine Drive, Apt 4B",
      city: "Mumbai",
      pincode: "400001",
      phone: "9876543210",
    },
    deliverySlot: "4 PM - 6 PM",
    paymentMethod: "UPI",
  },
  {
    id: "FC1234567890",
    date: "2025-01-20",
    status: "Delivered",
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
    deliveryPartner: {
      name: "Rahul Kumar",
      phone: "+91 98765 43210",
      rating: 4.9,
    },
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
    deliveryPartner: {
      name: "Priya Sharma",
      phone: "+91 98765 43211",
      rating: 4.8,
    },
    rating: {
      quality: 5,
      service: 4,
      packing: 5,
      delivery: 4,
      comment: "Excellent quality! Very fresh and tasty.",
    },
  },
  {
    id: "FC1234567892",
    date: "2025-01-10",
    status: "Cancelled",
    total: 749,
    items: [
      { name: "Seafood Combo", nameTamil: "கடல் உணவு காம்போ", quantity: 1, price: 749, image: "/Website Source Files/sample/2.jpg" }
    ],
    address: {
      name: "Home",
      address: "123 Marine Drive, Apt 4B",
      city: "Mumbai",
      pincode: "400001",
      phone: "9876543210",
    },
    deliverySlot: "7 AM - 9 AM",
    paymentMethod: "COD",
  },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700 border-green-200",
  Processing: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
}

export default function AccountOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [showInstructionsDialog, setShowInstructionsDialog] = useState(false)
  const [editingInstructions, setEditingInstructions] = useState("")
  const [expandedDeliveryPartner, setExpandedDeliveryPartner] = useState<string | null>(null)
  const [ratings, setRatings] = useState({
    quality: 0,
    service: 0,
    packing: 0,
    delivery: 0,
  })
  const [ratingComment, setRatingComment] = useState("")
  const [editingInstructionOrderId, setEditingInstructionOrderId] = useState<string | null>(null);
  const [editedInstruction, setEditedInstruction] = useState('');

  const isWithin30Mins = (orderDate: string) => {
    const orderTime = new Date(orderDate).getTime();
    const currentTime = new Date().getTime();
    const thirtyMinsInMillis = 30 * 60 * 1000;
    return currentTime - orderTime < thirtyMinsInMillis;
  };

  const handleEditInstructions = (order: Order) => {
    setEditingInstructionOrderId(order.id);
    setEditedInstruction(order.deliveryInstructions || '');
  };

  const handleCancelEdit = () => {
    setEditingInstructionOrderId(null);
    setEditedInstruction('');
  };
  
  const handleSaveInstructions = () => {
    if (editingInstructionOrderId) {
      const orderToUpdate = orders.find(o => o.id === editingInstructionOrderId);
      if (orderToUpdate) {
        orderToUpdate.deliveryInstructions = editedInstruction;
      }
    }
    // In a real app, you'd call an API to save the changes.
    // For now, we'll just update the state.
    handleCancelEdit();
    setShowInstructionsDialog(false)
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailsDialog(true)
  }

  const handleRateOrder = (order: Order) => {
    setSelectedOrder(order)
    if (order.rating) {
      setRatings({
        quality: order.rating.quality,
        service: order.rating.service,
        packing: order.rating.packing,
        delivery: order.rating.delivery,
      })
      setRatingComment(order.rating.comment || "")
    } else {
      setRatings({ quality: 0, service: 0, packing: 0, delivery: 0 })
      setRatingComment("")
    }
    setShowRatingDialog(true)
  }

  const handleSubmitRating = () => {
    // Submit rating logic here
    setShowRatingDialog(false)
  }

  const RatingStars = ({ rating, onRate, readonly = false }: { rating: number; onRate?: (rating: number) => void; readonly?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRate?.(star)}
            disabled={readonly}
            className={cn(
              "transition-all",
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            )}
          >
            <Star
              className={cn(
                "h-5 w-5",
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              )}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink to="/account">My Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Track, manage and review your orders
          </p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4 md:space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs md:text-sm text-muted-foreground mb-1">
                        Order #{order.id}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Badge className={cn("border-2 font-semibold", statusColors[order.status])}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-3 md:p-4 space-y-3">
                  {/* Items - Compact View */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white flex-shrink-0 border border-gray-200">
                          <img 
                            src={item.image || "/placeholder.svg"} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs md:text-sm text-gray-900 truncate">{item.name}</p>
                          {item.nameTamil && (
                            <p className="text-xs text-sky-500 truncate">{item.nameTamil}</p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span className="font-semibold text-gray-900">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Instructions - Collapsible */}
                  {order.deliveryInstructions && (
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-between h-9 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>Delivery Instructions</span>
                          </div>
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        {editingInstructionOrderId === order.id ? (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                            <Textarea
                              value={editedInstruction}
                              onChange={(e) => setEditedInstruction(e.target.value)}
                              className="text-xs"
                              placeholder="Enter new instructions..."
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="text-xs">Cancel</Button>
                              <Button size="sm" onClick={handleSaveInstructions} className="text-xs">Save</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-xs text-blue-900">{order.deliveryInstructions}</p>
                            {isWithin30Mins(order.date) && order.status === "Processing" && (
                              <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-2" onClick={() => handleEditInstructions(order)}>
                                Modify Instruction
                              </Button>
                            )}
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Delivery Partner - Collapsible Button */}
                  {order.deliveryPartner && (order.status === "Delivered" || order.status === "Shipped") && (
                    <Collapsible 
                      open={expandedDeliveryPartner === order.id}
                      onOpenChange={(open) => setExpandedDeliveryPartner(open ? order.id : null)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-between h-9 text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5" />
                            <span>Delivery Partner</span>
                          </div>
                          <ChevronDown className={cn(
                            "h-3.5 w-3.5 transition-transform",
                            expandedDeliveryPartner === order.id && "rotate-180"
                          )} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="p-3 bg-gradient-to-r from-[#0A4D8C]/10 to-blue-50 border border-[#0A4D8C]/20 rounded-lg">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="relative flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] flex items-center justify-center shadow-md">
                                  <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-gray-900 truncate">{order.deliveryPartner.name}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={cn(
                                          "h-2.5 w-2.5",
                                          i < Math.floor(order.deliveryPartner!.rating) 
                                            ? "fill-yellow-400 text-yellow-400" 
                                            : "text-gray-300"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-600">{order.deliveryPartner.rating}</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{order.deliveryPartner.phone}</p>
                              </div>
                            </div>
                            <a href={`tel:${order.deliveryPartner.phone}`}>
                              <Button 
                                size="sm" 
                                className="bg-green-500 hover:bg-green-600 text-white h-8 px-3"
                              >
                                <Phone className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">Call</span>
                              </Button>
                            </a>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Footer - Compact */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-200">
                    <p className="text-sm md:text-base font-bold text-gray-900">
                      Total: <span className="text-[#0A4D8C]">₹{order.total}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {order.status !== "Cancelled" && (
                        <Link to={`/track-order?id=${order.id}`}>
                          <Button variant="outline" size="sm" className="text-xs h-8">
                            Track Order
                          </Button>
                        </Link>
                      )}
                      {order.status === "Delivered" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-8"
                          onClick={() => handleRateOrder(order)}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          {order.rating ? "View Rating" : "Rate"}
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-8"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />

      {/* Order Details Dialog - Compact */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-3">
              {/* Order Info - Compact Grid */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-0.5">Order ID</p>
                    <p className="font-mono font-semibold">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Status</p>
                    <Badge className={cn("text-xs h-5", statusColors[selectedOrder.status])}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Order Date</p>
                    <p className="font-semibold">
                      {new Date(selectedOrder.date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5">Delivery Slot</p>
                    <p className="font-semibold">{selectedOrder.deliverySlot}</p>
                  </div>
                </div>
              </div>

              {/* Items - Compact */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                    <span className="font-semibold">Items Ordered ({selectedOrder.items.length})</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white flex-shrink-0 border">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-gray-900 truncate">{item.name}</p>
                        {item.nameTamil && (
                          <p className="text-xs text-sky-500 truncate">{item.nameTamil}</p>
                        )}
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <p className="font-bold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Delivery Address - Collapsible */}
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="font-semibold">Delivery Address</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="p-3 bg-gray-50 rounded-lg text-xs">
                    <p className="font-semibold mb-1">{selectedOrder.address.name}</p>
                    <p className="text-gray-700">{selectedOrder.address.address}</p>
                    <p className="text-gray-700">{selectedOrder.address.city} - {selectedOrder.address.pincode}</p>
                    <p className="text-gray-700 mt-1.5">Phone: {selectedOrder.address.phone}</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Delivery Instructions - Collapsible */}
              {selectedOrder.deliveryInstructions && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span className="font-semibold">Delivery Instructions</span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-900">{selectedOrder.deliveryInstructions}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Delivery Partner - Collapsible */}
              {selectedOrder.deliveryPartner && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5" />
                        <span className="font-semibold">Delivery Partner</span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="p-3 bg-gradient-to-r from-[#0A4D8C]/10 to-blue-50 border border-[#0A4D8C]/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#0d5fa3] flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{selectedOrder.deliveryPartner.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={cn(
                                    "h-2.5 w-2.5",
                                    i < Math.floor(selectedOrder.deliveryPartner!.rating) 
                                      ? "fill-yellow-400 text-yellow-400" 
                                      : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">{selectedOrder.deliveryPartner.rating}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{selectedOrder.deliveryPartner.phone}</p>
                        </div>
                        <a href={`tel:${selectedOrder.deliveryPartner.phone}`}>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 h-8 px-3">
                            <Phone className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Packed Product Photos - Collapsible */}
              {(selectedOrder.status === "Shipped" || selectedOrder.status === "Out for Delivery" || selectedOrder.status === "Delivered") && (
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                      <div className="flex items-center gap-2">
                        <Package className="h-3.5 w-3.5" />
                        <span className="font-semibold">Packed Product Photos</span>
                      </div>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-muted-foreground mb-2">Photos taken before dispatch:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedOrder.items.slice(0, 3).map((item, i) => (
                          <div key={i} className="aspect-square bg-white rounded-md border border-gray-200 overflow-hidden relative group">
                            <img 
                              src={item.image || "/placeholder.svg"} 
                              alt="Packed Item" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}

              {/* Payment Summary - Collapsible */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span className="font-semibold">Payment Summary</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="p-3 bg-gray-50 rounded-lg space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{selectedOrder.total - 40}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹40</span>
                    </div>
                    <Separator className="my-1.5" />
                    <div className="flex justify-between font-bold text-sm">
                      <span>Total</span>
                      <span className="text-[#0A4D8C]">₹{selectedOrder.total}</span>
                    </div>
                    <div className="pt-1.5 border-t">
                      <p className="text-xs text-muted-foreground">
                        Payment: <span className="font-semibold text-gray-900">{selectedOrder.paymentMethod}</span>
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedOrder?.rating ? "Your Rating" : "Rate Your Order"}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Rating Categories */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Quality</Label>
                  <RatingStars 
                    rating={ratings.quality} 
                    onRate={(rating) => setRatings({ ...ratings, quality: rating })}
                    readonly={!!selectedOrder.rating}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Service</Label>
                  <RatingStars 
                    rating={ratings.service} 
                    onRate={(rating) => setRatings({ ...ratings, service: rating })}
                    readonly={!!selectedOrder.rating}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Packing</Label>
                  <RatingStars 
                    rating={ratings.packing} 
                    onRate={(rating) => setRatings({ ...ratings, packing: rating })}
                    readonly={!!selectedOrder.rating}
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Delivery</Label>
                  <RatingStars 
                    rating={ratings.delivery} 
                    onRate={(rating) => setRatings({ ...ratings, delivery: rating })}
                    readonly={!!selectedOrder.rating}
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <Label htmlFor="rating-comment" className="text-sm font-semibold mb-2 block">
                  Your Review (Optional)
                </Label>
                <Textarea
                  id="rating-comment"
                  placeholder="Share your experience..."
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="min-h-[100px]"
                  disabled={!!selectedOrder.rating}
                />
              </div>

              {/* Submit Button */}
              {!selectedOrder.rating && (
                <Button 
                  className="w-full" 
                  onClick={handleSubmitRating}
                  disabled={Object.values(ratings).some(r => r === 0)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Submit Rating
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Instructions Dialog */}
      <Dialog open={showInstructionsDialog} onOpenChange={setShowInstructionsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delivery Instructions</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="instructions" className="text-sm font-semibold mb-2 block">
                  Instructions for delivery partner
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="E.g., Ring the doorbell, Call before delivery..."
                  value={editingInstructions}
                  onChange={(e) => setEditingInstructions(e.target.value)}
                  className="min-h-[120px]"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {editingInstructions.length}/200 characters
                </p>
              </div>

              {selectedOrder.status === "Processing" && (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowInstructionsDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleSaveInstructions}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
