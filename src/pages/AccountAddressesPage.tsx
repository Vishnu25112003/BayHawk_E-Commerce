import { useState } from "react"
import { Link } from "react-router-dom"
import { MapPin, Plus, ChevronRight, Home, Briefcase, Edit, Trash2, Navigation, Loader2 } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface Address {
  id: string
  type: "home" | "work" | "other"
  name: string
  phone: string
  line1: string
  line2: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    name: "John Doe",
    phone: "9876543210",
    line1: "123, Marine Drive",
    line2: "Near Gateway of India",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    isDefault: true,
  },
  {
    id: "2",
    type: "work",
    name: "John Doe",
    phone: "9876543210",
    line1: "456, Business Park",
    line2: "Sector 5, BKC",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400051",
    isDefault: false,
  },
]

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [formData, setFormData] = useState<Omit<Address, "id" | "isDefault">>({
    type: "home",
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  })

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setFormData({
      type: address.type,
      name: address.name,
      phone: address.phone,
      line1: address.line1,
      line2: address.line2,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    })
    setDialogOpen(true)
  }

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser")
      return
    }

    setIsLoadingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await response.json()
          
          setFormData({
            ...formData,
            line1: data.address.road || data.address.suburb || "",
            line2: data.address.neighbourhood || data.address.suburb || "",
            city: data.address.city || data.address.town || data.address.village || "",
            state: data.address.state || "",
            pincode: data.address.postcode || "",
          })
        } catch (error) {
          alert("Failed to fetch address from location")
        } finally {
          setIsLoadingLocation(false)
        }
      },
      () => {
        alert("Unable to retrieve your location")
        setIsLoadingLocation(false)
      }
    )
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((addr) => ({ ...addr, isDefault: addr.id === id })))
  }

  const handleSave = () => {
    if (editingAddress) {
      setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...formData } : addr)))
    } else {
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      }
      setAddresses([...addresses, newAddress])
    }
    setDialogOpen(false)
    setEditingAddress(null)
    setFormData({
      type: "home",
      name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    })
  }

  const openNewAddressDialog = () => {
    setEditingAddress(null)
    setFormData({
      type: "home",
      name: "",
      phone: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    })
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/account" className="text-muted-foreground hover:text-foreground">
            Account
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Addresses</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Saved Addresses</h1>
          <Button onClick={openNewAddressDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        </div>

        {addresses.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <Card key={address.id} className={cn(address.isDefault && "ring-2 ring-primary")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {address.type === "home" ? (
                        <Home className="h-5 w-5 text-primary" />
                      ) : address.type === "work" ? (
                        <Briefcase className="h-5 w-5 text-primary" />
                      ) : (
                        <MapPin className="h-5 w-5 text-primary" />
                      )}
                      <span className="font-semibold capitalize">{address.type}</span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Default</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(address)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p className="font-medium">{address.name}</p>
                    <p className="text-muted-foreground">{address.line1}</p>
                    {address.line2 && <p className="text-muted-foreground">{address.line2}</p>}
                    <p className="text-muted-foreground">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="text-muted-foreground">Phone: {address.phone}</p>
                  </div>

                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 bg-transparent"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">No addresses saved</h2>
            <p className="text-muted-foreground mb-6">Add an address to make checkout faster</p>
            <Button onClick={openNewAddressDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </div>
        )}

        {/* Add/Edit Address Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={handleGetCurrentLocation}
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Getting location...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4" />
                    Use Current Location
                  </>
                )}
              </Button>

              <div>
                <Label>Address Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value: "home" | "work" | "other") => setFormData({ ...formData, type: value })}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home" className="cursor-pointer">
                      Home
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="work" id="work" />
                    <Label htmlFor="work" className="cursor-pointer">
                      Work
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="line1">Address Line 1</Label>
                <Input
                  id="line1"
                  value={formData.line1}
                  onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                  placeholder="House no, Building name, Street"
                />
              </div>

              <div>
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input
                  id="line2"
                  value={formData.line2}
                  onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                  placeholder="Landmark, Area"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
              </div>

              <Button onClick={handleSave} className="w-full">
                {editingAddress ? "Update Address" : "Save Address"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  )
}
