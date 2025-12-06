"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import bn1 from "@publicImages/Banners/Ads Banner/1-Banner-Design.jpg";
import bn2 from "@publicImages/Banners/Ads Banner/2-Banner-Design.jpg";
import bn3 from "@publicImages/Banners/Ads Banner/3-Banner-Design.jpg";
import f1 from "@publicImages/Banners/Features/1-DailyFreshCatches.jpg";
import f2 from "@publicImages/Banners/Features/2-ExpertQualityCheck.jpg";
import f3 from "@publicImages/Banners/Features/3-PremiumProducts.jpg";
import f4 from "@publicImages/Banners/Features/4-FreeFromChemicals.jpg";
import fisher from "@publicImages/Icons/Daily Fresh.svg";
import qltcheck from "@publicImages/Icons/Expert Quality Check.svg";
import premiumprd from "@publicImages/Icons/Premium Products.svg";
import nochemical from "@publicImages/Icons/Free From Chemicals.svg";
import { url } from "inspector";


export function HeroSection() {
  return (
    // Developed by Gowtham
    <section className="py-1">
      <div className="container mx-auto px-4">
        <Carousel className="w-full">
          <CarouselContent>
            {/* First Slide */}
            <CarouselItem>
              {/* // Developed by Gowtham */}
              <div
                className="relative w-full h-[480px] rounded-xl overflow-hidden flex"
                style={{
                  backgroundImage: `url(${bn1.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
              </div>
            </CarouselItem>

            {/* Second Slide */}
            <CarouselItem>
              {/* // Developed by Gowtham */}
              <div className="relative w-full h-[480px] bg-gradient-to-r from-orange-50 to-red-50 rounded-xl overflow-hidden flex"
              style={{
                backgroundImage: `url(${bn2.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              
              </div>
            </CarouselItem>

            {/* Third Slide */}
            <CarouselItem>
              {/* // Developed by Gowtham */}
              <div className="relative w-full h-[480px] bg-gradient-to-r from-green-50 to-teal-50 rounded-xl overflow-hidden flex"
              style={{
                backgroundImage: `url(${bn3.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {/* Feature 1 */}
              {/* // Developed by Gowtham */}
          <div className="bg-blue-100 p-6 rounded-lg relative overflow-hidden flex items-center"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(9, 60, 102, 1) 0%, rgba(0, 0, 0, 0.16) 72%),url(${f1.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="z-10 flex items-center gap-2">
              <Image 
                src={fisher} 
                alt="My Icon" 
                width={50} 
                height={50}
              />
              <div>
                <h3 className="text-xl lg:text-xs font-semibold text-white mb-1">Daily Fresh Catches</h3>
                <p className="text-blue-50 lg:text-xt">Direct from the ocean</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-30">
              <Image
                src="https://images.unsplash.com/photo-1546622653-89d72e8d2239?q=80&w=1974&auto=format&fit=crop"
                alt="Fresh catches"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 2 */}
              {/* // Developed by Gowtham */}

          <div className="bg-emerald-100 p-6 rounded-lg relative overflow-hidden flex items-center"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(9, 60, 102, 1) 0%, rgba(0, 0, 0, 0.16) 72%),url(${f2.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="z-10 flex items-center gap-2">
              <Image 
                src={qltcheck} 
                alt="My Icon" 
                width={50} 
                height={50}
              />
              <div>
                <h3 className="text-xl lg:text-xs font-semibold text-white mb-1">Expert Quality Check</h3>
                <p className="text-emerald-50 lg:text-xt">Rigorous quality standards</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-30">
              <Image
                src="https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?q=80&w=1964&auto=format&fit=crop"
                alt="Quality check"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 3 */}
              {/* // Developed by Gowtham */}

          <div className="bg-amber-100 p-6 rounded-lg relative overflow-hidden flex items-center"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(9, 60, 102, 1) 0%, rgba(0, 0, 0, 0.16) 72%),url(${f3.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="z-10 flex items-center gap-2">
              <Image 
                src={premiumprd} 
                alt="My Icon" 
                width={50} 
                height={50}
              />
              <div>
                <h3 className="text-xl lg:text-xs font-semibold text-white mb-1">Premium Products</h3>
                <p className="text-amber-50 lg:text-xt">Finest selection</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-30">
              <Image
                src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1974&auto=format&fit=crop"
                alt="Premium products"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 4 */}
              {/* // Developed by Gowtham */}
          <div className="bg-rose-100 p-6 rounded-lg relative overflow-hidden flex items-center"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(9, 60, 102, 1) 0%, rgba(0, 0, 0, 0.16) 72%),url(${f4.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
            <div className="z-10 flex items-center gap-2">
              <Image 
                src={nochemical} 
                alt="My Icon" 
                width={50} 
                height={50}
              />
              <div>
                <h3 className="text-xl lg:text-xs font-semibold text-white mb-1">Free From Chemicals</h3>
                <p className="text-rose-50 lg:text-xt">Naturally sourced</p>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 h-full w-1/2 opacity-30">
              <Image
                src="https://images.unsplash.com/photo-1553787762-b5f5721f3270?q=80&w=2070&auto=format&fit=crop"
                alt="No chemicals"
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
