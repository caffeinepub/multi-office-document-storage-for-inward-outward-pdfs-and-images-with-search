# Specification

## Summary
**Goal:** Replace the login screen image with the user-uploaded photo (as-is), ensure it isn’t cropped, and bust browser caching by using a new versioned asset filename.

**Planned changes:**
- Add the uploaded image `WhatsApp-Image-2020-10-24-at-11.11.10-PM-4.jpeg` into `frontend/public/assets/generated/` under a new versioned filename, and stop referencing `/assets/generated/login-logo-v2.dim_512x512.jpeg`.
- Update `frontend/src/components/auth/AuthGate.tsx` to use the new versioned asset path for the unauthenticated login screen image.
- Adjust the login image CSS in `AuthGate` so the image is displayed without cropping (use contain-style rendering) while staying within the existing `128x128` area.

**User-visible outcome:** After a hard refresh, the login screen shows the newly uploaded photo and displays the full image without cropping, contained within the existing login card image area.
