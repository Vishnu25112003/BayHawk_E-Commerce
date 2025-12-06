import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { OfferBanners } from "@/components/home/offer-banners"
import { CategoryIcons } from "@/components/home/category-icons"
import { BestSellerProducts } from "@/components/home/best-seller-products"
import { ChatAndVideo } from "@/components/home/ChatAndVideo"
import { DualBanners } from "@/components/home/dual-banners"
import { PromoBanners } from "@/components/home/promo-banners"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { HealthBenefits } from "@/components/home/health-benefits"
import { FeaturedServices } from "@/components/home/featured-services"
import { FullWidthOffer } from "@/components/home/full-width-offer"
import { Testimonials } from "@/components/home/testimonials"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroCarousel />
        <OfferBanners />
        <CategoryIcons />
        <BestSellerProducts />
        <ChatAndVideo />
        <DualBanners />
        <PromoBanners />
        <WhyChooseUs />
        <HealthBenefits />
        <FeaturedServices />
        <FullWidthOffer />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
