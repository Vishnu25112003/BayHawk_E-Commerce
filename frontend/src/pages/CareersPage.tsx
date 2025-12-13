import { useState } from "react"
import { MapPin, Briefcase, Clock, ChevronRight, Search } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const openPositions = [
  {
    id: "1",
    title: "Delivery Partner",
    department: "Operations",
    location: "Mumbai, Delhi, Bangalore",
    type: "Full-time",
    description: "Join our delivery fleet and help bring fresh seafood to customers across the city.",
  },
  {
    id: "2",
    title: "Quality Analyst",
    department: "Quality Control",
    location: "Mumbai",
    type: "Full-time",
    description: "Ensure every product meets our high quality standards before reaching customers.",
  },
  {
    id: "3",
    title: "Customer Support Executive",
    department: "Customer Service",
    location: "Remote",
    type: "Full-time",
    description: "Be the voice of FreshCatch and help customers with their queries and concerns.",
  },
  {
    id: "4",
    title: "Frontend Developer",
    department: "Technology",
    location: "Mumbai / Remote",
    type: "Full-time",
    description: "Build beautiful, user-friendly interfaces for our web and mobile applications.",
  },
  {
    id: "5",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    description: "Drive brand awareness and customer acquisition through innovative marketing strategies.",
  },
]

const benefits = [
  "Competitive salary and bonuses",
  "Health insurance for you and family",
  "Flexible work arrangements",
  "Learning and development budget",
  "Employee discounts on all products",
  "Fun team events and outings",
]

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const departments = ["all", ...new Set(openPositions.map((p) => p.department))]

  const filteredPositions = openPositions.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || position.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

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
                <BreadcrumbPage>Careers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Be part of a team that is revolutionizing how India buys seafood. We are always looking for passionate
                people to join us.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Why Work With Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-4 bg-card rounded-lg border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search positions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept)}
                    className="capitalize"
                  >
                    {dept === "all" ? "All Departments" : dept}
                  </Button>
                ))}
              </div>
            </div>

            {/* Positions List */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredPositions.map((position) => (
                <Card key={position.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {position.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{position.description}</p>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="shrink-0 gap-1">
                            Apply Now
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Apply for {position.title}</DialogTitle>
                          </DialogHeader>
                          <form className="space-y-4 py-4">
                            <div>
                              <Label>Full Name</Label>
                              <Input placeholder="Your name" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input type="email" placeholder="your@email.com" />
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <Input type="tel" placeholder="9876543210" />
                            </div>
                            <div>
                              <Label>Resume Link</Label>
                              <Input placeholder="Google Drive / Dropbox link" />
                            </div>
                            <div>
                              <Label>Cover Letter</Label>
                              <Textarea placeholder="Tell us why you'd be a great fit..." />
                            </div>
                            <Button type="submit" className="w-full">
                              Submit Application
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPositions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No positions found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
