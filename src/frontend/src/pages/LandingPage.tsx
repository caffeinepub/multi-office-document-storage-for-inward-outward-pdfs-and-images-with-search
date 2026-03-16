import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRight,
  Building2,
  CheckCircle2,
  Download,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Upload,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    icon: FolderOpen,
    title: "Multi-Category Organization",
    description:
      "Organize documents across Legal, Finance, HR, IT, Operations, Sales, and Administration — any business function, fully structured.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: ArrowDownToLine,
    title: "Inward / Outward Tracking",
    description:
      "Classify every document as Inward, Outward, or Important across all departments — making retrieval instant and audit-ready.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: Search,
    title: "Powerful Search & Filters",
    description:
      "Filter documents by department, office, direction, date range, or keyword. Find any file in seconds across your entire organization.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Download,
    title: "Excel Export",
    description:
      "Select multiple documents and export a filtered list to Excel — perfect for audits, reviews, and cross-department reporting.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Admins control who accesses what. Each client's data is fully isolated — built for multi-tenant, multi-department organizations.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "Multi-Office Support",
    description:
      "Manage documents from multiple offices under each department. Built for organizations with distributed teams and branches.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: LayoutDashboard,
    title: "Dashboard Overview",
    description:
      "See total documents, users, and directional stats at a glance. Browse by department with one click — from Legal to Finance to IT.",
  },
  {
    step: "02",
    icon: Upload,
    title: "Upload Documents",
    description:
      "Upload PDF or image files, assign a category, office, and direction. Add reference numbers and dates.",
  },
  {
    step: "03",
    icon: Search,
    title: "Search & Filter",
    description:
      "Apply filters to narrow down documents instantly. Select multiple and export to Excel for reporting.",
  },
];

const CATEGORIES = [
  "Legal & Compliance",
  "Finance & Accounts",
  "Human Resources",
  "IT & Technology",
  "Operations & Logistics",
  "Sales & Marketing",
  "Administration",
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header
        className="sticky top-0 z-50 w-full border-b border-white/10"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        }}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/doc-vault-icon-transparent.dim_400x400.png"
              alt="Doc Vault"
              className="h-9 w-9 object-contain"
            />
            <div>
              <span className="text-lg font-bold text-white leading-none">
                Doc Vault
              </span>
              <p className="text-xs text-white/60 leading-none">
                by Tattva Innovation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden sm:flex border-white/30 text-white/80 bg-white/5"
            >
              By Tattva Innovation
            </Badge>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/app" })}
              className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600 font-semibold border-0"
              data-ocid="landing.signin.button"
            >
              Sign In to App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #5B8CFF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00FFC1 0%, transparent 40%)",
            }}
          />
          <div className="container relative py-24 md:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                Built by Tattva Innovation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Doc Vault
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/80">
                Secure Document Management for Modern Organizations
              </p>
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                Organize, track, and retrieve inward &amp; outward documents
                across departments and offices. Built for any industry — Legal,
                Finance, HR, IT, Operations, and more.
              </p>
              <p className="text-sm font-medium text-cyan-300">
                Purpose-built for businesses, governments, and professional
                organizations across any industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: "/app" })}
                  className="bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-bold text-base px-8 border-0"
                  data-ocid="landing.hero.primary_button"
                >
                  Sign In to App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold text-base px-8"
                  data-ocid="landing.hero.secondary_button"
                >
                  See Features
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Departments", value: "7+" },
                { label: "Offices Supported", value: "20+" },
                { label: "Document Types", value: "3" },
                { label: "Industries Served", value: "Any" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-center"
                >
                  <p className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Everything You Need
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                Doc Vault is built for any organization — from startups to
                enterprises — managing documents across multiple departments and
                offices.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  className="border-0 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex rounded-lg p-3 ${feature.bg} mb-4`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works / Demo Section */}
        <section id="demo" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Simple. Fast. Organized.
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                Three steps to a fully organized document archive.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-3rem)] h-0.5 bg-slate-200" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div
                        className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{
                          background:
                            "linear-gradient(135deg, #4338ca 0%, #0891b2 100%)",
                        }}
                      >
                        <step.icon className="h-9 w-9 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white border-2 border-indigo-600 flex items-center justify-center text-xs font-bold text-indigo-600">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mock App Screens */}
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #1e1b4b 0%, #4338ca 100%)",
                  }}
                >
                  <LayoutDashboard className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Dashboard
                  </span>
                </div>
                <div className="p-4 space-y-3 bg-slate-50">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-violet-100 p-3">
                      <p className="text-xs text-violet-700">Total Docs</p>
                      <p className="text-xl font-bold text-violet-900">312</p>
                    </div>
                    <div className="rounded-lg bg-cyan-100 p-3">
                      <p className="text-xs text-cyan-700">Users</p>
                      <p className="text-xl font-bold text-cyan-900">18</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {["Inward: 124", "Outward: 138", "Important: 50"].map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-lg bg-white border p-2 text-center"
                        >
                          <p className="text-xs text-slate-600">{item}</p>
                        </div>
                      ),
                    )}
                  </div>
                  <div className="space-y-1">
                    {[
                      "Legal & Compliance",
                      "Finance & Accounts",
                      "Human Resources",
                    ].map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center gap-2 rounded-lg bg-white border px-3 py-2"
                      >
                        <FolderOpen className="h-3 w-3 text-indigo-600" />
                        <span className="text-xs text-slate-700">{cat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #1e1b4b 0%, #4338ca 100%)",
                  }}
                >
                  <FileText className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Document List
                  </span>
                </div>
                <div className="p-4 space-y-2 bg-slate-50">
                  <div className="flex gap-1">
                    <div className="flex-1 h-7 rounded bg-white border text-xs flex items-center px-2 text-slate-400">
                      Category ▾
                    </div>
                    <div className="flex-1 h-7 rounded bg-white border text-xs flex items-center px-2 text-slate-400">
                      Office ▾
                    </div>
                    <div className="flex-1 h-7 rounded bg-white border text-xs flex items-center px-2 text-slate-400">
                      Direction ▾
                    </div>
                  </div>
                  {[
                    {
                      title: "NDA Agreement 2024",
                      dir: "Inward",
                      cat: "Legal",
                    },
                    { title: "Q3 Tax Filing", dir: "Outward", cat: "Finance" },
                    { title: "Employee Handbook", dir: "Important", cat: "HR" },
                    {
                      title: "Server Upgrade Proposal",
                      dir: "Outward",
                      cat: "IT",
                    },
                  ].map((doc) => (
                    <div
                      key={doc.title}
                      className="flex items-center justify-between rounded bg-white border p-2"
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-800">
                          {doc.title}
                        </p>
                        <p className="text-xs text-slate-400">{doc.cat}</p>
                      </div>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                          doc.dir === "Inward"
                            ? "bg-violet-100 text-violet-700"
                            : doc.dir === "Outward"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {doc.dir}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border-2 border-slate-200 overflow-hidden shadow-sm">
                <div
                  className="px-4 py-3 flex items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(90deg, #1e1b4b 0%, #4338ca 100%)",
                  }}
                >
                  <Upload className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Upload Document
                  </span>
                </div>
                <div className="p-4 space-y-3 bg-slate-50">
                  {[
                    "Document Title",
                    "Category",
                    "Office",
                    "Direction",
                    "Document Date",
                    "Reference No.",
                  ].map((field) => (
                    <div key={field}>
                      <p className="text-xs text-slate-500 mb-1">{field}</p>
                      <div className="h-7 rounded bg-white border" />
                    </div>
                  ))}
                  <div className="rounded-lg border-2 border-dashed border-indigo-300 p-4 text-center">
                    <FileText className="mx-auto h-6 w-6 text-indigo-400 mb-1" />
                    <p className="text-xs text-slate-400">Drop PDF or image</p>
                  </div>
                  <div
                    className="h-8 rounded"
                    style={{
                      background:
                        "linear-gradient(90deg, #4338ca 0%, #0891b2 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-slate-50">
          <div className="container">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                Departments
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Built for Any Organization
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                Pre-configured professional categories covering every major
                business function.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {CATEGORIES.map((cat, i) => {
                const colors = [
                  "bg-violet-600",
                  "bg-cyan-600",
                  "bg-rose-600",
                  "bg-amber-600",
                  "bg-emerald-600",
                  "bg-indigo-600",
                  "bg-fuchsia-600",
                ];
                return (
                  <div
                    key={cat}
                    className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm"
                  >
                    <div
                      className={`rounded-lg p-2 ${colors[i % colors.length]}`}
                    >
                      <Building2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">
                      {cat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Doc Vault */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-rose-100 text-rose-700 hover:bg-rose-100">
                  Why Doc Vault
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  Designed for Real Workflows
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "No more paper trails",
                    description:
                      "All documents digitized, stored securely, and searchable in seconds.",
                  },
                  {
                    title: "Audit-ready exports",
                    description:
                      "Export filtered lists to Excel for compliance and reporting.",
                  },
                  {
                    title: "Multi-office, one system",
                    description:
                      "Manage all your offices under a single, unified platform.",
                  },
                  {
                    title: "Secure by design",
                    description:
                      "Internet Identity authentication and role-based access keep data safe.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-xl border bg-slate-50"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20"
          style={{
            background:
              "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0891b2 100%)",
          }}
        >
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Sign in to Doc Vault and start organizing your organization&apos;s
              documents today.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/app" })}
              className="bg-gradient-to-r from-violet-400 to-cyan-400 hover:from-violet-500 hover:to-cyan-500 text-white font-bold text-base px-10 border-0"
              data-ocid="landing.cta.primary_button"
            >
              Sign In to App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-900 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/doc-vault-icon-transparent.dim_400x400.png"
              alt="Doc Vault"
              className="h-8 w-8 object-contain opacity-80"
            />
            <div>
              <p className="text-sm font-semibold text-white">Doc Vault</p>
              <p className="text-xs text-slate-400">
                Document Management System
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white">
              Created by Tattva Innovation
            </span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} &middot; Powered by{" "}
            <a
              href={`https://caffeine.ai/?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "doc-vault")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 underline underline-offset-4 hover:text-white"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
