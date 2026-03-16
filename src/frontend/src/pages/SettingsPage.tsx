import type { Category } from "@/backend";
import { Direction } from "@/backend";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategories } from "@/features/categories/useCategories";
import { useCategoryMutations } from "@/features/categories/useCategoryMutations";
import { useActor } from "@/hooks/useActor";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowDown,
  Building2,
  Database,
  Edit,
  FolderOpen,
  Info,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DEMO_CATEGORIES = [
  {
    id: "legal-compliance",
    name: "Legal & Compliance",
    offices: [
      { id: "contracts-dept", name: "Contracts Department" },
      { id: "litigation-cell", name: "Litigation Cell" },
      { id: "regulatory-affairs", name: "Regulatory Affairs" },
      { id: "compliance-audit", name: "Compliance Audit" },
    ],
  },
  {
    id: "finance-accounts",
    name: "Finance & Accounts",
    offices: [
      { id: "billing-invoicing", name: "Billing & Invoicing" },
      { id: "payroll-unit", name: "Payroll Unit" },
      { id: "procurement-desk", name: "Procurement Desk" },
      { id: "tax-audit-cell", name: "Tax & Audit Cell" },
    ],
  },
  {
    id: "human-resources",
    name: "Human Resources",
    offices: [
      { id: "recruitment-office", name: "Recruitment Office" },
      { id: "training-development", name: "Training & Development" },
      { id: "employee-relations", name: "Employee Relations" },
      { id: "hr-policies-unit", name: "HR Policies Unit" },
    ],
  },
  {
    id: "it-technology",
    name: "IT & Technology",
    offices: [
      { id: "infrastructure-team", name: "Infrastructure Team" },
      { id: "software-development", name: "Software Development" },
      { id: "cybersecurity-unit", name: "Cybersecurity Unit" },
      { id: "it-support-desk", name: "IT Support Desk" },
    ],
  },
  {
    id: "operations-logistics",
    name: "Operations & Logistics",
    offices: [
      { id: "supply-chain", name: "Supply Chain" },
      { id: "facilities-management", name: "Facilities Management" },
      { id: "transport-coordination", name: "Transport Coordination" },
      { id: "vendor-management", name: "Vendor Management" },
    ],
  },
  {
    id: "sales-marketing",
    name: "Sales & Marketing",
    offices: [
      { id: "campaigns-division", name: "Campaigns Division" },
      { id: "client-relations", name: "Client Relations" },
      { id: "digital-marketing", name: "Digital Marketing" },
      { id: "proposals-desk", name: "Proposals Desk" },
    ],
  },
  {
    id: "administration",
    name: "Administration",
    offices: [
      { id: "general-correspondence", name: "General Correspondence" },
      { id: "board-secretariat", name: "Board Secretariat" },
      { id: "mou-agreements", name: "MoU & Agreements" },
      { id: "executive-office", name: "Executive Office" },
    ],
  },
];

const DEMO_DOCUMENTS = [
  {
    id: "doc-001",
    categoryId: "legal-compliance",
    officeId: "contracts-dept",
    direction: Direction.inward,
    title: "Vendor Service Agreement - TechSoft Solutions",
    referenceNumber: "LC/CON/2025/001",
    filename: "vendor_agreement_techsoft.pdf",
    mimeType: "application/pdf",
    fileSize: 204800n,
    blobId: "",
    daysAgo: 5,
  },
  {
    id: "doc-002",
    categoryId: "legal-compliance",
    officeId: "regulatory-affairs",
    direction: Direction.outward,
    title: "Compliance Certificate Submission to SEBI",
    referenceNumber: "LC/REG/2025/002",
    filename: "sebi_compliance_cert.pdf",
    mimeType: "application/pdf",
    fileSize: 153600n,
    blobId: "",
    daysAgo: 10,
  },
  {
    id: "doc-003",
    categoryId: "legal-compliance",
    officeId: "litigation-cell",
    direction: Direction.importantDocuments,
    title: "Court Order - Civil Case No. 2025/0345",
    referenceNumber: "LC/LIT/2025/003",
    filename: "court_order_civil_2025.pdf",
    mimeType: "application/pdf",
    fileSize: 98304n,
    blobId: "",
    daysAgo: 3,
  },
  {
    id: "doc-004",
    categoryId: "finance-accounts",
    officeId: "billing-invoicing",
    direction: Direction.inward,
    title: "Invoice from Global Supplies Ltd - Q1 2025",
    referenceNumber: "FA/BIL/2025/004",
    filename: "invoice_global_supplies_q1.pdf",
    mimeType: "application/pdf",
    fileSize: 71680n,
    blobId: "",
    daysAgo: 2,
  },
  {
    id: "doc-005",
    categoryId: "finance-accounts",
    officeId: "payroll-unit",
    direction: Direction.outward,
    title: "Salary Disbursement Advice - March 2025",
    referenceNumber: "FA/PAY/2025/005",
    filename: "salary_disbursement_mar2025.pdf",
    mimeType: "application/pdf",
    fileSize: 122880n,
    blobId: "",
    daysAgo: 1,
  },
  {
    id: "doc-006",
    categoryId: "finance-accounts",
    officeId: "tax-audit-cell",
    direction: Direction.importantDocuments,
    title: "Annual Tax Audit Report FY 2024-25",
    referenceNumber: "FA/TAX/2025/006",
    filename: "tax_audit_fy2025.pdf",
    mimeType: "application/pdf",
    fileSize: 358400n,
    blobId: "",
    daysAgo: 15,
  },
  {
    id: "doc-007",
    categoryId: "human-resources",
    officeId: "recruitment-office",
    direction: Direction.inward,
    title: "Job Application - Senior Software Engineer",
    referenceNumber: "HR/REC/2025/007",
    filename: "application_senior_dev.pdf",
    mimeType: "application/pdf",
    fileSize: 81920n,
    blobId: "",
    daysAgo: 4,
  },
  {
    id: "doc-008",
    categoryId: "human-resources",
    officeId: "employee-relations",
    direction: Direction.outward,
    title: "Warning Letter - Policy Violation",
    referenceNumber: "HR/ER/2025/008",
    filename: "warning_letter_policy.pdf",
    mimeType: "application/pdf",
    fileSize: 45056n,
    blobId: "",
    daysAgo: 7,
  },
  {
    id: "doc-009",
    categoryId: "it-technology",
    officeId: "cybersecurity-unit",
    direction: Direction.importantDocuments,
    title: "Security Audit Report - Network Infrastructure",
    referenceNumber: "IT/CYB/2025/009",
    filename: "security_audit_network.pdf",
    mimeType: "application/pdf",
    fileSize: 245760n,
    blobId: "",
    daysAgo: 8,
  },
  {
    id: "doc-010",
    categoryId: "it-technology",
    officeId: "software-development",
    direction: Direction.inward,
    title: "Software License Agreement - Adobe Creative Cloud",
    referenceNumber: "IT/SW/2025/010",
    filename: "license_adobe_creative.pdf",
    mimeType: "application/pdf",
    fileSize: 61440n,
    blobId: "",
    daysAgo: 12,
  },
  {
    id: "doc-011",
    categoryId: "operations-logistics",
    officeId: "supply-chain",
    direction: Direction.inward,
    title: "Purchase Order - Office Equipment Batch 3",
    referenceNumber: "OL/SUP/2025/011",
    filename: "po_office_equipment_b3.pdf",
    mimeType: "application/pdf",
    fileSize: 92160n,
    blobId: "",
    daysAgo: 6,
  },
  {
    id: "doc-012",
    categoryId: "operations-logistics",
    officeId: "vendor-management",
    direction: Direction.outward,
    title: "Vendor Termination Notice - BuildCo Ltd",
    referenceNumber: "OL/VEN/2025/012",
    filename: "termination_buildco.pdf",
    mimeType: "application/pdf",
    fileSize: 40960n,
    blobId: "",
    daysAgo: 9,
  },
  {
    id: "doc-013",
    categoryId: "sales-marketing",
    officeId: "client-relations",
    direction: Direction.inward,
    title: "Client Complaint - Order #CRM-2025-8821",
    referenceNumber: "SM/CR/2025/013",
    filename: "complaint_crm_8821.pdf",
    mimeType: "application/pdf",
    fileSize: 35840n,
    blobId: "",
    daysAgo: 1,
  },
  {
    id: "doc-014",
    categoryId: "sales-marketing",
    officeId: "proposals-desk",
    direction: Direction.outward,
    title: "Proposal Submission - Infra Modernization Project",
    referenceNumber: "SM/PRO/2025/014",
    filename: "proposal_infra_modernization.pdf",
    mimeType: "application/pdf",
    fileSize: 307200n,
    blobId: "",
    daysAgo: 3,
  },
  {
    id: "doc-015",
    categoryId: "administration",
    officeId: "board-secretariat",
    direction: Direction.importantDocuments,
    title: "Board Resolution - Q1 2025 Strategy Review",
    referenceNumber: "ADM/BRD/2025/015",
    filename: "board_resolution_q1_2025.pdf",
    mimeType: "application/pdf",
    fileSize: 184320n,
    blobId: "",
    daysAgo: 20,
  },
  {
    id: "doc-016",
    categoryId: "administration",
    officeId: "mou-agreements",
    direction: Direction.inward,
    title: "MoU - Partnership with StateGov Digital Initiative",
    referenceNumber: "ADM/MOU/2025/016",
    filename: "mou_stategov_digital.pdf",
    mimeType: "application/pdf",
    fileSize: 143360n,
    blobId: "",
    daysAgo: 14,
  },
  {
    id: "doc-017",
    categoryId: "finance-accounts",
    officeId: "procurement-desk",
    direction: Direction.outward,
    title: "RFQ Issued - Cloud Hosting Services 2025",
    referenceNumber: "FA/PRO/2025/017",
    filename: "rfq_cloud_hosting_2025.pdf",
    mimeType: "application/pdf",
    fileSize: 102400n,
    blobId: "",
    daysAgo: 11,
  },
  {
    id: "doc-018",
    categoryId: "human-resources",
    officeId: "training-development",
    direction: Direction.outward,
    title: "Training Schedule - Leadership Excellence Q2",
    referenceNumber: "HR/TRN/2025/018",
    filename: "training_leadership_q2.pdf",
    mimeType: "application/pdf",
    fileSize: 77824n,
    blobId: "",
    daysAgo: 5,
  },
];

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
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const [isSeedingDemo, setIsSeedingDemo] = useState(false);

  // Category state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  // Office state
  const [officeDialogOpen, setOfficeDialogOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<{
    categoryId: string;
    officeId: string;
    name: string;
  } | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [officeName, setOfficeName] = useState("");

  const handleSeedDemoData = async () => {
    if (!actor) {
      toast.error("Not connected");
      return;
    }
    setIsSeedingDemo(true);
    try {
      // Step 1: Clear all existing data
      toast.info("Clearing old data...");
      try {
        await actor.clearAllData();
      } catch {
        // If clearAllData fails (e.g. not admin), try to remove categories manually
        const existingCats = await actor.getCategories();
        for (const cat of existingCats) {
          await actor.removeCategory(cat.id).catch(() => {});
        }
        // Remove documents
        const existingDocs = await actor.filterDocuments(
          null,
          null,
          null,
          null,
          null,
          null,
        );
        for (const doc of existingDocs) {
          await actor.removeDocument(doc.id).catch(() => {});
        }
      }

      // Step 2: Seed categories and offices
      toast.info("Seeding categories and offices...");
      for (const cat of DEMO_CATEGORIES) {
        await actor.addCategory(cat.id, cat.name);
        for (const office of cat.offices) {
          await actor.addOfficeToCategory(cat.id, office.id, office.name);
        }
      }

      // Step 3: Seed mock documents
      toast.info("Seeding documents...");
      const now = Date.now();
      for (const doc of DEMO_DOCUMENTS) {
        const documentDate = BigInt(
          (now - doc.daysAgo * 24 * 60 * 60 * 1000) * 1_000_000,
        );
        await actor.addDocument(
          doc.id,
          doc.categoryId,
          doc.officeId,
          doc.direction,
          doc.title,
          doc.referenceNumber,
          documentDate,
          doc.filename,
          doc.mimeType,
          doc.fileSize,
          doc.blobId,
        );
      }

      // Invalidate all queries
      await queryClient.invalidateQueries();
      toast.success(
        "Demo data seeded successfully! 18 documents added across 7 categories.",
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to seed demo data");
    } finally {
      setIsSeedingDemo(false);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    const id = categoryName.toLowerCase().replace(/\s+/g, "-");
    await addCategory.mutateAsync({ id, name: categoryName });
    setCategoryName("");
    setCategoryDialogOpen(false);
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    await updateCategory.mutateAsync({
      id: editingCategory.id,
      newName: categoryName,
    });
    setCategoryName("");
    setEditingCategory(null);
    setCategoryDialogOpen(false);
  };

  const handleRemoveCategory = async (id: string) => {
    await removeCategory.mutateAsync(id);
  };

  const handleAddOffice = async () => {
    if (!selectedCategoryId || !officeName.trim()) {
      toast.error("Office name is required");
      return;
    }
    const officeId = officeName.toLowerCase().replace(/\s+/g, "-");
    await addOffice.mutateAsync({
      categoryId: selectedCategoryId,
      officeId,
      officeName,
    });
    setOfficeName("");
    setSelectedCategoryId("");
    setOfficeDialogOpen(false);
  };

  const handleUpdateOffice = async () => {
    if (!editingOffice || !officeName.trim()) {
      toast.error("Office name is required");
      return;
    }
    await updateOffice.mutateAsync({
      categoryId: editingOffice.categoryId,
      officeId: editingOffice.officeId,
      newOfficeName: officeName,
    });
    setOfficeName("");
    setEditingOffice(null);
    setOfficeDialogOpen(false);
  };

  const handleRemoveOffice = async (categoryId: string, officeId: string) => {
    await removeOffice.mutateAsync({ categoryId, officeId });
  };

  const openAddCategoryDialog = () => {
    setEditingCategory(null);
    setCategoryName("");
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
    setOfficeName("");
    setOfficeDialogOpen(true);
  };

  const openEditOfficeDialog = (
    categoryId: string,
    officeId: string,
    name: string,
  ) => {
    setEditingOffice({ categoryId, officeId, name });
    setOfficeName(name);
    setOfficeDialogOpen(true);
  };

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
          <p className="text-muted-foreground mt-2">
            Manage categories and offices
          </p>
        </div>
        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "#4F46E5" }}
          >
            <DialogTrigger asChild>
              <Button
                onClick={openAddCategoryDialog}
                className="bg-white text-indigo-700 hover:bg-indigo-50"
                data-ocid="settings.category.open_modal_button"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Category" : "Add Category"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Update the category name"
                  : "Create a new category for organizing documents"}
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
                  data-ocid="settings.category.input"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryDialogOpen(false);
                  setCategoryName("");
                  setEditingCategory(null);
                }}
                data-ocid="settings.category.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={
                  editingCategory ? handleUpdateCategory : handleAddCategory
                }
                disabled={addCategory.isPending || updateCategory.isPending}
                data-ocid="settings.category.save_button"
              >
                {(addCategory.isPending || updateCategory.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingCategory ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Onboarding Guide Banner - shown only when no categories exist */}
      {categories?.length === 0 && (
        <div
          className="relative rounded-2xl border-2 border-cyan-300 bg-gradient-to-r from-indigo-50 via-cyan-50 to-violet-50 p-6 shadow-md overflow-hidden"
          data-ocid="settings.guide.panel"
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-100 opacity-40 -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-cyan-100 opacity-50 translate-y-6 -translate-x-6" />
          <div className="relative flex items-start gap-4">
            <div className="rounded-full bg-indigo-600 p-3 flex-shrink-0 shadow-lg">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-indigo-900 mb-1">
                Welcome to Doc Vault! Looks like you&apos;re just getting
                started.
              </h3>
              <p className="text-sm text-indigo-700 leading-relaxed mb-3">
                Click{" "}
                <span className="font-semibold text-indigo-900 bg-indigo-100 px-1.5 py-0.5 rounded">
                  &ldquo;Seed Demo Data&rdquo;
                </span>{" "}
                below to instantly populate{" "}
                <strong>7 professional categories</strong> and{" "}
                <strong>18 realistic documents</strong> — Legal, Finance, HR,
                IT, Operations, Sales &amp; Administration. Then explore the
                Dashboard to see live counts!
              </p>
              <div className="flex items-center gap-2 text-cyan-700 font-medium text-sm">
                <ArrowDown className="h-5 w-5 animate-bounce text-indigo-600" />
                <span>Start by clicking the Demo Data button below</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Data Card */}
      <Card className="border-indigo-200 bg-indigo-50 dark:bg-indigo-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 p-2">
              <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Demo Data</CardTitle>
              <CardDescription>
                Reset the app and seed fresh sample data — 7 categories, 28
                offices, and 18 documents
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will <strong>clear all existing data</strong> and populate the
            app with 18 realistic documents across 7 professional categories —
            Legal, Finance, HR, IT, Operations, Sales &amp; Marketing, and
            Administration.
          </p>
          <Button
            onClick={handleSeedDemoData}
            disabled={isSeedingDemo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            data-ocid="settings.demo.primary_button"
          >
            {isSeedingDemo ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding Demo Data...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Seed Fresh Demo Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>

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
                      {category.offices.length} office
                      {category.offices.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditCategoryDialog(category)}
                    data-ocid="settings.category.edit_button"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        data-ocid="settings.category.delete_button"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-gray-900">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Category</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &ldquo;{category.name}
                          &rdquo;? This will also remove all associated offices.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="settings.category.cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveCategory(category.id)}
                          disabled={removeCategory.isPending}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          data-ocid="settings.category.confirm_button"
                        >
                          {removeCategory.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
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
                  <Dialog
                    open={officeDialogOpen}
                    onOpenChange={setOfficeDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAddOfficeDialog(category.id)}
                        data-ocid="settings.office.open_modal_button"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Office
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-900">
                      <DialogHeader>
                        <DialogTitle>
                          {editingOffice ? "Edit Office" : "Add Office"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingOffice
                            ? "Update the office name"
                            : "Add a new office to this category"}
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
                            data-ocid="settings.office.input"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setOfficeDialogOpen(false);
                            setOfficeName("");
                            setEditingOffice(null);
                            setSelectedCategoryId("");
                          }}
                          data-ocid="settings.office.cancel_button"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={
                            editingOffice ? handleUpdateOffice : handleAddOffice
                          }
                          disabled={
                            addOffice.isPending || updateOffice.isPending
                          }
                          data-ocid="settings.office.save_button"
                        >
                          {(addOffice.isPending || updateOffice.isPending) && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {editingOffice ? "Update" : "Add"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {category.offices.length === 0 ? (
                  <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed">
                    <div className="text-center">
                      <Building2 className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        No offices yet
                      </p>
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
                          <span className="text-sm font-medium">
                            {office.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              openEditOfficeDialog(
                                category.id,
                                office.id,
                                office.name,
                              )
                            }
                            data-ocid="settings.office.edit_button"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                data-ocid="settings.office.delete_button"
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white dark:bg-gray-900">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Office
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete &ldquo;
                                  {office.name}
                                  &rdquo;?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel data-ocid="settings.office.cancel_button">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() =>
                                    handleRemoveOffice(category.id, office.id)
                                  }
                                  disabled={removeOffice.isPending}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  data-ocid="settings.office.confirm_button"
                                >
                                  {removeOffice.isPending && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  )}
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
          <div
            className="flex min-h-[300px] items-center justify-center"
            data-ocid="settings.category.empty_state"
          >
            <div className="text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                No categories yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Click &ldquo;Add Category&rdquo; or seed demo data above to get
                started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
