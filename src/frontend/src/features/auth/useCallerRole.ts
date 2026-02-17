import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { UserRole__1 } from '@/backend';

export function useCallerRole() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserRole__1>({
    queryKey: ['callerRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
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
