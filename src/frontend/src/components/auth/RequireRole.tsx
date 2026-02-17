import { ReactNode, useEffect, useState } from 'react';
import { useCallerRole } from '@/features/auth/useCallerRole';
import { UnauthorizedScreen } from './UnauthorizedScreen';
import { PermissionsErrorScreen } from './PermissionsErrorScreen';
import { Loader2 } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface RequireRoleProps {
  children: ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
}

const PERMISSIONS_CHECK_TIMEOUT = 15000; // 15 seconds

export function RequireRole({ children, requireAdmin = false, requireUser = false }: RequireRoleProps) {
  const { isLoading, isFetched, isAdmin, isUser, data: role, error, refetch } = useCallerRole();
  const { identity } = useInternetIdentity();
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Reset timeout when identity changes (e.g., after login)
  useEffect(() => {
    setHasTimedOut(false);
  }, [identity]);

  // Set up timeout for prolonged loading
  useEffect(() => {
    if (isLoading && !isFetched) {
      const timeoutId = setTimeout(() => {
        setHasTimedOut(true);
      }, PERMISSIONS_CHECK_TIMEOUT);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, isFetched]);

  // Show error screen if there's an error or timeout
  if (error || hasTimedOut) {
    return (
      <PermissionsErrorScreen
        error={error}
        hasTimedOut={hasTimedOut}
        onRetry={() => {
          setHasTimedOut(false);
          refetch();
        }}
      />
    );
  }

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
