import { Link } from "react-router-dom"
import { Crown, ChevronRight, Check, Truck, Percent, Gift, Star, Zap } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 0,
    period: "",
    description: "Free forever",
    features: ["Standard delivery", "Access to all products", "Email support"],
    current: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 99,
    period: "/month",
    description: "Best value for regular customers",
    features: [
      "Free delivery on all orders",
      "10% discount on all products",
      "Priority customer support",
      "Early access to new products",
      "Exclusive member-only deals",
    ],
    current: false,
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    price: 999,
    period: "/year",
    description: "Maximum savings for seafood lovers",
    features: [
      "Everything in Premium",
      "15% discount on all products",
      "Free express delivery",
      "Birthday special offers",
      "Exclusive recipes & cooking tips",
      "VIP customer support line",
    ],
    current: false,
  },
]

const benefits = [
  { icon: Truck, title: "Free Delivery", description: "Get free delivery on all orders" },
  { icon: Percent, title: "Exclusive Discounts", description: "Up to 15% off on all products" },
  { icon: Gift, title: "Special Offers", description: "Birthday specials & member-only deals" },
  { icon: Star, title: "Priority Access", description: "Early access to new products" },
  { icon: Zap, title: "Express Service", description: "Priority processing of your orders" },
]

export default function AccountMembershipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6 text-primary-foreground/80">
              <Link to="/account" className="hover:text-primary-foreground">
                Account
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>Membership</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <Crown className="h-12 w-12" />
              <div>
                <h1 className="text-3xl font-bold">FreshCatch Membership</h1>
                <p className="text-primary-foreground/80">Unlock exclusive benefits and save more</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Member Benefits</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {benefits.map((benefit) => (
                <Card key={benefit.title}>
                  <CardContent className="pt-6 text-center">
                    <benefit.icon className="h-10 w-10 mx-auto text-primary mb-3" />
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Plans */}
          <section>
            <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn("relative", plan.popular && "ring-2 ring-primary", plan.current && "bg-secondary/50")}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="flex items-center justify-center gap-2">
                      {plan.id === "gold" && <Crown className="h-5 w-5 text-yellow-500" />}
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price === 0 ? "Free" : `₹${plan.price}`}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Membership FAQs</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">How do I cancel my membership?</h3>
                  <p className="text-muted-foreground text-sm">
                    You can cancel anytime from your account settings. Your benefits will continue until the end of your
                    billing period.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, you can change your plan anytime. Upgrades take effect immediately, and downgrades apply from
                    the next billing cycle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Is my payment secure?</h3>
                  <p className="text-muted-foreground text-sm">
                    We use industry-standard encryption and partner with trusted payment providers to keep your
                    information safe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
