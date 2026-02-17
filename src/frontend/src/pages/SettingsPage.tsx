import { useState } from 'react';
import { useCategories } from '@/features/categories/useCategories';
import { useCategoryMutations } from '@/features/categories/useCategoryMutations';
import { Category } from '@/backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus, Edit, Trash2, Loader2, Building2, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPage() {
  const { data: categories, isLoading } = useCategories();
  const {
    addCategory,
    updateCategory,
    removeCategory,
    addOffice,
    updateOffice,
    removeOffice,
  } = useCategoryMutations();

  // Category state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  // Office state
  const [officeDialogOpen, setOfficeDialogOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<{ categoryId: string; officeId: string; name: string } | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [officeName, setOfficeName] = useState('');

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    const id = categoryName.toLowerCase().replace(/\s+/g, '-');
    await addCategory.mutateAsync({ id, name: categoryName });
    setCategoryName('');
    setCategoryDialogOpen(false);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !categoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    await updateCategory.mutateAsync({ id: editingCategory.id, newName: categoryName });
    setCategoryName('');
    setEditingCategory(null);
    setCategoryDialogOpen(false);
  };

  const handleRemoveCategory = async (id: string) => {
    await removeCategory.mutateAsync(id);
  };

  const handleAddOffice = async () => {
    if (!selectedCategoryId || !officeName.trim()) {
      toast.error('Office name is required');
      return;
    }

    const officeId = officeName.toLowerCase().replace(/\s+/g, '-');
    await addOffice.mutateAsync({ categoryId: selectedCategoryId, officeId, officeName });
    setOfficeName('');
    setSelectedCategoryId('');
    setOfficeDialogOpen(false);
  };

  const handleUpdateOffice = async () => {
    if (!editingOffice || !officeName.trim()) {
      toast.error('Office name is required');
      return;
    }

    await updateOffice.mutateAsync({
      categoryId: editingOffice.categoryId,
      officeId: editingOffice.officeId,
      newOfficeName: officeName,
    });
    setOfficeName('');
    setEditingOffice(null);
    setOfficeDialogOpen(false);
  };

  const handleRemoveOffice = async (categoryId: string, officeId: string) => {
    await removeOffice.mutateAsync({ categoryId, officeId });
  };

  const openAddCategoryDialog = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryDialogOpen(true);
  };

  const openEditCategoryDialog = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDialogOpen(true);
  };

  const openAddOfficeDialog = (categoryId: string) => {
    setEditingOffice(null);
    setSelectedCategoryId(categoryId);
    setOfficeName('');
    setOfficeDialogOpen(true);
  };

  const openEditOfficeDialog = (categoryId: string, officeId: string, name: string) => {
    setEditingOffice({ categoryId, officeId, name });
    setOfficeName(name);
    setOfficeDialogOpen(true);
  };

  const isAnyMutating = addCategory.isPending || updateCategory.isPending || removeCategory.isPending || 
                        addOffice.isPending || updateOffice.isPending || removeOffice.isPending;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage categories and offices</p>
        </div>
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddCategoryDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover dark:bg-popover">
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update the category name' : 'Create a new category for organizing documents'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Legal, Finance, HR"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryDialogOpen(false);
                  setCategoryName('');
                  setEditingCategory(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
                disabled={addCategory.isPending || updateCategory.isPending}
              >
                {(addCategory.isPending || updateCategory.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingCategory ? 'Update' : 'Add'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {categories?.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>
                      {category.offices.length} office{category.offices.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditCategoryDialog(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-popover dark:bg-popover">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{category.name}"? This will also remove all associated
                          offices.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveCategory(category.id)}
                          disabled={removeCategory.isPending}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {removeCategory.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Offices</h3>
                  <Dialog open={officeDialogOpen} onOpenChange={setOfficeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openAddOfficeDialog(category.id)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Office
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-popover dark:bg-popover">
                      <DialogHeader>
                        <DialogTitle>{editingOffice ? 'Edit Office' : 'Add Office'}</DialogTitle>
                        <DialogDescription>
                          {editingOffice ? 'Update the office name' : 'Add a new office to this category'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="office-name">Office Name</Label>
                          <Input
                            id="office-name"
                            placeholder="e.g., Main Office, Branch A"
                            value={officeName}
                            onChange={(e) => setOfficeName(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setOfficeDialogOpen(false);
                            setOfficeName('');
                            setEditingOffice(null);
                            setSelectedCategoryId('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={editingOffice ? handleUpdateOffice : handleAddOffice}
                          disabled={addOffice.isPending || updateOffice.isPending}
                        >
                          {(addOffice.isPending || updateOffice.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {editingOffice ? 'Update' : 'Add'}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {category.offices.length === 0 ? (
                  <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <Building2 className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">No offices yet</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {category.offices.map((office) => (
                      <div
                        key={office.id}
                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{office.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openEditOfficeDialog(category.id, office.id, office.name)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-popover dark:bg-popover">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Office</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{office.name}"?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemoveOffice(category.id, office.id)}
                                  disabled={removeOffice.isPending}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {removeOffice.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {categories?.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">No categories yet</p>
              <p className="text-xs text-muted-foreground mt-1">Click "Add Category" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
