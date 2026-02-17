# Specification

## Summary
**Goal:** Add backend-managed admin/supervisor roles with enforced access control, and refine key dashboard/UI visuals (smaller “Documents by Direction” cards and solid popover backgrounds).

**Planned changes:**
- Reduce the size of the three “Documents by Direction” cards on the Dashboard (Inward/Outward/Important) by ~30% via padding/icon/font sizing, without changing their content/structure.
- Add backend-persisted user accounts containing username, hashed password, and role (admin|supervisor), plus admin-only APIs to create, update (role/password), list, and delete users.
- Enforce role-based access across frontend and backend: restrict Settings to admins (including hiding/disabling Settings navigation for non-admins) and ensure Dashboard requires an authenticated user with a recognized role.
- Update UI surfaces so dropdowns, popups, dialogs, and menus use solid, non-transparent backgrounds in both light and dark modes.

**User-visible outcome:** Dashboard “Documents by Direction” cards appear smaller; all menus/dialogs render with opaque backgrounds; admins can manage users and access Settings while supervisors are blocked from Settings and unauthorized access shows an English “Unauthorized” message and/or redirects.
