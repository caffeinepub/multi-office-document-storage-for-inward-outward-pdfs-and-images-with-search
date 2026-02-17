import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { toast } from 'sonner';

export function useCategoryMutations() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const addCategory = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.addCategory(id, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add category: ${error.message}`);
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, newName }: { id: string; newName: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.updateCategory(id, newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const removeCategory = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.removeCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category removed successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove category: ${error.message}`);
    },
  });

  const addOffice = useMutation({
    mutationFn: async ({ categoryId, officeId, officeName }: { categoryId: string; officeId: string; officeName: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.addOfficeToCategory(categoryId, officeId, officeName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Office added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add office: ${error.message}`);
    },
  });

  const updateOffice = useMutation({
    mutationFn: async ({ categoryId, officeId, newOfficeName }: { categoryId: string; officeId: string; newOfficeName: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.updateOfficeInCategory(categoryId, officeId, newOfficeName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Office updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update office: ${error.message}`);
    },
  });

  const removeOffice = useMutation({
    mutationFn: async ({ categoryId, officeId }: { categoryId: string; officeId: string }) => {
      if (!actor) throw new Error('Not authenticated');
      return actor.removeOfficeFromCategory(categoryId, officeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Office removed successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to remove office: ${error.message}`);
    },
  });

  return {
    addCategory,
    updateCategory,
    removeCategory,
    addOffice,
    updateOffice,
    removeOffice,
  };
}
