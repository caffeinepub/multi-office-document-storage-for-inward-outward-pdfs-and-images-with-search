import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  Upload,
} from "lucide-react";

export function MobileNavMenu() {
  const navigate = useNavigate();

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
          data-ocid="nav.mobile.button"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 !bg-white dark:!bg-white"
      >
        <DropdownMenuItem
          onClick={() => handleNavigate("/app")}
          data-ocid="nav.mobile.dashboard.link"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/app/documents")}
          data-ocid="nav.mobile.documents.link"
        >
          <FileText className="mr-2 h-4 w-4" />
          Documents
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/app/upload")}
          data-ocid="nav.mobile.upload.link"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleNavigate("/app/settings")}
          data-ocid="nav.mobile.settings.link"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
