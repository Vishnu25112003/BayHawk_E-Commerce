import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Wallet,
  Menu,
  MapPin,
  ChevronDown,
  Layers,
  ChevronRight,
  ChefHat,
  Package,
  Gift,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useStore } from "@/lib/store";
import { categories as categoriesData, products } from "@/lib/data";

import { NotificationsPanel } from "./notifications-panel";






import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UnifiedAlertBanner } from "./unified-alert-banner";

interface UserNavProps {
  user: { email?: string; name?: string; profileImage?: string } | null;
  onLogout: () => void;
}

// Category Dropdown with hover functionality
const CategoriesDropdown: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Get products for the currently hovered category
  const categoryProducts = hoveredCategory
    ? products.filter((p) => p.category === hoveredCategory).slice(0, 6)
    : [];

  const hoveredCategoryData = hoveredCategory
    ? categoriesData.find((c) => c.id === hoveredCategory)
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Layers className="h-5 w-5" />
          <span className="font-medium hidden md:inline">Categories</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[700px] p-0" align="start">
        {/* Title and Subtitle Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1">
            What's your cooking <span className="text-[#0A4D8C]">today?</span>
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Freshest seafood and much more!
          </p>
        </div>

        <div className="grid grid-cols-[250px_1fr]">
          {/* Left side - Main categories with images */}
          <div className="bg-gray-50 p-3 max-h-[500px] overflow-y-auto">
            {categoriesData.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group relative"
                onMouseEnter={() => setHoveredCategory(cat.id)}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border-2 border-gray-100 group-hover:border-primary transition-colors">
                  <img
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium group-hover:text-primary block">
                    {cat.name}
                  </span>
                  {cat.description && (
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {cat.description}
                    </span>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          {/* Right side - Product varieties for selected category */}
          <div className="p-4 bg-white max-h-[500px] overflow-y-auto">
            {categoryProducts.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {hoveredCategoryData?.name} - Available Products
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {categoryProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="flex flex-col gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-primary"
                    >
                      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-primary font-semibold">
                          ₹{product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to={`/products?category=${hoveredCategory}`}
                  className="block text-center text-sm text-primary hover:underline font-medium mt-3"
                >
                  View All {hoveredCategoryData?.name} →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <Layers className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">
                  Hover over a category to see products
                </p>
              </div>
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserNav: React.FC<UserNavProps> = ({ user, onLogout }) => {
  if (!user) {
    return (
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "";

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
          <DropdownMenuItem className="gap-2">
            <User className="h-4 w-4" />
            My Account
          </DropdownMenuItem>
        </Link>
        <Link to="/account/orders">
          <DropdownMenuItem className="gap-2">
            <Package className="h-4 w-4" />
            My Orders
          </DropdownMenuItem>
        </Link>
        <Link to="/account/favorites">
          <DropdownMenuItem className="gap-2">
            <Heart className="h-4 w-4" />
            Wishlist
          </DropdownMenuItem>
        </Link>
        <Link to="/recipes">
          <DropdownMenuItem className="gap-2 ">
            <ChefHat className="h-4 w-4" />
            Recipes
          </DropdownMenuItem>
        </Link>
        <Link to="/account/refer">
          <DropdownMenuItem className="gap-2">
            <Gift className="h-4 w-4" />
            Refer & Earn
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="gap-2 text-red-600">
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function Navbar() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, wishlist, user, setUser, walletBalance } = useStore();

  const [selectedLocation, setSelectedLocation] = useState("Central Chennai, 600001");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Unified Alert Banner */}
      <UnifiedAlertBanner />

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg"
                alt="BayHawk Logo"
                className="h-8 w-auto"
              />
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
                    <span className="font-medium">{selectedLocation}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Select Chennai Area
                  </div>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("Central Chennai, 600001")}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">Central Hub</span>
                    <span className="text-xs text-muted-foreground">Pincode: 600001</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("East Chennai, 600041")}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">East Chennai</span>
                    <span className="text-xs text-muted-foreground">Pincode: 600041</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("West Chennai, 600026")}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">West Chennai</span>
                    <span className="text-xs text-muted-foreground">Pincode: 600026</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("North Chennai, 600050")}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">North Chennai</span>
                    <span className="text-xs text-muted-foreground">Pincode: 600050</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedLocation("South Chennai, 600113")}
                    className="flex flex-col items-start py-2"
                  >
                    <span className="font-medium">South Chennai</span>
                    <span className="text-xs text-muted-foreground">Pincode: 600113</span>
                  </DropdownMenuItem>
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
            <CategoriesDropdown />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
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

              <Link to="/account/wallet" className="hidden sm:flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Wallet className="h-5 w-5" />
                </Button>
                <span className="text-sm font-semibold">₹{walletBalance}</span>
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

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
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

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
            <div className="p-4 pb-20">
              {/* Categories with Images */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categoriesData.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={cat.image || "/placeholder.svg"}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex-1">
                        {cat.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 my-4" />

              {/* Quick Links */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/recipes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                  >
                    <ChefHat className="h-4 w-4" />
                    <span>Recipes</span>
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Contact</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 my-4" />

              {/* My Account */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  My Account
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/account/wallet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>My Wallet</span>
                  </Link>

                  <Link
                    to="/account/favorites"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>

                  <Link
                    to="/track-order"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
                  >
                    <Package className="h-4 w-4" />
                    <span>Track Order</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
