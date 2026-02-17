import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useCallerRole } from '@/features/auth/useCallerRole';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutDashboard, FileText, Upload, User, LogOut, Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SiX } from 'react-icons/si';
import { MobileNavMenu } from './MobileNavMenu';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const { identity, clear } = useInternetIdentity();
  const { theme, setTheme } = useTheme();
  const { isAdmin } = useCallerRole();

  const handleLogout = () => {
    clear();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#0B2554' }}>
        <div className="container flex h-16 items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-6 min-w-0">
            <MobileNavMenu />
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-80 min-w-0"
            >
              <img
                src="/assets/generated/header-logo.dim_512x512.png"
                alt="DMS"
                className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm md:text-lg font-semibold text-white truncate">Dr Sudhir Dhone</span>
                <span className="text-xs md:text-sm text-white/80 truncate">Document Archive</span>
              </div>
            </button>
            <nav className="hidden items-center gap-1 md:flex">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/' })}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/documents' })}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Documents
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/upload' })}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: '/settings' })}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover dark:bg-popover">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Account</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {identity?.getPrincipal().toString().slice(0, 20)}...
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">{children}</div>
      </main>

      <footer className="border-t bg-muted/30 py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Document Management System
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <SiX className="inline h-3 w-3 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'dms-app'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
