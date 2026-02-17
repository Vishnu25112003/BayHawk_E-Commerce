import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  User,
  Package,
  Heart,
  MapPin,
  Wallet,
  Users,
  Crown,
  Settings,
  LogOut,
  ChevronRight,
  Camera,
  RefreshCw,
} from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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

const menuItems = [
  { icon: User, label: "Profile", href: "/account" },
  { icon: Package, label: "Orders", href: "/account/orders" },
  { icon: RefreshCw, label: "Frequent Orders", href: "/account/frequent-orders" },
  { icon: Heart, label: "Favorites", href: "/account/favorites" },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: Wallet, label: "Wallet", href: "/account/wallet" },
  { icon: Users, label: "Refer & Earn", href: "/account/refer" },
  { icon: Crown, label: "Membership", href: "/account/membership" },
  { icon: Settings, label: "Settings", href: "/account/settings" },
]

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, setUser } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "User")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("9876543210")

  if (!user) {
    navigate("/login")
    return null
  }

  const handleSave = () => {
    setUser({ name, email })
    setIsEditing(false)
  }

  const handleLogout = () => {
    setUser(null)
    navigate("/")
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
              <BreadcrumbPage>My Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="font-bold text-lg">{name}</h2>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>

                <Separator className="my-4" />

                {/* Menu */}
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                        item.href === "/account" ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </Link>
                  ))}
                </nav>

                <Separator className="my-4" />

                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-4 gap-4 mt-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="h-8 w-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto text-[#0A4D8C] mb-2" />
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Frequent Orders</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 mx-auto text-accent mb-2" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Wishlist Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Wallet className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <p className="text-2xl font-bold">₹250</p>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingElements />
    </div>
  )
}
