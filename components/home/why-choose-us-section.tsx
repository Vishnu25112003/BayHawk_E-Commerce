export function WhyChooseUsSection() {
  const reasons = [
    {
      number: "01",
      title: "Freshness Guaranteed",
      description: "We ensure the freshest catch delivered to your doorstep within 52 hours",
    },
    {
      number: "02",
      title: "Wide Variety & Availability",
      description: "Extensive selection of marine and freshwater fish, shellfish, and more",
    },
    {
      number: "03",
      title: "Competitive Pricing",
      description: "Best prices in the market with regular offers and discounts",
    },
    {
      number: "04",
      title: "Expert Handling & Packaging",
      description: "Professional handling and insulated packaging to maintain freshness",
    },
  ]

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Images */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <img src="/crab-icon.svg" alt="" className="w-32 h-32" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
        <img src="/lobster-icon.svg" alt="" className="w-32 h-32" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Why to Choose <span className="text-[#0A4D8C]">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here are some of the reasons why we think we're the best choice for you and your family!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-[#0A4D8C] mb-4 opacity-20">{reason.number}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

