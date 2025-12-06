import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import logo from "@publicImages/BayHawk.svg";

const montserratSans = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "BayHawak - Fresh Seafood Delivery",
  description: "Premium quality seafood delivered to your doorstep. Daily fresh catches, expert quality checks, and chemical-free products.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  keywords: ["seafood", "delivery", "fresh fish", "premium seafood", "food delivery", "DayHawk"],
  authors: [{ name: "DayHawk Inc." }],
  creator: "BayHawk Inc.",
  publisher: "BayHawk Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserratSans.variable}`}>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}
