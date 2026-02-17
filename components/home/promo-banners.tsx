export function PromoBanners() {
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=250&fit=crop",
      alt: "Seafood Promo"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&h=250&fit=crop",
      alt: "Premium Fresh Fish"
    },
  ]

  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-[200px] md:h-[250px] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
