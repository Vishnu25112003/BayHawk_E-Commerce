const banners = [
  {
    id: 1,
    image: "/Website Source Files/Banners/Features/1-DailyFreshCatches.jpg",
    alt: "Daily Fresh Catches",
    title: "Daily Fresh Catches",
    subtitle: "Straight from the ocean to your table"
  },
  {
    id: 2,
    image: "/Website Source Files/Banners/Features/2-ExpertQualityCheck.jpg",
    title: "Expert Quality Check",
    subtitle: "Ensuring the highest standards for you"
  },
  {
    id: 3,
    image: "/Website Source Files/Banners/Features/3-PremiumProducts.jpg",
    title: "Premium Products",
    subtitle: "Only the finest selection for your culinary delights"
  },
  {
    id: 4,
    image: "/Website Source Files/Banners/Features/4-FreeFromChemicals.jpg",
    title: "Free From Chemicals",
    subtitle: "Pure and natural, just as nature intended"
  },
]

export function OfferBanners() {
  return (
    <section className="pb-6 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-[100px] md:h-[120px] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-gray-900"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-2">
                  <p className="text-sm md:text-base font-bold">{banner.title}</p>
                  <p className="text-xs md:text-sm font-medium hidden md:block">{banner.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
