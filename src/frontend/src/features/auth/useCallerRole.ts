import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { UserRole } from '@/backend';

export function useCallerRole() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserRole>({
    queryKey: ['callerRole'],
    queryFn: async () => {
      if (!actor) {
        throw new Error('Actor not available');
      }
      try {
        const role = await actor.getCallerUserRole();
        return role;
      } catch (err) {
        // Provide more context for errors
        const message = err instanceof Error ? err.message : 'Failed to fetch user role';
        throw new Error(`Permission check failed: ${message}`);
      }
    },
    enabled: !!actor && !actorFetching,
    retry: 2, // Retry twice on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000), // Exponential backoff
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
    isAdmin: query.data === 'admin',
    isUser: query.data === 'admin' || query.data === 'user',
  };
}
