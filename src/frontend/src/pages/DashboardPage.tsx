import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCategories } from "@/features/categories/useCategories";
import { useDashboardMetrics } from "@/features/dashboard/useDashboardMetrics";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  FolderOpen,
  Loader2,
  Star,
  Users,
} from "lucide-react";

const CATEGORY_COLORS = [
  "bg-violet-600 hover:bg-violet-700",
  "bg-cyan-600 hover:bg-cyan-700",
  "bg-rose-600 hover:bg-rose-700",
  "bg-amber-600 hover:bg-amber-700",
  "bg-emerald-600 hover:bg-emerald-700",
  "bg-indigo-600 hover:bg-indigo-700",
  "bg-fuchsia-600 hover:bg-fuchsia-700",
];

export function DashboardPage() {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    data: metrics,
    isLoading: metricsLoading,
    error: metricsError,
  } = useDashboardMetrics();

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
    navigate({ to: "/app/documents", search: { categoryId } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your document archive
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card className="bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-violet-100 dark:bg-violet-900/40 p-2">
              <FileText className="h-4 w-4 text-violet-700 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-violet-700 dark:text-violet-300">
                Total Documents
              </p>
              <p className="text-xl font-bold text-violet-900 dark:text-violet-100">
                {metrics ? Number(metrics.totalDocuments) : 0}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-900">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/40 p-2">
              <Users className="h-4 w-4 text-cyan-700 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-cyan-700 dark:text-cyan-300">
                Total Users
              </p>
              <p className="text-xl font-bold text-cyan-900 dark:text-cyan-100">
                {metrics ? Number(metrics.uniqueUserCount) : 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Direction Counts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Documents by Direction</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/20 p-2">
                <ArrowDownToLine className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Inward
                </p>
                <p className="text-lg font-bold">
                  {metrics ? Number(metrics.inwardDocuments) : 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-2">
                <ArrowUpFromLine className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Outward
                </p>
                <p className="text-lg font-bold">
                  {metrics ? Number(metrics.outwardDocuments) : 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-2">
                <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Important
                </p>
                <p className="text-lg font-bold">
                  {metrics ? Number(metrics.importantDocuments) : 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories?.map((category, i) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
              data-ocid="dashboard.category.card"
            >
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <div
                  className={`mb-2 rounded-full p-3 ${CATEGORY_COLORS[i % CATEGORY_COLORS.length].split(" ")[0].replace("bg-", "bg-").replace("600", "100")} dark:bg-primary/20`}
                >
                  <FolderOpen
                    className={`h-6 w-6 ${CATEGORY_COLORS[i % CATEGORY_COLORS.length].split(" ")[0].replace("bg-", "text-")}`}
                  />
                </div>
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.offices.length} office
                  {category.offices.length !== 1 ? "s" : ""}
                </p>
                <Button
                  size="sm"
                  className={`mt-3 text-white ${CATEGORY_COLORS[i % CATEGORY_COLORS.length]}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id);
                  }}
                  data-ocid="dashboard.category.button"
                >
                  View Documents
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories?.length === 0 && (
          <div
            className="flex min-h-[300px] items-center justify-center"
            data-ocid="dashboard.category.empty_state"
          >
            <div className="text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                No categories available
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add categories in Settings to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
