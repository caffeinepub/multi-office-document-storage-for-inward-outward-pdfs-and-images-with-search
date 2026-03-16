# Doc Vault

## Current State
- App uses `header-logo.dim_512x512.png` in AppShell header and `doc-vault-icon-transparent.dim_400x400.png` in AuthGate login screen
- No favicon set (default browser icon)
- Dropdown menus (MobileNavMenu, AppShell user menu) use `bg-popover` which can be transparent in some themes
- Select dropdowns (SelectContent) use `bg-popover` — can appear transparent
- Dialog/AlertDialog popups already have `bg-white dark:bg-gray-900` in SettingsPage but inconsistently applied
- Popover content uses `bg-popover` — can be transparent

## Requested Changes (Diff)

### Add
- New logo image: `/assets/generated/doc-vault-logo-transparent.dim_256x256.png` (already generated)
- favicon reference in index.html pointing to the new logo

### Modify
- AppShell header: replace `header-logo.dim_512x512.png` with new logo
- AuthGate login page: replace `doc-vault-icon-transparent.dim_400x400.png` with new logo
- `dropdown-menu.tsx` DropdownMenuContent: add `bg-white dark:bg-gray-900` explicit solid background
- `dropdown-menu.tsx` DropdownMenuSubContent: same solid background fix
- `select.tsx` SelectContent: add `bg-white dark:bg-gray-900` explicit solid background
- `popover.tsx` PopoverContent: add `bg-white dark:bg-gray-900` explicit solid background
- `dialog.tsx` DialogContent: ensure `bg-white dark:bg-gray-900` solid background (currently uses `bg-background` which may be transparent)
- `alert-dialog.tsx` AlertDialogContent: ensure solid background
- MobileNavMenu DropdownMenuContent already has `!bg-white` — verify it also handles dark mode

### Remove
- Old logo references

## Implementation Plan
1. Update `index.html` to add favicon link pointing to new logo
2. Update `AppShell.tsx` header img src to new logo
3. Update `AuthGate.tsx` login img src to new logo
4. Update `dropdown-menu.tsx` DropdownMenuContent and SubContent to use solid white background
5. Update `select.tsx` SelectContent to use solid white background
6. Update `popover.tsx` PopoverContent to use solid white background
7. Update `dialog.tsx` DialogContent to use solid white background
8. Update `alert-dialog.tsx` AlertDialogContent to use solid white background
