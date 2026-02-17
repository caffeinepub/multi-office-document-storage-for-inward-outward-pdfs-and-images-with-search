import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { PublicDocument, Direction } from '@/backend';

interface UseDocumentsOptions {
  categoryId: string | null;
  officeId: string | null;
  direction: Direction | null;
  startDate: Date | null;
  endDate: Date | null;
  searchText: string;
}

const PAGE_SIZE = 20;

export function useDocuments({
  categoryId,
  officeId,
  direction,
  startDate,
  endDate,
  searchText,
}: UseDocumentsOptions) {
  const { actor, isFetching: isActorFetching } = useActor();
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const query = useQuery<PublicDocument[]>({
    queryKey: ['documents', categoryId, officeId, direction, startDate, endDate],
    queryFn: async () => {
      if (!actor) return [];

      const startTime = startDate ? BigInt(startDate.getTime() * 1000000) : null;
      const endTime = endDate ? BigInt(endDate.getTime() * 1000000) : null;

      return actor.filterDocuments(categoryId, officeId, direction, startTime, endTime, null);
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
