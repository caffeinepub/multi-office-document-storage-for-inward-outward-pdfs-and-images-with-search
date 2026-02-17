import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

interface UnauthorizedScreenProps {
  message?: string;
  showBackButton?: boolean;
}

export function UnauthorizedScreen({ 
  message = 'Unauthorized', 
  showBackButton = true 
}: UnauthorizedScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlert className="h-16 w-16 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{message}</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </div>
        {showBackButton && (
          <Button onClick={() => navigate({ to: '/' })}>
            Go to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
