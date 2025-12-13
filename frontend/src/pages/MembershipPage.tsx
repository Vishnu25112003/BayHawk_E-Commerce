import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, Crown, Zap, Calendar, Truck, Gift, Star } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { notification } from "@/lib/notification"

const plans = [
  {
    id: "monthly",
    name: "Monthly Premium",
    price: 199,
    period: "month",
    popular: false,
    features: [
      "Schedule delivery up to 1 month",
      "Free delivery on all orders",
      "Priority customer support",
      "Exclusive member discounts",
      "Early access to new products",
      "Birthday special offers"
    ]
  },
  {
    id: "quarterly",
    name: "Quarterly Premium",
    price: 499,
    period: "3 months",
    popular: true,
    savings: "Save ₹98",
    features: [
      "All Monthly benefits",
      "Schedule delivery up to 3 months",
      "Extra 5% discount on all orders",
      "Free premium packaging",
      "Complimentary recipe book",
      "Quarterly surprise gifts"
    ]
  },
  {
    id: "yearly",
    name: "Yearly Premium",
    price: 1599,
    period: "year",
    popular: false,
    savings: "Save ₹789",
    features: [
      "All Quarterly benefits",
      "Schedule delivery up to 1 year",
      "Extra 10% discount on all orders",
      "Free express delivery",
      "Exclusive cooking masterclass",
      "Annual seafood hamper worth ₹2000"
    ]
  }
]

const benefits = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Flexible Scheduling",
    description: "Plan your meals ahead with advanced delivery scheduling"
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Delivery",
    description: "Enjoy free delivery on every single order, no minimum"
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Exclusive Offers",
    description: "Access member-only deals and seasonal promotions"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Priority Support",
    description: "Get faster response times from our support team"
  }
]

export default function MembershipPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("quarterly")

  const handleSubscribe = () => {
    // Navigate to payment or show payment modal
    const planName = plans.find(p => p.id === selectedPlan)?.name
    notification.success(`Subscribing to ${planName}. Redirecting to payment...`, "Subscription")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Membership</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0A4D8C] via-[#0d5fa3] to-[#0A4D8C] text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Crown className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-semibold">Premium Membership</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Upgrade to Premium
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Unlock exclusive benefits and enjoy the freshest seafood with premium perks
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Why Go Premium?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0A4D8C]/10 text-[#0A4D8C] mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative cursor-pointer transition-all hover:shadow-xl",
                    selectedPlan === plan.id && "border-2 border-[#0A4D8C] shadow-lg",
                    plan.popular && "md:scale-105"
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1">
                        <Zap className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <Badge variant="secondary" className="text-green-600">
                        {plan.savings}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={cn(
                        "w-full",
                        selectedPlan === plan.id
                          ? "bg-[#0A4D8C] hover:bg-[#083d6f]"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPlan(plan.id)
                        handleSubscribe()
                      }}
                    >
                      {selectedPlan === plan.id ? "Subscribe Now" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ or Additional Info */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our premium membership is designed to give you the best seafood shopping experience. 
              Cancel anytime, no questions asked.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate("/contact")}>
                Contact Support
              </Button>
              <Button onClick={() => navigate(-1)}>
                Back to Checkout
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
