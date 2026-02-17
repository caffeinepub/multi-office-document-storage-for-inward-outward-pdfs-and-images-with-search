import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { DocumentFilters } from '@/components/documents/DocumentFilters';
import { DocumentList } from '@/components/documents/DocumentList';
import { EmptyState } from '@/components/documents/EmptyState';
import { useDocuments } from '@/features/documents/useDocuments';
import { Office, Direction, Category, Document } from '@/backend';
import { Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportDocumentsToCSV } from '@/lib/exportDocuments';
import { toast } from 'sonner';

export function DocumentListPage() {
  const search = useSearch({ strict: false }) as { category?: Category };
  const [category, setCategory] = useState<Category | null>(search.category || null);
  const [office, setOffice] = useState<Office | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());

  // Initialize category from route search params
  useEffect(() => {
    if (search.category) {
      setCategory(search.category);
    }
  }, [search.category]);

  // Clear selection when filters change
  useEffect(() => {
    setSelectedDocuments(new Set());
  }, [category, office, direction, startDate, endDate, searchText]);

  const { documents, isLoading, error, loadMore, hasMore, isLoadingMore } = useDocuments({
    category,
    office,
    direction,
    startDate,
    endDate,
    searchText,
  });

  const handleSelectDocument = (documentId: string, selected: boolean) => {
    setSelectedDocuments((prev) => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(documentId);
      } else {
        newSet.delete(documentId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedDocuments(new Set(documents.map((doc) => doc.id)));
    } else {
      setSelectedDocuments(new Set());
    }
  };

  const handleExport = () => {
    if (selectedDocuments.size === 0) {
      toast.error('Please select at least one document to export');
      return;
    }

    const selectedDocs = documents.filter((doc) => selectedDocuments.has(doc.id));
    exportDocumentsToCSV(selectedDocs);
    toast.success(`Exported ${selectedDocs.length} document${selectedDocs.length > 1 ? 's' : ''}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">Error loading documents</p>
          <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-2">
            Search and manage documents across all offices
          </p>
        </div>
        {documents.length > 0 && (
          <Button onClick={handleExport} disabled={selectedDocuments.size === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export Selected ({selectedDocuments.size})
          </Button>
        )}
      </div>

      <DocumentFilters
        category={category}
        office={office}
        direction={direction}
        startDate={startDate}
        endDate={endDate}
        searchText={searchText}
        onCategoryChange={setCategory}
        onOfficeChange={setOffice}
        onDirectionChange={setDirection}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearchTextChange={setSearchText}
      />

      {documents.length === 0 ? (
        <EmptyState />
      ) : (
        <DocumentList
          documents={documents}
          selectedDocuments={selectedDocuments}
          onSelectDocument={handleSelectDocument}
          onSelectAll={handleSelectAll}
          onLoadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </div>
  );
}
