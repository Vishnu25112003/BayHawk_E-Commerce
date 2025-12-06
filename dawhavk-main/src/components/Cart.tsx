"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import img1 from "@publicImagessample/11.jpg"
import img2 from "@publicImagessample/3.jpg"
import offerIcon from "@publicImagesIcons/offer_green.svg"
import { MinusIcon, Plus } from "lucide-react"
import share from "@publicImagesOther Images/share-white.png"
import securePayment_icon from "@publicImagesIcons/secure_payment.svg"

export const Cart = () => {

  const products = [
    {
      id: "1",
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
      image: img1,
      items: 2,
      variants: [
        { id: 1, name: "Steak - Large", isActive: false },
        { id: 2, name: "Small Fish - 1 Kg to 1.25 Kg", isActive: true },
      ]
    },
    {
      id: "2",
      name: "Sea Prawn",
      localName: "கடல் இறால்",
      rating: 4,
      reviewCount: 145,
      description:
        "The other names are Vanjram meen, Vanchiram Meen. It is widely known as the king of fishes and one of the expensive fish. Vanjaram is one of the popular delicacies which are fish pickle, seer fish thala curry, fish curry and fish fry.",
      price: 209,
      mrp: 247,
      discount: "5% off",
      weight: "1000-1250 g",
      netWeight: "1000-1250 g",
      pieces: "2-4 Pieces",
      serves: "2-3",
      totalPrice: 3355.0,
      image: img2,
      items: 1,
      variants: [
        { id: 1, name: "Steak - Large", isActive: false },
        { id: 2, name: "Small Fish - 1 Kg to 1.25 Kg", isActive: true },
      ]
    }
  ];

  return (
    <section className="py-4">
      <div className="container-xl mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <div className="bg-slate-100 w-full col-span-1 xl:col-span-2 lg:col-span-2">

            <div className="flex flex-row items-center justify-between border px-4 py-6 rounded-lg">
              <div>
                <p className="text-xt xl:text-sm lg:sm font-semibold text-black">
                  Deliver to Durairaj 600018
                </p>
                <p className="text-xt xl:text-sm lg:sm font-semibold text-gray-400">
                  Address. 20, N Usman Rd, near Head Post Office, Darmapuram...
                </p>
              </div>
              <div>
                <Button className="text-blue-900 font-medium bg-slate-50 border-2 rounded-lg shadow-none text-xt lg:text-sm">Change</Button>
              </div>
            </div>


            {/* listed products */}
            <div className="border px-4 py-4">

              {
                products.map((product, index) => (
                  <div className="border-b-2 px-4 py-6 rounded-lg" key={index}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 ">
                      <div className="col-span-1">
                        <Image
                          src={product.image}
                          alt={`${product.image}`}
                          width={250}
                          height={250}
                          className="rounded-lg h-40 xl:w-56 lg:w-40 lg:h-32 md:h-96 md:w-full"
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row items-center gap-x-2">
                            <h3 className="text-xs xl:text-lg lg:text-sm md:text-sm font-bold">{product.name}</h3>
                            <span className="w-0.5 h-6 border bg-gray-300"></span>
                            <h3 className="text-xs xl:text-lg lg:text-sm md:text-sm font-bold text-sky-500">{product.localName}</h3>
                          </div>
                          <p className="text-xt xl:text-xs lg:text-xt md:text-xt text-slate-600">Delivery by Today, 10AM</p>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                          <h3 className="text-xt xl:text-xs lg:text-xt md:text-xt font-medium">Variant: {product.variants[0].name} </h3>
                          <span className="w-0.5 h-6 border bg-gray-300"></span>
                          <h3 className="text-xt xl:text-xs lg:text-xt md:text-xt font-semibold">{product.variants[1].name}</h3>
                        </div>
                        <div>
                          <p className="text-xt xl:text-xs lg:text-xt md:text-xt font-semibold">priced for Gross WeightL {product.weight}ms</p>
                        </div>
                        <div>
                          <p className="text-xt xl:text-xs lg:text-xt md:text-xt mt-2 mb-2">MRP: <span className="line-through">{product.mrp.toFixed(2)}</span> (incl. of all taxes)</p>
                          <p className="text-xs xl:text-xl lg:text-xs md:text-xs font-bold mt-1 mb-1 flex flex-row items-center gap-1">&#8377; {product.price.toFixed(2)} <span className="ml-1 text-xs xl:text-xs lg:text-xs md:text-xs font-semibold text-lime-500 flex flex-row items-center gap-1"><Image src={offerIcon} alt="offerIcon" width={15} height={15} className="" />{"5% off 1 offer available"}</span></p>
                        </div>
                        {/* flex flex-row items-center gap-5 */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3">
                          <div className="rounded-full bg-red-700 text-slate-50 text-xs xl:text-sm lg:text-sm md:text-xs flex flex-row items-center justify-between max-w-20 min-w-24 max-h-6 min-h-6">
                            <Button className="rounded-full bg-[#ffffff6b] w-6 h-6 xl:w-8 lg:w-8 md:w-4 xl:h-8 lg:h-8 md:h-6">
                              <MinusIcon />
                            </Button>
                            <div>{product.items}</div>
                            <Button className="rounded-full bg-[#ffffff6b] w-6 h-6 xl:w-8 lg:w-8 md:w-4 xl:h-8 lg:h-8 md:h-6">
                              <Plus />
                            </Button>
                          </div>
                          <Button className="text-stone-400 font-medium bg-slate-100-100 rounded-sm shadow-none border-2">Save for Later</Button>
                          <Button className="text-stone-400 font-medium bg-slate-100-100 rounded-sm shadow-none border-2">Remove Item</Button>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                ))
              }

              {/* Buttons */}
              <div className="flex flex-row items-center justify-center xl:justify-end lg:justify-end md:justify-end mt-5">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                  <Button className="text-slate-50 bg-[#005aa5] font-bold rounded-md shadow-none border-2 uppercase p-5">Share Cart <Image src={share} alt="share" width={20} height={20} className="-mt-1"
                  /></Button>
                  <Button className="text-slate-50 font-bold bg-lime-500 rounded-md shadow-none border-2 uppercase p-5">Place Order</Button>
                </div>
              </div>
            </div>

          </div>
          <div className="bg-slate-50 w-full h-72 md:col-span-1">
            {/* prices */}
            <div className="">
              <div className="border p-6">
                <h3 className="text-black font-bold p-2">Price details</h3>
                <hr />
                <div className="flex flex-col gap-y-4 mt-4 p-2">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt">Price (2 items)</p>
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt">&#8377; 1,111.00</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt">Discount</p>
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt text-lime-600">- &#8377; 150</p>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-xt xl:text-sm lg:text-xt md:text-xt">Delivery Charges</p>
                    <p className="text-xt xl:text-sm lg:text-xt md:text-xt text-stone-400">&#8377; 110 <span className="text-lime-600">FREE</span></p>
                  </div>

                  <div className="flex flex-row items-center justify-between py-4">
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt font-bold">Total Amount</p>
                    <p className="text-xt xl:text-sm lg:text-xs md:text-xt font-bold text-black">&#8377; 1320.00</p>
                  </div>

                  <div className="text-sm xl:text-lg lg:text-sm md:text-xs font-semibold text-lime-500 text-center">You will save &#8377;153 on this order</div>

                  <div className="flex items-center justify-center">
                    <Image
                      src={securePayment_icon}
                      alt="secure payment"
                      width={200}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <hr /> */}
        <div className="absolute -bottom-72 left-0 right-0 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 justify-items-center border-t-2 mt-5 pt-5 pb-3">
          <div className="flex flex-row items-center gap-2">
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">Policies:Return Policy</p>
            <span className="w-0.5 h-5 border bg-gray-300"></span>
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">Terms of use</p>
            <span className="w-0.5 h-5 border bg-gray-300"></span>
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">Security</p>
            <span className="w-0.5 h-5 border bg-gray-300"></span>
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">Privacy</p>
          </div>
          <div className="flex flex-row items-center justify-around">
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">&copy; 2022 BayHawk. All Rights Reserved</p>
          </div>
          <div className="flex flex-row items-center justify-around">
            <p className="text-stone-400 text-xt xl:text-sm lg:text-xs md:text-xt">Need help? Visit the <span className="text-sky-500 font-medium">Help Center</span> or <span className="text-sky-500 font-medium">Contact Us</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
