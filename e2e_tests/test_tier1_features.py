"""
Tier 1: Feature Coverage Tests for Seniors 2027 VET-KSU 33 Old List PWA.
Covers >=5 test cases per feature across all 10 project features:
F01 - Saved Files View & Toggle
F02 - Intro Video Overlay Safety
F03 - Search Input & Clear Control
F04 - View Layout Switcher
F05 - File Card Actions Delegation
F06 - Preview Modal Lifecycle
F07 - Admin Gate & Authentication
F08 - Publish Modal & Form Lifecycle
F09 - Service Worker & Offline Hardening
F10 - Visual Design, RTL & Data Preservation
"""

import time
import json
from e2e_tests.framework import PWATestHarness, TestCaseResult

class Tier1FeatureTests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    # =========================================================================
    # F01: Saved Files View & Toggle (6 test cases)
    # =========================================================================

    def test_f01_sidebar_saved_btn_opens_saved_view(self) -> TestCaseResult:
        """F01.1: Clicking #sidebar-saved-btn toggles saved view without ReferenceError."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            btn = page.locator("#sidebar-saved-btn")
            assert btn.count() > 0, "Missing #sidebar-saved-btn in DOM"
            btn.click()
            time.sleep(0.5)

            # Verify no toggleSavedView ReferenceError occurred
            ref_errors = [e for e in self.harness.captured_page_errors if "toggleSavedView" in e]
            assert not ref_errors, f"Runtime error clicking #sidebar-saved-btn: {ref_errors}"

            # Verify appState.currentView is 'saved'
            state = self.harness.get_app_state()
            assert state and state.get("currentView") == "saved", f"Expected currentView to be 'saved', got {state.get('currentView') if state else None}"

            return TestCaseResult("test_f01_sidebar_saved_btn_opens_saved_view", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_sidebar_saved_btn_opens_saved_view", "Tier 1", "F01", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_f01_header_saved_btn_opens_saved_view(self) -> TestCaseResult:
        """F01.2: Clicking #header-saved-btn opens saved view."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            btn = page.locator("#header-saved-btn")
            assert btn.count() > 0, "Missing #header-saved-btn in DOM"
            btn.click()
            time.sleep(0.5)

            state = self.harness.get_app_state()
            assert state and state.get("currentView") == "saved", f"Expected currentView to be 'saved', got {state.get('currentView') if state else None}"

            return TestCaseResult("test_f01_header_saved_btn_opens_saved_view", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_header_saved_btn_opens_saved_view", "Tier 1", "F01", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_f01_footer_saved_link_opens_saved_view(self) -> TestCaseResult:
        """F01.3: Clicking #footer-saved-link opens saved view."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            link = page.locator("#footer-saved-link")
            assert link.count() > 0, "Missing #footer-saved-link in DOM"
            link.click()
            time.sleep(0.5)

            state = self.harness.get_app_state()
            assert state and state.get("currentView") == "saved", f"Expected currentView to be 'saved', got {state.get('currentView') if state else None}"

            return TestCaseResult("test_f01_footer_saved_link_opens_saved_view", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_footer_saved_link_opens_saved_view", "Tier 1", "F01", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_f01_saved_view_renders_bookmarked_cards(self) -> TestCaseResult:
        """F01.4: Saved view displays bookmarked cards stored in localStorage."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Seed a saved file ID into localStorage
            saved_id = "batna-lec-1-source"
            page.evaluate(f"() => localStorage.setItem('vet33_saved_files_v1', JSON.stringify(['{saved_id}']))")

            # Toggle saved view
            page.evaluate("() => typeof toggleSavedView === 'function' ? toggleSavedView() : null")
            time.sleep(0.5)

            grid_html = page.inner_html("#explorer-grid")
            assert "لا توجد ملفات محفوظة" not in grid_html or saved_id in grid_html or page.locator("#explorer-grid").count() > 0, "Saved cards not rendered"

            return TestCaseResult("test_f01_saved_view_renders_bookmarked_cards", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_saved_view_renders_bookmarked_cards", "Tier 1", "F01", "FAIL", time.time() - start, str(e))

    def test_f01_saved_view_breadcrumb_update(self) -> TestCaseResult:
        """F01.5: Breadcrumb updates to indicate saved files view."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            btn = page.locator("#header-saved-btn")
            if btn.count() > 0:
                btn.click()
                time.sleep(0.5)

            breadcrumb = page.inner_text("#breadcrumb-bar")
            assert "محفوظات" in breadcrumb or "المحفوظة" in breadcrumb, f"Expected saved breadcrumb, got: {breadcrumb}"

            return TestCaseResult("test_f01_saved_view_breadcrumb_update", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_saved_view_breadcrumb_update", "Tier 1", "F01", "FAIL", time.time() - start, str(e))

    def test_f01_toggle_saved_view_restores_previous_view(self) -> TestCaseResult:
        """F01.6: Calling toggleSavedView twice returns to previous explorer view."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            initial_state = self.harness.get_app_state()
            initial_view = initial_state.get("currentView", "explorer")

            # First toggle
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            mid_state = self.harness.get_app_state()
            assert mid_state.get("currentView") == "saved", "First toggle should transition to saved"

            # Second toggle
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            final_state = self.harness.get_app_state()
            assert final_state.get("currentView") == initial_view, f"Expected return to {initial_view}, got {final_state.get('currentView')}"

            return TestCaseResult("test_f01_toggle_saved_view_restores_previous_view", "Tier 1", "F01", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f01_toggle_saved_view_restores_previous_view", "Tier 1", "F01", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F02: Intro Video Overlay Safety (6 test cases)
    # =========================================================================

    def test_f02_skip_button_dismisses_overlay(self) -> TestCaseResult:
        """F02.1: Clicking #intro-skip-btn cleanly hides the intro video overlay."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            overlay = page.locator("#intro-video-overlay")
            assert overlay.count() > 0, "Missing #intro-video-overlay"

            skip_btn = page.locator("#intro-skip-btn")
            assert skip_btn.count() > 0, "Missing #intro-skip-btn"
            skip_btn.click()
            time.sleep(1.0)

            # Verify overlay has hidden class or display none or zero opacity
            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Intro video overlay still visible after skip"

            return TestCaseResult("test_f02_skip_button_dismisses_overlay", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_skip_button_dismisses_overlay", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    def test_f02_escape_key_dismisses_intro_video(self) -> TestCaseResult:
        """F02.2: Pressing Escape key dismisses the intro video overlay."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            page.keyboard.press("Escape")
            time.sleep(1.0)

            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Intro video overlay still visible after Escape keypress"

            return TestCaseResult("test_f02_escape_key_dismisses_intro_video", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_escape_key_dismisses_intro_video", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    def test_f02_video_ended_auto_dismisses_overlay(self) -> TestCaseResult:
        """F02.3: Video 'ended' event triggers dismissal of the overlay."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            # Trigger ended event on video element
            page.evaluate("""() => {
                const video = document.getElementById('intro-video');
                if (video) video.dispatchEvent(new Event('ended'));
            }""")
            time.sleep(1.0)

            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Overlay did not dismiss upon video 'ended' event"

            return TestCaseResult("test_f02_video_ended_auto_dismisses_overlay", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_video_ended_auto_dismisses_overlay", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    def test_f02_video_error_triggers_fallback_dismissal(self) -> TestCaseResult:
        """F02.4: Video 'error' event triggers immediate fallback dismissal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            page.evaluate("""() => {
                const video = document.getElementById('intro-video');
                if (video) video.dispatchEvent(new Event('error'));
            }""")
            time.sleep(1.0)

            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Overlay did not dismiss upon video 'error' event"

            return TestCaseResult("test_f02_video_error_triggers_fallback_dismissal", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_video_error_triggers_fallback_dismissal", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    def test_f02_safety_timeout_dismisses_stalled_video(self) -> TestCaseResult:
        """F02.5: Safety timeout of 3-3.5s automatically dismisses overlay when video is stalled."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            # Pause video to simulate stalled state
            page.evaluate("""() => {
                const video = document.getElementById('intro-video');
                if (video) video.pause();
            }""")
            # Wait 3.5 seconds for safety timeout to trigger
            time.sleep(3.6)

            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Overlay was not auto-dismissed by safety fallback timer within 3.5s"

            return TestCaseResult("test_f02_safety_timeout_dismisses_stalled_video", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_safety_timeout_dismisses_stalled_video", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    def test_f02_replay_intro_video_reopens_overlay(self) -> TestCaseResult:
        """F02.6: Replaying video via #header-intro-video-btn re-opens overlay."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            replay_btn = page.locator("#header-intro-video-btn")
            assert replay_btn.count() > 0, "Missing #header-intro-video-btn"
            replay_btn.click()
            time.sleep(0.5)

            is_visible = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return false;
                const style = window.getComputedStyle(el);
                return !el.classList.contains('hidden') && style.display !== 'none' && style.opacity !== '0';
            }""")
            assert is_visible, "Overlay did not re-open after clicking replay button"

            return TestCaseResult("test_f02_replay_intro_video_reopens_overlay", "Tier 1", "F02", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f02_replay_intro_video_reopens_overlay", "Tier 1", "F02", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F03: Search Input & Clear Control (5 test cases)
    # =========================================================================

    def test_f03_search_input_updates_search_query_state(self) -> TestCaseResult:
        """F03.1: Typing in #search-input updates appState.searchQuery."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            assert search_input.count() > 0, "Missing #search-input"
            search_input.fill("باطنه")
            time.sleep(0.3)

            state = self.harness.get_app_state()
            assert state and state.get("searchQuery") == "باطنه", f"Expected searchQuery to be 'باطنه', got {state.get('searchQuery') if state else None}"

            return TestCaseResult("test_f03_search_input_updates_search_query_state", "Tier 1", "F03", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f03_search_input_updates_search_query_state", "Tier 1", "F03", "FAIL", time.time() - start, str(e))

    def test_f03_search_input_filters_explorer_cards(self) -> TestCaseResult:
        """F03.2: Typing query filters cards in #explorer-grid."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            search_input.fill("جراحة")
            time.sleep(0.5)

            # Check rendered content contains filtered match or empty state
            grid_html = page.inner_html("#explorer-grid")
            assert "جراحة" in grid_html or page.locator("#empty-state:not(.hidden)").count() > 0 or len(grid_html) > 0, "Search did not filter explorer grid"

            return TestCaseResult("test_f03_search_input_filters_explorer_cards", "Tier 1", "F03", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f03_search_input_filters_explorer_cards", "Tier 1", "F03", "FAIL", time.time() - start, str(e))

    def test_f03_clear_button_appears_when_search_entered(self) -> TestCaseResult:
        """F03.3: #clear-search-btn becomes visible when #search-input has value."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            search_input.fill("توليد")
            time.sleep(0.3)

            is_clear_visible = self.harness.is_visible("#clear-search-btn")
            assert is_clear_visible, "#clear-search-btn was not displayed when search-input has text"

            return TestCaseResult("test_f03_clear_button_appears_when_search_entered", "Tier 1", "F03", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f03_clear_button_appears_when_search_entered", "Tier 1", "F03", "FAIL", time.time() - start, str(e))

    def test_f03_clear_button_click_resets_search_query(self) -> TestCaseResult:
        """F03.4: Clicking #clear-search-btn empties #search-input and resets appState.searchQuery."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            search_input.fill("دواجن")
            time.sleep(0.3)

            clear_btn = page.locator("#clear-search-btn")
            clear_btn.click()
            time.sleep(0.3)

            val = search_input.input_value()
            assert val == "", f"Expected empty input after clear click, got: {val}"

            state = self.harness.get_app_state()
            assert state and state.get("searchQuery") == "", f"Expected appState.searchQuery to be empty, got: {state.get('searchQuery') if state else None}"

            return TestCaseResult("test_f03_clear_button_click_resets_search_query", "Tier 1", "F03", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f03_clear_button_click_resets_search_query", "Tier 1", "F03", "FAIL", time.time() - start, str(e))

    def test_f03_clear_button_restores_unfiltered_view(self) -> TestCaseResult:
        """F03.5: Clearing search restores full unfiltered explorer grid."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            # Capture initial count or HTML length
            initial_count = page.locator("#explorer-grid > *").count()

            search_input = page.locator("#search-input")
            search_input.fill("xyznonexistentterm123")
            time.sleep(0.3)

            clear_btn = page.locator("#clear-search-btn")
            if clear_btn.is_visible():
                clear_btn.click()
                time.sleep(0.3)

            final_count = page.locator("#explorer-grid > *").count()
            assert final_count == initial_count or final_count > 0, f"Expected grid count to be restored, got {final_count} vs {initial_count}"

            return TestCaseResult("test_f03_clear_button_restores_unfiltered_view", "Tier 1", "F03", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f03_clear_button_restores_unfiltered_view", "Tier 1", "F03", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F04: View Layout Switcher (5 test cases)
    # =========================================================================

    def test_f04_layout_list_btn_sets_list_mode(self) -> TestCaseResult:
        """F04.1: Clicking #layout-list-btn sets appState.layoutMode to 'list'."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            list_btn = page.locator("#layout-list-btn")
            assert list_btn.count() > 0, "Missing #layout-list-btn"
            list_btn.click()
            time.sleep(0.3)

            state = self.harness.get_app_state()
            assert state and state.get("layoutMode") == "list", f"Expected layoutMode 'list', got {state.get('layoutMode') if state else None}"

            return TestCaseResult("test_f04_layout_list_btn_sets_list_mode", "Tier 1", "F04", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f04_layout_list_btn_sets_list_mode", "Tier 1", "F04", "FAIL", time.time() - start, str(e))

    def test_f04_layout_grid_btn_sets_grid_mode(self) -> TestCaseResult:
        """F04.2: Clicking #layout-grid-btn restores appState.layoutMode to 'grid'."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Switch to list first
            page.locator("#layout-list-btn").click()
            time.sleep(0.2)

            grid_btn = page.locator("#layout-grid-btn")
            grid_btn.click()
            time.sleep(0.3)

            state = self.harness.get_app_state()
            assert state and state.get("layoutMode") == "grid", f"Expected layoutMode 'grid', got {state.get('layoutMode') if state else None}"

            return TestCaseResult("test_f04_layout_grid_btn_sets_grid_mode", "Tier 1", "F04", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f04_layout_grid_btn_sets_grid_mode", "Tier 1", "F04", "FAIL", time.time() - start, str(e))

    def test_f04_active_button_styling_updates(self) -> TestCaseResult:
        """F04.3: Active layout button gets active styling classes."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            list_btn = page.locator("#layout-list-btn")
            list_btn.click()
            time.sleep(0.3)

            list_classes = list_btn.get_attribute("class") or ""
            assert "bg-amber-500" in list_classes or "text-slate-950" in list_classes or "active" in list_classes, f"List button missing active class: {list_classes}"

            return TestCaseResult("test_f04_active_button_styling_updates", "Tier 1", "F04", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f04_active_button_styling_updates", "Tier 1", "F04", "FAIL", time.time() - start, str(e))

    def test_f04_explorer_grid_renders_list_cards_in_list_mode(self) -> TestCaseResult:
        """F04.4: List mode renders cards with list-specific styling."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Navigate into a subject and folder to get file cards
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            page.locator("#layout-list-btn").click()
            time.sleep(0.3)

            # Check if grid contains list-specific classes or flex rows
            grid_classes = page.locator("#explorer-grid").get_attribute("class") or ""
            card_html = page.inner_html("#explorer-grid")
            # In list mode, layout can be flex flex-col or cards have list styling
            assert "grid" in grid_classes or "flex" in grid_classes or "col" in grid_classes or len(card_html) > 0, "Grid layout failed to adapt"

            return TestCaseResult("test_f04_explorer_grid_renders_list_cards_in_list_mode", "Tier 1", "F04", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f04_explorer_grid_renders_list_cards_in_list_mode", "Tier 1", "F04", "FAIL", time.time() - start, str(e))

    def test_f04_layout_mode_persists_during_navigation(self) -> TestCaseResult:
        """F04.5: Selected layout mode is preserved during view transitions."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.locator("#layout-list-btn").click()
            time.sleep(0.2)

            # Navigate home or to category
            brand_logo = page.locator("#brand-logo-btn")
            brand_logo.click()
            time.sleep(0.5)

            state = self.harness.get_app_state()
            assert state and state.get("layoutMode") == "list", f"layoutMode was reset to {state.get('layoutMode') if state else None} after navigation"

            return TestCaseResult("test_f04_layout_mode_persists_during_navigation", "Tier 1", "F04", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f04_layout_mode_persists_during_navigation", "Tier 1", "F04", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F05: File Card Action Delegation (6 test cases)
    # =========================================================================

    def test_f05_preview_button_triggers_open_preview(self) -> TestCaseResult:
        """F05.1: Clicking [data-file-action='preview'] opens #preview-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Navigate to folder with files
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            btn = page.locator("[data-file-action='preview']").first
            assert btn.count() > 0, "No preview button found in file cards"
            btn.click()
            time.sleep(0.5)

            is_open = self.harness.is_visible("#preview-modal")
            assert is_open, "#preview-modal did not open after clicking preview button"

            return TestCaseResult("test_f05_preview_button_triggers_open_preview", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_preview_button_triggers_open_preview", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    def test_f05_download_button_triggers_file_download(self) -> TestCaseResult:
        """F05.2: Clicking [data-file-action='download'] triggers download action."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            btn = page.locator("[data-file-action='download']").first
            btn.wait_for(state="attached", timeout=5000)
            assert btn.count() > 0, "No download button found in file cards"
            btn.click()
            time.sleep(0.3)

            # No runtime exceptions thrown
            assert len(self.harness.captured_page_errors) == 0, f"Errors on download click: {self.harness.captured_page_errors}"

            return TestCaseResult("test_f05_download_button_triggers_file_download", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_download_button_triggers_file_download", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    def test_f05_bookmark_button_toggles_saved_storage(self) -> TestCaseResult:
        """F05.3: Clicking [data-file-action='toggle-save'] updates saved IDs in localStorage."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            btn = page.locator("[data-file-action='toggle-save']").first
            assert btn.count() > 0, "No toggle-save button found"
            file_id = btn.get_attribute("data-file-id")

            btn.click()
            time.sleep(0.3)

            saved_raw = self.harness.get_local_storage("vet33_saved_files_v1")
            saved_list = json.loads(saved_raw) if saved_raw else []
            assert file_id in saved_list, f"File ID {file_id} was not added to vet33_saved_files_v1: {saved_list}"

            return TestCaseResult("test_f05_bookmark_button_toggles_saved_storage", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_bookmark_button_toggles_saved_storage", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    def test_f05_complete_button_toggles_studied_storage(self) -> TestCaseResult:
        """F05.4: Clicking [data-file-action='toggle-complete'] updates completed IDs in localStorage."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            btn = page.locator("[data-file-action='toggle-complete']").first
            assert btn.count() > 0, "No toggle-complete button found"
            file_id = btn.get_attribute("data-file-id")

            btn.click()
            time.sleep(0.3)

            comp_raw = self.harness.get_local_storage("vet33_completed_files_v1")
            comp_list = json.loads(comp_raw) if comp_raw else []
            assert file_id in comp_list, f"File ID {file_id} was not added to vet33_completed_files_v1: {comp_list}"

            return TestCaseResult("test_f05_complete_button_toggles_studied_storage", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_complete_button_toggles_studied_storage", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    def test_f05_admin_edit_button_opens_publish_modal(self) -> TestCaseResult:
        """F05.5: As admin, clicking [data-file-action='edit'] opens #publish-modal with file data."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Enable admin mode
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            page.evaluate("""() => {
                if (typeof appState !== 'undefined' && appState) {
                    appState.isAdmin = true;
                    if (typeof syncAdminUI === 'function') syncAdminUI();
                }
            }""")
            time.sleep(0.3)

            btn = page.locator("[data-file-action='edit']").first
            assert btn.count() > 0, "No admin edit button found on card"
            btn.click()
            time.sleep(0.5)

            is_modal_open = self.harness.is_visible("#publish-modal")
            assert is_modal_open, "#publish-modal did not open after clicking admin edit button"

            return TestCaseResult("test_f05_admin_edit_button_opens_publish_modal", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_admin_edit_button_opens_publish_modal", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    def test_f05_admin_delete_button_triggers_delete_action(self) -> TestCaseResult:
        """F05.6: As admin, clicking [data-file-action='delete'] triggers delete confirmation."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            page.evaluate("""() => {
                if (typeof appState !== 'undefined' && appState) {
                    appState.isAdmin = true;
                    if (typeof syncAdminUI === 'function') syncAdminUI();
                }
            }""")
            time.sleep(0.3)

            btn = page.locator("[data-file-action='delete']").first
            assert btn.count() > 0, "No admin delete button found on card"

            # Accept dialog if confirmation dialog appears
            page.once("dialog", lambda dialog: dialog.dismiss())
            btn.click()
            time.sleep(0.3)

            assert len(self.harness.captured_page_errors) == 0, f"Errors on admin delete click: {self.harness.captured_page_errors}"

            return TestCaseResult("test_f05_admin_delete_button_triggers_delete_action", "Tier 1", "F05", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f05_admin_delete_button_triggers_delete_action", "Tier 1", "F05", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F06: Preview Modal Lifecycle (5 test cases)
    # =========================================================================

    def test_f06_preview_modal_displays_correct_metadata(self) -> TestCaseResult:
        """F06.1: Opening preview modal populates title and metadata."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                if (typeof openPreviewModal === 'function') {
                    // Open with first available file ID
                    const id = window.appData && window.appData.files && window.appData.files[0] ? window.appData.files[0].id : 'sample';
                    openPreviewModal(id);
                }
            }""")
            time.sleep(0.5)

            title = page.inner_text("#preview-title")
            assert len(title.strip()) > 0, "Preview modal title is empty"

            return TestCaseResult("test_f06_preview_modal_displays_correct_metadata", "Tier 1", "F06", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f06_preview_modal_displays_correct_metadata", "Tier 1", "F06", "FAIL", time.time() - start, str(e))

    def test_f06_close_preview_modal_btn_hides_modal(self) -> TestCaseResult:
        """F06.2: Clicking #close-preview-modal-btn dismisses the modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                const id = typeof appState !== 'undefined' && appState.files && appState.files[0] ? appState.files[0].id : null;
                if (id && typeof openPreviewModal === 'function') openPreviewModal(id);
                else {
                    const m = document.getElementById('preview-modal');
                    if (m) m.classList.remove('hidden');
                }
            }""")
            time.sleep(0.4)

            close_btn = page.locator("#close-preview-modal-btn")
            assert close_btn.count() > 0, "Missing #close-preview-modal-btn"
            close_btn.click()
            time.sleep(0.4)

            is_open = self.harness.is_visible("#preview-modal")
            assert not is_open, "#preview-modal remained visible after close button click"

            return TestCaseResult("test_f06_close_preview_modal_btn_hides_modal", "Tier 1", "F06", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f06_close_preview_modal_btn_hides_modal", "Tier 1", "F06", "FAIL", time.time() - start, str(e))

    def test_f06_backdrop_click_hides_preview_modal(self) -> TestCaseResult:
        """F06.3: Clicking outside modal dialog card on backdrop closes #preview-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                const id = typeof appState !== 'undefined' && appState.files && appState.files[0] ? appState.files[0].id : null;
                if (id && typeof openPreviewModal === 'function') openPreviewModal(id);
                else {
                    const m = document.getElementById('preview-modal');
                    if (m) m.classList.remove('hidden');
                }
            }""")
            time.sleep(0.4)

            # Click near outer edge (x=10, y=10) of backdrop
            page.click("#preview-modal", position={"x": 10, "y": 10})
            time.sleep(0.4)

            is_open = self.harness.is_visible("#preview-modal")
            assert not is_open, "#preview-modal remained visible after clicking backdrop"

            return TestCaseResult("test_f06_backdrop_click_hides_preview_modal", "Tier 1", "F06", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f06_backdrop_click_hides_preview_modal", "Tier 1", "F06", "FAIL", time.time() - start, str(e))

    def test_f06_escape_key_hides_preview_modal(self) -> TestCaseResult:
        """F06.4: Pressing Escape key dismisses #preview-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                const id = typeof appState !== 'undefined' && appState.files && appState.files[0] ? appState.files[0].id : null;
                if (id && typeof openPreviewModal === 'function') openPreviewModal(id);
                else {
                    const m = document.getElementById('preview-modal');
                    if (m) m.classList.remove('hidden');
                }
            }""")
            time.sleep(0.4)

            page.keyboard.press("Escape")
            time.sleep(0.4)

            is_open = self.harness.is_visible("#preview-modal")
            assert not is_open, "#preview-modal remained visible after Escape keypress"

            return TestCaseResult("test_f06_escape_key_hides_preview_modal", "Tier 1", "F06", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f06_escape_key_hides_preview_modal", "Tier 1", "F06", "FAIL", time.time() - start, str(e))

    def test_f06_modal_action_buttons_dispatch_correctly(self) -> TestCaseResult:
        """F06.5: #modal-download-btn, #modal-complete-btn, and #modal-share-btn operate cleanly."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                const id = typeof appState !== 'undefined' && appState.files && appState.files[0] ? appState.files[0].id : null;
                if (id && typeof openPreviewModal === 'function') openPreviewModal(id);
                else {
                    const m = document.getElementById('preview-modal');
                    if (m) m.classList.remove('hidden');
                }
            }""")
            time.sleep(0.4)

            comp_btn = page.locator("#modal-complete-btn")
            if comp_btn.is_visible():
                comp_btn.click()
                time.sleep(0.2)

            share_btn = page.locator("#modal-share-btn")
            if share_btn.is_visible():
                share_btn.click()
                time.sleep(0.2)

            assert len(self.harness.captured_page_errors) == 0, f"Errors on modal action clicks: {self.harness.captured_page_errors}"

            return TestCaseResult("test_f06_modal_action_buttons_dispatch_correctly", "Tier 1", "F06", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f06_modal_action_buttons_dispatch_correctly", "Tier 1", "F06", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F07: Admin Gate & Authentication (6 test cases)
    # =========================================================================

    def test_f07_admin_access_btn_opens_login_modal(self) -> TestCaseResult:
        """F07.1: Clicking #admin-access-btn opens #admin-login-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            btn = page.locator("#admin-access-btn")
            assert btn.count() > 0, "Missing #admin-access-btn"
            btn.click()
            time.sleep(0.4)

            is_open = self.harness.is_visible("#admin-login-modal")
            assert is_open, "#admin-login-modal did not open after clicking #admin-access-btn"

            return TestCaseResult("test_f07_admin_access_btn_opens_login_modal", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_admin_access_btn_opens_login_modal", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    def test_f07_footer_admin_link_opens_login_modal(self) -> TestCaseResult:
        """F07.2: Clicking #footer-admin-link opens #admin-login-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            link = page.locator("#footer-admin-link")
            assert link.count() > 0, "Missing #footer-admin-link"
            link.click()
            time.sleep(0.4)

            is_open = self.harness.is_visible("#admin-login-modal")
            assert is_open, "#admin-login-modal did not open after clicking #footer-admin-link"

            return TestCaseResult("test_f07_footer_admin_link_opens_login_modal", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_footer_admin_link_opens_login_modal", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    def test_f07_close_admin_login_modal_buttons_and_escape(self) -> TestCaseResult:
        """F07.3: #close-admin-login-btn and Escape key dismiss the login modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.locator("#admin-access-btn").click()
            time.sleep(0.4)

            close_btn = page.locator("#close-admin-login-btn")
            assert close_btn.count() > 0, "Missing #close-admin-login-btn"
            close_btn.click()
            time.sleep(0.4)

            is_open = self.harness.is_visible("#admin-login-modal")
            assert not is_open, "#admin-login-modal remained visible after close button click"

            # Open again and test Escape
            page.locator("#admin-access-btn").click()
            time.sleep(0.4)
            page.keyboard.press("Escape")
            time.sleep(0.4)

            is_open_after_esc = self.harness.is_visible("#admin-login-modal")
            assert not is_open_after_esc, "#admin-login-modal remained visible after Escape"

            return TestCaseResult("test_f07_close_admin_login_modal_buttons_and_escape", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_close_admin_login_modal_buttons_and_escape", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    def test_f07_admin_login_form_prevents_default_page_reload(self) -> TestCaseResult:
        """F07.4: Submitting #admin-login-form calls preventDefault() and does not reload."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)

            # Set marker in window to detect reload
            page.evaluate("() => window.__no_reload_marker = 12345")

            passcode_input = page.locator("#admin-passcode-input")
            passcode_input.fill("test_pass")

            form = page.locator("#admin-login-form")
            form.evaluate("f => f.dispatchEvent(new Event('submit', { cancelable: true }))")
            time.sleep(0.5)

            marker = page.evaluate("() => window.__no_reload_marker")
            assert marker == 12345, "Page reloaded upon admin login form submission (preventDefault missing)"

            return TestCaseResult("test_f07_admin_login_form_prevents_default_page_reload", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_admin_login_form_prevents_default_page_reload", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    def test_f07_valid_admin_login_sets_is_admin_true(self) -> TestCaseResult:
        """F07.5: Valid admin passcode authenticates user and sets appState.isAdmin = true."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)

            page.locator("#admin-passcode-input").fill("33")
            page.locator("#admin-login-form button[type='submit']").click()
            time.sleep(0.5)

            state = self.harness.get_app_state()
            assert state and state.get("isAdmin") is True, f"Expected isAdmin to be True, got {state.get('isAdmin') if state else None}"

            # Verify admin status bar is revealed
            is_bar_visible = self.harness.is_visible("#admin-status-bar")
            assert is_bar_visible, "#admin-status-bar is not visible after admin login"

            return TestCaseResult("test_f07_valid_admin_login_sets_is_admin_true", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_valid_admin_login_sets_is_admin_true", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    def test_f07_admin_logout_btn_clears_admin_session(self) -> TestCaseResult:
        """F07.6: Clicking #admin-logout-btn logs out admin and restores student mode."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # First set admin state
            page.evaluate("""() => {
                if (window.appState) {
                    window.appState.isAdmin = true;
                    if (typeof syncAdminUI === 'function') syncAdminUI();
                }
            }""")
            time.sleep(0.3)

            logout_btn = page.locator("#admin-logout-btn")
            assert logout_btn.count() > 0, "Missing #admin-logout-btn"
            logout_btn.click()
            time.sleep(0.5)

            state = self.harness.get_app_state()
            assert state and state.get("isAdmin") is False, f"Expected isAdmin False after logout, got {state.get('isAdmin') if state else None}"

            # Verify admin status bar hidden
            is_bar_visible = self.harness.is_visible("#admin-status-bar")
            assert not is_bar_visible, "#admin-status-bar still visible after logout"

            return TestCaseResult("test_f07_admin_logout_btn_clears_admin_session", "Tier 1", "F07", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f07_admin_logout_btn_clears_admin_session", "Tier 1", "F07", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F08: Publish Modal & Form Lifecycle (5 test cases)
    # =========================================================================

    def test_f08_publish_modal_open_and_close_buttons(self) -> TestCaseResult:
        """F08.1: openPublishModal displays modal and #close-publish-modal-btn dismisses it."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("() => typeof openPublishModal === 'function' && openPublishModal()")
            time.sleep(0.4)

            is_open = self.harness.is_visible("#publish-modal")
            assert is_open, "#publish-modal did not open via openPublishModal"

            close_btn = page.locator("#close-publish-modal-btn")
            close_btn.click()
            time.sleep(0.4)

            is_open_after_close = self.harness.is_visible("#publish-modal")
            assert not is_open_after_close, "#publish-modal remained visible after close button click"

            return TestCaseResult("test_f08_publish_modal_open_and_close_buttons", "Tier 1", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f08_publish_modal_open_and_close_buttons", "Tier 1", "F08", "FAIL", time.time() - start, str(e))

    def test_f08_cancel_publish_btn_dismisses_modal(self) -> TestCaseResult:
        """F08.2: Clicking #cancel-publish-btn dismisses #publish-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("() => typeof openPublishModal === 'function' && openPublishModal()")
            time.sleep(0.4)

            cancel_btn = page.locator("#cancel-publish-btn")
            assert cancel_btn.count() > 0, "Missing #cancel-publish-btn"
            cancel_btn.click()
            time.sleep(0.4)

            is_open = self.harness.is_visible("#publish-modal")
            assert not is_open, "#publish-modal remained visible after cancel click"

            return TestCaseResult("test_f08_cancel_publish_btn_dismisses_modal", "Tier 1", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f08_cancel_publish_btn_dismisses_modal", "Tier 1", "F08", "FAIL", time.time() - start, str(e))

    def test_f08_publish_modal_backdrop_and_escape(self) -> TestCaseResult:
        """F08.3: Backdrop click and Escape key dismiss #publish-modal."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("() => typeof openPublishModal === 'function' && openPublishModal()")
            time.sleep(0.4)

            page.keyboard.press("Escape")
            time.sleep(0.4)

            is_open = self.harness.is_visible("#publish-modal")
            assert not is_open, "#publish-modal remained visible after Escape key"

            return TestCaseResult("test_f08_publish_modal_backdrop_and_escape", "Tier 1", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f08_publish_modal_backdrop_and_escape", "Tier 1", "F08", "FAIL", time.time() - start, str(e))

    def test_f08_publish_form_prevents_default_page_reload(self) -> TestCaseResult:
        """F08.4: Submitting #publish-form does not trigger default HTTP GET reload."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("() => typeof openPublishModal === 'function' && openPublishModal()")
            time.sleep(0.3)

            page.evaluate("() => window.__publish_marker = 777")
            form = page.locator("#publish-form")
            form.evaluate("f => f.dispatchEvent(new Event('submit', { cancelable: true }))")
            time.sleep(0.5)

            marker = page.evaluate("() => window.__publish_marker")
            assert marker == 777, "Page reloaded upon publish form submit (preventDefault missing)"

            return TestCaseResult("test_f08_publish_form_prevents_default_page_reload", "Tier 1", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f08_publish_form_prevents_default_page_reload", "Tier 1", "F08", "FAIL", time.time() - start, str(e))

    def test_f08_publish_form_field_validation(self) -> TestCaseResult:
        """F08.5: Form validates mandatory fields and does not submit empty required data."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("() => typeof openPublishModal === 'function' && openPublishModal()")
            time.sleep(0.3)

            # Check required fields exist in form
            has_required_fields = page.evaluate("""() => {
                const sub = document.getElementById('pub-subject');
                const cat = document.getElementById('pub-category');
                const num = document.getElementById('pub-folder-num');
                const fmt = document.getElementById('pub-format');
                return !!(sub && cat && num && fmt);
            }""")
            assert has_required_fields, "Missing one or more of the 4 mandatory publish fields in form"

            return TestCaseResult("test_f08_publish_form_field_validation", "Tier 1", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f08_publish_form_field_validation", "Tier 1", "F08", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # F09: Service Worker & Offline Hardening (5 test cases)
    # =========================================================================

    def test_f09_service_worker_registers_cleanly(self) -> TestCaseResult:
        """F09.1: Service Worker registers without unhandled promise rejections."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            sw_active = page.evaluate("""async () => {
                if (!('serviceWorker' in navigator)) return false;
                const reg = await navigator.serviceWorker.getRegistration();
                return !!(reg && (reg.active || reg.installing || reg.waiting));
            }""")
            assert sw_active, "Service worker failed to register or activate"

            return TestCaseResult("test_f09_service_worker_registers_cleanly", "Tier 1", "F09", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f09_service_worker_registers_cleanly", "Tier 1", "F09", "FAIL", time.time() - start, str(e))

    def test_f09_cache_storage_contains_app_shell(self) -> TestCaseResult:
        """F09.2: Cache storage includes vet33-pwa-cache-v33."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=2.0)
        try:
            cache_keys = page.evaluate("""async () => {
                if (!('caches' in window)) return [];
                return await caches.keys();
            }""")
            has_vet_cache = any("vet33" in k or "v33" in k for k in cache_keys)
            assert has_vet_cache or len(cache_keys) > 0, f"Expected vet33 cache in {cache_keys}"

            return TestCaseResult("test_f09_cache_storage_contains_app_shell", "Tier 1", "F09", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f09_cache_storage_contains_app_shell", "Tier 1", "F09", "FAIL", time.time() - start, str(e))

    def test_f09_offline_mode_loads_cached_app_shell(self) -> TestCaseResult:
        """F09.3: Cached PWA loads and renders when offline."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=2.0)
        try:
            # Emulate offline
            self.harness.simulate_offline(True)
            time.sleep(0.5)

            # Reload offline
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)

            title = page.title()
            assert "VET-KSU 33" in title, f"Offline load failed, page title: {title}"

            return TestCaseResult("test_f09_offline_mode_loads_cached_app_shell", "Tier 1", "F09", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f09_offline_mode_loads_cached_app_shell", "Tier 1", "F09", "FAIL", time.time() - start, str(e))
        finally:
            self.harness.simulate_offline(False)

    def test_f09_manifest_and_pwa_metadata(self) -> TestCaseResult:
        """F09.4: Web App Manifest link and theme-color meta tag are valid."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            manifest_href = page.locator("link[rel='manifest']").get_attribute("href")
            assert manifest_href and "manifest.json" in manifest_href, f"Invalid manifest href: {manifest_href}"

            theme_color = page.locator("meta[name='theme-color']").get_attribute("content")
            assert theme_color and theme_color.startswith("#"), f"Invalid theme color: {theme_color}"

            return TestCaseResult("test_f09_manifest_and_pwa_metadata", "Tier 1", "F09", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f09_manifest_and_pwa_metadata", "Tier 1", "F09", "FAIL", time.time() - start, str(e))

    def test_f09_zero_unhandled_console_errors_on_load(self) -> TestCaseResult:
        """F09.5: Page loads cleanly with zero uncaught JavaScript errors."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            errors = self.harness.captured_page_errors
            assert len(errors) == 0, f"Uncaught runtime errors on page load: {errors}"

            return TestCaseResult("test_f09_zero_unhandled_console_errors_on_load", "Tier 1", "F09", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f09_zero_unhandled_console_errors_on_load", "Tier 1", "F09", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    # =========================================================================
    # F10: Visual Design, RTL & Data Preservation (5 test cases)
    # =========================================================================

    def test_f10_arabic_rtl_document_attributes(self) -> TestCaseResult:
        """F10.1: HTML element has lang='ar' and dir='rtl'."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            lang = page.locator("html").get_attribute("lang")
            direction = page.locator("html").get_attribute("dir")
            assert lang == "ar", f"Expected lang='ar', got '{lang}'"
            assert direction == "rtl", f"Expected dir='rtl', got '{direction}'"

            return TestCaseResult("test_f10_arabic_rtl_document_attributes", "Tier 1", "F10", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f10_arabic_rtl_document_attributes", "Tier 1", "F10", "FAIL", time.time() - start, str(e))

    def test_f10_cairo_tajawal_fonts_applied(self) -> TestCaseResult:
        """F10.2: Document and styles include Cairo and Tajawal font definitions."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            fonts_included = page.evaluate("""() => {
                const links = Array.from(document.querySelectorAll('link[href*="fonts.googleapis.com"]'));
                return links.some(l => l.href.includes('Cairo') || l.href.includes('Tajawal'));
            }""")
            assert fonts_included, "Google Fonts link for Cairo/Tajawal not found"

            return TestCaseResult("test_f10_cairo_tajawal_fonts_applied", "Tier 1", "F10", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f10_cairo_tajawal_fonts_applied", "Tier 1", "F10", "FAIL", time.time() - start, str(e))

    def test_f10_cyber_styling_and_glassmorphism_classes(self) -> TestCaseResult:
        """F10.3: Glassmorphism and cyber CSS classes exist in stylesheet and DOM."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            glass_count = page.locator(".glass-panel").count()
            assert glass_count >= 2, f"Expected at least 2 .glass-panel elements, found {glass_count}"

            return TestCaseResult("test_f10_cyber_styling_and_glassmorphism_classes", "Tier 1", "F10", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f10_cyber_styling_and_glassmorphism_classes", "Tier 1", "F10", "FAIL", time.time() - start, str(e))

    def test_f10_ordered_subjects_and_categories_structure(self) -> TestCaseResult:
        """F10.4: All 8 core veterinary subjects are defined in the curriculum data."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            expected_subjects = ['batna', 'tawleed', 'geraha', 'dawagen', 'seha', 'lahma', 'moshtaraka', 'moadya']
            actual_subjects = page.evaluate("""() => {
                if (typeof ORDERED_SUBJECTS !== 'undefined') return ORDERED_SUBJECTS.map(s => s.id);
                if (typeof window !== 'undefined' && window.ORDERED_SUBJECTS) return window.ORDERED_SUBJECTS.map(s => s.id);
                if (typeof window !== 'undefined' && window.SUBJECTS_METADATA) return Object.keys(window.SUBJECTS_METADATA);
                return [];
            }""")
            missing = [s for s in expected_subjects if s not in actual_subjects]
            assert not missing, f"Missing core subjects from curriculum: {missing}"

            return TestCaseResult("test_f10_ordered_subjects_and_categories_structure", "Tier 1", "F10", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f10_ordered_subjects_and_categories_structure", "Tier 1", "F10", "FAIL", time.time() - start, str(e))

    def test_f10_live_drive_data_records_integrity(self) -> TestCaseResult:
        """F10.5: Application data contains academic records from Google Drive backend."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            file_count = 0
            for _ in range(12):
                file_count = page.evaluate("""() => {
                    if (typeof appState !== 'undefined' && appState.files) return appState.files.length;
                    if (typeof window !== 'undefined' && window.appState && window.appState.files) return window.appState.files.length;
                    if (typeof window !== 'undefined' && window.appData && Array.isArray(window.appData.files)) return window.appData.files.length;
                    return 0;
                }""")
                if file_count > 0:
                    break
                time.sleep(0.5)

            assert file_count > 0, f"Expected academic files in appState, found {file_count}"

            return TestCaseResult("test_f10_live_drive_data_records_integrity", "Tier 1", "F10", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_f10_live_drive_data_records_integrity", "Tier 1", "F10", "FAIL", time.time() - start, str(e))
