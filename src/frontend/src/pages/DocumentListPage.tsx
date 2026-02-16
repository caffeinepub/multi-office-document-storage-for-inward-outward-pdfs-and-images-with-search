import { useState } from 'react';
import { DocumentFilters } from '@/components/documents/DocumentFilters';
import { DocumentList } from '@/components/documents/DocumentList';
import { EmptyState } from '@/components/documents/EmptyState';
import { useDocuments } from '@/features/documents/useDocuments';
import { Office, Direction, Category } from '@/backend';
import { Loader2 } from 'lucide-react';

export function DocumentListPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [office, setOffice] = useState<Office | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchText, setSearchText] = useState('');

  const { documents, isLoading, error, loadMore, hasMore, isLoadingMore } = useDocuments({
    category,
    office,
    direction,
    startDate,
    endDate,
    searchText,
  });

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground mt-2">
          Search and manage documents across all offices
        </p>
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
          onLoadMore={loadMore}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
        />
      )}
    </div>
  );
}
