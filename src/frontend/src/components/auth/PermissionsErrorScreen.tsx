import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface PermissionsErrorScreenProps {
  error?: Error | null;
  hasTimedOut?: boolean;
  onRetry: () => void;
}

export function PermissionsErrorScreen({ error, hasTimedOut, onRetry }: PermissionsErrorScreenProps) {
  const navigate = useNavigate();

  const title = hasTimedOut ? 'Permission Check Timed Out' : 'Permission Check Failed';
  const description = hasTimedOut
    ? 'The permission check is taking longer than expected. This might be due to network issues or backend initialization.'
    : error?.message || 'Unable to verify your permissions. Please try again.';

  return (
    <div className="flex min-h-[600px] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium mb-2">What you can try:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Click "Retry" to check permissions again</li>
              <li>Go to the dashboard and refresh the page</li>
              <li>Check your internet connection</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={onRetry}
            className="w-full sm:w-auto"
            variant="default"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button
            onClick={() => navigate({ to: '/' })}
            className="w-full sm:w-auto"
            variant="outline"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
