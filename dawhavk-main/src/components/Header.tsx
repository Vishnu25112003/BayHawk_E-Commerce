"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@publicImages/BayHawk.svg";
import mappin from "@publicImages/Icons/Location Pin.svg";
import category from "@publicImages/Icons/Categories.svg";
import favorite from "@publicImages/Icons/Favorite icon.svg";
import cart from "@publicImages/Icons/Cart.svg";
import myaccount from "@publicImages/Icons/My Account.svg";
import contact from "@publicImages/Icons/Contact Us.svg";
import searchicon from "@publicImages/Icons/Search.svg";



import {
  Search,
  ChevronDown,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location, setLocation] = useState("Your Location");

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="DayHawk"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" className="flex justify-start items-center gap-2">
                  {location} <ChevronDown className="h-4 w-4" />
                </Button>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for your delicious product"
                    className="w-full pr-10 pl-4"
                  />
                  <Button size="icon" variant="ghost" className="absolute right-0 top-0">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Link href="/categories">
                  <Button variant="ghost" className="w-full justify-start">Categories</Button>
                </Link>
                <Link href="/wishlist">
                  <Button variant="ghost" className="w-full justify-start">Wishlist</Button>
                </Link>
                <Link href="/cart">
                  <Button variant="ghost" className="w-full justify-start">Cart</Button>
                </Link>
                <Link href="/account">
                  <Button variant="ghost" className="w-full justify-start">My Account</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 flex-1 ml-10">
          {/* Location Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Developed by Gowtham */}
              <Button variant="outline" className="flex items-center gap-3 text-sky-700">
                <Image
                  src={mappin}
                  alt="My Icon"
                  width={20}
                  height={20}
                />
                  {location} 
                <ChevronDown color="gray" strokeWidth={4}/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLocation("New York")}>New York</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Los Angeles")}>Los Angeles</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Chicago")}>Chicago</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Miami")}>Miami</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          {/* <div className="relative flex-1 max-w-xl">
            <Input
              type="text"
              placeholder="Search for your delicious product"
              className="w-full pr-10 pl-4"
            />
            <Button size="icon" variant="destructive" className="absolute right-0 top-0">
              <Image
                  src={searchicon}
                  alt="My Icon"
                  width={15}
                  height={15}
              />
            </Button>
          </div> */}
          <div className="relative flex-1 max-w-xl xl:max-w-sm lg:max-w-sm ">
            <Input
              type="text"
              placeholder="Search for your delicious product"
              className="w-full pr-10 pl-4 xl:max-w-sm xl:text-xs lg:max-w-sm lg:text-xt"
            />
            <Button size="icon" variant="destructive" className="absolute right-0 top-0">
              <Image
                  src={searchicon}
                  alt="My Icon"
                  width={15}
                  height={15}
                  className="lg:w-3 lg:h-3"
              />
            </Button>
          </div>
        </div>

        {/* Right Side Navigation */}
        {/* Developed by Gowtham */}
        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-sm">
            <Image
              src={category}
              alt="My Icon"
              width={20}
              height={20}
            />
            Categories
            <Button variant="ghost">
              <Image
                src={favorite}
                alt="My Icon"
                width={20}
                height={20}
              />
            {/* <Heart strokeWidth={1.2} className="min-w-6 min-h-7 mt-1"/> */}
          </Button>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Link href="/cart">          
            <Image
              src={cart}
              alt="My Icon"
              width={25}
              height={25}
            />
            </Link>
            <span className="absolute -top-0 -right-0 bg-red-500 font-semibold text-white text-2xs rounded-sm w-4 h-4 flex items-center justify-center">2</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <img src="/Website Source Files/Other Images/en_flag.png" className="w-6 h-6 mt-1" alt="category_icon" />
                <span style={{fontSize:'12px'}} className="font-bold">EN</span>
                <ChevronDown color="gray" strokeWidth={3} size={15}/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex items-end">
              <DropdownMenuItem onClick={() => setLocation("EN")}>
                <div className="flex items-center gap-2 justify-center">
                  <img src="/Website Source Files/Other Images/en_flag.png" className="w-6 h-6 mt-1" alt="category_icon" />
                  <span style={{fontSize:'14px'}} className="font-bold">English</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Image
                  src={myaccount}
                  alt="My Icon"
                  width={25}
                  height={25}
                />
                <div className="text-left text-sm">
                  <div className="text-gray-500 text-1xl">India</div>
                  <Link href="/account" className="font-medium flex gap-1">My Account <ChevronDown color="gray" strokeWidth={3} /></Link>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <Image
              src={contact}
              alt="My Icon"
              width={25}
              height={25}
            />
            <div className="text-left text-sm">
              <div className="text-gray-500 text-sm">Home Delivery</div>
              <div className="font-semibold text-sm">+91 984 044 0209</div>
            </div>
            
          </div>
        </div>
      </div>
    </header>
  );
}
