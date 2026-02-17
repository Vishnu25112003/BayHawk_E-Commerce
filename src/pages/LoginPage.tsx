import type React from "react"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone")

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginPhone, setLoginPhone] = useState("")
  const [loginOtp, setLoginOtp] = useState("")
  const [showLoginOtp, setShowLoginOtp] = useState(false)

  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPhone, setRegisterPhone] = useState("")
  const [registerAltPhone, setRegisterAltPhone] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  // OTP state
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: loginEmail, name: "User" })
    navigate("/")
  }

  const handleSendLoginOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowLoginOtp(true)
    setIsLoading(false)
  }

  const handleVerifyLoginOtp = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: loginPhone, name: "User" })
    navigate("/")
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
    navigate("/")
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setUser({ email: `user@${provider}.com`, name: "User" })
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <img src="/bayhawk-logo.svg" alt="BayHawk Logo" className="w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold">Welcome to BayHawk</h1>
            <p className="text-muted-foreground">Login or create an account to continue</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              {authMethod === "phone" && showLoginOtp ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
                    <h2 className="text-xl font-bold">Verify OTP</h2>
                    <p className="text-muted-foreground">We sent a code to {loginPhone}</p>
                  </div>

                  <div>
                    <Label htmlFor="login-otp">Enter OTP</Label>
                    <Input
                      id="login-otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      maxLength={6}
                      className="text-center text-2xl tracking-widest"
                    />
                  </div>

                  <Button className="w-full" onClick={handleVerifyLoginOtp} disabled={isLoading || loginOtp.length !== 6}>
                    {isLoading ? "Verifying..." : "Verify & Login"}
                  </Button>

                  <Button variant="ghost" className="w-full" onClick={() => setShowLoginOtp(false)}>
                    Change Phone Number
                  </Button>
                </div>
              ) : (
                <form onSubmit={authMethod === "phone" ? handleSendLoginOtp : handleLogin} className="space-y-4">
                  {/* Auth Method Toggle */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={authMethod === "phone" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => setAuthMethod("phone")}
                    >
                      <Phone className="h-4 w-4" />
                      Phone
                    </Button>
                    <Button
                      type="button"
                      variant={authMethod === "email" ? "default" : "outline"}
                      className="flex-1 gap-2"
                      onClick={() => setAuthMethod("email")}
                    >
                      <Mail className="h-4 w-4" />
                      Email
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
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        required
                      />
                    </div>
                  )}

                  {authMethod === "email" && (
                    <>
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
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (authMethod === "phone" ? "Sending OTP..." : "Logging in...") : (authMethod === "phone" ? "Send OTP" : "Login")}
                  </Button>
                </form>
              )}

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
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleSocialLogin("apple")}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
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
                    <Label htmlFor="register-alt-phone">Alternate Phone Number (Optional)</Label>
                    <Input
                      id="register-alt-phone"
                      type="tel"
                      placeholder="9876543210"
                      value={registerAltPhone}
                      onChange={(e) => setRegisterAltPhone(e.target.value)}
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

