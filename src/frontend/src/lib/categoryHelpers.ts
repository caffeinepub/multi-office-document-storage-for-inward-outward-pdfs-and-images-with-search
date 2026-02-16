import { Category } from '@/backend';

// Helper to get a display label for a Category
export function getCategoryLabel(category: Category): string {
  switch (category) {
    case Category.nursingInstitute:
      return 'Nursing Institute';
    case Category.paramedicalInstitute:
      return 'Paramedical Institute';
    case Category.ayurvedCollege:
      return 'Ayurved College';
    case Category.ayurvedHospital:
      return 'Ayurved Hospital';
    case Category.pharmacyCollege:
      return 'Pharmacy College';
    case Category.generalCorrespondence:
      return 'General Correspondence';
    case Category.socialMediaEvents:
      return 'Social Media & Events';
  }
}

// Get all available categories as options for Select components
export function getAllCategoryOptions(): Array<{ value: Category; label: string }> {
  return [
    { value: Category.nursingInstitute, label: 'Nursing Institute' },
    { value: Category.paramedicalInstitute, label: 'Paramedical Institute' },
    { value: Category.ayurvedCollege, label: 'Ayurved College' },
    { value: Category.ayurvedHospital, label: 'Ayurved Hospital' },
    { value: Category.pharmacyCollege, label: 'Pharmacy College' },
    { value: Category.generalCorrespondence, label: 'General Correspondence' },
    { value: Category.socialMediaEvents, label: 'Social Media & Events' },
  ];
}
