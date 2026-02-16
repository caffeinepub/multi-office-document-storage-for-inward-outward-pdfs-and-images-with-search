import { Office, GenericOffice, NursingOffice, Category } from '@/backend';

// Helper to get a display label for an Office
export function getOfficeLabel(office: Office): string {
  switch (office.__kind__) {
    case 'nursingInstitute':
      return getNursingOfficeLabel(office.nursingInstitute);
    case 'paramedicalInstitute':
      return getGenericOfficeLabel(office.paramedicalInstitute);
    case 'ayurvedCollege':
      return getGenericOfficeLabel(office.ayurvedCollege);
    case 'ayurvedHospital':
      return getGenericOfficeLabel(office.ayurvedHospital);
    case 'pharmacyCollege':
      return getGenericOfficeLabel(office.pharmacyCollege);
    case 'generalCorrespondence':
      return getGenericOfficeLabel(office.generalCorrespondence);
    case 'socialMediaEvents':
      return getGenericOfficeLabel(office.socialMediaEvents);
  }
}

function getNursingOfficeLabel(office: NursingOffice): string {
  switch (office) {
    case NursingOffice.mahatmaPhuleNursingSchoolAkola:
      return 'Mahatma Phule Nursing School, Akola';
    case NursingOffice.mahatmaPhuleInstituteAnm:
      return 'Mahatma Phule Institute of Nursing, Akola (ANM)';
    case NursingOffice.mahatmaPhuleInstituteGnm:
      return 'Mahatma Phule Institute of Nursing, Akola (GNM)';
    case NursingOffice.mahatmaPhuleInstituteBsc:
      return 'Mahatma Phule Institute of Nursing, Akola (B.Sc.)';
    case NursingOffice.mahatmaPhuleInstitutePbbsc:
      return 'Mahatma Phule Institute of Nursing, Akola (P.B.B.Sc.)';
    case NursingOffice.kalaskarNursingInstituteNandura:
      return 'Kalaskar Nursing Institute, Nandura';
    case NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonAnm:
      return 'Mahatma Phule Nursing School, Babhulgaon (ANM)';
    case NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonGnm:
      return 'Mahatma Phule Nursing School, Babhulgaon (GNM)';
  }
}

function getGenericOfficeLabel(office: GenericOffice): string {
  switch (office) {
    case GenericOffice.office1:
      return 'Office 1';
    case GenericOffice.office2:
      return 'Office 2';
  }
}

// Helper to convert a string ID to an Office union
export function stringToOffice(value: string): Office | null {
  // Map nursing institute offices
  switch (value) {
    case 'nursingInstitute:mahatmaPhuleNursingSchoolAkola':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleNursingSchoolAkola };
    case 'nursingInstitute:mahatmaPhuleInstituteAnm':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleInstituteAnm };
    case 'nursingInstitute:mahatmaPhuleInstituteGnm':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleInstituteGnm };
    case 'nursingInstitute:mahatmaPhuleInstituteBsc':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleInstituteBsc };
    case 'nursingInstitute:mahatmaPhuleInstitutePbbsc':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleInstitutePbbsc };
    case 'nursingInstitute:kalaskarNursingInstituteNandura':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.kalaskarNursingInstituteNandura };
    case 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonAnm':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonAnm };
    case 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonGnm':
      return { __kind__: 'nursingInstitute', nursingInstitute: NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonGnm };
    // Map generic offices for other categories
    case 'paramedicalInstitute:office1':
      return { __kind__: 'paramedicalInstitute', paramedicalInstitute: GenericOffice.office1 };
    case 'paramedicalInstitute:office2':
      return { __kind__: 'paramedicalInstitute', paramedicalInstitute: GenericOffice.office2 };
    case 'ayurvedCollege:office1':
      return { __kind__: 'ayurvedCollege', ayurvedCollege: GenericOffice.office1 };
    case 'ayurvedCollege:office2':
      return { __kind__: 'ayurvedCollege', ayurvedCollege: GenericOffice.office2 };
    case 'ayurvedHospital:office1':
      return { __kind__: 'ayurvedHospital', ayurvedHospital: GenericOffice.office1 };
    case 'ayurvedHospital:office2':
      return { __kind__: 'ayurvedHospital', ayurvedHospital: GenericOffice.office2 };
    case 'pharmacyCollege:office1':
      return { __kind__: 'pharmacyCollege', pharmacyCollege: GenericOffice.office1 };
    case 'pharmacyCollege:office2':
      return { __kind__: 'pharmacyCollege', pharmacyCollege: GenericOffice.office2 };
    case 'generalCorrespondence:office1':
      return { __kind__: 'generalCorrespondence', generalCorrespondence: GenericOffice.office1 };
    case 'generalCorrespondence:office2':
      return { __kind__: 'generalCorrespondence', generalCorrespondence: GenericOffice.office2 };
    case 'socialMediaEvents:office1':
      return { __kind__: 'socialMediaEvents', socialMediaEvents: GenericOffice.office1 };
    case 'socialMediaEvents:office2':
      return { __kind__: 'socialMediaEvents', socialMediaEvents: GenericOffice.office2 };
    default:
      return null;
  }
}

// Helper to convert an Office to a string ID for Select components
export function officeToString(office: Office): string {
  const kind = office.__kind__;
  if (kind === 'nursingInstitute') {
    switch (office.nursingInstitute) {
      case NursingOffice.mahatmaPhuleNursingSchoolAkola:
        return 'nursingInstitute:mahatmaPhuleNursingSchoolAkola';
      case NursingOffice.mahatmaPhuleInstituteAnm:
        return 'nursingInstitute:mahatmaPhuleInstituteAnm';
      case NursingOffice.mahatmaPhuleInstituteGnm:
        return 'nursingInstitute:mahatmaPhuleInstituteGnm';
      case NursingOffice.mahatmaPhuleInstituteBsc:
        return 'nursingInstitute:mahatmaPhuleInstituteBsc';
      case NursingOffice.mahatmaPhuleInstitutePbbsc:
        return 'nursingInstitute:mahatmaPhuleInstitutePbbsc';
      case NursingOffice.kalaskarNursingInstituteNandura:
        return 'nursingInstitute:kalaskarNursingInstituteNandura';
      case NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonAnm:
        return 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonAnm';
      case NursingOffice.mahatmaPhuleNursingSchoolBabhulgaonGnm:
        return 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonGnm';
    }
  } else {
    // Generic offices
    const genericOffice = office[kind] as GenericOffice;
    return `${kind}:${genericOffice}`;
  }
}

// Get all available offices as string IDs with labels
export function getAllOfficeOptions(): Array<{ value: string; label: string; category: string }> {
  return [
    // Nursing Institute offices
    { value: 'nursingInstitute:mahatmaPhuleNursingSchoolAkola', label: 'Mahatma Phule Nursing School, Akola', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleInstituteAnm', label: 'Mahatma Phule Institute of Nursing, Akola (ANM)', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleInstituteGnm', label: 'Mahatma Phule Institute of Nursing, Akola (GNM)', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleInstituteBsc', label: 'Mahatma Phule Institute of Nursing, Akola (B.Sc.)', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleInstitutePbbsc', label: 'Mahatma Phule Institute of Nursing, Akola (P.B.B.Sc.)', category: 'nursingInstitute' },
    { value: 'nursingInstitute:kalaskarNursingInstituteNandura', label: 'Kalaskar Nursing Institute, Nandura', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonAnm', label: 'Mahatma Phule Nursing School, Babhulgaon (ANM)', category: 'nursingInstitute' },
    { value: 'nursingInstitute:mahatmaPhuleNursingSchoolBabhulgaonGnm', label: 'Mahatma Phule Nursing School, Babhulgaon (GNM)', category: 'nursingInstitute' },
    // Paramedical Institute offices
    { value: 'paramedicalInstitute:office1', label: 'Office 1', category: 'paramedicalInstitute' },
    { value: 'paramedicalInstitute:office2', label: 'Office 2', category: 'paramedicalInstitute' },
    // Ayurved College offices
    { value: 'ayurvedCollege:office1', label: 'Office 1', category: 'ayurvedCollege' },
    { value: 'ayurvedCollege:office2', label: 'Office 2', category: 'ayurvedCollege' },
    // Ayurved Hospital offices
    { value: 'ayurvedHospital:office1', label: 'Office 1', category: 'ayurvedHospital' },
    { value: 'ayurvedHospital:office2', label: 'Office 2', category: 'ayurvedHospital' },
    // Pharmacy College offices
    { value: 'pharmacyCollege:office1', label: 'Office 1', category: 'pharmacyCollege' },
    { value: 'pharmacyCollege:office2', label: 'Office 2', category: 'pharmacyCollege' },
    // General Correspondence offices
    { value: 'generalCorrespondence:office1', label: 'Office 1', category: 'generalCorrespondence' },
    { value: 'generalCorrespondence:office2', label: 'Office 2', category: 'generalCorrespondence' },
    // Social Media & Events offices
    { value: 'socialMediaEvents:office1', label: 'Office 1', category: 'socialMediaEvents' },
    { value: 'socialMediaEvents:office2', label: 'Office 2', category: 'socialMediaEvents' },
  ];
}

// Get offices filtered by category
export function getOfficeOptionsByCategory(category: Category | null): Array<{ value: string; label: string }> {
  const allOptions = getAllOfficeOptions();
  
  if (!category) {
    // Return all offices when no category is selected
    return allOptions.map(({ value, label }) => ({ value, label }));
  }
  
  // Filter by category
  return allOptions
    .filter(option => option.category === category)
    .map(({ value, label }) => ({ value, label }));
}

// Check if an office belongs to a specific category
export function officeMatchesCategory(office: Office, category: Category | null): boolean {
  if (!category) return true;
  return office.__kind__ === category;
}
