import { Document } from '@/backend';
import { getCategoryLabel } from './categoryHelpers';
import { getOfficeLabel } from './officeHelpers';
import { format } from 'date-fns';

export function exportDocumentsToCSV(documents: Document[]) {
  // Define CSV headers
  const headers = [
    'Title',
    'Category',
    'Office',
    'Direction',
    'Document Date',
    'Reference Number',
    'Filename',
    'File Size (MB)',
    'Upload Date',
  ];

  // Convert documents to CSV rows
  const rows = documents.map((doc) => {
    const direction =
      doc.direction === 'inward'
        ? 'Inward'
        : doc.direction === 'outward'
        ? 'Outward'
        : 'Important Documents';

    return [
      `"${doc.title.replace(/"/g, '""')}"`,
      `"${getCategoryLabel(doc.category)}"`,
      `"${getOfficeLabel(doc.office)}"`,
      direction,
      format(new Date(Number(doc.documentDate) / 1000000), 'yyyy-MM-dd'),
      doc.referenceNumber ? `"${doc.referenceNumber.replace(/"/g, '""')}"` : '',
      `"${doc.filename.replace(/"/g, '""')}"`,
      (Number(doc.fileSize) / 1024 / 1024).toFixed(2),
      format(new Date(Number(doc.uploadTimestamp) / 1000000), 'yyyy-MM-dd HH:mm:ss'),
    ];
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  // Create blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `documents_export_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
