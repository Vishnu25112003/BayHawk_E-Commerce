"use client"

import Link from "next/link"
import Image from "next/image"
import { Package, ChevronRight, Star } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const orders = [
  {
    id: "FC1234567890",
    date: "2025-01-20",
    status: "Delivered",
    total: 1299,
    items: [
      { name: "Fresh Pomfret", quantity: 2, image: "/placeholder.svg?height=80&width=80" },
      { name: "Tiger Prawns", quantity: 1, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "FC1234567891",
    date: "2025-01-15",
    status: "Delivered",
    total: 599,
    items: [{ name: "King Fish Steaks", quantity: 1, image: "/placeholder.svg?height=80&width=80" }],
  },
  {
    id: "FC1234567892",
    date: "2025-01-10",
    status: "Cancelled",
    total: 749,
    items: [{ name: "Seafood Combo", quantity: 1, image: "/placeholder.svg?height=80&width=80" }],
  },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-[#0A4D8C]/10 text-[#0A4D8C]/80",
  Shipped: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Orders</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={statusColors[order.status]}>{order.status}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <p className="font-bold">Total: ₹{order.total}</p>
                    <div className="flex gap-2">
                      {order.status === "Delivered" && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Rate Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status !== "Cancelled" && order.status !== "Delivered" && (
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
