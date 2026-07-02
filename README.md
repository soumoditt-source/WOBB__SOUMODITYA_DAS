# Vibe Coder Assignment - Wobb

This is the completed assignment for the Wobb Vibe Coder role. The application has been heavily refactored to achieve a 11/10 premium feel, with modern state management, excellent UI/UX, and optimized performance.

## What Changed

### 1. State Management (React Context ➡️ Zustand)
- Replaced local component states and the need for Context with **Zustand**.
- Implemented a global `useStore` to handle filtering (`platform`, `searchQuery`) and the "Selected List".
- Integrated Zustand's `persist` middleware to automatically save the selected profiles to `localStorage`, ensuring data persistence across page reloads.

### 2. UI/UX Redesign
- **Premium Aesthetics:** Completely rewrote the CSS using Tailwind v4. Introduced glassmorphism (`backdrop-blur`), soft gradients, and modern fonts (`Inter` and `Outfit`).
- **Responsive Layout:** Redesigned the search page to use CSS Grid for profile cards, making it highly responsive across mobile, tablet, and desktop.
- **Micro-interactions:** Added Framer Motion for smooth mounting animations and hover states to make the application feel alive and "vibe" correctly.
- **Selected Profiles Drawer:** Built a beautiful sliding drawer (accessible via a floating action button) to view, manage, and remove shortlisted influencers at any time.
- **Profile Detail Page:** Restructured the detail view into a clean, two-column layout on desktop. Metric cards now use icons and clear typography for better visual hierarchy.

### 3. Bug Fixes & Code Quality
- **React Best Practices:** Removed unnecessary states (like the unused `clickCount` which caused unnecessary re-renders).
- **Stale Closures & Unmounted State:** Fixed the `useEffect` in `ProfileDetailPage.tsx` by introducing an `isMounted` flag, preventing state updates if the user navigates away before the mock API resolves.
- **Performance:** Wrapped heavy filtering logic in `useMemo` to prevent recalculations on every render unless dependencies change.
- **Type Safety:** Used strict TypeScript types for the Zustand store and component props.

## Libraries Added

- `zustand`: For lightweight, fast, and scalable global state management (replaces Context).
- `lucide-react`: For clean, modern, and consistent SVG icons.
- `framer-motion`: For fluid animations and layout transitions (e.g., list staggering, drawer sliding).
- `clsx` & `tailwind-merge`: For a robust `cn()` utility function, allowing conditional and easily overridable Tailwind class strings without conflicts.

## Assumptions Made
- The missing React Context in the starter codebase was an intentional omission or a hint to build global state from scratch. I built it directly with Zustand.
- The user wants a modern, "glassy" and colorful aesthetic, hence the use of purple/violet gradients (the "Vibe" aesthetic).
- A floating action button (FAB) with a slide-out drawer is the most intuitive UX for managing a temporary "List" of profiles without navigating away from the search context.

## Trade-offs
- **Bundle Size vs UX:** Added `framer-motion` which slightly increases the JS bundle size. The trade-off was made because premium UX and micro-interactions are crucial for a "Vibe" coder assignment.
- **Mock Data Loading:** The `profileLoader.ts` dynamically imports JSON. I kept this architecture but added a small loading state delay to simulate network requests for a more realistic feel.

## Remaining Improvements
- **Pagination / Infinite Scroll:** Currently, all profiles are rendered at once. For a real production app with thousands of influencers, virtualization (e.g., `@tanstack/react-virtual`) or infinite scrolling should be implemented.
- **E2E Testing:** Adding Cypress or Playwright tests to automatically verify the "Add to List" flow and persistence.
- **Export Functionality:** The "Export List" button in the drawer currently does nothing; it could be wired up to generate a CSV or PDF report of the selected influencers.

## Running Locally

1. Install dependencies (make sure to use `--legacy-peer-deps` if React 19 throws peer warnings with older packages):
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
