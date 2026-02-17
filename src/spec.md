# Specification

## Summary
**Goal:** Add a Dashboard with backend-driven category buttons, enable category-based navigation to a filtered Documents list, and support multi-select export of only selected filtered documents.

**Planned changes:**
- Add a new Dashboard route/page that fetches available categories from the backend at runtime and renders them as large clickable buttons (English UI text).
- Add backend API(s) to return the authoritative list of categories from stored data, without breaking existing upload or document filtering behavior.
- Update navigation/routing to include access to the Dashboard while preserving existing access to Documents list, document detail, and Upload.
- When a category is clicked on the Dashboard, navigate to the Documents list with that category filter pre-applied and compatible with existing office filtering behavior.
- Update the Documents list to support multi-select (e.g., row checkboxes) and an Export action that downloads an Excel-compatible file containing only the user-selected documents from the currently filtered results, with an English message when nothing is selected.

**User-visible outcome:** Users can open a Dashboard to pick a category, see only documents for that category in the Documents list, select multiple documents from the filtered list, and export only those selected documents to an Excel-compatible file.
