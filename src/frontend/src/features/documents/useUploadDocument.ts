import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Direction } from '@/backend';

interface UploadDocumentParams {
  file: File;
  categoryId: string;
  officeId: string;
  direction: Direction;
  title: string;
  referenceNumber: string | null;
  documentDate: Date;
}

export function useUploadDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: async (params: UploadDocumentParams) => {
      if (!actor) throw new Error('Not authenticated');

      const { file, categoryId, officeId, direction, title, referenceNumber, documentDate } = params;

      setUploadProgress(10);

      // Read file as bytes
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      setUploadProgress(30);

      // Convert bytes to base64 for storage
      const base64 = btoa(String.fromCharCode(...bytes));
      
      setUploadProgress(50);

      // Generate unique document ID and blob ID
      const documentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const blobId = `${documentId}-${file.name}`;

      setUploadProgress(70);

      // Convert document date to nanoseconds
      const documentDateNano = BigInt(documentDate.getTime() * 1000000);

      // Store the base64 data as the blobId (in a real implementation, this would be stored separately)
      // For now, we'll use a data URL approach
      const dataUrl = `data:${file.type};base64,${base64}`;

      setUploadProgress(90);

      // Add document metadata to backend
      await actor.addDocument(
        documentId,
        categoryId,
        officeId,
        direction,
        title,
        referenceNumber,
        documentDateNano,
        file.name,
        file.type,
        BigInt(file.size),
        dataUrl
      );

      setUploadProgress(100);

      return documentId;
    },
    onSuccess: () => {
      // Invalidate documents and dashboard queries to refresh
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardMetrics'] });
      setUploadProgress(0);
    },
    onError: () => {
      setUploadProgress(0);
    },
  });

  return {
    uploadDocument: mutation.mutateAsync,
    isUploading: mutation.isPending,
    uploadProgress,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
