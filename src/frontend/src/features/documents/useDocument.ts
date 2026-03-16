import type { PublicDocument } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";

export function useDocument(documentId: string) {
  const { actor, isFetching: isActorFetching } = useActor();

  const query = useQuery<PublicDocument>({
    queryKey: ["document", documentId],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.getDocument(documentId);
    },
    enabled: !!actor && !isActorFetching && !!documentId,
  });

  return {
    document: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
