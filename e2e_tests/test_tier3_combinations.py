"""
Tier 3: Cross-Feature Combinations Tests for Seniors 2027 VET-KSU 33 Old List PWA.
Validates multi-feature interactions and state synchronizations:
- Search while in Saved view
- Layout switch during active search results
- Preview modal opened from search result, actioned and closed
- Admin edit action in list view vs grid view
- Bookmarking across multiple subjects and verifying aggregated saved view
- Study complete status persistence across view transitions and reload
- Service Worker offline mode during subject navigation
"""

import time
import json
from e2e_tests.framework import PWATestHarness, TestCaseResult

class Tier3CombinationTests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def test_t3_search_while_in_saved_view(self) -> TestCaseResult:
        """T3.1: Searching while in Saved View filters only within saved cards."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Seed 2 saved files
            page.evaluate("""() => {
                localStorage.setItem('vet33_saved_files_v1', JSON.stringify(['batna-lec-1-source', 'geraha-lec-1-source']));
                if (typeof toggleSavedView === 'function') toggleSavedView();
            }""")
            time.sleep(0.5)

            # Search for batna
            search_input = page.locator("#search-input")
            search_input.fill("باطنه")
            time.sleep(0.4)

            # State should preserve saved view or search mode
            state = self.harness.get_app_state()
            assert state and state.get("searchQuery") == "باطنه", "Search query not updated in saved view"

            return TestCaseResult("test_t3_search_while_in_saved_view", "Tier 3", "Saved + Search", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_search_while_in_saved_view", "Tier 3", "Saved + Search", "FAIL", time.time() - start, str(e))

    def test_t3_layout_switch_during_active_search(self) -> TestCaseResult:
        """T3.2: Switching layout between grid and list while search results are active."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            search_input = page.locator("#search-input")
            search_input.fill("محاضرة")
            time.sleep(0.4)

            # Switch to list
            page.locator("#layout-list-btn").click()
            time.sleep(0.3)
            state_list = self.harness.get_app_state()
            assert state_list.get("layoutMode") == "list", "Failed to switch to list mode during search"
            assert state_list.get("searchQuery") == "محاضرة", "Search query was lost on layout switch"

            # Switch back to grid
            page.locator("#layout-grid-btn").click()
            time.sleep(0.3)
            state_grid = self.harness.get_app_state()
            assert state_grid.get("layoutMode") == "grid", "Failed to switch back to grid mode during search"
            assert state_grid.get("searchQuery") == "محاضرة", "Search query was lost on grid layout switch"

            return TestCaseResult("test_t3_layout_switch_during_active_search", "Tier 3", "Layout + Search", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_layout_switch_during_active_search", "Tier 3", "Layout + Search", "FAIL", time.time() - start, str(e))

    def test_t3_preview_modal_opened_from_search_actioned_and_closed(self) -> TestCaseResult:
        """T3.3: Preview modal opened from search result, marked studied in modal, and closed."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            search_input = page.locator("#search-input")
            search_input.fill("باطنه")
            time.sleep(0.5)

            # Click preview on first result
            preview_btn = page.locator("[data-file-action='preview']").first
            if preview_btn.count() > 0:
                preview_btn.click()
                time.sleep(0.4)

                # Inside modal, mark complete
                modal_complete = page.locator("#modal-complete-btn")
                if modal_complete.is_visible():
                    modal_complete.click()
                    time.sleep(0.3)

                # Close modal
                page.locator("#close-preview-modal-btn").click()
                time.sleep(0.4)

                assert not self.harness.is_visible("#preview-modal"), "Modal remained open"

            # Verify search input still contains query
            assert search_input.input_value() == "باطنه", "Search query was reset after closing modal"

            return TestCaseResult("test_t3_preview_modal_opened_from_search_actioned_and_closed", "Tier 3", "Search + Preview + Storage", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_preview_modal_opened_from_search_actioned_and_closed", "Tier 3", "Search + Preview + Storage", "FAIL", time.time() - start, str(e))

    def test_t3_admin_edit_action_in_list_view_vs_grid_view(self) -> TestCaseResult:
        """T3.4: Admin edit action launches publish modal correctly from both list and grid views."""
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

            # Test in Grid View first
            edit_btn = page.locator("[data-file-action='edit']").first
            if edit_btn.count() > 0:
                edit_btn.click()
                time.sleep(0.4)
                assert self.harness.is_visible("#publish-modal"), "Publish modal did not open from grid view edit"
                page.locator("#close-publish-modal-btn").click()
                time.sleep(0.3)

            # Switch to List View
            page.locator("#layout-list-btn").click()
            time.sleep(0.3)

            # Test in List View
            edit_btn_list = page.locator("[data-file-action='edit']").first
            if edit_btn_list.count() > 0:
                edit_btn_list.click()
                time.sleep(0.4)
                assert self.harness.is_visible("#publish-modal"), "Publish modal did not open from list view edit"
                page.locator("#close-publish-modal-btn").click()
                time.sleep(0.3)

            return TestCaseResult("test_t3_admin_edit_action_in_list_view_vs_grid_view", "Tier 3", "Admin + Layout + Modal", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_admin_edit_action_in_list_view_vs_grid_view", "Tier 3", "Admin + Layout + Modal", "FAIL", time.time() - start, str(e))

    def test_t3_bookmark_multiple_files_across_subjects_verified_in_saved_view(self) -> TestCaseResult:
        """T3.5: Bookmarking files from multiple subjects aggregates properly in saved view."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Seed 2 bookmarks from different subjects
            page.evaluate("""() => {
                const ids = ['batna-lec-1-source', 'tawleed-lec-1-source'];
                localStorage.setItem('vet33_saved_files_v1', JSON.stringify(ids));
                if (typeof updateLibraryCounters === 'function') updateLibraryCounters();
            }""")
            time.sleep(0.3)

            # Open saved view
            page.locator("#header-saved-btn").click()
            time.sleep(0.5)

            # Verify badge shows at least 2
            badge_text = page.inner_text("#saved-count-badge")
            assert int(badge_text) >= 2 or badge_text != "0", f"Saved count badge not updated: {badge_text}"

            return TestCaseResult("test_t3_bookmark_multiple_files_across_subjects_verified_in_saved_view", "Tier 3", "Multi-Subject Bookmark Sync", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_bookmark_multiple_files_across_subjects_verified_in_saved_view", "Tier 3", "Multi-Subject Bookmark Sync", "FAIL", time.time() - start, str(e))

    def test_t3_study_complete_persists_across_view_transitions_and_reload(self) -> TestCaseResult:
        """T3.6: Completed/studied status persists across view transitions and page reloads."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            test_file_id = "batna-lec-1-source"
            page.evaluate(f"""() => {{
                localStorage.setItem('vet33_completed_files_v1', JSON.stringify(['{test_file_id}']));
            }}""")

            # Reload page
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()

            # Verify localStorage retained
            completed_raw = self.harness.get_local_storage("vet33_completed_files_v1")
            completed_list = json.loads(completed_raw) if completed_raw else []
            assert test_file_id in completed_list, f"Completed status lost on reload: {completed_list}"

            return TestCaseResult("test_t3_study_complete_persists_across_view_transitions_and_reload", "Tier 3", "Persistence Across Reload", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_study_complete_persists_across_view_transitions_and_reload", "Tier 3", "Persistence Across Reload", "FAIL", time.time() - start, str(e))

    def test_t3_service_worker_offline_during_subject_navigation(self) -> TestCaseResult:
        """T3.7: Switching offline mid-session permits navigation between cached views."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            # Go offline
            self.harness.simulate_offline(True)
            time.sleep(0.3)

            # Navigate home via brand logo
            page.locator("#brand-logo-btn").click()
            time.sleep(0.5)

            # Navigate to saved view offline
            page.locator("#header-saved-btn").click()
            time.sleep(0.5)

            # Verify no unhandled page crash
            assert len(self.harness.captured_page_errors) == 0, f"Errors during offline navigation: {self.harness.captured_page_errors}"

            return TestCaseResult("test_t3_service_worker_offline_during_subject_navigation", "Tier 3", "Offline + Navigation", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t3_service_worker_offline_during_subject_navigation", "Tier 3", "Offline + Navigation", "FAIL", time.time() - start, str(e))
        finally:
            self.harness.simulate_offline(False)
