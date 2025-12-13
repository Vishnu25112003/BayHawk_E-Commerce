import { useState } from "react"
import { Clock, ChefHat, Play, ShoppingCart } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingElements } from "@/components/layout/floating-elements"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { recipes } from "@/lib/data"

const categories = ["All", "Quick & Easy", "Traditional", "Grilled", "Curry"]

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedRecipe, setSelectedRecipe] = useState<(typeof recipes)[0] | null>(null)

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
