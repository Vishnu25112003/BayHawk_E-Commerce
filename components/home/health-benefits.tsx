import { Heart, Brain, Bone, Eye } from "lucide-react"

const benefits = [
  { icon: Heart, title: "Heart Health", description: "Omega-3 fatty acids support cardiovascular health" },
  { icon: Brain, title: "Brain Function", description: "DHA improves memory and cognitive function" },
  { icon: Bone, title: "Strong Bones", description: "Rich in vitamin D and calcium" },
  { icon: Eye, title: "Eye Health", description: "Contains nutrients that protect vision" },
]

export function HealthBenefits() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Health Benefits of Seafood</h2>
            <p className="text-muted-foreground mb-6">
              Seafood is one of the healthiest foods you can eat. Rich in protein, vitamins, and minerals, it provides
              numerous health benefits for you and your family.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{benefit.title}</h4>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <img src="/placeholder.svg" alt="Health Benefits" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
