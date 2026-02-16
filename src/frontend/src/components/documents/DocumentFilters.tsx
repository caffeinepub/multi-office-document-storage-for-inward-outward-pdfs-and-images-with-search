import { useEffect } from 'react';
import { Office, Direction, Category } from '@/backend';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, X, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { stringToOffice, officeToString, getOfficeOptionsByCategory, officeMatchesCategory } from '@/lib/officeHelpers';
import { getAllCategoryOptions } from '@/lib/categoryHelpers';

const DIRECTION_LABELS: Record<Direction, string> = {
  [Direction.inward]: 'Inward',
  [Direction.outward]: 'Outward',
  [Direction.importantDocuments]: 'Important Documents',
};

interface DocumentFiltersProps {
  category: Category | null;
  office: Office | null;
  direction: Direction | null;
  startDate: Date | null;
  endDate: Date | null;
  searchText: string;
  onCategoryChange: (category: Category | null) => void;
  onOfficeChange: (office: Office | null) => void;
  onDirectionChange: (direction: Direction | null) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSearchTextChange: (text: string) => void;
}

export function DocumentFilters({
  category,
  office,
  direction,
  startDate,
  endDate,
  searchText,
  onCategoryChange,
  onOfficeChange,
  onDirectionChange,
  onStartDateChange,
  onEndDateChange,
  onSearchTextChange,
}: DocumentFiltersProps) {
  const hasActiveFilters = category || office || direction || startDate || endDate || searchText;

  const clearFilters = () => {
    onCategoryChange(null);
    onOfficeChange(null);
    onDirectionChange(null);
    onStartDateChange(null);
    onEndDateChange(null);
    onSearchTextChange('');
  };

  // Get office options filtered by selected category
  const officeOptions = getOfficeOptionsByCategory(category);
  const categoryOptions = getAllCategoryOptions();
  const officeStringValue = office ? officeToString(office) : 'all';

  // Clear office selection when category changes and office is no longer valid
  useEffect(() => {
    if (office && !officeMatchesCategory(office, category)) {
      onOfficeChange(null);
    }
  }, [category, office, onOfficeChange]);

  const handleOfficeChange = (value: string) => {
    if (value === 'all') {
      onOfficeChange(null);
    } else {
      const officeValue = stringToOffice(value);
      onOfficeChange(officeValue);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title or reference number..."
                value={searchText}
                onChange={(e) => onSearchTextChange(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select
                value={category || 'all'}
                onValueChange={(value) =>
                  onCategoryChange(value === 'all' ? null : (value as Category))
                }
              >
                <SelectTrigger id="category-filter" className="bg-white dark:bg-white">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  <SelectItem value="all">All categories</SelectItem>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Office Filter */}
            <div className="space-y-2">
              <Label htmlFor="office-filter">Office</Label>
              <Select value={officeStringValue} onValueChange={handleOfficeChange}>
                <SelectTrigger id="office-filter" className="bg-white dark:bg-white">
                  <SelectValue placeholder="All offices" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  <SelectItem value="all">All offices</SelectItem>
                  {officeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction Filter */}
            <div className="space-y-2">
              <Label htmlFor="direction-filter">Direction</Label>
              <Select
                value={direction || 'all'}
                onValueChange={(value) =>
                  onDirectionChange(value === 'all' ? null : (value as Direction))
                }
              >
                <SelectTrigger id="direction-filter" className="bg-white dark:bg-white">
                  <SelectValue placeholder="All directions" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-white text-foreground border border-border shadow-md">
                  <SelectItem value="all">All directions</SelectItem>
                  {Object.entries(DIRECTION_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white dark:bg-white',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PP') : 'From date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate || undefined}
                    onSelect={(date) => onStartDateChange(date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal bg-white dark:bg-white',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PP') : 'To date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate || undefined}
                    onSelect={(date) => onEndDateChange(date || null)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button onClick={clearFilters} variant="ghost" size="sm">
                <X className="mr-2 h-4 w-4" />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
