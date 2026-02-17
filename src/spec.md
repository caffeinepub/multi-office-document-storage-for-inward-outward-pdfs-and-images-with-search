# Specification

## Summary
**Goal:** Add a mobile-friendly primary navigation control in the AppShell header for small screens.

**Planned changes:**
- Hide the current desktop header navigation buttons below the md breakpoint and show a hamburger menu button instead.
- Implement a hamburger menu that lists Dashboard, Documents, and Upload, and navigates to the existing routes: /, /documents, /upload.
- Conditionally include Settings in the hamburger menu only when the current user is an admin, navigating to /settings (keeping existing route guards unchanged).
- Adjust the header layout on small screens so the logo/title, hamburger button, theme toggle, and account menu remain visible, non-overlapping, and keyboard-accessible; ensure the menu can be dismissed via standard interactions (select, click outside, Escape).

**User-visible outcome:** On small screens, users can open a hamburger menu to navigate to Dashboard, Documents, and Upload (and Settings for admins) without header controls overlapping or causing horizontal scrolling.
