import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Category } from '@/backend';

export function useCategories() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isActorFetching,
  });
}
