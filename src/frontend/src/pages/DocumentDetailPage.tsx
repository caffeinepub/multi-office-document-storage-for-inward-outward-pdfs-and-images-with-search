import { useParams, useNavigate } from '@tanstack/react-router';
import { useDocument } from '@/features/documents/useDocument';
import { DocumentActions } from '@/components/documents/DocumentActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, FileText, Calendar, Building2, ArrowDownToLine, ArrowUpFromLine, FileCheck, User, Clock, Hash } from 'lucide-react';
import { format } from 'date-fns';
import { Direction } from '@/backend';
import { getOfficeLabel } from '@/lib/officeHelpers';

const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.inward]: 'Inward',
  [Direction.outward]: 'Outward',
  [Direction.importantDocuments]: 'Important Documents',
};

export function DocumentDetailPage() {
  const { documentId } = useParams({ from: '/document/$documentId' });
  const navigate = useNavigate();
  const { document, isLoading, error } = useDocument(documentId);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm text-destructive">Error loading document</p>
          {error && <p className="text-xs text-muted-foreground">{error.message}</p>}
          <Button onClick={() => navigate({ to: '/' })} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Button>
        </div>
      </div>
    );
  }

  const isPdf = document.mimeType === 'application/pdf';
  const isImage = document.mimeType.startsWith('image/');

  const getDirectionIcon = (direction: Direction) => {
    switch (direction) {
      case Direction.inward:
        return <ArrowDownToLine className="h-4 w-4 mt-0.5 text-muted-foreground" />;
      case Direction.outward:
        return <ArrowUpFromLine className="h-4 w-4 mt-0.5 text-muted-foreground" />;
      case Direction.importantDocuments:
        return <FileCheck className="h-4 w-4 mt-0.5 text-muted-foreground" />;
    }
  };

  const getDirectionVariant = (direction: Direction) => {
    switch (direction) {
      case Direction.inward:
        return 'default';
      case Direction.outward:
        return 'secondary';
      case Direction.importantDocuments:
        return 'destructive';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate({ to: '/' })} variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documents
        </Button>
        <DocumentActions document={document} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Document Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {document.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-muted/30 p-4">
                {isPdf && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">
                      PDF Preview
                    </p>
                    <iframe
                      src={document.blobId}
                      className="w-full h-[600px] rounded border"
                      title={document.filename}
                    />
                  </div>
                )}
                {isImage && (
                  <div className="flex justify-center">
                    <img
                      src={document.blobId}
                      alt={document.title}
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                )}
                {!isPdf && !isImage && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Preview not available for this file type
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Metadata */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Document Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Office</p>
                    <p className="text-sm font-medium">{getOfficeLabel(document.office)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  {getDirectionIcon(document.direction)}
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Direction</p>
                    <Badge variant={getDirectionVariant(document.direction)}>
                      {DIRECTION_LABELS[document.direction]}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Document Date</p>
                    <p className="text-sm font-medium">
                      {format(new Date(Number(document.documentDate) / 1000000), 'PPP')}
                    </p>
                  </div>
                </div>

                {document.referenceNumber && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Hash className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-xs text-muted-foreground">Reference Number</p>
                        <p className="text-sm font-medium">{document.referenceNumber}</p>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-start gap-3">
                  <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Filename</p>
                    <p className="text-sm font-medium break-all">{document.filename}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Uploaded</p>
                    <p className="text-sm font-medium">
                      {format(new Date(Number(document.uploadTimestamp) / 1000000), 'PPP')}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-muted-foreground">Uploader</p>
                    <p className="text-xs font-mono break-all">
                      {document.uploader.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">File Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{document.mimeType}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size</span>
                <span className="font-medium">
                  {(Number(document.fileSize) / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
