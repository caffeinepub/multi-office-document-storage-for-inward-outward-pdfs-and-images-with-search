import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Document } from '@/backend';
import { useDeleteDocument } from '@/features/documents/useDeleteDocument';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Trash2, MoreVertical, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentActionsProps {
  document: Document;
}

export function DocumentActions({ document }: DocumentActionsProps) {
  const navigate = useNavigate();
  const { deleteDocument, isDeleting } = useDeleteDocument();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleView = () => {
    // Open in new window
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${document.filename}</title>
            <style>
              body { margin: 0; padding: 0; }
              iframe, img { width: 100%; height: 100vh; border: none; }
            </style>
          </head>
          <body>
            ${document.mimeType === 'application/pdf' 
              ? `<iframe src="${document.blobId}"></iframe>`
              : `<img src="${document.blobId}" alt="${document.title}" />`
            }
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.blobId;
    link.download = document.filename;
    link.click();
    toast.success('Download started');
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(document.id);
      toast.success('Document deleted successfully');
      navigate({ to: '/' });
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleView} variant="outline" size="sm">
        <ExternalLink className="mr-2 h-4 w-4" />
        Open
      </Button>
      <Button onClick={handleDownload} variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in new tab
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{document.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
