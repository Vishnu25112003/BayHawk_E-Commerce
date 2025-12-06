import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductSection } from "@/components/ProductSection";
import { Footer } from "@/components/Footer";
import SeafoodWebsite from "@/components/SeafoodWebsite";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProductSection />
      <SeafoodWebsite />
      {/* <Footer /> */}
    </main>
  );
}
