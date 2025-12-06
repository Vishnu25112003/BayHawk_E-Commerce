import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
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
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant: string
}

export interface WishlistItem extends Product {}

interface StoreState {
  cart: CartItem[]
  wishlist: WishlistItem[]
  user: { email: string; name: string } | null
  walletBalance: number
  addToCart: (product: Product, variant: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  setUser: (user: { email: string; name: string } | null) => void
  addWalletBalance: (amount: number) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      user: null,
      walletBalance: 0,
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
      setUser: (user) => set({ user }),
      addWalletBalance: (amount) => {
        set((state) => ({ walletBalance: state.walletBalance + amount }))
      },
    }),
    {
      name: "freshcatch-store",
    },
  ),
)
