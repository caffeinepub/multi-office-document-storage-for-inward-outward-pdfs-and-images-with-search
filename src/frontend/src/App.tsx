import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { AuthGate } from './components/auth/AuthGate';
import { RequireRole } from './components/auth/RequireRole';
import { AppShell } from './components/layout/AppShell';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentListPage } from './pages/DocumentListPage';
import { UploadDocumentPage } from './pages/UploadDocumentPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// Layout component that wraps authenticated routes
function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <AuthGate>
      <Layout />
    </AuthGate>
  ),
});

// Dashboard route (default) - requires user role
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <RequireRole requireUser>
      <DashboardPage />
    </RequireRole>
  ),
});

// Document list route - requires user role
const documentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/documents',
  component: () => (
    <RequireRole requireUser>
      <DocumentListPage />
    </RequireRole>
  ),
});

// Upload document route - requires user role
const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: () => (
    <RequireRole requireUser>
      <UploadDocumentPage />
    </RequireRole>
  ),
});

// Document detail route - requires user role
const documentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document/$documentId',
  component: () => (
    <RequireRole requireUser>
      <DocumentDetailPage />
    </RequireRole>
  ),
});

// Settings route - requires admin role
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: () => (
    <RequireRole requireAdmin>
      <SettingsPage />
    </RequireRole>
  ),
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, documentsRoute, uploadRoute, documentRoute, settingsRoute]);

const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
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
