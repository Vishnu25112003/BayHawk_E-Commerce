import { Link } from "react-router-dom"
import { ChevronRight, Truck, Clock, MapPin, Thermometer, Package, HelpCircle } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const deliveryFeatures = [
  {
    icon: Clock,
    title: "52-Hour Freshness Promise",
    description: "From sea to your home in 52 hours or less",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Delivery",
    description: "Temperature-controlled logistics maintains freshness",
  },
  {
    icon: Package,
    title: "Insulated Packaging",
    description: "Eco-friendly packaging keeps products fresh",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your order in real-time",
  },
]

const deliverySlots = [
  { time: "7 AM - 10 AM", availability: "Available" },
  { time: "10 AM - 1 PM", availability: "Available" },
  { time: "1 PM - 4 PM", availability: "Limited" },
  { time: "4 PM - 7 PM", availability: "Available" },
  { time: "7 PM - 9 PM", availability: "Available" },
]

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Kochi",
  "Goa",
  "Vizag",
  "Mangalore",
  "Surat",
]

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "We deliver within 52 hours of the catch. For most metro cities, you can expect same-day or next-day delivery based on your chosen slot.",
  },
  {
    question: "What are the delivery charges?",
    answer: "Delivery is FREE on orders above ₹500. For orders below ₹500, a delivery fee of ₹40 applies.",
  },
  {
    question: "Can I change my delivery slot?",
    answer:
      "Yes, you can modify your delivery slot up to 2 hours before the scheduled delivery time from the Track Order page.",
  },
  {
    question: "What if I'm not home during delivery?",
    answer:
      "Our delivery partner will call you before arriving. You can also add delivery instructions or reschedule from the app.",
  },
  {
    question: "Do you deliver on weekends?",
    answer: "Yes, we deliver 7 days a week including Sundays and public holidays.",
  },
]

export default function HelpShippingPage() {
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
          <span className="font-medium">Shipping</span>
        </div>

        <h1 className="text-3xl font-bold mb-2">Shipping & Delivery</h1>
        <p className="text-muted-foreground mb-8">Everything you need to know about our delivery process</p>

        {/* Delivery Features */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Delivery Slots */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Available Delivery Slots</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {deliverySlots.map((slot, index) => (
                  <div key={index} className="p-4 bg-secondary rounded-lg text-center">
                    <p className="font-medium mb-2">{slot.time}</p>
                    <Badge variant={slot.availability === "Available" ? "default" : "secondary"}>
                      {slot.availability}
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                * Slot availability may vary based on your location and order time
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Service Areas */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Truck className="h-5 w-5" />
            We Deliver To
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {cities.map((city, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1 px-3">
                    {city}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-sm py-1 px-3">
                  + 10 more cities
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Enter your pincode at checkout to check if we deliver to your area
              </p>
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
