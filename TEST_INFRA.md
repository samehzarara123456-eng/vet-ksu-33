# E2E Test Infrastructure Specification

**Project**: Seniors 2027 VET-KSU 33 Old List PWA  
**Component**: End-to-End Automated Test Framework  
**Location**: `e2e_tests/`  
**Execution Runtime**: Python 3.15 + Playwright 1.64.1 (Microsoft Edge & Google Chrome Headless)

---

## 1. Overview & Architecture

The E2E test infrastructure provides automated, opaque-box, end-to-end verification of the Seniors 2027 VET-KSU 33 Old List Progressive Web Application (PWA). It models real student and administrator interactions directly through the browser DOM, Service Worker lifecycle, Web App Manifest, IndexedDB/localStorage data layers, and offline network simulation.

### Architecture Components
1. **Dynamic Local HTTP Server (`e2e_tests/server.py`)**:
   - Threaded HTTP server binding to `127.0.0.1` on dynamically allocated ephemeral ports to avoid port collision.
   - Enforces strict MIME typing (`.js`, `.json`, `.css`, `.webmanifest`, `.mp4`).
   - Supplies `Service-Worker-Allowed: /` and `Cache-Control: no-cache, no-store` headers to ensure Service Worker registration and isolated test state.
2. **Browser Automation Driver & Harness (`e2e_tests/framework.py`)**:
   - Manages Playwright browser instances (`channel="msedge"` with `"chrome"` fallback).
   - Configures 1280x800 desktop viewport, grants `notifications` permissions, and bypasses CSP restrictions for offline and local testing.
   - Hooks into browser console (`page.on('console')`) and unhandled script exceptions (`page.on('pageerror')`) to enforce Zero Runtime Exception criteria (ORIGINAL_REQUEST.md Requirement R2).
   - Provides utilities for drawer navigation (`ensure_sidebar_open`), academic folder traversal (`navigate_to_folder`), storage inspection, and offline emulation (`simulate_offline`).
3. **Master CLI Runner (`e2e_tests/runner.py`)**:
   - Discovers and runs tests across all 4 tiers or targeted features.
   - Outputs ANSI color-coded pass/fail results with per-test duration, error details, and console traces.
   - Writes structured JSON reports to `e2e_tests/results.json`.
   - Returns exit code 0 when all tests pass, and non-zero on test failures.

---

## 2. 4-Tier Test Methodology

The test suite is structured across 4 rigorous tiers comprising 72 comprehensive test cases:

```text
e2e_tests/
├── server.py                   # Local test HTTP server
├── framework.py                # Playwright harness & driver
├── runner.py                   # Master test suite runner CLI
├── test_tier1_features.py      # Tier 1: 54 feature coverage test cases (>=5 per feature)
├── test_tier2_boundaries.py    # Tier 2: 8 boundary and corner case test cases
├── test_tier3_combinations.py  # Tier 3: 7 cross-feature combination test cases
├── test_tier4_scenarios.py     # Tier 4: 3 real-world end-to-end user journeys
└── results.json                # Generated JSON execution report
```

### Tier 1: Comprehensive Feature Coverage (54 Tests)
Covers all 10 features defined in `PROJECT.md` with at least 5 test cases per feature:
- **F01 - Saved Files View & Toggle (6 tests)**: `#sidebar-saved-btn`, `#header-saved-btn`, `#footer-saved-link`, saved view rendering, breadcrumb synchronization, view toggle restore.
- **F02 - Intro Video Overlay Resilience (6 tests)**: `#intro-skip-btn`, Escape key dismiss, video ended auto-dismiss, video error fallback, 3.5s safety timeout for stalled media, replay button.
- **F03 - Search Input & Clear Control (5 tests)**: Input event listeners, `appState.searchQuery` updates, dynamic explorer card filtering, `#clear-search-btn` toggle visibility, click-to-clear reset.
- **F04 - View Layout Switcher (5 tests)**: `#layout-list-btn` (list mode), `#layout-grid-btn` (grid mode), active class highlighting, list card rendering, mode persistence across navigation.
- **F05 - File Card Actions Delegation (6 tests)**: `[data-file-action="preview"]`, `[data-file-action="download"]`, `[data-file-action="toggle-save"]`, `[data-file-action="toggle-complete"]`, `[data-file-action="edit"]`, `[data-file-action="delete"]`.
- **F06 - Preview Modal Lifecycle (5 tests)**: Metadata population, `#close-preview-modal-btn`, backdrop click outside card, Escape key dismiss, modal action dispatchers.
- **F07 - Admin Gate & Authentication (6 tests)**: `#admin-access-btn`, `#footer-admin-link`, modal close/escape, form submit `preventDefault()`, valid passcode authentication, session logout.
- **F08 - Publish Modal & Form Lifecycle (5 tests)**: `openPublishModal`, close/cancel buttons, backdrop/escape dismiss, submit `preventDefault()`, mandatory field validation.
- **F09 - Service Worker & Offline Hardening (5 tests)**: Clean SW registration, cache inspection (`vet33-pwa-cache-v33`), offline app shell serving, manifest validation, zero console errors.
- **F10 - Visual Design, RTL & Data Preservation (5 tests)**: Arabic RTL attributes (`lang="ar" dir="rtl"`), Cairo/Tajawal font loading, cyber CSS classes, 8 core subjects structure, 74+ live Google Drive academic records.

### Tier 2: Boundary & Corner Cases (8 Tests)
- Empty search query and whitespace-only query handling.
- Rapid consecutive clicking (10 rapid clicks) stress on bookmark toggles without state corruption.
- Corrupted non-JSON localStorage resilience and recovery.
- Non-existent file ID preview handling without script crashes.
- Video load failure safety timeout unblocking user within 3.5s.
- Escape key hierarchical dismissal across nested modals.
- Invalid admin passcode rejection and error feedback.
- Network disconnect during cloud sync error resilience.

### Tier 3: Cross-Feature Combinations (7 Tests)
- Search filtering while in Saved Files view.
- Layout mode toggle (grid to list and back) during active search results.
- Preview modal opened from search result, bookmarked in modal, closed, verifying explorer card updates.
- Admin edit button on file card opening publish modal with pre-populated file attributes in both list and grid views.
- Aggregated bookmarks across multiple subjects verified in saved view.
- Study complete status marked in preview modal, reflected in card and localStorage, surviving view transitions and page reload.
- Service Worker offline transition during subject navigation.

### Tier 4: Real-World Application Scenarios (3 Tests)
- **T4.1 - Student Browsing & Bookmarking Journey**: Full student flow from intro video skip -> subject selection -> category selection -> folder inspection -> layout switch -> search -> preview -> bookmark -> saved view verification.
- **T4.2 - Offline Study & Revision Journey**: Online caching -> network disconnect -> offline page reload -> cached navigation -> study completion -> persistent storage verification.
- **T4.3 - Admin Publishing & Management Journey**: Admin gate trigger -> login -> admin banner appearance -> folder navigation -> publish modal opening -> 4 required fields input -> submit -> logout.

---

## 3. Test Runner CLI Usage

The suite is executed via `e2e_tests/runner.py`.

### Full Suite Run
```powershell
python e2e_tests/runner.py
```

### Targeted Tier Execution
```powershell
# Run only Tier 1 Feature Coverage
python e2e_tests/runner.py --tier 1

# Run only Tier 2 Boundaries
python e2e_tests/runner.py --tier 2

# Run only Tier 3 Combinations
python e2e_tests/runner.py --tier 3

# Run only Tier 4 User Journeys
python e2e_tests/runner.py --tier 4
```

### Targeted Feature Filter
```powershell
# Run only Saved Files View tests (F01)
python e2e_tests/runner.py --feature F01

# Run only Intro Video Safety tests (F02)
python e2e_tests/runner.py --feature F02

# Run only Search & Clear tests (F03)
python e2e_tests/runner.py --feature F03

# Run only Layout Switcher tests (F04)
python e2e_tests/runner.py --feature F04

# Run only Service Worker & Offline tests (F09)
python e2e_tests/runner.py --feature F09

# Run only Visual Design & RTL tests (F10)
python e2e_tests/runner.py --feature F10
```

### Browser Options
```powershell
# Run with Google Chrome instead of Microsoft Edge
python e2e_tests/runner.py --browser chrome

# Run in headed (visible) browser mode for debugging
python e2e_tests/runner.py --headed
```

---

## 4. Authoritative Sources of Expected Output

Every test case derives its expected behavior from:
1. `PROJECT.md` Feature Inventory (F01–F10) and Interface Contracts.
2. `ORIGINAL_REQUEST.md` Requirements (R1 Broken Buttons, R2 Console/Runtime Errors, R3 Visual & Data Integrity).
3. DOM element specifications and class bindings in `index.html`.
4. Browser standards for Web App Manifest, Service Worker Cache API, and HTTP offline emulation.
5. Live Google Apps Script data source (`GAS_WEB_APP_URL`) returning accredited academic records.
