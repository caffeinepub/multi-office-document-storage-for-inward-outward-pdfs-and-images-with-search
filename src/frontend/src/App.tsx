import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { AuthGate } from "./components/auth/AuthGate";
import { RequireRole } from "./components/auth/RequireRole";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { DocumentDetailPage } from "./pages/DocumentDetailPage";
import { DocumentListPage } from "./pages/DocumentListPage";
import { LandingPage } from "./pages/LandingPage";
import { SettingsPage } from "./pages/SettingsPage";
import { UploadDocumentPage } from "./pages/UploadDocumentPage";

// Authenticated app layout
function AppLayout() {
  return (
    <AuthGate>
      <AppShell>
        <Outlet />
      </AppShell>
    </AuthGate>
  );
}

// Root route — no auth, no layout
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public landing page at /
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// Authenticated /app layout route
const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppLayout,
});

// Dashboard at /app/
const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: () => (
    <RequireRole requireUser>
      <DashboardPage />
    </RequireRole>
  ),
});

// Documents at /app/documents
const documentsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/documents",
  component: () => (
    <RequireRole requireUser>
      <DocumentListPage />
    </RequireRole>
  ),
});

// Upload at /app/upload
const uploadRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/upload",
  component: () => (
    <RequireRole requireUser>
      <UploadDocumentPage />
    </RequireRole>
  ),
});

// Document detail at /app/document/$documentId
const documentRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/document/$documentId",
  component: () => (
    <RequireRole requireUser>
      <DocumentDetailPage />
    </RequireRole>
  ),
});

// Settings at /app/settings
const settingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/settings",
  component: () => (
    <RequireRole requireUser>
      <SettingsPage />
    </RequireRole>
  ),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  appRoute.addChildren([
    dashboardRoute,
    documentsRoute,
    uploadRoute,
    documentRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
