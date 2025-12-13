import { useState } from "react"
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const transactions = [
  {
    id: "1",
    type: "credit",
    amount: 100,
    description: "Referral Bonus",
    date: "2025-01-20",
  },
  {
    id: "2",
    type: "debit",
    amount: 50,
    description: "Order #FC1234567890",
    date: "2025-01-18",
  },
  {
    id: "3",
    type: "credit",
    amount: 200,
    description: "Added Money",
    date: "2025-01-15",
  },
]

export default function AccountWalletPage() {
  const { walletBalance, addWalletBalance } = useStore()
  const [addAmount, setAddAmount] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddMoney = () => {
    const amount = Number.parseInt(addAmount)
    if (amount > 0) {
      addWalletBalance(amount)
      setAddAmount("")
      setDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink to="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink to="/account">My Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Wallet</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-2xl mx-auto">
          {/* Balance Card */}
          <Card className="bg-primary text-primary-foreground mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Wallet Balance</p>
                  <p className="text-4xl font-bold">₹{walletBalance}</p>
                </div>
                <Wallet className="h-12 w-12 text-primary-foreground/80" />
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Money to Wallet</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      {[100, 200, 500, 1000].map((amount) => (
                        <Button key={amount} variant="outline" onClick={() => setAddAmount(amount.toString())}>
                          ₹{amount}
                        </Button>
                      ))}
                    </div>
                    <Button className="w-full" onClick={handleAddMoney}>
                      Add ₹{addAmount || 0}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between py-3 border-b border-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            txn.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
                          )}
                        >
                          {txn.type === "credit" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{txn.description}</p>
                          <p className="text-sm text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={cn("font-bold", txn.type === "credit" ? "text-green-600" : "text-red-600")}>
                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No transactions yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
