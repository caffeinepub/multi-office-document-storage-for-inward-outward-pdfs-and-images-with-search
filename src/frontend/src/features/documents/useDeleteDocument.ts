import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';

export function useDeleteDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (documentId: string) => {
      if (!actor) throw new Error('Not authenticated');
      await actor.removeDocument(documentId);
    },
    onSuccess: () => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
  });

  return {
    deleteDocument: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
}
