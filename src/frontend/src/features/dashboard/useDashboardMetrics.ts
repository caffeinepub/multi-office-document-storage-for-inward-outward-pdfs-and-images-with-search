import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

// Define DashboardMetrics type locally since it's not in the backend interface
type DashboardMetrics = {
  totalDocuments: number;
  uniqueUserCount: number;
  inwardDocuments: number;
  outwardDocuments: number;
  importantDocuments: number;
};

export function useDashboardMetrics() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      // Since getDashboardMetrics doesn't exist, we'll compute metrics from filterDocuments
      // This is a workaround until the backend method is added
      const allDocuments = await actor.filterDocuments(null, null, null, null, null, null);
      
      // Count unique uploaders
      const uniqueUploaders = new Set(allDocuments.map(doc => doc.uploader.toString()));
      
      // Count by direction
      const inward = allDocuments.filter(doc => doc.direction === 'inward').length;
      const outward = allDocuments.filter(doc => doc.direction === 'outward').length;
      const important = allDocuments.filter(doc => doc.direction === 'importantDocuments').length;
      
      return {
        totalDocuments: allDocuments.length,
        uniqueUserCount: uniqueUploaders.size,
        inwardDocuments: inward,
        outwardDocuments: outward,
        importantDocuments: important,
      };
    },
    enabled: !!actor && !isActorFetching,
  });
}
