import { Link } from "react-router-dom"
import { ChevronRight, CreditCard, Smartphone, Building2, Wallet, Banknote, Shield, HelpCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const paymentMethods = [
  {
    icon: Smartphone,
    title: "UPI",
    description: "Pay instantly using Google Pay, PhonePe, Paytm, or any UPI app",
    details: "Scan QR code or enter UPI ID for instant payment",
  },
  {
    icon: CreditCard,
    title: "Credit/Debit Cards",
    description: "All major cards accepted - Visa, Mastercard, RuPay, Amex",
    details: "Secure 3D authentication for all transactions",
  },
  {
    icon: Building2,
    title: "Net Banking",
    description: "Pay directly from your bank account",
    details: "50+ banks supported including SBI, HDFC, ICICI, Axis",
  },
  {
    icon: Wallet,
    title: "Mobile Wallets",
    description: "Use Paytm Wallet, Amazon Pay, Freecharge",
    details: "Quick checkout with saved wallet balance",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    details: "Available on orders up to ₹5000. ₹20 COD fee applies",
  },
]

const faqs = [
  {
    question: "Is it safe to save my card details?",
    answer:
      "Yes, we use industry-standard encryption and are PCI DSS compliant. Your card details are tokenized and stored securely by our payment partner Razorpay.",
  },
  {
    question: "Why was my payment declined?",
    answer:
      "Payments can be declined due to insufficient balance, incorrect card details, bank server issues, or security restrictions. Please try again or use a different payment method.",
  },
  {
    question: "Will I be charged if my order is cancelled?",
    answer:
      "No, if your order is cancelled before dispatch, the full amount will be refunded to your original payment method within 5-7 business days.",
  },
  {
    question: "Can I get a refund to a different account?",
    answer: "For security reasons, refunds are always processed to the original payment method used for the order.",
  },
  {
    question: "Is COD available for all locations?",
    answer:
      "COD is available in most serviceable areas. Availability is shown at checkout based on your delivery pincode.",
  },
]

export default function HelpPaymentsPage() {
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
          <span className="font-medium">Payments</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground mb-8">Learn about our secure payment options and policies</p>

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Accepted Payment Methods</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <p className="text-xs text-muted-foreground">{method.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Your Payments are Secure</h3>
                  <p className="text-muted-foreground">
                    All transactions are protected with 256-bit SSL encryption. We are PCI DSS compliant and use
                    Razorpay for secure payment processing. Your financial information is never stored on our servers.
                  </p>
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
