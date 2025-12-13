import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingElements } from "@/components/layout/floating-elements";
import { OfferPopup } from "@/components/layout/offer-popup";
import { FloatingVideoPlayer } from "@/components/layout/floating-video-player";
import { FloatingScratchCard } from "@/components/layout/floating-scratch-card";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ServiceCards } from "@/components/home/service-cards";
import { BestSellerProducts } from "@/components/home/best-seller-products";
import { DualBanners } from "@/components/home/dual-banners";
import { OfferBanners } from "@/components/home/offer-banners";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { HealthBenefitsSection } from "@/components/home/health-benefits-section";
import { CouponBanner } from "@/components/home/coupon-banner";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export default function HomePage() {
  const [isOnboardingActive, setIsOnboardingActive] = useState(false);

  useEffect(() => {
    const handleOnboardingChange = (event: CustomEvent) => {
      setIsOnboardingActive(event.detail.active);
    };

    window.addEventListener('onboardingActive', handleOnboardingChange as EventListener);

    return () => {
      window.removeEventListener('onboardingActive', handleOnboardingChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isOnboardingActive && <OfferPopup />}
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero Carousel */}
        <HeroCarousel />

        {/* 2. Service Cards (4 cards) */}
        <OfferBanners />

        {/* 3. Categories & Best Seller Products */}
        <BestSellerProducts />

        {/* 4. Two Offer Banners */}
        <DualBanners />

        {/* 5. Why Choose Us */}
        <WhyChooseUsSection />

        {/* 6. Best for your Health */}
        <HealthBenefitsSection />

        {/* 7. Featured Services */}
        <ServiceCards />

        {/* 8. Coupon Banner */}
        <CouponBanner />

        {/* 9. Testimonials */}
        <TestimonialsSection />
      </main>
      <Footer />
      <FloatingElements hasGiftCard={true} />
      {!isOnboardingActive && <FloatingVideoPlayer />}
      <FloatingScratchCard />
    </div>
  );
}
