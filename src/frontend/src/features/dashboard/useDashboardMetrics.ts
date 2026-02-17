import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { DashboardMetrics } from '@/backend';

export function useDashboardMetrics() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<DashboardMetrics>({
    queryKey: ['dashboardMetrics'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDashboardMetrics();
    },
    enabled: !!actor && !isActorFetching,
  });
}
