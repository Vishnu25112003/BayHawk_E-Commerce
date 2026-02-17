import { useState } from "react"
import { Clock, ChefHat, Play, ShoppingCart, ThumbsUp, ThumbsDown, Camera, Upload } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { recipes } from "@/lib/data"
import { notification } from "@/lib/notification"

const categories = ["All", "Quick & Easy", "Traditional", "Grilled", "Curry"]

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recipes)[0] | null>(null)
  const [liked, setLiked] = useState<boolean | null>(null)
  const [showTipsForm, setShowTipsForm] = useState(false)
  const [tips, setTips] = useState("")
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const handleLike = (isLike: boolean) => {
    setLiked(isLike)
    notification.success(isLike ? "Thanks for liking this recipe!" : "Thanks for your feedback!")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedImages([...uploadedImages, ...Array.from(e.target.files)])
    }
  }

  const handleSubmitTips = () => {
    if (tips.trim() || uploadedImages.length > 0) {
      notification.success("Your tips and photos have been posted!")
      setTips("")
      setUploadedImages([])
      setShowTipsForm(false)
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
              <BreadcrumbPage>Recipes</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Seafood Recipes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover delicious seafood recipes from our expert chefs. Easy to follow instructions with fresh ingredients
            delivered to your door.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="relative aspect-video">
                <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {recipe.difficulty}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recipe Detail Modal */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedRecipe && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedRecipe.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Video */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary">
                    <img
                      src={selectedRecipe.image || "/placeholder.svg"}
                      alt={selectedRecipe.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="gap-2">
                        <Play className="h-5 w-5" />
                        Watch Video
                      </Button>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedRecipe.time}
                    </Badge>
                    <Badge variant="secondary">
                      <ChefHat className="h-4 w-4 mr-1" />
                      {selectedRecipe.difficulty}
                    </Badge>
                  </div>

                  {/* Ingredients */}
                  <div>
                    <h4 className="font-bold mb-3">Ingredients</h4>
                    <ul className="space-y-2">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                          <span>{ingredient}</span>
                          <Button size="sm" variant="ghost">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add All Ingredients to Cart
                    </Button>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="font-bold mb-3">Cooking Steps</h4>
                    <ol className="space-y-4">
                      {selectedRecipe.steps.map((step, index) => (
                        <li key={index} className="flex gap-4">
                          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold">
                            {index + 1}
                          </span>
                          <p className="text-muted-foreground">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Like/Dislike Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Do you like this recipe</h4>
                      <div className="flex gap-2">
                        <Button
                          variant={liked === true ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleLike(true)}
                          className="gap-2"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          YES
                        </Button>
                        <Button
                          variant={liked === false ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleLike(false)}
                          className="gap-2"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          NO
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tips & Photos Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Tips & photos (0)</h4>
                        <p className="text-sm text-muted-foreground">Be the first to add tips to this recipe</p>
                      </div>
                      <Button
                        onClick={() => setShowTipsForm(!showTipsForm)}
                        className="gap-2"
                      >
                        <Camera className="h-4 w-4" />
                        POST TIPS & PHOTOS
                      </Button>
                    </div>

                    {/* Tips Form */}
                    {showTipsForm && (
                      <div className="space-y-4 mt-4 p-4 border rounded-lg bg-secondary/30">
                        <div>
                          <Label htmlFor="tips">Share your tips</Label>
                          <Textarea
                            id="tips"
                            placeholder="Share your cooking tips, modifications, or experience with this recipe..."
                            value={tips}
                            onChange={(e) => setTips(e.target.value)}
                            className="mt-2"
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="photos">Upload photos</Label>
                          <div className="mt-2">
                            <label
                              htmlFor="photos"
                              className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
                            >
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Click to upload photos (max 5)
                              </span>
                              <input
                                id="photos"
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </label>
                          </div>
                          {uploadedImages.length > 0 && (
                            <div className="mt-2 flex gap-2 flex-wrap">
                              {uploadedImages.map((file, index) => (
                                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={handleSubmitTips} className="flex-1">
                            Post Tips
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowTipsForm(false)
                              setTips("")
                              setUploadedImages([])
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <FloatingElements />
    </div>
  )
}
