import { useNavigate } from '@tanstack/react-router';
import { useCallerRole } from '@/features/auth/useCallerRole';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, LayoutDashboard, FileText, Upload, Settings } from 'lucide-react';

export function MobileNavMenu() {
  const navigate = useNavigate();
  const { isAdmin } = useCallerRole();

  const handleNavigate = (to: string) => {
    navigate({ to });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 !bg-white dark:!bg-white">
        <DropdownMenuItem onClick={() => handleNavigate('/')}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/documents')}>
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/upload')}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem onClick={() => handleNavigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
