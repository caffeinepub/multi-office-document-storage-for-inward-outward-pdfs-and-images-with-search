# Specification

## Summary
**Goal:** Prevent the app from getting stuck on the post-login “Checking permissions...” screen by making role/permission resolution reliably complete (success or error) and navigating to the requested page (default: dashboard at “/”).

**Planned changes:**
- Update the authenticated route/permissions gate to always exit the loading state after Internet Identity login and render the target route (default “/”) once the caller role is resolved.
- Add a clear terminal error UI for role-resolution failures with an in-app retry option (no full refresh) and/or a way to proceed to the dashboard.
- Make the caller-role fetching flow more resilient to actor initialization edge cases so it reliably reaches success or error after login (without changing the immutable Internet Identity/actor hooks).
- Adjust backend authorization initialization and role lookup so requests don’t hang for non-admin users when an admin secret/token is missing/empty, returning a prompt result or explicit error.

**User-visible outcome:** After Internet Identity login, users are no longer stuck on “Checking permissions...”; authorized users land on the dashboard (or requested page), and failures show a helpful error with a retry option instead of an infinite spinner.
