import { useRef } from "react";

const healthBenefits = [
  {
    title: "Nutrient-Rich",
    description:
      "Seafood is packed with essential nutrients including high-quality protein, omega-3 fatty acids, vitamins D and B2, calcium, phosphorus, iron, zinc, iodine, magnesium, and potassium. These nutrients are crucial for maintaining optimal health and supporting various bodily functions.",
  },
  {
    title: "Heart Health",
    description:
      "Regular consumption of seafood can help reduce the risk of heart disease. Omega-3 fatty acids found in fish help lower blood pressure, reduce inflammation, and decrease the risk of strokes and heart attacks.",
  },
  {
    title: "Brain Function",
    description:
      "The omega-3 fatty acids, particularly DHA, are essential for brain development and function. They can improve memory, cognitive function, and may help reduce the risk of Alzheimer's disease and dementia.",
  },
  {
    title: "Nutrient-Rich",
    description:
      "Seafood is packed with essential nutrients including high-quality protein, omega-3 fatty acids, vitamins D and B2, calcium, phosphorus, iron, zinc, iodine, magnesium, and potassium. These nutrients are crucial for maintaining optimal health and supporting various bodily functions.",
  },
];

export function HealthBenefitsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-4 px-4">
      <div className="w-4/5 mx-auto">
        {/* Header Section - Outside Banner */}
        <div className="text-center mb-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-gray-900">
            Best for your <span className="text-[#0A4D8C]">Health</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the amazing health benefits of including seafood in your
            daily diet
          </p>
        </div>

        {/* Banner with Scrollable Content */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-56 md:h-72 lg:h-80">
            <img
              src="Website Source Files\Banners\BestforyourHealth.jpg"
              alt="Health Benefits of Seafood"
              className="w-full h-full object-cover"
            />


            {/* Scrollable Text Section - Right Side Corner */}
            <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-[calc(100%-1rem)] sm:w-80 md:w-96 lg:w-[38rem] text-right">
              {/* Fixed Format Scrollable Content */}
              <div
                ref={scrollContainerRef}
                className="h-40 md:h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent"
              >
                <div className="space-y-1 md:space-y-2">
                  {healthBenefits.map((benefit, index) => (
                    <div key={index} className="pb-1">
                      <h4 className="font-semibold text-blue-400 drop-shadow-lg mb-0.5 text-xs sm:text-sm md:text-base">
                        {benefit.title}
                      </h4>
                      <p className="text-[10px] sm:text-xs md:text-sm text-white/90 leading-snug drop-shadow-md">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
