import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Document, Office, Direction, Category } from '@/backend';

interface UseDocumentsOptions {
  category: Category | null;
  office: Office | null;
  direction: Direction | null;
  startDate: Date | null;
  endDate: Date | null;
  searchText: string;
}

const PAGE_SIZE = 20;

export function useDocuments({
  category,
  office,
  direction,
  startDate,
  endDate,
  searchText,
}: UseDocumentsOptions) {
  const { actor, isFetching: isActorFetching } = useActor();
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const query = useQuery<Document[]>({
    queryKey: ['documents', category, office, direction, startDate, endDate],
    queryFn: async () => {
      if (!actor) return [];

      const startTime = startDate ? BigInt(startDate.getTime() * 1000000) : null;
      const endTime = endDate ? BigInt(endDate.getTime() * 1000000) : null;

      // Pass null for _dummy parameter (no-op param for canister restart)
      return actor.filterDocuments(category, office, direction, startTime, endTime, null);
    },
    enabled: !!actor && !isActorFetching,
  });

  // Client-side text filtering
  const filteredDocuments = useMemo(() => {
    if (!query.data) return [];

    let filtered = query.data;

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchLower) ||
          (doc.referenceNumber && doc.referenceNumber.toLowerCase().includes(searchLower))
      );
    }

    // Sort by upload timestamp (newest first)
    return filtered.sort((a, b) => Number(b.uploadTimestamp - a.uploadTimestamp));
  }, [query.data, searchText]);

  const displayedDocuments = filteredDocuments.slice(0, displayCount);
  const hasMore = displayCount < filteredDocuments.length;

  const loadMore = () => {
    setDisplayCount((prev) => prev + PAGE_SIZE);
  };

  return {
    documents: displayedDocuments,
    isLoading: query.isLoading,
    error: query.error,
    loadMore,
    hasMore,
    isLoadingMore: false,
  };
}
