# Project: Seniors 2027 VET-KSU 33 Old List PWA Audit & Repair

## Architecture
- **Application Type**: Progressive Web Application (PWA) with Service Worker caching (`sw.js`), Web App Manifest (`manifest.json`), Tailwind CSS / Custom CSS (`css/style.css`), and Vanilla JavaScript client runtime (`js/app.js`).
- **Data Domain**: 4th Year Veterinary Medicine "Old List" (اللائحة القديمة) curriculum materials across 8 subjects, 2 categories, and 4 content types. Backend data source is Google Drive integrated via a Google Apps Script Web App endpoint (`GAS_WEB_APP_URL`) returning 75 live academic files. Local client state is maintained via `localStorage` and `IndexedDB`.
- **View Hierarchy**:
  - Level 1: Category Selection (Lectures / Sections / Summaries / Exams)
  - Level 2: Subject Cards (8 core veterinary subjects)
  - Level 3: Folder Navigation
  - Level 4: Material Files Grid / List View
  - Special Views: Saved / Bookmarked Files View (`toggleSavedView`), Search Results View, Admin Publishing Portal.
  - Modals: `#preview-modal`, `#admin-login-modal`, `#publish-modal`, `#intro-video-overlay`.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | F01 - Saved Files View & Toggle | Implement `toggleSavedView()` in `js/app.js` to toggle bookmarked files view (`appState.currentView = 'saved'`), render saved cards, update breadcrumbs, and wire `#sidebar-saved-btn`, `#header-saved-btn`, `#footer-saved-link`. | M1 | survey |
| 2 | F02 - Intro Video Overlay Resilience | Add error/stalled listeners and a 3-second safety fallback timer to `#intro-video` in `js/app.js` to ensure `#intro-video-overlay` dismisses cleanly when offline or on media error. | M1 | survey |
| 3 | F03 - Search Input & Clear Control | Wire `input` and `keydown` listeners on `#search-input` to update `appState.searchQuery`, trigger filtered render, and toggle `#clear-search-btn`. Wire `#clear-search-btn` click listener. | M1 | survey |
| 4 | F04 - View Layout Switcher | Wire `#layout-grid-btn` and `#layout-list-btn` to toggle `appState.layoutMode = 'grid' \| 'list'`, update active button classes, and re-render file explorer. | M1 | survey |
| 5 | F05 - File Card Action Delegation | Attach event delegation to `#explorer-grid` for all `[data-file-action]`: `preview`, `download`, `toggle-save`, `toggle-complete`, `edit`, `delete`. | M2 | survey |
| 6 | F06 - Preview Modal Lifecycle & Actions | Wire `#close-preview-modal-btn`, backdrop click, and `Escape` key dismiss to `#preview-modal`. Wire `#modal-download-btn`, `#modal-complete-btn`, `#modal-share-btn`. | M2 | survey |
| 7 | F07 - Admin Gate & Authentication | Wire `#admin-access-btn` and `#footer-admin-link` to open `#admin-login-modal`. Wire `#close-admin-login-btn`, backdrop, and `Escape`. Wire `#admin-login-form` submit with `e.preventDefault()`, validate credentials, set `appState.isAdmin = true`, save session, and update UI. Wire `#admin-logout-btn`. | M3 | survey |
| 8 | F08 - Publishing Modal & Form Lifecycle | Wire `openPublishModal` triggers. Wire `#close-publish-modal-btn`, `#cancel-publish-btn`, backdrop, and `Escape`. Wire `#publish-form` submit with `e.preventDefault()`, validate inputs, send payload to backend/store, update UI, and close modal. | M3 | survey |
| 9 | F09 - Service Worker & Offline Hardening | Verify and harden `sw.js` cache management (`vet33-pwa-cache-v33`), ensure clean registration without unhandled promise rejections, and test offline fallback capabilities. | M4 | survey |
| 10 | F10 - Visual Design, RTL & Data Preservation | Ensure Arabic typography (`Cairo`, `Tajawal`), RTL directionality, CSS cyber styling (`css/style.css`), and the 75 live Google Drive academic records remain intact. | M4 | survey |
| 11 | F11 - End-to-End Test Suite & Verification | Execute the comprehensive E2E test suite (Tiers 1-4) and adversarial hardening (Tier 5) with zero console errors and 100% interactive control functionality. | M5 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Core Navigation, Saved View, Video Safety, Search & Layout Handlers | Implement `toggleSavedView()`, wire saved buttons, add intro video safety timeout, wire search input/clear, wire layout switcher. | none | DONE |
| M2 | File Card Interactions & Preview Modal Lifecycle | Add event delegation on `#explorer-grid` for all `data-file-action` buttons; wire preview modal dismissal, backdrop, escape, and modal action buttons. | M1 | DONE |
| M3 | Admin Gate, Authentication, Publishing & Modal Management | Wire admin access button, admin login modal dismiss/submit, admin session state, publish modal triggers, publish form dismiss/submit. | M1, M2 | DONE |
| M4 | Service Worker, Offline Resilience & Design Integrity | Harden Service Worker lifecycle, verify offline navigation, ensure zero console exceptions, verify Arabic RTL layout and styling integrity. | M1, M2, M3 | DONE |
| M5 | E2E Test Suite Validation & Adversarial Hardening | Validate 100% pass across all E2E test tiers (T1-T4) followed by Tier 5 adversarial hardening and forensic audit. | M1, M2, M3, M4 | IN_PROGRESS |

## Interface Contracts
### App State & Views (`js/app.js`)
- `toggleSavedView()`: Function signature: `() => void`. Updates `appState.currentView` to `'saved'` or restores previous view, updates navigation breadcrumbs, and renders saved file cards from `localStorage` (`vet33_saved_files_v1`).
- `renderExplorerContent()`: Renders folder structure or file cards based on `appState.currentLevel`, `appState.searchQuery`, and `appState.layoutMode`.
- Event Delegation Contract on `#explorer-grid`:
  - Click on element matching `[data-file-action="preview"]`: extracts `data-file-id`, calls `openPreviewModal(fileId)`.
  - Click on element matching `[data-file-action="download"]`: extracts `data-file-id`, triggers download / opens file link.
  - Click on element matching `[data-file-action="toggle-save"]`: toggles saved state in storage, re-renders icon/card.
  - Click on element matching `[data-file-action="toggle-complete"]`: toggles completed/studied state in storage, re-renders icon/card.
  - Click on element matching `[data-file-action="edit"]`: opens publish/edit modal populated with file data (admin only).
  - Click on element matching `[data-file-action="delete"]`: prompts confirmation and deletes file record (admin only).
- Modal Dismiss Contract:
  - Any open modal (`#preview-modal`, `#admin-login-modal`, `#publish-modal`) can be closed via its close button, backdrop click outside `.modal-card`, or `Escape` keypress.
- Form Submit Contract:
  - `#admin-login-form` and `#publish-form` MUST bind `submit` listeners, call `event.preventDefault()`, and never cause page reload.

## Code Layout
- `index.html`: Main single-page application entry point, structural DOM, modal containers, and script includes.
- `js/app.js`: Core client runtime logic, state management (`appState`), event listeners, and UI rendering. Owned by implementation workers.
- `sw.js`: Service worker implementation, cache versioning, and fetch interceptors. Owned by implementation workers.
- `css/style.css`: Application styling, animations, and custom scrollbar rules. Read-only for preservation.
- `manifest.json`: Web app manifest for PWA installability.
- `e2e_tests/`: Dedicated directory for automated E2E test suites and runner. Owned exclusively by E2E Testing Track.
