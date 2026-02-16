# Specification

## Summary
**Goal:** Refresh the app header styling across all pages, improve the Documents page filtering by tying Office options to the selected Category, and display each document’s category in the Documents table.

**Planned changes:**
- Update the main application header on all pages to use background color `#0B2554` and show the title text “Dr Sudhir Dhone”, ensuring header text/icons remain readable with sufficient contrast.
- On the Documents list page, make the Office filter dropdown options depend on the selected Category filter (show all offices when Category is “All”), and clear the selected Office if it becomes invalid after changing Category.
- Add a new “Category” column to the Documents table and render each document’s category as a human-readable label using the existing category label mapping.

**User-visible outcome:** The header is consistently styled with the new color and title on every page; the Documents filter Office dropdown only shows relevant offices for the chosen category; and the Documents table includes a Category column showing each document’s category label.
