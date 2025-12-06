import type React from "react"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Search, Heart, ShoppingCart, User, Wallet, Menu, MapPin, ChevronDown, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useStore } from "@/lib/store"
import { categories as categoriesData } from "@/lib/data"
import { cn } from "@/lib/utils"
import { NotificationsPanel } from "./notifications-panel"

const categories = categoriesData.map(c => ({
  href: `/products?category=${c.id}`,
  label: c.name,
  description: c.description
}))

const seafoodCategories = categoriesData.filter(c => 
  ['marine', 'water', 'shell', 'fry', 'combo', 'exotics'].includes(c.id)
).map(c => ({
  href: `/products?category=${c.id}`,
  label: c.name,
  description: c.description
}))

const otherCategories = categoriesData.filter(c => 
  ['chicken', 'mutton', 'eggs', 'spices'].includes(c.id)
).map(c => ({
  href: `/products?category=${c.id}`,
  label: c.name,
  description: c.description
}))

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Seafood",
    children: [
      { href: "/products", label: "All Seafood" },
      ...seafoodCategories,
    ],
  },
  {
    href: "/products?type=other",
    label: "Other Products",
    children: [
      { href: "/products?type=other", label: "All Other Products" },
      ...otherCategories,
    ],
  },
  { href: "/recipes", label: "Recipes" },
  { href: "/contact", label: "Contact" },
]

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OfferCountdownBanner } from "./offer-countdown-banner"

interface UserNavProps {
  user: { email?: string; name?: string; profileImage?: string } | null;
  onLogout: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ user, onLogout }) => {
  if (!user) {
    return (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  const initials = user.name ? user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("") : '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {user.profileImage ? (
              <AvatarImage src={user.profileImage} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex flex-col items-start p-2">
          <span className="font-bold">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link to="/account">
          <DropdownMenuItem>My Account</DropdownMenuItem>
        </Link>
        <Link to="/account/orders">
          <DropdownMenuItem>My Orders</DropdownMenuItem>
        </Link>
        <Link to="/account/favorites">
          <DropdownMenuItem>Wishlist</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { cart, wishlist, user, setUser } = useStore()

  const [selectedLocation, setSelectedLocation] = useState("Mumbai, 400001")

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    setUser(null)
    navigate("/")
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Offer Countdown Banner */}
      <OfferCountdownBanner />
      
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span>Free delivery on orders above ₹500</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:underline">
              Help
            </Link>
            <Link to="/track-order" className="hover:underline">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg" alt="BayHawk Logo" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Center: Location, Search, Categories */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-4">
            {/* Location Selector */}
            <div className="hidden lg:flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto p-0 font-normal">
                    <span>{selectedLocation}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedLocation("Mumbai, 400001")}>Mumbai</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation("Delhi, 110001")}>Delhi</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation("Bangalore, 560001")}>Bangalore</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLocation("Chennai, 600001")}>Chennai</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for fish, prawns, crabs..."
                  className="w-full pl-10 pr-4 bg-secondary border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Layers className="h-5 w-5" />
                  <span className="font-medium hidden md:inline">Categories</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen max-w-sm p-0" align="start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      to={category.href}
                      className="group flex flex-col justify-between p-3 rounded-lg hover:bg-secondary"
                    >
                      <div>
                        <h3 className="font-semibold text-base mb-1 group-hover:text-primary">{category.label}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{category.description || `Fresh ${category.label} delivered to your door.`}</p>
                      </div>
                      <span className="text-sm font-medium text-primary mt-2">Shop Now</span>
                    </Link>
                  ))}
                </div>
                <div className="bg-secondary/50 p-4 mt-2">
                  <Link to="/products" className="font-semibold text-primary hover:underline">View All Products &rarr;</Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            
            <div className="hidden md:flex items-center gap-1 sm:gap-2">
              <NotificationsPanel />

              <Link to="/account/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/account/wallet" className="hidden sm:block">
                <Button variant="ghost" size="icon">
                  <Wallet className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <UserNav user={user} onLogout={handleLogout} />

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="p-6">
                  <Link to="/" className="flex items-center gap-2 shrink-0 mb-8">
                    <img src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg" alt="BayHawk Logo" className="h-8 w-auto" />
                  </Link>

                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <div key={link.href}>
                        <Link
                          to={link.href}
                          onClick={() => !link.children && setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between text-lg font-medium p-3 rounded-lg transition-colors",
                            pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                          )}
                        >
                          {link.label}
                          {link.children && <ChevronDown className="h-5 w-5" />}
                        </Link>
                        {link.children && (
                          <div className="flex flex-col gap-1 pt-2 pl-6">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-3 text-base text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="border-t my-4" />

                    <Link to="/account/wallet" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg">
                      <Wallet className="h-5 w-5" />
                      <span>My Wallet</span>
                    </Link>
                    <Link to="/account/favorites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist</span>
                    </Link>
                    <Link to="/track-order" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg">
                      <MapPin className="h-5 w-5" />
                      <span>Track Order</span>
                    </Link>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-primary rounded-lg">
                      <User className="h-5 w-5" />
                      <span>Help Center</span>
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for fish, prawns, crabs..."
                className="w-full pl-10 pr-4 bg-secondary border-0"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        )}
      </div>

    </header>
  )
}
