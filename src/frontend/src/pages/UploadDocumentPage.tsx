import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useUploadDocument } from '@/features/documents/useUploadDocument';
import { useCategories } from '@/features/categories/useCategories';
import { Direction } from '@/backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.inward]: 'Inward',
  [Direction.outward]: 'Outward',
  [Direction.importantDocuments]: 'Important Documents',
};

export function UploadDocumentPage() {
  const navigate = useNavigate();
  const { uploadDocument, isUploading, uploadProgress, error, isSuccess } = useUploadDocument();
  const { data: categories } = useCategories();

  const [file, setFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<string>('');
  const [officeId, setOfficeId] = useState<string>('');
  const [direction, setDirection] = useState<Direction | null>(null);
  const [title, setTitle] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [documentDate, setDocumentDate] = useState<Date | null>(null);

  // Get selected category and its offices
  const selectedCategory = categories?.find((c) => c.id === categoryId);
  const officeOptions = selectedCategory?.offices || [];

  // Clear office selection when category changes if the office doesn't belong to the new category
  useEffect(() => {
    if (officeId && !officeOptions.find((o) => o.id === officeId)) {
      setOfficeId('');
    }
  }, [categoryId, officeId, officeOptions]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please select a PDF or image file (PNG/JPEG)');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !categoryId || !officeId || !direction || !title || !documentDate) {
      alert('Please fill in all required fields');
      return;
    }

    await uploadDocument({
      file,
      categoryId,
      officeId,
      direction,
      title,
      referenceNumber: referenceNumber || null,
      documentDate,
    });
  };

  const canSubmit = file && categoryId && officeId && direction && title && documentDate && !isUploading;

  if (isSuccess) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle>Upload Successful</CardTitle>
            <CardDescription>Your document has been uploaded successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => navigate({ to: '/documents' })} className="w-full">
              View Documents
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Upload Another
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Document</h1>
        <p className="text-muted-foreground mt-2">
          Add a new document to the archive
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Details</CardTitle>
          <CardDescription>
            Fill in the information below to upload a document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file">
                Document File <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="flex-1"
                />
                {file && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="truncate max-w-[200px]">{file.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select value={categoryId} onValueChange={setCategoryId} disabled={isUploading}>
                <SelectTrigger id="category" className="bg-white dark:bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Office */}
            <div className="space-y-2">
              <Label htmlFor="office">
                Office <span className="text-destructive">*</span>
              </Label>
              <Select
                value={officeId}
                onValueChange={setOfficeId}
                disabled={isUploading || !categoryId}
              >
                <SelectTrigger id="office" className="bg-white dark:bg-white">
                  <SelectValue placeholder={categoryId ? "Select an office" : "Select category first"} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  {officeOptions.map((office) => (
                    <SelectItem key={office.id} value={office.id}>
                      {office.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="space-y-2">
              <Label htmlFor="direction">
                Direction <span className="text-destructive">*</span>
              </Label>
              <Select
                value={direction || ''}
                onValueChange={(value) => setDirection(value as Direction)}
                disabled={isUploading}
              >
                <SelectTrigger id="direction" className="bg-white dark:bg-white">
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  {Object.entries(DIRECTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isUploading}
              />
            </div>

            {/* Reference Number */}
            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                placeholder="Enter reference number (optional)"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                disabled={isUploading}
              />
            </div>

            {/* Document Date */}
            <div className="space-y-2">
              <Label>
                Document Date <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white dark:bg-white',
                      !documentDate && 'text-muted-foreground'
                    )}
                    disabled={isUploading}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {documentDate ? format(documentDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={documentDate || undefined}
                    onSelect={(date) => setDocumentDate(date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
              style={{ backgroundColor: '#0052cc' }}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
