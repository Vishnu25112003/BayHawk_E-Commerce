"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Bell, Shield, Sun, Globe, Trash2, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// ... other imports

export default function SettingsPage() {
  const router = useRouter()
  const { user, setUser } = useStore()
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImage || "")
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    darkMode: false,
    language: "en",
    twoFactorAuth: false,
  })

  const handleDeleteAccount = () => {
    setUser(null)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Settings</span>
        </div>

        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="max-w-2xl space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Profile Information</CardTitle>
              </div>
              <CardDescription>Manage your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      {user?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="profile-image-url">Profile Image URL</Label>
                  <Input
                    id="profile-image-url"
                    placeholder="Enter image URL"
                    value={profileImageUrl}
                    onChange={(e) => setProfileImageUrl(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (user) {
                        setUser({ ...user, profileImage: profileImageUrl })
                      }
                    }}
                  >
                    Save Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex-1">
                  Email Notifications
                  <p className="text-sm text-muted-foreground font-normal">Receive updates via email</p>
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications" className="flex-1">
                  SMS Notifications
                  <p className="text-sm text-muted-foreground font-normal">Get text messages for orders</p>
                </Label>
                <Switch
                  id="sms-notifications"
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="flex-1">
                  Push Notifications
                  <p className="text-sm text-muted-foreground font-normal">Receive browser notifications</p>
                </Label>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="order-updates" className="flex-1">
                  Order Updates
                  <p className="text-sm text-muted-foreground font-normal">Real-time order tracking</p>
                </Label>
                <Switch
                  id="order-updates"
                  checked={settings.orderUpdates}
                  onCheckedChange={(checked) => setSettings({ ...settings, orderUpdates: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotional-emails" className="flex-1">
                  Promotional Emails
                  <p className="text-sm text-muted-foreground font-normal">Offers, deals, and promotions</p>
                </Label>
                <Switch
                  id="promotional-emails"
                  checked={settings.promotionalEmails}
                  onCheckedChange={(checked) => setSettings({ ...settings, promotionalEmails: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="flex-1">
                  Dark Mode
                  <p className="text-sm text-muted-foreground font-normal">Use dark theme</p>
                </Label>
                <Switch
                  id="dark-mode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="flex-1">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Language
                  </div>
                  <p className="text-sm text-muted-foreground font-normal">Select your preferred language</p>
                </Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings({ ...settings, language: value })}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="mr">Marathi</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Protect your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="flex-1">
                  Two-Factor Authentication
                  <p className="text-sm text-muted-foreground font-normal">Add extra security to your account</p>
                </Label>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                />
              </div>
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
              </div>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
