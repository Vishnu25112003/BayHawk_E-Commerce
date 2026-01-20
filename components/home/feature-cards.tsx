import { Fish, Shield, Award, Leaf } from "lucide-react"

const features = [
  {
    icon: Fish,
    title: "Fresh Catches",
    description: "Sourced directly from fishermen within 24 hours",
  },
  {
    icon: Shield,
    title: "Quality Checked",
    description: "Every product undergoes strict quality inspection",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest seafood makes it to your plate",
  },
  {
    icon: Leaf,
    title: "Chemical-Free",
    description: "No preservatives or artificial additives",
  },
]

export function FeatureCards() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
