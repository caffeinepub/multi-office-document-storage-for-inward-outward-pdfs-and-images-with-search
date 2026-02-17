import { Category } from '@/backend';

// Helper to get a display label for a backend Category object
export function getCategoryLabel(category: Category): string {
  return category.name;
}

// Get all available categories as options for Select components from backend data
export function getCategoryOptions(categories: Category[]): Array<{ value: string; label: string }> {
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
}
