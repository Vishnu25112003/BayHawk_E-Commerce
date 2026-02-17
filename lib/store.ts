import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ProductVariant {
  id: string
  name: string
  price: number
  description?: string
  inStock?: boolean
}

export interface Nutrition {
  calories: number
  protein: number
  fat: number
  omega3?: number
}

export interface Product {
  id: string
  name: string
  nameTamil?: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  weight: string
  pieces?: string
  serves?: string
  description: string
  inStock: boolean
  badge?: string
  sameDayDelivery?: boolean
  variants?: ProductVariant[]
  nutrition?: Nutrition
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant: string
}

export interface WishlistItem extends Product {}

export interface Reward {
  id: string;
  icon: string;
  title: string;
  points: string;
  description: string;
  isScratched: boolean;
  type: 'Coupon' | 'Cashback';
  value: string;
  expiryDate: string;
  rewardType: 'Primary' | 'Secondary' | 'Bonus' | 'Seasonal' | 'Daily';
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
}

interface StoreState {
  cart: CartItem[]
  wishlist: WishlistItem[]
  user: { email?: string; name?: string; profileImage?: string; isPremium?: boolean } | null
  walletBalance: number
  collectedRewards: Reward[]
  orders: Order[]
  processedOrderIds: string[]
  lastDailyClaim: string | null
  addToCart: (product: Product, variant: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  setUser: (user: { email?: string; name?: string; profileImage?: string; isPremium?: boolean } | null) => void
  addWalletBalance: (amount: number) => void
  addReward: (reward: Reward) => void
  updateReward: (rewardId: string, updates: Partial<Reward>) => void
  addOrder: (order: Order) => void
  markOrderAsProcessed: (orderId: string) => void
  setLastDailyClaim: (date: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      walletBalance: 0,
      collectedRewards: [],
      orders: [],
      processedOrderIds: [],
      lastDailyClaim: null,
      addToCart: (product, variant) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id && item.selectedVariant === variant)
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedVariant === variant
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1, selectedVariant: variant }],
          }
        })
      },
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        }))
      },
      clearCart: () => set({ cart: [] }),
      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) {
            return state
          }
          return { wishlist: [...state.wishlist, product] }
        })
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        }))
      },
      isInWishlist: (productId) => {
        return get().wishlist.some((item) => item.id === productId)
      },
      setUser: (partialUser) =>
        set((state) => ({ user: partialUser ? { ...state.user, ...partialUser } : null })),
      addWalletBalance: (amount) => {
        set((state) => ({ walletBalance: state.walletBalance + amount }))
      },
      addReward: (reward) => {
        set((state) => ({
          collectedRewards: [reward, ...state.collectedRewards],
        }))
      },
      updateReward: (rewardId, updates) => {
        set((state) => ({
          collectedRewards: state.collectedRewards.map((r) =>
            r.id === rewardId ? { ...r, ...updates } : r
          ),
        }))
      },
      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },
      markOrderAsProcessed: (orderId) => {
        set((state) => ({
          processedOrderIds: [...state.processedOrderIds, orderId],
        }))
      },
      setLastDailyClaim: (date) => {
        set({ lastDailyClaim: date })
      }
    }),
    {
      name: "freshcatch-store",
    },
  ),
)
