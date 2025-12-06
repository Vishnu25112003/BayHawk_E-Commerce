import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"




const p1 = "/Website Source Files/Peoples/1.jpg";
const p2 = "/Website Source Files/Peoples/2.jpg";
const p3 = "/Website Source Files/Peoples/3.jpg";
const d1 = "/Website Source Files/Other Images/Crab.png";
const d2 = "/Website Source Files/Other Images/Lobster.png";
const e1 = "/Website Source Files/img1.jpg";
const e2 = "/Website Source Files/img2.jpg";
const f1 = "/Website Source Files/seer.jpg";
const f2 = "/Website Source Files/black.jpg";
const fs1 = "/icons/Save Time.png";
const fs2 = "/icons/Delivered from S2H.png";
const fs3 = "/icons/Home Delivery.png";
const fs4 = "/icons/Price Comparison.png";
const s1 = "/Website Source Files/icons/FaceBook.svg"
const s2 = "/Website Source Files/icons/YouTube.svg"
const s3 = "/Website Source Files/icons/Instagram.svg"

import payment from "@publicImages/payment.png";
import capsicum from "@publicImagesOther Images/Capsicum.png";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
const f3 = "/Website Source Files/prawn.jpg";
const feedback = "/Website Source Files/icons/Feedback.svg";


export default function SeafoodWebsite() {
  // Sample products data for the homepage
  const products = [
    {
      id: "seer-fish",
      name: "Seer Fish",
      localName: "வஞ்சரம்",
      price: 393,
      mrp: 415,
      discount: "5% off",
      image: f1,
    },
    {
      id: "black-pomfret",
      name: "Black Pomfret",
      localName: "கருப்பு வாவல்",
      price: 340,
      mrp: 357,
      discount: "5% off",
      image: f2,
    },
    {
      id: "sea-prawn",
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      price: 209,
      mrp: 220,
      discount: "5% off",
      image: f3,
    },
  ]

  const peopleSays = [
    {
      id: "1",
      image: "/Website Source Files/Peoples/1.jpg",
      name: "Ashwin Reddy",
      place: "Hyderabad",
      comments: "The indian salmon fillets I received were incredibly fresh and flavorful! Will definitely order agin."
    },
    {
      id: "2",
      image: "/Website Source Files/Peoples/2.jpg",
      name: "Monith Shetty",
      place: "Bengaluru",
      comments: "Love the variety of seafood options on your website. The shrimp were succulent and perfect for my BBQ."
    },
    {
      id: "3",
      image: "/Website Source Files/Peoples/3.jpg",
      name: "Anith Sharma",
      place: "Mumbai",
      comments: "The seafood arrived promptly and was packaged with care. Impressed with the quality and service."
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Banners Section */}
      <section className="w-full px-4 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto relative">
          {/* Best Seafood Banner */}
          {/* Developed by gowtham */}
          {/* <div className="absolute -top-10 left-20 w-auto h-auto z-40">
            <Image
              src={capsicum}
              alt="capsicum"
              width={65}
              height={65}
            />
          </div> */}
          {/* Developed by Gowtham */}
          <div className="relative grid gap-6 md:grid-cols-2">
            <Image
              src={capsicum}
              alt="capsicum"
              width={65}
              height={65}
              className="absolute z-20 -top-12 -left-6"
            />
            <div className="relative overflow-hidden rounded-lg bg-[#0a2d5c] p-6 text-white h-56">
              <div className="absolute inset-0">
                {/* Developed by gowtham */}
                <Image
                  src={e1}
                  alt="Salmon with herbs"
                  className="opacity-95"
                  fill
                />
              </div>
            </div>
            {/* Developed by gowtham */}
            {/* Fresh Fish Banner */}
            <div className="relative overflow-hidden rounded-lg bg-[#0a2d5c] p-6 text-white h-56">
              <div className="relative z-10 flex flex-col gap-4">
                <div className="absolute right-4 top-4 rounded-full bg-[#0a2d5c] px-3 py-1 text-sm font-bold">

                </div>
                <h2 className="text-4xl font-bold leading-tight">
                  <span className="text-2xl italic"></span> <br />

                </h2>
              </div>
              <div className="absolute inset-0">
                <Image
                  src={e2}
                  alt="Salmon with herbs"
                  fill
                  className="opacity-95"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developed by gowtham */}
      {/* Why Choose Us Section */}
      <section className="w-full px-6 md:p-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Why to <span className="text-[#00b8e4]">Choose Us</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Here are some distinctive things which makes us different from others!
            </p>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#00b8e4]"></div>
          </div>
          {/* Developed by gowtham */}
          <div className="relative inset-0">
            {/* Developed by gowtham */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 relative rounded-lg w-auto p-16 sm:p-16 lg:p-10"
              style={{
                backgroundImage: "url('/Website Source Files/Banners/Why to Choose Us.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Image
                src={d1}
                alt="Decorative crab"
                width={250}
                height={250}
                className="opacity-95 absolute -bottom-20 -left-36"
                style={{
                  transform: "rotate(45deg)"
                }}
              />

              <Image
                src={d2}
                alt="Decorative lobster"
                width={200}
                height={200}
                className="opacity-95 absolute -top-32 -right-32"
                style={{
                  transform: "rotate(90deg)"
                }}
              />
              {/* Feature 1 */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="flex items-center justify-center">
                  <div className="mb-4 text-5xl xl:text-5xl lg:text-3xl font-medium text-[#00b8e4]">01</div>
                  <h3 className="mb-3 text-sm xl:text-sm lg:text-xs font-bold">Freshness <br />Guaranteed</h3>
                </div>
                <p className="text-gray-600 text-xs xl:text-xs lg:text-xt text-center">
                  We source our seafood directly from local fishermen and suppliers to ensure maximum freshness and
                  quality.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="flex items-center justify-center">
                  <div className="mb-4 text-5xl xl:text-5xl lg:text-3xl font-medium text-[#00b8e4]">02</div>
                  <h3 className="mb-3 text-sm xl:text-sm lg:text-xs font-bold">Wide Variety <br /> & Availability</h3>
                </div>
                <p className="text-gray-600 text-xs xl:text-xs lg:text-xt text-center">
                  Explore our extensive selection of seafood products, including hard-to-find species, and enjoy
                  convenient delivery or pickup options.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="flex items-center justify-center">
                  <div className="mb-4 text-5xl xl:text-5xl lg:text-3xl font-medium text-[#00b8e4]">03</div>
                  <h3 className="mb-3 text-sm xl:text-sm lg:text-xs font-bold">Competitive <br /> Pricing</h3>
                </div>
                <p className="text-gray-600 text-xs xl:text-xs lg:text-xt text-center">
                  We offer fair and competitive prices for our high-quality seafood products, ensuring you get the best
                  value for your money.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="rounded-lg bg-white p-8 shadow-md">
                <div className="flex items-center justify-center">
                  <div className="mb-4 text-5xl xl:text-5xl lg:text-3xl font-semibold text-[#00b8e4]">04</div>
                  <h3 className="mb-3 text-sm xl:text-sm lg:text-xs font-bold">Expert Handling <br /> & Packaging</h3>
                </div>
                <p className="text-gray-600 text-xs xl:text-xs lg:text-xt text-center">
                  Our experienced team carefully handles and packages each order to ensure your seafood arrives in
                  pristine condition, ready to cook and enjoy.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            {/* Developed by gowtham */}
            {/* <div className="absolute -left-36 -bottom-32 hidden md:block">
              <Image
                src={d1}
                alt="Decorative crab"
                width={250}
                height={250}
                className="opacity-95"
                style={{
                  transform: "rotate(45deg)"
                }}
              />
            </div>
            <div className="absolute -top-36 -right-32 hidden md:block">
              <Image
                src={d2}
                alt="Decorative lobster"
                width={250}
                height={250}
                className="opacity-95"
                style={{
                  transform: "rotate(75deg)"
                }}
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Health Benefits Section */}
      <section className="w-full px-4 py-12 md:py-16 ">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Best for your <span className="text-[#00b8e4]">Health</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Support sustainable seafood embrace healthier choices right at your fingertips!
            </p>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#00b8e4]"></div>
          </div>

          <div className="relative overflow-hidden rounded-lg p-6 text-white flex justify-end"
            style={{
              backgroundImage: "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.11) 51%, rgba(60, 80, 171, 0.89) 100%),url('/Website Source Files/Banners/BestforyourHealth.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            {/* Developed by Gowtham */}
            <div className="flex flex-row items-center h-72 w-11/12 sm:w-11/12 lg:w-6/12">
              <div className="flex flex-col gap-6 h-64 px-5 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-sky-900 [&::-webkit-scrollbar-thumb]:bg-slate-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="text-right">
                  <h3 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#00b8e4]">Nutrient-Rich</h3>
                  <span className="text-xt leading-3 xl:text-xs">
                    Sea fish provide high-quality protein essential for muscle growth, repair, and overall bodily
                    functions. Protein also helps with weight management by promoting satiety. DHA in fish supports
                    cognitive function, memory, and development, especially in children and older adults. It may also
                    reduce the risk of neurodegenerative diseases like Alzheimer's.
                  </span>
                </div>
                <div className="text-right">
                  <h3 className="text-xl sm:text-xl lg:text-3xl font-bold text-[#00b8e4]">Healthier Option</h3>
                  <span className="text-xs">
                    Regular consumption of sea fish reduces the risk of heart disease by lowering triglycerides,
                    reducing blood pressure, and improving cholesterol levels.
                  </span>
                </div>
                <div className="text-right">
                  <h3 className="text-xl sm:text-xl lg:text-3xl font-bold text-[#00b8e4]">Nutrient-Rich</h3>
                  <span className="text-xs">
                    Sea fish provide high-quality protein essential for muscle growth, repair, and overall bodily
                    functions. Protein also helps with weight management by promoting satiety. DHA in fish supports
                    cognitive function, memory, and development, especially in children and older adults. It may also
                    reduce the risk of neurodegenerative diseases like Alzheimer's.
                  </span>
                </div>
                <div className="text-right">
                  <h3 className="text-xl sm:text-xl lg:text-3xl font-bold text-[#00b8e4]">Healthier Option</h3>
                  <span className="text-xs">
                    Regular consumption of sea fish reduces the risk of heart disease by lowering triglycerides,
                    reducing blood pressure, and improving cholesterol levels.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="w-full px-6 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              Featured <span className="text-[#00b8e4]">Services</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Here you will get some extra services which you will get only here!
            </p>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#00b8e4]"></div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  sm:grid-cols-1 px-0 sm:16 lg:28 xl:32">
            {/* Service 1 */}
            <div className="flex flex-col items-center text-center justify-between shadow-md py-5">
              <div className="mb-4 p-4">
                <Image
                  src={fs1}
                  alt="fs1"
                  width={70}
                  height={70}
                />
              </div>
              <div className="px-3">
                <h3 className="mb-2 text-sm font-bold">Save Time</h3>
                <p className="text-gray-600 text-xs">Time is money save your time</p>
                <div className="max-w-20 h-1 bg-red-600 rounded-sm text-slate-50 mx-auto mt-2">savetime</div>
              </div>
              
            </div>

            {/* Service 2 */}
            <div className="flex flex-col items-center text-center justify-between shadow-md py-5">
              <div className="mb-4 p-4">
                <Image
                  src={fs2}
                  alt="fs2"
                  width={70}
                  height={70}
                />
              </div>
              <div className="px-3">
                <h3 className="mb-2 text-sm font-bold">Delivered from S2H</h3>
                <p className="text-gray-600 text-xs">Fresh from the Ocean, to Your Door</p>
                <div className="max-w-20 h-1 bg-red-600 rounded-sm mx-auto mt-2"></div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col items-center text-center justify-between shadow-md py-5">
              <div className="mb-4 p-4">
                <Image
                  src={fs3}
                  alt="fs3"
                  width={70}
                  height={70}
                />
              </div>
              <div className="px-5">
                <h3 className="mb-2 text-sm font-bold">Home Delivery</h3>
                <p className="text-gray-600 text-xs">Get your desired product at your doorstep</p>
                <div className="max-w-20 h-1 bg-red-600 rounded-sm mx-auto mt-2"></div>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex flex-col items-center text-center justify-between shadow-md py-5">
              <div className="mb-4 p-4">
                <Image
                  src={fs4}
                  alt="fs4"
                  width={70}
                  height={70}
                />
              </div>
              <div className="px-5">
                <h3 className="mb-2 text-sm font-bold">Price Comparison</h3>
                <p className="text-gray-600 text-xs">Now you can compare our price with local market</p>
                <div className="max-w-20 h-1 bg-red-600 rounded-sm mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Promotional Banner */}
      <section className="w-full px-4 py-8">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-lg bg-[#0a2d5c] p-6 text-white">
            <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-3 text-center">
              <h2 className="text-3xl font-bold">Get 15% offer! Min Order of 350₹</h2>
              <div className="rounded-md border border-dashed border-white px-4 py-2">Use Code : bayhawk786</div>
            </div>
            <div className="absolute inset-0 contrast-125"
              style={{
                backgroundImage: "linear-gradient(90deg,rgba(255, 255, 255, 0.14) 0%, rgba(5, 28, 79, 0.61) 50%, rgba(255, 255, 255, 0.14) 100%),url('/Website Source Files/Banners/OfferBanner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              What People Says <span className="text-[#00b8e4]">About Us</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">Our customers honest reviews for our products!</p>
            <div className="mx-auto mt-4 h-1 w-16 bg-[#00b8e4]"></div>
          </div>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-xl mx-auto"
          >
            <CarouselContent>
              {peopleSays.map((peoples, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 w-full">
                  <div className="p-1">
                    <Card key={peoples.id} className="relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow p-1">
                      <div className="flex flex-row items-center justify-between">
                        <div className="mr-3">
                          <div className="h-28 w-28 overflow-hidden rounded-full">
                            <Image
                              src={peoples.image}
                              alt={peoples.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 leading-none">
                          <h3 className="font-bold">{peoples.name}</h3>
                          <p className="text-xs mb-2 text-[#00b8e4] font-semibold">{peoples.place}</p>
                          <p className="text-gray-600 text-xs">
                            {peoples.comments}
                          </p>
                        </div>
                      </div>
                      <div className="absolute right-6 top-0 text-6xl font-serif text-gray-200">
                        <Image
                          src={feedback}
                          alt="feedback"
                          width={24}
                          height={24}
                          className="opacity-25"
                        />
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-900 text-white"/>
            <CarouselNext className="bg-blue-900 text-white" />
          </Carousel>
        </div>
      </section>

      {/* Footer */} 
      {/* vertical line html code &#124; */}
      <footer className="w-full bg-[#0a4d8c] px-4 py-2 text-white">
        <div className="container mx-auto px-10 pt-20">
          {/* flex flex-row items-center justify-around */}
          <div className="space-y-4 grid xl:grid-rows-1 xl:grid-cols-5 lg:grid-rows-2 lg:grid-cols-2 sm:grid-rows-2 sm:grid-cols-2">
            <div className="">
              <h2 className="text-5xl font-bold mb-6">BayHawk</h2>
              {/* <p className="mb-4 max-w-xs">
                Your trusted source for fresh, sustainable seafood delivered right to your door.
              </p> */}
            </div>

            <div className="">
              <h3 className="mb-0 text-sm font-bold uppercase leading-none mb-1">About</h3>
              <ul className="space-y-0 leading-5">
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Our Stories
                  </Link>
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="mb-0 text-sm font-bold uppercase leading-none mb-1">Help</h3>
              <ul className="space-y-0 leading-5">
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Cancellation & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="mb-0 text-sm font-bold uppercase leading-none mb-1">Consumer Policy</h3>
              <ul className="space-y-0.5 leading-5">
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Cancellation & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Terms Of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#00b8e4] text-xs text-slate-300">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="mb-3 text-sm font-bold uppercase">Subscribe to our newsletter</h3>
              <div className="flex w-72 border-slate-50 border-x-2 border-y-2 rounded-sm">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-56 rounded-l-md border-0 bg-transparent text-sm px-4 py-2 text-slate-300"
                />
                <button className="rounded-r-md bg-red-600 w-16 font-medium text-xs text-white hover:bg-red-700">
                  Sign up
                </button>
              </div>
              <div className="mt-4 flex gap-2">
                <Image src={payment} alt="Visa" width={290} height={160} />

              </div>
            </div>
          </div>
          <div className="mt-10">
            <hr />
            <div className="flex flex-row item-center justify-between py-4">
              <div className="flex items-center">
                <p className="text-xs font-medium text-slate-300">
                  Copyright &copy; 2022 BayHawk. All Rights Reserved.
                </p>
              </div>
              <div className="connect_socials flex flex-row items-center justify-between">
                <p className="text-slate-300 text-xs mr-3">Follow Us</p>
                <ul className="space-x-3 leading-5 flex flex-row">
                  <li>
                    <Link href="#" className="hover:text-[#00b8e4] text-slate-300">
                      <Image
                        src={s1}
                        alt="facebook"
                        width={35}
                        height={35}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[#00b8e4] text-slate-300">
                      <Image
                        src={s2}
                        alt="Youtube"
                        width={35}
                        height={35}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-[#00b8e4] text-slate-300">
                      <Image
                        src={s3}
                        alt="Instagram"
                        width={35}
                        height={35}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

