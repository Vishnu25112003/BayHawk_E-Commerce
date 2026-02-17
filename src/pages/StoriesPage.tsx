import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const stories = [
  {
    id: "1",
    title: "From the Coast of Kerala: How We Source Our Prawns",
    excerpt: "Discover the journey of our premium prawns from the backwaters of Kerala to your kitchen.",
    image: "/kerala-fishermen-boat.jpg",
    category: "Sourcing",
    date: "Jan 15, 2025",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "Meet Ramesh: A Third-Generation Fisherman",
    excerpt: "The inspiring story of Ramesh and his family who have been fishing in the Arabian Sea for generations.",
    image: "/indian-fisherman-portrait.jpg",
    category: "People",
    date: "Jan 10, 2025",
    readTime: "4 min read",
  },
  {
    id: "3",
    title: "The Science Behind Our 52-Hour Freshness Promise",
    excerpt: "How our cold chain technology ensures your seafood arrives as fresh as the moment it was caught.",
    image: "/cold-chain-logistics-fish.jpg",
    category: "Technology",
    date: "Jan 5, 2025",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Sustainable Fishing: Our Commitment to the Ocean",
    excerpt: "Learn about our sustainable fishing practices and how we protect marine ecosystems.",
    image: "/sustainable-ocean-fishing.jpg",
    category: "Sustainability",
    date: "Dec 28, 2024",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Chef's Table: Pomfret Recipes from Mumbai's Best",
    excerpt: "Top chefs share their favorite pomfret recipes and cooking tips.",
    image: "/chef-cooking-fish.jpg",
    category: "Recipes",
    date: "Dec 20, 2024",
    readTime: "8 min read",
  },
  {
    id: "6",
    title: "Customer Stories: The Sharma Family's Sunday Tradition",
    excerpt: "How FreshCatch became part of one family's weekly seafood feast tradition.",
    image: "/indian-family-dinner.jpg",
    category: "Customers",
    date: "Dec 15, 2024",
    readTime: "4 min read",
  },
]

const categories = ["All", "Sourcing", "People", "Technology", "Sustainability", "Recipes", "Customers"]

export default function StoriesPage() {
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
                <BreadcrumbPage>Our Stories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Stories</h1>
              <p className="text-xl text-muted-foreground">
                Discover the people, places, and passion behind FreshCatch. From fishermen to your table, every product
                has a story.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className="shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Story */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={stories[0].image || "/placeholder.svg"}
                    alt={stories[0].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4">{stories[0].category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{stories[0].title}</h2>
                  <p className="text-muted-foreground mb-6">{stories[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {stories[0].date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {stories[0].readTime}
                    </div>
                  </div>
                  <Button className="w-fit gap-2">
                    Read Story
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>

        {/* Story Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.slice(1).map((story) => (
                <Card key={story.id} className="overflow-hidden group cursor-pointer">
                  <div className="relative h-48">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{story.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{story.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {story.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {story.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get Stories in Your Inbox</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest stories, recipes, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
