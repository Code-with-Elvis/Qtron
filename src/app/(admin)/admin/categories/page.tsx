import { categories } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package2 } from "lucide-react";

const Categories = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground mt-1 hidden sm:block">
            Manage product categories and subcategories
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2 rounded">
          {categories.length} Categories
        </Badge>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow rounded"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package2 className="size-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium mb-3">
                  Subcategories ({category.subcategories.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.subcategories.map((sub, subIndex) => (
                    <Badge
                      key={subIndex}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="bg-muted/50 rounded">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">
                {categories.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total Categories
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">
                {categories.reduce(
                  (acc, cat) => acc + cat.subcategories.length,
                  0
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total Subcategories
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">
                {Math.round(
                  categories.reduce(
                    (acc, cat) => acc + cat.subcategories.length,
                    0
                  ) / categories.length
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Avg Subcategories
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Categories;
