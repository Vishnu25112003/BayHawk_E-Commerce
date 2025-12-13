import { useState } from "react"
import { Bell, Gift, Truck, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "offer" | "delivery" | "promo" | "order"
  title: string
  message: string
  image?: string
  time: string
  read: boolean
  countdown?: number
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "offer",
    title: "Flash Sale Live!",
    message: "Get 30% off on all prawns. Limited time offer!",
    image: "/prawns.jpg",
    time: "2 min ago",
    read: false,
    countdown: 3600,
  },
  {
    id: "2",
    type: "delivery",
    title: "Order Out for Delivery",
    message: "Your order #FC1234567890 is out for delivery",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "promo",
    title: "Weekend Special",
    message: "Use code WEEKEND50 for extra ₹50 off",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "order",
    title: "Order Delivered",
    message: "Your order #FC1234567889 has been delivered",
    time: "Yesterday",
    read: true,
  },
]

const iconMap = {
  offer: Gift,
  delivery: Truck,
  promo: Tag,
  order: Clock,
}

const colorMap = {
  offer: "text-accent",
  delivery: "text-[#0A4D8C]",
  promo: "text-green-500",
  order: "text-primary",
}

export function NotificationsPanel() {
  const [open, setOpen] = useState(false)
  const [notificationList, setNotificationList] = useState(notifications)

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotificationList([])
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {notificationList.length > 0 && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          {notificationList.length > 0 ? (
            <div className="space-y-2">
              {notificationList.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer transition-colors",
                      notification.read ? "bg-background border-border" : "bg-primary/5 border-primary/20",
                    )}
                  >
                    <div className="flex gap-3">
                      {notification.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={notification.image || "/placeholder.svg"} alt="" className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0",
                            colorMap[notification.type],
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-semibold text-sm">{notification.title}</p>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        {notification.countdown && (
                          <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                            <Clock className="h-3 w-3" />
                            <span>Ends in {Math.floor(notification.countdown / 60)} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-medium">No notifications</p>
              <p className="text-sm text-muted-foreground">You are all caught up!</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
