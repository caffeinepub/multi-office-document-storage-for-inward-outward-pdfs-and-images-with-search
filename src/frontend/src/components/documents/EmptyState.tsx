import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img
        src="/assets/generated/empty-state-archive.dim_1200x600.png"
        alt="No documents"
        className="mb-8 max-w-md w-full h-auto opacity-80"
      />
      <h3 className="text-2xl font-semibold mb-2">No documents found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Get started by uploading your first document to the archive
      </p>
      <Button onClick={() => navigate({ to: '/upload' })} size="lg">
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
    </div>
  );
}
