import { ReactNode } from 'react';
import { useCallerRole } from '@/features/auth/useCallerRole';
import { UnauthorizedScreen } from './UnauthorizedScreen';
import { Loader2 } from 'lucide-react';

interface RequireRoleProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
}

export function RequireRole({ children, requireAdmin = false, requireUser = false }: RequireRoleProps) {
  const { isLoading, isFetched, isAdmin, isUser, data: role } = useCallerRole();

  // Show loading state while role is being fetched
  if (isLoading || !isFetched) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Checking permissions...</p>
        </div>
      </div>
    );
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin) {
    return <UnauthorizedScreen message="Admin Access Required" />;
  }

  // Check user requirement (admin or user role)
  if (requireUser && !isUser) {
    return <UnauthorizedScreen message="Unauthorized" />;
  }

  // If role is guest, deny access
  if (role === 'guest') {
    return <UnauthorizedScreen message="Unauthorized" />;
  }

  return <>{children}</>;
}
