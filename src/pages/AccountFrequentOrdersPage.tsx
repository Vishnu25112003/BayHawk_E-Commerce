import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronRight, RefreshCw, ShoppingCart, Plus, Minus } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { notification } from "@/lib/notification"

const frequentOrders = [
  {
    id: "1",
    items: [
      { id: "1", name: "Fresh Pomfret", price: 599, image: "/pomfret-fish.jpg", quantity: 2 },
      { id: "2", name: "Tiger Prawns", price: 449, image: "/tiger-prawns.png", quantity: 1 },
    ],
    totalOrders: 5,
    lastOrdered: "2025-01-20",
  },
  {
    id: "2",
    items: [{ id: "3", name: "King Fish Steaks", price: 699, image: "/king-fish.jpg", quantity: 1 }],
    totalOrders: 3,
    lastOrdered: "2025-01-15",
  },
  {
    id: "3",
    items: [
      { id: "4", name: "Fresh Crab", price: 399, image: "/fresh-crab.jpg", quantity: 2 },
      { id: "5", name: "Squid Rings", price: 349, image: "/squid-rings.jpg", quantity: 1 },
      { id: "6", name: "Mussels", price: 299, image: "/mussels.jpg", quantity: 1 },
    ],
    totalOrders: 2,
    lastOrdered: "2025-01-10",
  },
]

export default function AccountFrequentOrdersPage() {
  const { addToCart } = useStore()
  const [quantities, setQuantities] = useState<Record<string, Record<string, number>>>({})

  const getQuantity = (orderId: string, itemId: string, defaultQty: number) => {
    return quantities[orderId]?.[itemId] ?? defaultQty
  }

  const updateQuantity = (orderId: string, itemId: string, delta: number, defaultQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: Math.max(1, (prev[orderId]?.[itemId] ?? defaultQty) + delta),
      },
    }))
  }

  const handleReorder = (order: (typeof frequentOrders)[0]) => {
    order.items.forEach((item) => {
      const qty = getQuantity(order.id, item.id, item.quantity)
      for (let i = 0; i < qty; i++) {
        addToCart(
          {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: "",
            rating: 0,
            reviews: 0,
            weight: "500g",
            description: "",
            inStock: true,
          },
          "500g"
        )
      }
    })
    notification.success("Items added to cart successfully!", "Cart Updated")
  }

  const calculateTotal = (order: (typeof frequentOrders)[0]) => {
    return order.items.reduce((sum, item) => {
      const qty = getQuantity(order.id, item.id, item.quantity)
      return sum + item.price * qty
    }, 0)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Frequent Orders</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Frequent Orders</h1>
            <p className="text-muted-foreground">Quickly reorder your favorite combinations</p>
          </div>
        </div>

        {frequentOrders.length > 0 ? (
          <div className="space-y-6">
            {frequentOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Ordered {order.totalOrders} times</Badge>
                      <span className="text-sm text-muted-foreground">
                        Last: {new Date(order.lastOrdered).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                          <img src={item.image || "/placeholder.svg"} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(order.id, item.id, -1, item.quantity)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {getQuantity(order.id, item.id, item.quantity)}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(order.id, item.id, 1, item.quantity)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold">₹{calculateTotal(order)}</p>
                    </div>
                    <Button onClick={() => handleReorder(order)} className="gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No frequent orders yet</h2>
            <p className="text-muted-foreground mb-6">Order more to see your frequently ordered items here</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
