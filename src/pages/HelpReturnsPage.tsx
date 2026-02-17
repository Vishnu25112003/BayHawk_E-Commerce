import { Link } from "react-router-dom"
import { ChevronRight, RotateCcw, Clock, CheckCircle, XCircle, AlertTriangle, HelpCircle, Phone } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const returnPolicy = [
  {
    icon: Clock,
    title: "Report Within 2 Hours",
    description: "Contact us within 2 hours of delivery for any quality issues",
    color: "text-[#0A4D8C]",
    bgColor: "bg-[#0A4D8C]/10",
  },
  {
    icon: CheckCircle,
    title: "Full Refund or Replacement",
    description: "Get 100% refund or fresh replacement for quality issues",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: RotateCcw,
    title: "5-7 Days Refund",
    description: "Refunds processed within 5-7 business days",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const eligibleReasons = [
  "Product quality not as expected",
  "Wrong item delivered",
  "Missing items from order",
  "Damaged during delivery",
  "Product not fresh",
]

const nonEligibleReasons = [
  "Change of mind after delivery",
  "Incorrect address provided",
  "Delay in reporting (beyond 2 hours)",
  "Product consumed before reporting",
  "Natural variation in seafood appearance",
]

const faqs = [
  {
    question: "How do I request a return or refund?",
    answer:
      "Contact our customer support within 2 hours of delivery via the app, website, or call us. Share photos of the issue for faster resolution.",
  },
  {
    question: "How long does the refund take?",
    answer:
      "Refunds are processed within 24 hours of approval and credited to your original payment method in 5-7 business days. Wallet refunds are instant.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel for free before the order is dispatched. Cancellation after dispatch may incur charges based on preparation status.",
  },
  {
    question: "What if only part of my order has issues?",
    answer: "We will process a partial refund or replacement for the specific items with quality issues.",
  },
  {
    question: "Do I need to return the product?",
    answer:
      "For perishable goods, we typically don't require returns. Just share clear photos of the issue for verification.",
  },
]

export default function HelpReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link to="/contact" className="text-muted-foreground hover:text-foreground">
            Help
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Cancellation & Returns</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Cancellation & Returns</h1>
        <p className="text-muted-foreground mb-8">Our hassle-free return and refund policy</p>

        {/* Policy Overview */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-3 gap-4">
            {returnPolicy.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 rounded-full ${item.bgColor} flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Eligible */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Eligible for Return/Refund
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {eligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Not Eligible */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-5 w-5" />
                  Not Eligible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {nonEligibleReasons.map((reason, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Important Note */}
        <section className="mb-12">
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Important</h3>
                  <p className="text-sm text-muted-foreground">
                    Please inspect your order upon delivery. We recommend checking the quality before the delivery
                    person leaves. This helps in faster resolution of any issues. Always take photos/videos if you
                    notice any problems.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact for Returns */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Need to Request a Return?</h3>
                  <p className="text-muted-foreground">Contact our support team for immediate assistance</p>
                </div>
                <div className="flex gap-2">
                  <Link to="/contact">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                  <Link to="/account/orders">
                    <Button>View My Orders</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  )
}
