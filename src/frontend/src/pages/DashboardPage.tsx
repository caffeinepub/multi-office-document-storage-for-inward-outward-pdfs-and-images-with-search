import { useNavigate } from '@tanstack/react-router';
import { useCategories } from '@/features/categories/useCategories';
import { useDashboardMetrics } from '@/features/dashboard/useDashboardMetrics';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, FolderOpen, FileText, Users, ArrowDownToLine, ArrowUpFromLine, Star } from 'lucide-react';
import { Category } from '@/backend';

export function DashboardPage() {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useDashboardMetrics();

  const isLoading = categoriesLoading || metricsLoading;
  const error = categoriesError || metricsError;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">Error loading dashboard</p>
          <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (categoryId: string) => {
    navigate({ to: '/documents', search: { categoryId } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your document archive
        </p>
      </div>

      {/* Metrics Section - 30% smaller with colored backgrounds */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {/* Total Documents - Light Green Background */}
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-2">
              <FileText className="h-4 w-4 text-green-700 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-700 dark:text-green-300">Total Documents</p>
              <p className="text-xl font-bold text-green-900 dark:text-green-100">{metrics ? Number(metrics.totalDocuments) : 0}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Users - Orange Background */}
        <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-orange-100 dark:bg-orange-900/40 p-2">
              <Users className="h-4 w-4 text-orange-700 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-orange-700 dark:text-orange-300">Total Users</p>
              <p className="text-xl font-bold text-orange-900 dark:text-orange-100">{metrics ? Number(metrics.uniqueUserCount) : 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Direction Counts Section - Reduced by 30% */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Documents by Direction</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Inward Documents */}
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-2">
                <ArrowDownToLine className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Inward</p>
                <p className="text-lg font-bold">{metrics ? Number(metrics.inwardDocuments) : 0}</p>
              </div>
            </CardContent>
          </Card>

          {/* Outward Documents */}
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                <ArrowUpFromLine className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Outward</p>
                <p className="text-lg font-bold">{metrics ? Number(metrics.outwardDocuments) : 0}</p>
              </div>
            </CardContent>
          </Card>

          {/* Important Documents */}
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-2">
                <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Important</p>
                <p className="text-lg font-bold">{metrics ? Number(metrics.importantDocuments) : 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Categories Section - Reduced by ~50% */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <div className="mb-2 rounded-full bg-primary/10 p-3">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.offices.length} office{category.offices.length !== 1 ? 's' : ''}
                </p>
                <Button
                  size="sm"
                  className="mt-3 bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id);
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
              <p className="text-xs text-muted-foreground mt-1">Add categories in Settings to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
