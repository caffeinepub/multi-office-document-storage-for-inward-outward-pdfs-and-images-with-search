import { Category } from '@/backend';

// Helper to get office options for a specific category
export function getOfficeOptions(category: Category | null): Array<{ value: string; label: string }> {
  if (!category) return [];
  
  return category.offices.map((office) => ({
    value: office.id,
    label: office.name,
  }));
}

// Helper to get office name by ID from a category
export function getOfficeName(category: Category | null, officeId: string): string {
  if (!category) return officeId;
  
  const office = category.offices.find((o) => o.id === officeId);
  return office?.name || officeId;
}
