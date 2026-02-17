import { useNavigate } from '@tanstack/react-router';
import { useCategories } from '@/features/categories/useCategories';
import { getCategoryLabel } from '@/lib/categoryHelpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, FolderOpen } from 'lucide-react';
import { Category } from '@/backend';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">Error loading categories</p>
          <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (category: Category) => {
    navigate({ to: '/documents', search: { category } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Select a category to view documents
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <Card
            key={category}
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => handleCategoryClick(category)}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-6">
                <FolderOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">{getCategoryLabel(category)}</h3>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category);
                }}
              >
                View Documents
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {categories?.length === 0 && (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No categories available</p>
          </div>
        </div>
      )}
    </div>
  );
}
