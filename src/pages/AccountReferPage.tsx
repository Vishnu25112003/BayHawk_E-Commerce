import { useState } from "react"
import { Link } from "react-router-dom"
import { Users, Copy, Share2, ChevronRight, Check } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const referralHistory = [
  { name: "Rahul M.", date: "2025-01-15", status: "Completed", reward: 100 },
  { name: "Priya S.", date: "2025-01-10", status: "Pending", reward: 100 },
]

export default function AccountReferPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "FRESH2025"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    navigator.share?.({
      title: "FreshCatch Referral",
      text: `Use my referral code ${referralCode} to get ₹100 off on your first order!`,
      url: "https://freshcatch.com",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Refer & Earn</span>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Hero Section with Image */}
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src="/images/referpage.png" 
                  alt="Refer Friends" 
                  className="w-full h-auto object-cover"
                />

                {/* Referral Code Section - Overlaid on bottom 20% of image */}
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 md:px-6 md:pb-6 text-center flex flex-col items-center gap-2 md:gap-3">
                  <div className="bg-white/80 backdrop-blur-md rounded-lg px-2.5 py-1.5 md:px-4 md:py-2.5 border-2 border-dashed border-gray-400 inline-flex items-center gap-1.5 md:gap-2">
                    <span className="text-sm md:text-lg font-bold font-mono text-gray-900">{referralCode}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 md:h-7 md:w-7"
                      onClick={handleCopy}
                    >
                      {copied ? <Check className="h-3 w-3 md:h-3.5 md:w-3.5" /> : <Copy className="h-3 w-3 md:h-3.5 md:w-3.5" />}
                    </Button>
                  </div>

                  <Button
                    size="sm"
                    className="px-4 py-1.5 h-8 md:px-6 md:py-2 md:h-9 rounded-full shadow-lg text-xs md:text-sm"
                    onClick={handleShare}
                  >
                    <Share2 className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1.5 md:mr-2" />
                    Share with Friends
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Total Referrals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">₹100</p>
                <p className="text-sm text-muted-foreground">Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">₹100</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
          </div>

          {/* Referral History */}
          <Card>
            <CardHeader>
              <CardTitle>Referral History</CardTitle>
            </CardHeader>
            <CardContent>
              {referralHistory.length > 0 ? (
                <div className="space-y-4">
                  {referralHistory.map((ref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{ref.name}</p>
                          <p className="text-sm text-muted-foreground">{new Date(ref.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+₹{ref.reward}</p>
                        <p className="text-sm text-muted-foreground">{ref.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No referrals yet. Start sharing your code!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
