import type { Category } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isActorFetching,
  });
}
