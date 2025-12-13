export function DualBanners() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
              <img
                src="https://bayhawk.clientstagingdemo.com/_next/static/media/img1.c3b7b6df.jpg"
                alt="Family Seafood Dinner"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
            </div>
          </div>

          {/* Right Banner */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300">
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
              <img
                src="https://bayhawk.clientstagingdemo.com/_next/static/media/img2.5f27bb30.jpg"
                alt="Fresh Seafood Market"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}