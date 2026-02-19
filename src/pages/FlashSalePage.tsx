import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Clock, Zap, Check, Crown, AlertCircle, ShoppingCart, Star, Minus, Plus, Weight, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { useStore, Product } from '@/lib/store'
import { cn } from "@/lib/utils"

// Mock Data
const COUPONS = [
  {
    id: 'c1',
    code: 'FLASH50',
    discount: '50% OFF',
    description: 'Get 50% off on your first order. Max discount ₹200.',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
    iconColor: 'text-orange-500'
  },
  {
    id: 'c2',
    code: 'SEAFOOD20',
    discount: '20% OFF',
    description: 'Flat 20% off on all seafood items. No min order.',
    color: 'bg-blue-50 text-[#0A4D8C] border-blue-200',
    iconColor: 'text-[#0A4D8C]'
  },
  {
    id: 'c3',
    code: 'WEEKEND100',
    discount: '₹100 OFF',
    description: 'Save ₹100 on orders above ₹500. Valid this weekend only.',
    color: 'bg-green-50 text-green-700 border-green-200',
    iconColor: 'text-green-600'
  },
]

const FLASH_PRODUCTS = [
  {
    id: 'p1',
    name: 'Fresh Tiger Prawns',
    nameTamil: 'Eral',
    image: '/tiger-prawns.png',
    originalPrice: 650,
    salePrice: 450,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 2).getTime(), // 2 hours from now
    totalStock: 50,
    soldStock: 42,
    isMemberOnly: false,
    weight: '500g',
    pieces: '20-25',
    serves: '3-4',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'p2',
    name: 'Premium Pomfret (Large)',
    nameTamil: 'Vavval',
    image: '/fresh-pomfret-fish.jpg',
    originalPrice: 1200,
    salePrice: 899,
    endTime: new Date(Date.now() + 1000 * 60 * 45).getTime(), // 45 mins from now
    totalStock: 20,
    soldStock: 18,
    isMemberOnly: false,
    weight: '1kg',
    pieces: '2-3',
    serves: '4-5',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'p3',
    name: 'King Fish Steaks',
    nameTamil: 'Surmai',
    image: '/king-fish-steaks.jpg',
    originalPrice: 1500,
    salePrice: 1100,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).getTime(), // 5 hours
    totalStock: 30,
    soldStock: 5,
    isMemberOnly: true,
    weight: '500g',
    pieces: '3-4',
    serves: '2-3',
    rating: 4.7,
    reviews: 56
  },
  {
    id: 'p4',
    name: 'Jumbo Crab (Live)',
    nameTamil: 'Nandu',
    image: '/fresh-crab.jpg',
    originalPrice: 900,
    salePrice: 750,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 12).getTime(), // 12 hours
    totalStock: 15,
    soldStock: 12,
    isMemberOnly: true,
    weight: '1kg',
    pieces: '2-3',
    serves: '3-4',
    rating: 4.6,
    reviews: 42
  },
  {
    id: 'p5',
    name: 'Fresh Prawns',
    nameTamil: 'Eral',
    image: '/prawns.jpg',
    originalPrice: 550,
    salePrice: 399,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 3).getTime(), // 3 hours
    totalStock: 40,
    soldStock: 25,
    isMemberOnly: false,
    weight: '500g',
    pieces: '15-20',
    serves: '2-3',
    rating: 4.5,
    reviews: 78
  },
  {
    id: 'p6',
    name: 'Rohu Fish',
    nameTamil: 'Rohu',
    image: '/rohu-fish.jpg',
    originalPrice: 400,
    salePrice: 299,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 6).getTime(), // 6 hours
    totalStock: 35,
    soldStock: 20,
    isMemberOnly: false,
    weight: '1kg',
    pieces: '1',
    serves: '4-5',
    rating: 4.4,
    reviews: 92
  },
]

const MEMBERSHIP_BENEFITS = [
  'No surge charges on raining or peak days.',
  'Free delivery from ₹349 (members) | Delivery charges applicable (non-members).',
  '₹300 Welcome cash in your Wallet',
  '10% extra bonus on premium pomfret, tiger prawns, lobster and more.',
  'Priority order processing & delivery.',
  'Surprises on special occasions.',
]

export default function FlashSalePage() {
  const { toast } = useToast()
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false)
  const [mainTimer, setMainTimer] = useState<string>('')

  // Main countdown for earliest ending product
  useEffect(() => {
    const interval = setInterval(() => {
      const earliestProduct = FLASH_PRODUCTS.reduce((prev, curr) => 
        prev.endTime < curr.endTime ? prev : curr
      )
      const now = new Date().getTime()
      const distance = earliestProduct.endTime - now

      if (distance < 0) {
        setMainTimer('Sale Ended')
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)
        setMainTimer(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Check for urgency popup logic (simulated)
  useEffect(() => {
    const checkTimer = setInterval(() => {
        // Logic: if any product has < 5 mins left, show popup (simulated once)
        const hasUrgentProduct = FLASH_PRODUCTS.some(p => {
            const timeLeft = p.endTime - Date.now()
            return timeLeft > 0 && timeLeft < 5 * 60 * 1000
        })
        
        // Using a session storage flag to prevent annoying popup on every refresh in real app
        // For this demo, we'll just show it if condition met and haven't shown yet
        if (hasUrgentProduct && !sessionStorage.getItem('urgencyPopupShown')) {
            setShowUrgencyPopup(true)
            sessionStorage.setItem('urgencyPopupShown', 'true')
        }
    }, 10000) // check every 10 sec

    return () => clearInterval(checkTimer)
  }, [])

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: `Coupon code ${code} copied to clipboard.`,
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1">
        
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
            <div className="container mx-auto px-4 text-center space-y-4">
                <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
                    <Zap className="h-6 w-6 text-red-600 fill-red-600 animate-pulse" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Flash Sale <span className="text-[#0A4D8C]">Extravaganza</span>
                </h1>
                
                {/* Main Countdown Timer */}
                <div className="max-w-md mx-auto mt-6">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Clock className="h-5 w-5 animate-pulse" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Next Deal Ends In</span>
                        </div>
                        <div className="text-5xl font-bold tabular-nums tracking-wider text-center">
                            {mainTimer}
                        </div>
                        <div className="flex justify-center gap-8 mt-3 text-xs font-medium opacity-90">
                            <span>HOURS</span>
                            <span>MINS</span>
                            <span>SECS</span>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-6">
                    Grab these limited-time offers before they are gone! 
                    <span className="block text-sm mt-3 text-slate-500 italic bg-white/50 inline-block px-4 py-1 rounded-full border border-slate-200">
                        *Multiple coupons cannot be clubbed. Flash sale items not eligible for other coupons.
                    </span>
                </p>
            </div>
        </section>

        <div className="container mx-auto px-4 py-8 space-y-16">

            {/* Type 1: Discount Coupons */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        Exclusive <span className="text-[#0A4D8C]">Coupons</span>
                    </h2>
                    <p className="text-gray-600">Extra savings for your seafood cravings</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {COUPONS.map((coupon) => (
                        <div key={coupon.id} className={`group relative bg-white rounded-xl border-2 overflow-hidden hover:shadow-lg transition-all duration-300 ${coupon.color.replace('bg-', 'border-').split(' ')[0]} border-opacity-50 hover:border-opacity-100`}>
                            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                                <Zap className={`h-24 w-24 ${coupon.iconColor}`} />
                            </div>
                            
                            <div className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className={`text-2xl font-bold ${coupon.iconColor}`}>{coupon.discount}</h3>
                                        <Badge variant="outline" className="mt-1 bg-white/80 backdrop-blur-sm">Coupon</Badge>
                                    </div>
                                </div>
                                
                                <p className="text-slate-600 text-sm mb-6 min-h-[40px] leading-relaxed">
                                    {coupon.description}
                                </p>

                                <div className="flex w-full gap-2 items-center bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
                                    <div className="flex-1 text-center font-mono font-bold text-slate-800 tracking-wider text-lg border-r border-dashed border-slate-300 pr-2">
                                        {coupon.code}
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => copyToClipboard(coupon.code)}
                                        className="hover:bg-slate-50 text-slate-600 hover:text-[#0A4D8C] font-medium"
                                    >
                                        <Copy className="h-4 w-4 mr-1.5" />
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Type 2: Product Flash Sales */}
            <section>
                 <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            Limited Time <span className="text-[#0A4D8C]">Deals</span>
                        </h2>
                        <p className="text-gray-600">Fresh catch at unbeatable prices</p>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-100 text-red-700 font-medium text-sm animate-pulse">
                        <Clock className="h-4 w-4" />
                        <span>Ends soon! Hurry up</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {FLASH_PRODUCTS.filter(p => !p.isMemberOnly).map((product) => (
                        <ProductFlashCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Type 3: Member Only Flash Sales */}
            <section className="relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-3xl -z-10" />
                 <div className="py-8 md:py-12 px-4 md:px-8 rounded-3xl border border-indigo-50">
                    <div className="flex flex-col items-center justify-center mb-10 text-center">
                        <div className="bg-indigo-100 p-3 rounded-full mb-4">
                            <Crown className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-indigo-950 mb-2">
                            Member <span className="text-indigo-600">Exclusive</span> Deals
                        </h2>
                        <p className="text-indigo-600/80 max-w-lg">
                            Premium selection reserved for our BayHawk Gold members. 
                            <span className="font-semibold ml-1">Join today to access!</span>
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {FLASH_PRODUCTS.filter(p => p.isMemberOnly).map((product) => (
                            <ProductFlashCard key={product.id} product={product} isMemberLock={true} />
                        ))}
                    </div>
                 </div>
            </section>

             {/* Type 4: Membership Subscription */}
            <section className="py-8">
                <Card className="overflow-hidden border-2 border-yellow-400 shadow-2xl bg-white relative max-w-5xl mx-auto rounded-2xl">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl z-20 shadow-sm">
                        BEST VALUE
                    </div>
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-8 md:p-12 bg-[#0A1A2F] text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
                             {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                            
                            <div className="relative z-10">
                                <Crown className="h-16 w-16 text-yellow-400 mb-6 mx-auto drop-shadow-lg" />
                                <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">BayHawk <span className="text-yellow-400">Gold</span></h3>
                                <p className="text-blue-200 mb-8 text-lg">Unlock premium benefits and savings</p>
                                
                                <div className="mb-8">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-2xl text-yellow-400 font-bold">₹</span>
                                        <span className="text-6xl font-extrabold text-white tracking-tighter">1299</span>
                                        <span className="text-lg text-blue-300 font-medium">/year</span>
                                    </div>
                                    <p className="text-sm text-blue-300/80 mt-2 font-medium bg-white/10 px-3 py-1 rounded-full inline-block">Just ₹108/month</p>
                                </div>
                                
                                <Link to="/membership" className="w-full max-w-xs block">
                                    <Button size="lg" className="w-full bg-yellow-400 text-yellow-950 hover:bg-yellow-500 font-bold text-lg h-12 shadow-lg shadow-yellow-400/20">
                                        Join Membership
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-8 md:p-12 bg-white flex flex-col justify-center">
                            <h4 className="text-xl md:text-2xl font-bold mb-8 text-slate-800 flex items-center gap-2">
                                <span className="bg-green-100 p-1.5 rounded-lg"><Check className="h-5 w-5 text-green-700" /></span>
                                Membership Privileges
                            </h4>
                            <ul className="space-y-5">
                                {MEMBERSHIP_BENEFITS.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-4 group">
                                        <div className="mt-1 bg-green-50 rounded-full p-1 group-hover:bg-green-100 transition-colors shrink-0">
                                            <Check className="h-3.5 w-3.5 text-green-600" />
                                        </div>
                                        <span className="text-slate-600 text-sm md:text-base leading-relaxed group-hover:text-slate-900 transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>
            </section>

        </div>

      </main>

      {/* Urgency Popup */}
      <Dialog open={showUrgencyPopup} onOpenChange={setShowUrgencyPopup}>
        <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 text-xl">
                <AlertCircle className="h-6 w-6" />
                Hurry Up! Deals Ending Soon
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
                Some flash sales are ending in less than 5 minutes. Secure your products now before they go out of stock!
            </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
                <Button onClick={() => setShowUrgencyPopup(false)} className="bg-red-600 hover:bg-red-700 text-white">
                    Got it
                </Button>
            </div>
        </DialogContent>
        </Dialog>

        <Footer />
    </div>
  )
}

// Sub-component for Product Card with Timer & Stock - Redesigned to match ProductCard.tsx
function ProductFlashCard({ product, isMemberLock = false }: { product: any, isMemberLock?: boolean }) {
    const [timeLeft, setTimeLeft] = useState<string>('')
    const [isExpired, setIsExpired] = useState(false)
    const { addToCart, cart, updateQuantity, removeFromCart } = useStore()
    const { toast } = useToast()

    // Calculate Quantity from Cart
    const cartItem = cart.find(item => item.id === product.id)
    const quantity = cartItem?.quantity || 0

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = product.endTime - now

            if (distance < 0) {
                clearInterval(interval)
                setTimeLeft('EXPIRED')
                setIsExpired(true)
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((distance % (1000 * 60)) / 1000)
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [product.endTime])

    const stockPercentage = Math.round(((product.totalStock - product.soldStock) / product.totalStock) * 100)
    const isLowStock = stockPercentage < 20

    const mapToStoreProduct = (): Product => ({
        id: product.id,
        name: product.name,
        nameTamil: product.nameTamil,
        price: product.salePrice,
        originalPrice: product.originalPrice,
        image: product.image,
        category: 'Flash Sale', 
        rating: product.rating, 
        reviews: product.reviews, 
        weight: product.weight, 
        pieces: product.pieces,
        serves: product.serves,
        description: 'Flash sale item',
        inStock: true,
    })

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isMemberLock || isExpired) return; 
        addToCart(mapToStoreProduct(), product.weight)
        toast({
            title: "Added to Cart",
            description: `${product.name} added to your cart at flash sale price!`,
        })
    }
    
    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (cartItem) {
          updateQuantity(product.id, quantity + 1)
        }
    }
    
    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (cartItem) {
          if (quantity > 1) {
            updateQuantity(product.id, quantity - 1)
          } else {
            removeFromCart(product.id)
          }
        }
    }

    return (
        <div 
            className={cn(
                "group relative bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-[#0A4D8C] h-full flex flex-col",
                (isExpired) && "opacity-60 grayscale"
            )}
        >
            {/* Image Area */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.src = '/placeholder.svg';
                    }}
                />
                
                {/* Discount Badge */}
                <div className="absolute top-2 right-2 z-10">
                    <Badge className="bg-red-600 hover:bg-red-700 font-bold animate-pulse shadow-sm">
                         {Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)}% OFF
                    </Badge>
                </div>

                {/* Member Lock Overlay */}
                {isMemberLock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px] z-20">
                         <div className="bg-white/95 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl border-2 border-yellow-400 text-slate-800 transform hover:scale-105 transition-transform">
                            <Crown className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                            Members Only
                         </div>
                    </div>
                )}
            </div>
            
            {/* Content Area */}
            <div className="p-2.5 sm:p-3 flex flex-col flex-1">
                {/* Flash Sale Timer - Enhanced */}
                <div className="mb-2 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-2 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-[10px] text-red-600 font-semibold">
                        <Clock className="h-3 w-3 animate-pulse" />
                        <span>ENDS IN</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-red-700 tabular-nums tracking-wide">
                        {timeLeft}
                    </div>
                </div>

                {/* Title & Rating */}
                <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                        {product.nameTamil && (
                            <p className="text-[10px] sm:text-xs text-sky-500 font-semibold mt-0.5">{product.nameTamil}</p>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700">{product.rating}</span>
                    </div>
                </div>

                {/* Product Specs */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 border border-gray-200 rounded-md p-1.5 sm:p-2 bg-slate-50">
                    <div className="flex items-center gap-1 flex-1">
                        <Weight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
                        <span className="text-[10px] sm:text-xs text-gray-700 font-medium">{product.weight}</span>
                    </div>
                    {product.pieces && (
                        <>
                            <div className="w-px h-3 bg-gray-300"></div>
                            <div className="flex items-center gap-1 flex-1">
                                <Package className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-gray-500" />
                                <span className="text-[10px] sm:text-xs text-gray-700 font-medium">{product.pieces}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Stock Progress - Enhanced */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between items-center text-[10px] font-medium">
                         <span className={`${isLowStock ? 'text-red-600 font-bold flex items-center gap-1' : 'text-slate-600'}`}>
                            {isLowStock && <AlertCircle className="h-3 w-3" />}
                            {isLowStock ? 'Hurry! Only few left' : `${product.totalStock - product.soldStock} left in stock`}
                         </span>
                         <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{product.soldStock} sold</span>
                    </div>
                    <div className="relative">
                        <Progress 
                            value={100 - stockPercentage} 
                            className={`h-2 bg-slate-200 ${isLowStock ? "[&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600" : "[&>div]:bg-gradient-to-r [&>div]:from-[#0A4D8C] [&>div]:to-blue-600"}`} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] font-bold text-white drop-shadow-md">{stockPercentage}% SOLD</span>
                        </div>
                    </div>
                </div>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Price and Action */}
                <div className="flex items-end justify-between gap-2 mt-auto pt-2 border-t border-gray-100">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-base sm:text-lg font-bold text-[#0A4D8C]">₹{product.salePrice}</span>
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                        </div>
                    </div>

                    {isMemberLock ? (
                        <Link to="/membership">
                            <Button size="sm" className="h-7 sm:h-8 px-2 sm:px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] sm:text-xs font-medium rounded-md shadow-sm">
                                <Crown className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                <span className="hidden sm:inline">Join</span>
                                <span className="sm:hidden">Join</span>
                            </Button>
                        </Link>
                    ) : isExpired ? (
                         <Button size="sm" disabled className="h-7 sm:h-8 px-2 sm:px-3 bg-gray-300 text-gray-500 text-[10px] sm:text-xs font-medium rounded-md">
                            Ended
                        </Button>
                    ) : (
                         quantity > 0 ? (
                            <div className="flex items-center gap-0.5 sm:gap-1 bg-[#0A4D8C] rounded flex-shrink-0" onClick={(e) => e.preventDefault()}>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-l"
                                    onClick={handleDecrement}
                                >
                                    <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </Button>
                                <span className="text-[10px] sm:text-xs font-bold text-white px-1 min-w-[16px] sm:min-w-[20px] text-center">{quantity}</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-white hover:bg-[#0A4D8C]/80 hover:text-white rounded-r"
                                    onClick={handleIncrement}
                                >
                                    <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="h-7 sm:h-8 px-2 sm:px-3 bg-[#0A4D8C] hover:bg-[#0A4D8C]/90 text-white text-[10px] sm:text-xs font-medium rounded-md flex-shrink-0 shadow-sm"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                <span className="hidden sm:inline">Add</span>
                                <span className="sm:hidden">Add</span>
                            </Button>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
