# Specification

## Summary
**Goal:** Improve Dashboard category card sizing and button styling, correct direction-based document metrics, and make Settings dialogs/backgrounds visually solid and consistent.

**Planned changes:**
- Reduce the visual size of the Dashboard “Browse by Category” category cards/buttons by ~50% (padding, icon size, typography) without changing category count or navigation behavior.
- Update Dashboard category action button styling so “View Documents” uses a light-blue primary accent with readable contrast in light/dark mode.
- Fix backend Dashboard metrics so “Documents by Direction” counts (Inward/Outward/Important) reflect actual stored documents by counting `document.direction` in `getDashboardMetrics`.
- Update Upload page primary submit button styling so “Upload Document” uses color `#0052cc` (including hover/active/disabled states) with readable contrast in light/dark mode.
- Update Settings styling so the “Add Category” button appears inside a visually distinct `#0052cc` box/background treatment, and ensure Add Category / Add Office dialogs use a solid (non-transparent) white background in light mode.

**User-visible outcome:** The Dashboard category cards take up less space, buttons use consistent blue styling, direction counts show accurate numbers, the Upload button uses `#0052cc`, and Settings dialogs/forms open with solid (non-transparent) backgrounds.
