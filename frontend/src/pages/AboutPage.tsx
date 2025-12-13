import { Link } from "react-router-dom"
import { ArrowRight, Users, Award, Truck, Shield } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "25+", label: "Cities Served" },
  { value: "52hrs", label: "Delivery Promise" },
]

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "Every product undergoes rigorous quality checks to ensure freshness and safety.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We go above and beyond to delight you.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "From sea to your home in 52 hours. Our cold chain ensures peak freshness.",
  },
  {
    icon: Award,
    title: "Sustainability",
    description: "Responsibly sourced seafood that supports local fishing communities.",
  },
]

const team = [
  { name: "Rajesh Kumar", role: "Founder & CEO", image: "/professional-man.jpg" },
  { name: "Priya Sharma", role: "Head of Operations", image: "/professional-woman-diverse.png" },
  { name: "Amit Patel", role: "Quality Director", image: "/indian-businessman.png" },
]

export default function AboutPage() {
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
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About FreshCatch</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We are on a mission to bring the freshest seafood from the ocean to your table, while supporting
                sustainable fishing practices and local communities.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    FreshCatch was born from a simple idea: everyone deserves access to fresh, high-quality seafood
                    without the hassle of visiting crowded markets.
                  </p>
                  <p>
                    Founded in 2020, we started with a small team of seafood enthusiasts who were frustrated with the
                    inconsistent quality and limited variety available in local markets.
                  </p>
                  <p>
                    Today, we serve over 50,000 customers across 25+ cities, delivering restaurant-quality seafood
                    straight to their doorsteps. Our cold chain logistics ensure that every product reaches you at peak
                    freshness.
                  </p>
                </div>
                <Link to="/products">
                  <Button className="mt-6 gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                <img src="/fresh-seafood-market.jpg" alt="Fresh seafood" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-card p-6 rounded-xl border border-border text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
                    <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the FreshCatch Family</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Experience the difference of truly fresh seafood. Order now and taste the ocean.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="secondary" size="lg">
                  Start Shopping
                </Button>
              </Link>
              <Link to="/careers">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Join Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
