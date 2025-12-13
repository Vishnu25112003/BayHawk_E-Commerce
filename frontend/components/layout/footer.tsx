import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { notification } from "@/lib/notification"

export function Footer() {
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    notification.success(`Successfully subscribed with ${email}!`, "Newsletter Subscription")
    setEmail("")
  }

  return (
    <footer className="bg-[#0A4D8C] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="col-span-full md:col-span-1 lg:col-span-1 flex justify-center md:justify-start items-center">
            <img src="/public/bayhawk-logo-light.png" alt="BayHawk Logo" className="h-20 w-auto" />
          </div>

          {/* About - Added more links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link to="/contact" className="hover:text-background transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-background transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-background transition-colors">
                  Our Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help - Added more links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link to="/help/payments" className="hover:text-background transition-colors">
                  Payments
                </Link>
              </li>
              <li>
                <Link to="/help/shipping" className="hover:text-background transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/help/returns" className="hover:text-background transition-colors">
                  Cancellation & Returns
                </Link>
              </li>
              <li>
                <Link to="/contact#faq" className="hover:text-background transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <button onClick={() => setTermsOpen(true)} className="hover:text-background transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setPrivacyOpen(true)} className="hover:text-background transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-background/80 text-sm mb-4">
              Subscribe to get updates on fresh catches and exclusive offers!
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button type="submit" variant="secondary" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Simplified */}
        <div className="mt-10 pt-6 border-t border-background/20">
          {/* Social, Payment & FSSAI in one row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-background/70">Follow us:</span>
              <div className="flex gap-2">
                <a href="#" className="hover:text-white transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* FSSAI - Compact */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <div className="bg-white rounded px-1.5 py-1">
                <img 
                  src="https://icon2.cleanpng.com/20180810/yvb/9303743baaa684eecb7d6910545660bc.webp" 
                  alt="FSSAI" 
                  className="h-6 w-auto"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-tight">FSSAI Certified</p>
                <p className="text-[10px] text-background/70">Lic: 12345678901234</p>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-background/70">We accept:</span>
              <div className="bg-white/90 rounded px-2 py-1">
                <img 
                  src="/Website Source Files/payment.png" 
                  alt="Payment Methods" 
                  className="h-5 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Copyright - Compact */}
          <div className="text-center text-xs text-background/60 py-3 border-t border-background/10">
            <p>© 2025 FreshCatch. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Terms & Conditions</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="prose prose-sm">
              <h4>1. General Terms</h4>
              <p>
                By accessing and using FreshCatch website, you accept and agree to be bound by the terms and conditions
                of this agreement.
              </p>
              <h4>2. Products and Pricing</h4>
              <p>
                All products are subject to availability. Prices are subject to change without notice. We reserve the
                right to limit quantities.
              </p>
              <h4>3. Delivery</h4>
              <p>
                We strive to deliver within the promised timeframe. Delivery times may vary based on location and
                availability.
              </p>
              <h4>4. Returns and Refunds</h4>
              <p>
                If you are not satisfied with the quality of the product, please contact us within 2 hours of delivery
                for a refund or replacement.
              </p>
              <h4>5. Privacy</h4>
              <p>
                Your privacy is important to us. Please review our Privacy Policy for details on how we collect and use
                your information.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Privacy Modal */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Privacy Policy</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            <div className="prose prose-sm">
              <h4>Information We Collect</h4>
              <p>
                We collect information you provide directly to us, such as when you create an account, place an order,
                or contact us for support.
              </p>
              <h4>How We Use Your Information</h4>
              <p>
                We use the information we collect to process orders, communicate with you, and improve our services.
              </p>
              <h4>Information Sharing</h4>
              <p>
                We do not sell or rent your personal information to third parties. We may share information with service
                providers who assist us in our operations.
              </p>
              <h4>Data Security</h4>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized access
                or disclosure.
              </p>
              <h4>Your Rights</h4>
              <p>
                You have the right to access, correct, or delete your personal information. Contact us to exercise these
                rights.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
