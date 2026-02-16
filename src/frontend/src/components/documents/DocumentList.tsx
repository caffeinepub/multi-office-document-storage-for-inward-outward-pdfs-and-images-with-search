import { useNavigate } from '@tanstack/react-router';
import { Document, Direction } from '@/backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, ArrowDownToLine, ArrowUpFromLine, FileCheck, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { getOfficeLabel } from '@/lib/officeHelpers';
import { getCategoryLabel } from '@/lib/categoryHelpers';

const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.inward]: 'Inward',
  [Direction.outward]: 'Outward',
  [Direction.importantDocuments]: 'Important Documents',
};

interface DocumentListProps {
  documents: Document[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}

export function DocumentList({
  documents,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: DocumentListProps) {
  const navigate = useNavigate();

  const getDirectionIcon = (direction: Direction) => {
    switch (direction) {
      case Direction.inward:
        return <ArrowDownToLine className="mr-1 h-3 w-3" />;
      case Direction.outward:
        return <ArrowUpFromLine className="mr-1 h-3 w-3" />;
      case Direction.importantDocuments:
        return <FileCheck className="mr-1 h-3 w-3" />;
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
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Office</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Document Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow
                    key={doc.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate({ to: '/document/$documentId', params: { documentId: doc.id } })}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-[300px] truncate">{doc.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getCategoryLabel(doc.category)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getOfficeLabel(doc.office)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getDirectionVariant(doc.direction)}>
                        {getDirectionIcon(doc.direction)}
                        {DIRECTION_LABELS[doc.direction]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(Number(doc.documentDate) / 1000000), 'PP')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {doc.referenceNumber || '—'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium truncate max-w-[200px]">{doc.filename}</div>
                        <div className="text-xs text-muted-foreground">
                          {(Number(doc.fileSize) / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ to: '/document/$documentId', params: { documentId: doc.id } });
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center">
          <Button onClick={onLoadMore} disabled={isLoadingMore} variant="outline">
            {isLoadingMore ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
