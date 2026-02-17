import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import RewardSystem from "@/components/reward/RewardSystem"

export default function RewardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-[#f8f9fa]">
        <RewardSystem />
      </main>
      <Footer />
    </div>
  )
}
