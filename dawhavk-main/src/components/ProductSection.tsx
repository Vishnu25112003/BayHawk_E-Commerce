"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Heart, ShoppingCart, Star } from "lucide-react";
import mint from '@publicImagesOther Images/Mint.png'
import fish_piece from '@publicImagesOther Images/Fish Piece.png'
import marineFish from '@publicImagesmain/1.png'
import waterFish from '@publicImagesmain/2.png'
import shellFish from '@publicImagesmain/3.png'
import fryFish from '@publicImagesmain/4.png'
import comboFish from '@publicImagesmain/5.png'
import shareIcon from "@publicImages/Icons/Share.svg";
import { Card, CardContent, CardFooter } from "./ui/card";
import { BookmarkIcon, Heart, PlusIcon, ShoppingCart, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

type Product = {
  id: string;
  name: string;
  localName: string,
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  weight: number;
  weightUnit: string;
  pieces: string;
  serves: number;
  offersPercentage: number
};

type BestSellerProducts = {
  id: number,
  title: string,
  image: string
}

export function ProductSection() {
  const [bestSellarProducts, setBestSellarProducts] = useState<BestSellerProducts[]>([
    {
      id: 1,
      title: "Marine Fishes",
      image: '@publicImagesmain/1.png'
    },
    {
      id: 2,
      title: "Water Fishes",
      image: '@publicImagesmain/2.png'
    },
    {
      id: 3,
      title: "Shell Fishes",
      image: '@publicImagesmain/3.png'
    },
    {
      id: 4,
      title: "Fry Fishes",
      image: '@publicImagesmain/4.png'
    },
    {
      id: 5,
      title: "Combo Products",
      image: '@publicImagesmain/5.png'
    },
  ])

  // console.log("bestSellarProducts: ",bestSellarProducts);


  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Black Pomfret",
      localName: "கருப்பு வாவல்",
      price: 340,
      originalPrice: 377,
      image: "/Website Source Files/seer.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "2",
      name: "Ribbon dried fish",
      localName: "வாளை மீன் கருவாடு",
      price: 104,
      originalPrice: 114,
      image: "/Website Source Files/sample/2.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "3",
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      price: 209,
      originalPrice: 247,
      image: "/Website Source Files/sample/3.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "4",
      name: "Indian Salmon",
      localName: "காரை",
      price: 457,
      originalPrice: 508,
      image: "/Website Source Files/seer.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "5",
      name: "Squid",
      localName: "கணவாய்",
      price: 95,
      originalPrice: 217,
      image: "/Website Source Files/sample/4.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
  ]);

  const [products2, setProducts2] = useState<Product[]>([
    {
      id: "6",
      name: "Sea Crab",
      localName: "கடல் நண்டு",
      price: 270,
      originalPrice: 295,
      image: "/Website Source Files/sample/6.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "7",
      name: "Seer Fish",
      localName: "வஞ்சரம்",
      price: 393,
      originalPrice: 479,
      image: "/Website Source Files/black.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "8",
      name: "Anchovy dried fish",
      localName: "நெத்திலி கருவாடு",
      price: 163,
      originalPrice: 182,
      image: "/Website Source Files/sample/8.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "9",
      name: "Sea Bass",
      localName: "கோடுவா",
      price: 618,
      originalPrice: 686,
      image: "/Website Source Files/sample/9.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
    {
      id: "10",
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      price: 209,
      originalPrice: 247,
      image: "/Website Source Files/prawn.jpg",
      rating: 4,
      reviewCount: 145,
      isFavorite: false,
      weight: 1,
      weightUnit: "kg",
      pieces: "12-18",
      serves: 4,
      offersPercentage: 5
    },
  ]);

  const toggleFavorite = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
    setProducts2(
      products2.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    // Developed by Gowtham
    <section className="py-5 bg-gray-50 mt-5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-0 flex flex-col">
          <h2 className="text-3xl font-bold mb-2">Our Best Seller <span className="text-sky-400">Products</span></h2>
          <p className="text-gray-500">Freshest sea meats and much more!</p>
          <div className="mx-auto mt-4 h-1 w-16 bg-[#00b8e4]"></div>
        </div>
        <section className="w-full bg-slate-50 h-auto overflow-hidden relative">
          <div className="flex flex-row justify-between">
            <Image
              src={mint}
              alt="mint"
              className="w-40 h-32 absolute top-7 -left-12 -rotate-45"
            />
            <Image
              src={fish_piece}
              alt="fish_piece"
              className="w-48 h-64 absolute -bottom-10 -right-20"
              style={{
                transform: "rotate(220deg)",
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-16 lg:grid-cols-5 lg:gap-5 justify-self-center py-16">

            <div className="flex flex-col overflow-hidden items-center justify-center">
              <Image
                src={marineFish}
                alt="MarineFish"
                className="w-48 h-48"
              />
              <p className="text-xl font-bold">Marine Fish</p>
            </div>
            <div className="flex flex-col overflow-hidden items-center justify-center">
              <Image
                src={waterFish}
                alt="WaterFish"
                className="w-48 h-48"
              />
              <p className="text-xl font-bold">Water Fish</p>
            </div>
            <div className="flex flex-col overflow-hidden items-center justify-center">
              <Image
                src={shellFish}
                alt="ShellFish"
                className="w-48 h-48"
              />
              <p className="text-xl font-bold">Shell Fish</p>
            </div>
            <div className="flex flex-col overflow-hidden items-center justify-center">
              <Image
                src={fryFish}
                alt="FryFish"
                className="w-48 h-48"
              />
              <p className="text-xl font-bold">Fry Fish</p>
            </div>
            <div className="flex flex-col overflow-hidden items-center justify-center">
              <Image
                src={comboFish}
                alt="ComboFish"
                className="w-48 h-48"
              />
              <p className="text-xl font-bold">Combo Fish</p>
            </div>
          </div>
        </section>

        {/* Newly Added by Gowtham54ii */}
        <section className="w-full bg-slate-50 h-auto overflow-hidden">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-xl mx-auto"
          >
            <CarouselContent >
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 w-full">
                  <div className="p-1">
                    <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow p-1">
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm"
                        >
                          <Heart
                            className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          />
                        </button>
                        {product.originalPrice && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      <CardContent className="p-1">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-col leading-none">
                            <h3 className="font-semibold text-lg -mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                              <Link href={`/product/${product.name}`}>{product.name}</Link>
                            </h3>
                            <h3 className="font-semibold text-sm mb-1 text-blue-600 transition-colors cursor-pointer">
                              <Link href={`/product/${product.name}`}>{product.localName}</Link>
                            </h3>
                          </div>
                          <Image
                            src={shareIcon}
                            alt="share"
                            className="w-5 h-5 -mt-5"
                          />
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-lime-600 text-lime-300' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviewCount} Customer Reviews)</span>
                        </div>
                        <div className="flex flex-row items-start justify-evenly">
                          <span className="text-sm font-bold text-gray-500">{product.weight} {product.weightUnit}</span>
                          <span className="text-sm font-bold text-gray-500">|</span>
                          <span className="text-sm font-bold text-gray-500">{product.pieces} Pieces </span>
                          <span className="text-sm font-bold text-gray-500">|</span>
                          <span className="text-sm font-bold text-gray-500">Serves {product.serves}</span>
                        </div>
                        <div className="flex items-center justify-between gap-0.5 mt-2">
                          <span className="font-bold text-xs">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-gray-400 text-xs line-through mr-1">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lime-600 text-sm font-bold">
                            {product.offersPercentage} % off
                          </span>
                          <Button className="bg-red-600 rounded-full h-6 w-16 text-xs text-center pl-6 hover:bg-red-500">
                            Add <Button className="bg-red-800 rounded-full h-5 w-auto p-1"><PlusIcon /></Button>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>

        </section>

        <section className="w-full bg-slate-50 h-auto overflow-hidden">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-xl mx-auto"
          >
            <CarouselContent>
              {products2.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5 w-full">
                  <div className="p-1">
                    <Card key={product.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow p-1">
                      <div className="relative h-48">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm"
                        >
                          <Heart
                            className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                          />
                        </button>
                        {product.originalPrice && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      <CardContent className="p-1">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-col">
                            <h3 className="font-semibold text-lg -mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                              <Link href={`/product/${product.name}`}>{product.name}</Link>
                            </h3>
                            <h3 className="font-semibold text-sm text-blue-600 transition-colors cursor-pointer">
                              <Link href={`/product/${product.name}`}>{product.localName}</Link>
                            </h3>
                          </div>
                          <Image
                            src={shareIcon}
                            alt="share"
                            className="w-5 h-5 -mt-5"
                          />
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-lime-600 text-lime-300' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviewCount} Customer Reviews)</span>
                        </div>
                        <div className="flex flex-row items-start justify-evenly">
                          <span className="text-sm font-bold text-gray-500">{product.weight} {product.weightUnit}</span>
                          <span className="text-sm font-bold text-gray-500">|</span>
                          <span className="text-sm font-bold text-gray-500">{product.pieces} Pieces </span>
                          <span className="text-sm font-bold text-gray-500">|</span>
                          <span className="text-sm font-bold text-gray-500">Serves {product.serves}</span>
                        </div>
                        <div className="flex items-center justify-between gap-0.5 mt-2">
                          <span className="font-bold text-xs">${product.price.toFixed(2)}</span>
                          {product.originalPrice && (
                            <span className="text-gray-400 text-xs line-through mr-1">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-lime-600 text-sm font-bold">
                            {product.offersPercentage} % off
                          </span>
                          <Button className="bg-red-600 rounded-full h-6 w-16 text-xs text-center pl-6 hover:bg-red-500">
                            Add <Button className="bg-red-800 rounded-full h-5 w-auto p-1"><PlusIcon /></Button>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
          </Carousel>

        </section>
      </div>
    </section>
  );
}
