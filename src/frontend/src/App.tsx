import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { AuthGate } from './components/auth/AuthGate';
import { AppShell } from './components/layout/AppShell';
import { DocumentListPage } from './pages/DocumentListPage';
import { UploadDocumentPage } from './pages/UploadDocumentPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
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

// Document list route (default)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DocumentListPage,
});

// Upload document route
const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: UploadDocumentPage,
});

// Document detail route
const documentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/document/$documentId',
  component: DocumentDetailPage,
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, uploadRoute, documentRoute]);

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
