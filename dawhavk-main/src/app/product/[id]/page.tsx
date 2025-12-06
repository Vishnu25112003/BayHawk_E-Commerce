import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Share2, Star, Camera, ThumbsUp, ThumbsDown, MinusIcon, Plus } from "lucide-react"
import logo from "@publicImages/BayHawk.svg";
import img1 from "@publicImagesblack.jpg";
import img2 from "@publicImagessample/11.jpg";
import img3 from "@publicImagessample/12.jpg";
import img4 from "@publicImagessample/13.jpg";
import img5 from "@publicImagessample/14.jpg";
import img6 from "@publicImagessample/15.jpg";

import img7 from "@publicImages/sample/9.jpg";

import img8 from "@publicImages/sample/11.jpg";
import img9 from "@publicImages/sample/12.jpg";
import payment from "@publicImages/payment.png";
import { Header } from "@/components/Header";

import netWeight from '@publicImagesIcons/Net Weight.svg'
import pieces from '@publicImagesIcons/Pieces.svg'
import serve from '@publicImagesIcons/serve.svg'
import offer from '@publicImagesIcons/Offers.svg'
import share from '@publicImagesIcons/Share icon.svg'
import camera from '@publicImagesIcons/Upload Photo.svg'
import thumbsup from '@publicImagesIcons/Thumbsup.svg'
import thumbsdown from '@publicImagesIcons/Thumbs Down.svg'
import sideprawn from '@publicImagesOther Images/Prawn.png'
import chickenlegs from '@publicImagesOther Images/Chicken.png'
import capsicum from "@publicImagesOther Images/Capsicum.png";

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { ProductsSliders } from "@/components/productsSliders";

const e1 = "/Website Source Files/img1.jpg";
const e2 = "/Website Source Files/img2.jpg";
const feedback = "/Website Source Files/icons/Feedback.svg";
const s1 = "/Website Source Files/icons/FaceBook.svg"
const s2 = "/Website Source Files/icons/YouTube.svg"
const s3 = "/Website Source Files/icons/Instagram.svg"


export async function generateStaticParams() {
  // Replace this with your actual data fetching logic
  const products = [
    { id: "seer-fish" },
    { id: "black-pomfret" },
    { id: "sea-prawn" },
    { id: "indian-salmon" },
    { id: "squid" },
  ];

  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {

  const product = {
    id: params.id,
    name: "Seer Fish",
    localName: "வஞ்சரம்",
    rating: 4,
    reviewCount: 145,
    description:
      "The other names are Vanjram meen, Vanchiram Meen. It is widely known as the king of fishes and one of the expensive fish. Vanjaram is one of the popular delicacies which are fish pickle, seer fish thala curry, fish curry and fish fry.",
    price: 1111.0,
    mrp: 1234.0,
    discount: "5% off",
    weight: "1000-1250 g",
    netWeight: "1000-1250 g",
    pieces: "2-4 Pieces",
    serves: "2-3",
    totalPrice: 3355.0,
    images: [img1],
    variants: [
      { id: 1, name: "Whole Uncleaned - Small", isActive: false },
      { id: 2, name: "Small Fish - 1 Kg to 1.25 Kg", isActive: true },
      { id: 3, name: "Steak - Large", isActive: false },
      { id: 4, name: "Curry Cut / Steak", isActive: false },
      { id: 5, name: "Cubes", isActive: false },
      { id: 6, name: "Slices - Medium", isActive: false },
    ],
  }

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      author: "Ashwin Reddy",
      location: "Hyderabad",
      date: "Dec, 2024",
      rating: 5,
      text: "I loved the Seer Fish Fillets I bought from here, thanks to BayHawk😊😊😊",
      label: "Freshness guaranteed!",
      likes: 143,
      dislikes: 10,
      images: [
        img1,
        img2,
        img3

      ],
    },
    {
      id: 2,
      author: "Monith Shetty",
      location: "Bengaluru",
      date: "Nov, 2024",
      rating: 4,
      text: "Their Seer Fish is always succulent👌",
      label: "Best seafood place in town!",
      likes: 120,
      dislikes: 5,
      images: [],
    },
    {
      id: 3,
      author: "Ankit Sharma",
      location: "Mumbai",
      date: "Sep, 2024",
      rating: 5,
      text: "I was skeptical at first, but their Seer Fish are amazing!",
      label: "Classy Product!",
      likes: 83,
      dislikes: 3,
      images: [
        img4,
        img5,
        img6
      ],
    },
    {
      id: 4,
      author: "Monith Shetty",
      location: "Bengaluru",
      date: "Nov, 2024",
      rating: 4,
      text: "Their Seer Fish is always succulent👌",
      label: "Best seafood place in town!",
      likes: 120,
      dislikes: 5,
      images: [],
    },
    {
      id: 5,
      author: "Anna John",
      location: "Delhi",
      date: "Dec, 2024",
      rating: 5,
      text: "I was skeptical at first, but their Seer Fish are awesome!",
      label: "Classy Product!",
      likes: 90,
      dislikes: 2,
      images: [
        img4,
        img5,
        img6
      ],
    },
  ]

  // Sample related products
  const relatedProducts = [
    {
      id: 1,
      name: "Black Pomfret",
      localName: "கருப்பு வாவல்",
      price: 340,
      mrp: 357,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img1,
    },
    {
      id: 2,
      name: "Ribbon dried fish",
      localName: "வாளை மீன் கருவாடு",
      price: 104,
      mrp: 110,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img2,
    },
    {
      id: 3,
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      price: 209,
      mrp: 220,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img3,
    },
    {
      id: 4,
      name: "Indian Salmon",
      localName: "காரை",
      price: 457,
      mrp: 480,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img4,
    },
    {
      id: 5,
      name: "Squid",
      localName: "கணவாய்",
      price: 195,
      mrp: 217,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img5,
    },
  ]

  // More related products for second row
  const moreRelatedProducts = [
    {
      id: 6,
      name: "Sea Crab",
      localName: "கடல் நண்டு",
      price: 270,
      mrp: 285,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img6,
    },
    {
      id: 7,
      name: "Seer Fish",
      localName: "வஞ்சரம்",
      price: 393,
      mrp: 415,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img7,
    },
    {
      id: 8,
      name: "Anchovy dried fish",
      localName: "நெத்திலி கருவாடு",
      price: 163,
      mrp: 172,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img8,
    },
    {
      id: 9,
      name: "Sea Bass",
      localName: "கோடுவா",
      price: 618,
      mrp: 650,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img9,
    },
    {
      id: 10,
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      price: 209,
      mrp: 247,
      discount: "5% off",
      weight: "1 Kg",
      pieces: "12-18 Pieces",
      serves: "4",
      rating: 4,
      reviewCount: 145,
      image: img1,
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

  const TAGS = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 gap-4">

          <div className="relative col-span-1">
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain"
              />
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Heart className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <button className="w-3 h-3 bg-[#00b8e4] rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
              <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
            </div>
          </div>

          <div className="col-span-2">
            <div className="container mx-auto px-0 py-0">
              <div className="flex items-center text-xs">
                <Link href="/" className="text-gray-600 hover:text-[#00b8e4]">
                  Home
                </Link>
                <span className="mx-1">&gt;</span>
                <Link href="/marine-fish" className="text-gray-600 hover:text-[#00b8e4]">
                  Marine Fish
                </Link>
                <span className="mx-1">&gt;</span>
                <Link href="/marine-fish/seer-fish" className="text-sky-700 font-medium hover:text-[#00b8e4]">
                  Seer Fish
                </Link>
                <span className="mx-1 text-sky-800 font-medium">&#124;</span>
                <span className="text-sky-700 font-medium">{product.localName}</span>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <h1 className="text-xl font-bold mb-1 mt-1 flex items-center justify-between">
                <span>
                  {product.name} <span className="text-[#00b8e4]"> &#124; {product.localName}</span>
                </span>
              </h1>
              <Image
                src={share}
                alt="share"
                width={20}
                height={20}
              />
            </div>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    size={32}
                    key={i}
                    className={`h-3 w-3 ${i < product.rating ? "text-green-600 fill-green-600" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">({product.reviewCount} Customer Review)</span>
            </div>

            <p className="text-gray-700 mb-4 text-xs">
              {product.description}...
              <button className="text-gray-900 font-bold ml-1">Read more</button>
            </p>
            <div className="container overflow-hidden p-0">
              <span className="bg-sky-700 text-slate-100 px-3 py-1 text-xt font-medium">Variant</span>

              <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gap-0 xl:gap-3 lg:gap-3 md:gap-3 sm:gap-3">

                <div className="col-span-1 w-full h-36 xl:w-full md:w-full sm:w-full bg-slate-50 text-gray-400 text-xt px-3 py-2 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-sky-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full leading-7">
                  {
                    product.variants.map((variant, index) => (
                      <div key={index} className="cursor-pointer px-1 hover:border-2 hover:border-blue-700 hover:font-medium hover:text-gray-950">
                        {variant.name}
                      </div>
                    ))
                  }
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 col-span-2">
                  <div className="flex flex-col w-72">
                    <p className="text-xt xl:text-sm lg:text-xs font-medium text-slate-900 mb-2">Small fish - 1 kg to 1.25 kg</p>
                    <p className="text-xt xl:text-sm lg:text-xs font-medium text-slate-900">Priced for Gross Weight: <span className="text-red-700">1000 - 1250gms</span></p>

                    <div className="flex flex-row items-center mt-2 mb-2 gap-1">
                      <span className="flex flex-row items-center gap-1">
                        <Image
                          src={netWeight}
                          alt="netWeight"
                          width={10}
                          height={10}
                        />
                        <span className="text-xt">Net Wt: 1000-1250 g</span>
                        <span className="w-0.5 py-2 bg-slate-500"></span>
                      </span>
                      <span className="flex flex-row items-center gap-1">
                        <Image
                          src={pieces}
                          alt="netWeight"
                          width={10}
                          height={10}
                        />
                        <span className="text-xt">2-4 Pieces</span>
                        <span className="w-0.5 py-2 bg-slate-500"></span>
                      </span>
                      <span className="flex flex-row items-center gap-1">
                        <Image
                          src={serve}
                          alt="netWeight"
                          width={10}
                          height={10}
                        />
                        <span className="text-xt">Serves 2-3</span>
                      </span>
                    </div>

                    <div>
                      <p className="text-sm xl:text-xl lg:text-xs font-bold mt-1 mb-1">&#8377; {product.price.toFixed(2)} <span className="ml-1 text-xt xl:text-sm lg:text-sm font-semibold text-lime-500">{product.discount}</span></p>
                      <p className="text-xt xl:text-xs lg:text-xt mt-2 mb-2">MRP: <span className="line-through">{product.mrp.toFixed(2)}</span> (incl. of all taxes)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 justify-self-center relative pb-12">
                    <Image
                      src={img8}
                      alt="disp_fish"
                      width={250}
                      height={250}
                      className="rounded-lg w-full h-full xl:w-56 lg:w-28 lg:h-32 md:h-32 md:w-full"
                    />

                    <div className="absolute bottom-0 right-0">
                      <div className="rounded-full bg-red-700 text-slate-50 text-sm flex flex-row items-center justify-between w-32 min-w-24">
                        <Button className="rounded-full bg-[#ffffff6b] w-8 h-8 ">
                          <MinusIcon />
                        </Button>
                        <div>2</div>
                        <Button className="rounded-full bg-[#ffffff6b] w-8 h-8 ">
                          <Plus />
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex flex-col 2xl:flex-row xl:flex-row md:flex-col sm:flex-col items-center justify-between mt-3">
                <div className="flex flex-col 2xl:flex-row xl:flex-row md:flex-row sm:flex-col gap-3">
                  <button className="bg-red-700 text-white rounded-md px-6 py-2 text-xs font-bold uppercase">Add to Cart</button>
                  <button className="bg-lime-600 text-white rounded-md px-6 py-2 text-xs font-bold uppercase">Buy Now</button>
                  <div className="flex gap-2 items-center">
                    <Image
                      src={offer}
                      alt="offer"
                      width={20}
                      height={20}
                    />

                    <span className="text-sky-950 text-sm font-bold">Available offers</span>
                  </div>
                </div>
                <div className="text-sm font-medium mt-2 2xl:mt-0 xl:mt-0">
                  Total Price : <span className="text-sm font-bold">₹{product.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Ratings & Reviews */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-slate-50 rounded-lg shadow-sm text-center overflow-hidden">
          <h2 className="text-xl font-bold mb-6">Customer Ratings & Reviews</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-5 relative px-6 xl:px-20 lg:px-16">
            <Image
              src={sideprawn}
              alt="sideprawn"
              width={200}
              height={200}
              className="absolute -top-3 -left-5 w-12 h-12 xl:w-48 xl:h-44 xl:-top-16 xl:-left-24 lg:w-44 lg:h-44 lg:-top-16 lg:-left-24"
            />
            <Image
              src={chickenlegs}
              alt="chickenlegs"
              width={200}
              height={200}
              className="absolute top-96 -right-6 w-12 h-12 xl:w-48 xl:h-44 xl:top-72 xl:-right-28 lg:w-48 lg:h-44 lg:top-72 lg:-right-24"
              style={{
                transform: "rotate(-25deg)"
              }}
            />
            <div className=" border-gray-200 pr-8 border-r-2">
              <div className="flex items-center mb-4">
                <div className="text-xl xl:text-4xl lg:text-3xl font-medium text-lime-600 mr-2">4.2 ★</div>
                {/* <Star
                  className="text-lime-600 fill-lime-600 w-5"
                /> */}
                <div className="text-gray-500 text-sm xl:text-xl lg:text-sm ml-3 ">13,608 Ratings & 734 Reviews</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 text-sm font-medium">5 ★</div>
                  <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">7,534</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 text-sm font-medium">4 ★</div>
                  <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">3,103</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 text-sm font-medium">3 ★</div>
                  <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">1,599</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 text-sm font-medium">2 ★</div>
                  <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: "7%" }}></div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">804</div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 text-sm font-medium">1 ★</div>
                  <div className="flex-1 mx-3 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: "5%" }}></div>
                  </div>
                  <div className="w-12 text-sm text-gray-500">570</div>
                </div>
              </div>


              <div className="mt-8">
                <div className="flex gap-3">
                  <div className="font-bold mb-2 text-xs xl:text-sm lg:text-sm mt-1">Rate this product:</div>
                  <div className="flex text-gray-300 mb-6">
                    <div className="h-6 w-6 text-3xl cursor-pointer hover:text-lime-500">★</div>
                    <div className="h-6 w-6 text-3xl cursor-pointer hover:text-lime-500">★</div>
                    <div className="h-6 w-6 text-3xl cursor-pointer hover:text-lime-500">★</div>
                    <div className="h-6 w-6 text-3xl cursor-pointer hover:text-lime-500">★</div>
                    <div className="h-6 w-6 text-3xl cursor-pointer hover:text-lime-500">★</div>
                  </div>
                </div>


                <div className="font-bold text-xs xl:text-sm lg:text-sm mb-2 flex flex-row items-baseline">Review this product:
                  <div><input type="text" placeholder="Enter title..." className="w-full border rounded-md px-3 py-2 mb-3 ml-1" /></div>
                </div>
                <textarea
                  placeholder="Description..."
                  className="w-full border rounded-md px-3 py-2 h-36 mb-3"
                ></textarea>

                <div className="flex justify-between">
                  <button className="flex items-center bg-neutral-200 rounded-md px-2 py-2">
                    <Image
                      src={camera}
                      alt="disp_fish"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button className="bg-lime-600 text-white rounded-md px-6 py-2 font-medium">SUBMIT</button>
                </div>
              </div>
            </div>
            <div className="">
              <div className="overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-sky-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full" style={{ height: "500px" }}>
                {reviews.map((review) => (
                  <div key={review.id} className="mb-0 pb-0 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex flex-row-reverse items-start justify-between">
                      <div className="flex items-start justify-end gap-x-5 mr-5">
                        <button className="flex items-center text-gray-500 gap-1">
                          <Image
                            src={thumbsup}
                            alt="offer"
                            width={20}
                            height={20}
                          />
                          <span className="text-sm mt-1">{review.likes}</span>
                        </button>
                        <button className="flex items-start text-gray-500 gap-1 mt-2">
                          <Image
                            src={thumbsdown}
                            alt="offer"
                            width={20}
                            height={20}
                          />
                          <span className="text-sm -mt-1">{review.dislikes}</span>
                        </button>
                      </div>

                      <div className="mb-2 text-left w-6/12">
                        <div className="font-bold text-sm ">{review.label}</div>
                        <div className="font-medium text-xs mt-2 mb-2">{review.text}</div>
                      </div>
                    </div>

                    {review.images.length > 0 && (
                      <div className="flex gap-2 mb-0">
                        {review.images.map((img, idx) => (
                          <Image
                            key={idx}
                            src={img || "/placeholder.svg"}
                            alt={`Review image ${idx + 1}`}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="font-medium text-xs text-gray-400">
                          {review.author} - {review.location} | {review.date}
                        </div>
                      </div>
                      <div className="bg-lime-600 text-white text-xs rounded px-1.5 py-0.5 mr-2">{review.rating} ★</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border border-gray-200 px-2 py-2">
                <button className="flex items-center text-sky-900 font-bold">
                  <span>View all 734 reviews</span>
                  <ChevronRight className="h-4 w-4 ml-1" strokeWidth={3} />
                </button>
                <button className="text-sky-900">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full px-4 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto relative">
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

      {/* You May Like Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            You May <span className="text-[#00b8e4]">Like</span>
          </h2>
          <p className="text-gray-500">Most popular products near you!</p>
          <div className="mx-auto mt-2 h-1 w-16 bg-[#00b8e4]"></div>
        </div>
        {/* Product Slider */}
        <ProductsSliders />

      </div>

      {/* Promotional Banner */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative overflow-hidden rounded-lg bg-[#0a2d5c] p-6 text-white">
          <div className="relative z-10 flex flex-col items-center justify-center gap-4 py-4 text-center">
            <h2 className="text-3xl font-bold">Get 15% offer! Min Order of 350₹</h2>
            <div className="rounded-md border border-dashed border-white px-4 py-2">Use Code : dayhawk786</div>
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
            <CarouselPrevious className="bg-blue-900 text-white" />
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

