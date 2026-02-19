import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { LoadingScreen } from '@/components/layout/loading-screen'
import { OnboardingScreens } from '@/components/onboarding/onboarding-screens'
import { Toaster } from '@/components/ui/toaster'
import { ScrollToTop } from '@/components/scroll-to-top'

// Pages
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import AccountPage from './pages/AccountPage'
import AccountOrdersPage from './pages/AccountOrdersPage'
import AccountFavoritesPage from './pages/AccountFavoritesPage'
import AccountAddressesPage from './pages/AccountAddressesPage'
import AccountSettingsPage from './pages/AccountSettingsPage'
import AccountMembershipPage from './pages/AccountMembershipPage'
import AccountReferPage from './pages/AccountReferPage'
import AccountFrequentOrdersPage from './pages/AccountFrequentOrdersPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import RecipesPage from './pages/RecipesPage'
import SearchPage from './pages/SearchPage'
import CareersPage from './pages/CareersPage'
import StoriesPage from './pages/StoriesPage'
import TrackOrderPage from './pages/TrackOrderPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import HelpPaymentsPage from './pages/HelpPaymentsPage'
import HelpReturnsPage from './pages/HelpReturnsPage'
import HelpShippingPage from './pages/HelpShippingPage'
import MembershipPage from './pages/MembershipPage'
import RewardPage from './pages/RewardPage'
import FlashSalePage from './pages/FlashSalePage'

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <ScrollToTop />
      <LoadingScreen />
      <OnboardingScreens />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<AccountOrdersPage />} />
        <Route path="/account/favorites" element={<AccountFavoritesPage />} />
        <Route path="/account/addresses" element={<AccountAddressesPage />} />
        <Route path="/account/settings" element={<AccountSettingsPage />} />
        <Route path="/account/membership" element={<AccountMembershipPage />} />
        <Route path="/account/refer" element={<AccountReferPage />} />
        <Route path="/account/frequent-orders" element={<AccountFrequentOrdersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/help/payments" element={<HelpPaymentsPage />} />
        <Route path="/help/returns" element={<HelpReturnsPage />} />
        <Route path="/help/shipping" element={<HelpShippingPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/account/rewards" element={<RewardPage />} />
        <Route path="/flash-sale" element={<FlashSalePage />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}

export default App

