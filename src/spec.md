# Specification

## Summary
**Goal:** Replace the login/sign-in screen logo image with the user-uploaded JPEG.

**Planned changes:**
- Create a properly sized, square/contained static asset in `frontend/public/assets/generated` derived from `WhatsApp-Image-2020-10-24-at-11.11.10-PM-2.jpeg` for use as the login/sign-in logo.
- Update `frontend/src/components/auth/AuthGate.tsx` to use the new generated asset as the only image shown on the unauthenticated login/sign-in screen, replacing the existing login image reference.
- Update the login/sign-in logo `<img>` alt text to a generic English description (e.g., “Login logo”) without using any person’s name.

**User-visible outcome:** When logged out, the sign-in page displays the newly uploaded image as the logo above the sign-in title, with no references to the previous login image and no broken image links.
