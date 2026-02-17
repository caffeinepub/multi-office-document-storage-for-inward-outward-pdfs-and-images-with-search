import { PublicDocument, Direction } from '@/backend';
import { useCategories } from '@/features/categories/useCategories';
import { useNavigate } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ArrowDownToLine, ArrowUpFromLine, Star } from 'lucide-react';
import { format } from 'date-fns';
import { getOfficeName } from '@/lib/officeHelpers';

const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.inward]: 'Inward',
  [Direction.outward]: 'Outward',
  [Direction.importantDocuments]: 'Important',
};

interface DocumentListProps {
  documents: PublicDocument[];
  selectedDocuments: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectDocument: (documentId: string, checked: boolean) => void;
}

export function DocumentList({
  documents,
  selectedDocuments,
  onSelectAll,
  onSelectDocument,
}: DocumentListProps) {
  const navigate = useNavigate();
  const { data: categories } = useCategories();

  const allSelected = documents.length > 0 && documents.every((doc) => selectedDocuments.has(doc.id));
  const someSelected = documents.some((doc) => selectedDocuments.has(doc.id)) && !allSelected;

  const getDirectionIcon = (direction: Direction) => {
    switch (direction) {
      case Direction.inward:
        return <ArrowDownToLine className="h-4 w-4" />;
      case Direction.outward:
        return <ArrowUpFromLine className="h-4 w-4" />;
      case Direction.importantDocuments:
        return <Star className="h-4 w-4" />;
    }
  };

  const getDirectionVariant = (direction: Direction): 'default' | 'secondary' | 'destructive' => {
    switch (direction) {
      case Direction.inward:
        return 'default';
      case Direction.outward:
        return 'secondary';
      case Direction.importantDocuments:
        return 'destructive';
    }
  };

  const getCategoryName = (categoryId: string): string => {
    const category = categories?.find((c) => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getOfficeNameForDoc = (doc: PublicDocument): string => {
    const category = categories?.find((c) => c.id === doc.categoryId);
    return getOfficeName(category || null, doc.officeId);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onSelectAll}
                    aria-label="Select all"
                    className={someSelected ? 'data-[state=checked]:bg-primary/50' : ''}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Office</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate({ to: '/document/$documentId', params: { documentId: doc.id } })}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedDocuments.has(doc.id)}
                      onCheckedChange={(checked) => onSelectDocument(doc.id, checked as boolean)}
                      aria-label={`Select ${doc.title}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium">{doc.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{getCategoryName(doc.categoryId)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{getOfficeNameForDoc(doc)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getDirectionVariant(doc.direction)} className="gap-1">
                      {getDirectionIcon(doc.direction)}
                      {DIRECTION_LABELS[doc.direction]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(Number(doc.documentDate) / 1000000), 'PP')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {doc.referenceNumber || '-'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
