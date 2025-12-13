import { useState } from "react"
import { Link } from "react-router-dom"
import { Users, Copy, Share2, ChevronRight, Gift, Check } from "lucide-react"
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
          {/* Hero Card */}
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground mb-6">
            <CardContent className="pt-6 text-center">
              <Gift className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Refer Friends & Earn ₹100</h1>
              <p className="text-primary-foreground/80 mb-6">
                Share your referral code with friends. When they order, you both get ₹100!
              </p>

              {/* Referral Code */}
              <div className="bg-primary-foreground/10 rounded-lg p-4 mb-4">
                <p className="text-sm text-primary-foreground/80 mb-2">Your Referral Code</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold font-mono">{referralCode}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={handleCopy}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share with Friends
              </Button>
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
