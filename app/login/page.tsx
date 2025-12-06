"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Eye, EyeOff, Mail, Phone, Lock, Apple, Chrome } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  // OTP state
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: loginEmail, name: "User" })
    router.push("/")
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowOtp(true)
    setIsLoading(false)
  }

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: registerEmail, name: registerName })
    router.push("/")
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: `user@${provider}.com`, name: "User" })
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex-shrink-0">
          <img src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg" alt="BayHawk Logo" className="h-8 w-auto" />
        </Link>
        <div className="w-10" /> {/* Spacer */}
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="https://bayhawk.clientstagingdemo.com/_next/static/media/BayHawk.207595da.svg" alt="BayHawk Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">Login or create an account to continue</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Auth Method Toggle */}
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={authMethod === "email" ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => setAuthMethod("email")}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={authMethod === "phone" ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => setAuthMethod("phone")}
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </Button>
                </div>

                {authMethod === "email" ? (
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="login-phone">Phone Number</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                >
                  <Chrome className="h-5 w-5 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleSocialLogin("apple")}
                  disabled={isLoading}
                >
                  <Apple className="h-5 w-5 mr-2" />
                  Apple
                </Button>
              </div>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              {!showOtp ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      placeholder="Your name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-phone">Phone Number</Label>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h2 className="text-xl font-bold">Verify OTP</h2>
                    <p className="text-muted-foreground">We sent a code to {registerPhone}</p>
                  </div>

                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>

                  <Button className="w-full" onClick={handleVerifyOtp} disabled={isLoading || otp.length !== 6}>
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                  </Button>

                  <Button variant="ghost" className="w-full" onClick={() => setShowOtp(false)}>
                    Change Phone Number
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
