import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import * as Icons from "lucide-react"
import { Link } from "react-router-dom"

export default function RewardPage() {
  const collectedRewards = useStore((state) => state.collectedRewards)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">FreshCatch Rewards</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your collected rewards.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {collectedRewards.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {collectedRewards.map((reward, index) => {
                  const IconComponent = Icons[reward.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                          <CardTitle>{reward.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold mb-2">{reward.points} <span className="text-lg font-normal text-muted-foreground">Points</span></p>
                        <p className="text-muted-foreground mb-4">{reward.description}</p>
                        <Button className="w-full">Redeem</Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">No Rewards Yet</h2>
                <p className="text-muted-foreground mb-8">
                  You haven't collected any rewards yet. Go to the home page to collect some!
                </p>
                <Link to="/">
                  <Button>Go to Home</Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
