import { useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { DocumentFilters } from '@/components/documents/DocumentFilters';
import { DocumentList } from '@/components/documents/DocumentList';
import { EmptyState } from '@/components/documents/EmptyState';
import { useDocuments } from '@/features/documents/useDocuments';
import { Direction, PublicDocument } from '@/backend';
import { Loader2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { exportDocumentsToCSV } from '@/lib/exportDocuments';
import { toast } from 'sonner';

export function DocumentListPage() {
  const search = useSearch({ strict: false }) as { categoryId?: string };
  const [categoryId, setCategoryId] = useState<string | null>(search.categoryId || null);
  const [officeId, setOfficeId] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<Set<string>>(new Set());

  // Initialize category from route search params
  useEffect(() => {
    if (search.categoryId) {
      setCategoryId(search.categoryId);
    }
  }, [search.categoryId]);

  // Clear selection when filters change
  useEffect(() => {
    setSelectedDocuments(new Set());
  }, [categoryId, officeId, direction, startDate, endDate, searchText]);

  const { documents, isLoading, error, loadMore, hasMore, isLoadingMore } = useDocuments({
    categoryId,
    officeId,
    direction,
    startDate,
    endDate,
    searchText,
  });

  const handleExport = () => {
    if (selectedDocuments.size === 0) {
      toast.error('Please select at least one document to export');
      return;
    }

    const selectedDocs = documents.filter((doc) => selectedDocuments.has(doc.id));
    exportDocumentsToCSV(selectedDocs);
    toast.success(`Exported ${selectedDocs.length} document${selectedDocs.length !== 1 ? 's' : ''}`);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(new Set(documents.map((doc) => doc.id)));
    } else {
      setSelectedDocuments(new Set());
    }
  };

  const handleSelectDocument = (documentId: string, checked: boolean) => {
    const newSelection = new Set(selectedDocuments);
    if (checked) {
      newSelection.add(documentId);
    } else {
      newSelection.delete(documentId);
    }
    setSelectedDocuments(newSelection);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground mt-2">
            Browse and manage your document archive
          </p>
        </div>
        {selectedDocuments.size > 0 && (
          <Button onClick={handleExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Selected ({selectedDocuments.size})
          </Button>
        )}
      </div>

      <DocumentFilters
        categoryId={categoryId}
        officeId={officeId}
        direction={direction}
        startDate={startDate}
        endDate={endDate}
        searchText={searchText}
        onCategoryChange={setCategoryId}
        onOfficeChange={setOfficeId}
        onDirectionChange={setDirection}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearchTextChange={setSearchText}
      />

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading documents...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-destructive">Error loading documents</p>
            <p className="text-xs text-muted-foreground mt-2">{error.message}</p>
          </div>
        </div>
      ) : documents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <DocumentList
            documents={documents}
            selectedDocuments={selectedDocuments}
            onSelectAll={handleSelectAll}
            onSelectDocument={handleSelectDocument}
          />
          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button onClick={loadMore} variant="outline" disabled={isLoadingMore}>
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
