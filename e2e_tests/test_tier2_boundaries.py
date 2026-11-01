"""
Tier 2: Boundary & Corner Cases Tests for Seniors 2027 VET-KSU 33 Old List PWA.
Covers:
- Empty and whitespace search query
- Rapid consecutive clicking (bookmark toggle stress)
- Corrupted / malformed localStorage recovery
- Non-existent file ID preview handling
- Video failure safety timeout and overlay unblocking
- Escape key handling across modals
- Invalid admin passcode rejection and error feedback
- Offline network fetch error resilience
"""

import time
import json
from e2e_tests.framework import PWATestHarness, TestCaseResult

class Tier2BoundaryTests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def test_t2_empty_and_whitespace_search_query(self) -> TestCaseResult:
        """T2.1: Empty search and whitespace queries do not crash or corrupt explorer grid."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            assert search_input.count() > 0, "Missing #search-input"

            # Fill whitespace
            search_input.fill("     ")
            time.sleep(0.3)

            # Check no unhandled errors
            assert len(self.harness.captured_page_errors) == 0, f"Errors on whitespace search: {self.harness.captured_page_errors}"

            # Check grid still has content or empty state
            grid_html = page.inner_html("#explorer-grid")
            assert len(grid_html) > 0, "Explorer grid went completely blank on whitespace search"

            # Clear search
            search_input.fill("")
            time.sleep(0.3)
            assert len(self.harness.captured_page_errors) == 0, f"Errors on clearing search: {self.harness.captured_page_errors}"

            return TestCaseResult("test_t2_empty_and_whitespace_search_query", "Tier 2", "Search Boundary", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_empty_and_whitespace_search_query", "Tier 2", "Search Boundary", "FAIL", time.time() - start, str(e))

    def test_t2_rapid_consecutive_clicking_bookmark_toggle(self) -> TestCaseResult:
        """T2.2: Rapid consecutive clicking (10 clicks) does not corrupt saved state or create duplicates."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            btn = page.locator("[data-file-action='toggle-save']").first
            assert btn.count() > 0, "No toggle-save button found"
            file_id = btn.get_attribute("data-file-id")

            # Click 10 times rapidly
            for _ in range(10):
                btn.click()
                time.sleep(0.05)
            time.sleep(0.5)

            # Verify no runtime errors
            assert len(self.harness.captured_page_errors) == 0, f"Errors on rapid clicking: {self.harness.captured_page_errors}"

            # Verify localStorage array does not have duplicate entries for file_id
            saved_raw = self.harness.get_local_storage("vet33_saved_files_v1")
            saved_list = json.loads(saved_raw) if saved_raw else []
            count = saved_list.count(file_id)
            assert count <= 1, f"Duplicate file IDs found in vet33_saved_files_v1: {count} instances"

            return TestCaseResult("test_t2_rapid_consecutive_clicking_bookmark_toggle", "Tier 2", "State Concurrency", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_rapid_consecutive_clicking_bookmark_toggle", "Tier 2", "State Concurrency", "FAIL", time.time() - start, str(e))

    def test_t2_corrupted_local_storage_recovery(self) -> TestCaseResult:
        """T2.3: Corrupted non-JSON data in localStorage does not crash the PWA on load."""
        start = time.time()
        page = self.harness.new_page()
        try:
            # Seed corrupt strings into app keys
            page.goto(f"{self.harness.base_url}/index.html", wait_until="commit")
            page.evaluate("""() => {
                localStorage.setItem('vet33_saved_files_v1', 'CORRUPT_NOT_JSON{{[[');
                localStorage.setItem('vet33_completed_files_v1', '12345NOT_AN_ARRAY');
                localStorage.setItem('vet33_admin_session_v1', '{corrupt:');
            }""")

            # Now navigate home
            page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()

            # Verify page title and header render despite corrupt storage
            title = page.title()
            assert "VET-KSU 33" in title, f"Page failed to load with corrupt storage: {title}"

            # Check uncaught JSON.parse exceptions
            json_parse_errors = [e for e in self.harness.captured_page_errors if "JSON.parse" in e or "SyntaxError" in e]
            assert not json_parse_errors, f"Unhandled JSON parse errors from corrupt storage: {json_parse_errors}"

            return TestCaseResult("test_t2_corrupted_local_storage_recovery", "Tier 2", "Storage Robustness", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_corrupted_local_storage_recovery", "Tier 2", "Storage Robustness", "FAIL", time.time() - start, str(e))

    def test_t2_non_existent_file_preview_handling(self) -> TestCaseResult:
        """T2.4: Attempting to preview a non-existent file ID does not crash or throw unhandled exceptions."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.evaluate("""() => {
                if (typeof openPreviewModal === 'function') {
                    openPreviewModal('INVALID_FILE_ID_DOES_NOT_EXIST_XYZ');
                }
            }""")
            time.sleep(0.5)

            # Verify no unhandled page crash
            assert len(self.harness.captured_page_errors) == 0, f"Errors on invalid preview modal call: {self.harness.captured_page_errors}"

            return TestCaseResult("test_t2_non_existent_file_preview_handling", "Tier 2", "Data Robustness", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_non_existent_file_preview_handling", "Tier 2", "Data Robustness", "FAIL", time.time() - start, str(e))

    def test_t2_video_load_error_safety_timeout_fallback(self) -> TestCaseResult:
        """T2.5: Missing / failed video source unblocks the user within 3.5 seconds via fallback timer."""
        start = time.time()
        page = self.harness.new_page()
        try:
            page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")

            # Corrupt video src to simulate network failure / 404
            page.evaluate("""() => {
                const v = document.getElementById('intro-video');
                if (v) {
                    v.src = './non_existent_video_path_404.mp4';
                    v.load();
                }
            }""")

            # Wait 3.5s for fallback timer to auto-dismiss
            time.sleep(3.6)

            is_hidden = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
            }""")
            assert is_hidden, "Video failure did not trigger safety timeout dismissal"

            return TestCaseResult("test_t2_video_load_error_safety_timeout_fallback", "Tier 2", "Media Robustness", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_video_load_error_safety_timeout_fallback", "Tier 2", "Media Robustness", "FAIL", time.time() - start, str(e))

    def test_t2_escape_key_dismissal_across_modals(self) -> TestCaseResult:
        """T2.6: Escape key cleanly dismisses open modals without breaking underlying page."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Test Escape on Admin Login Modal
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)
            assert self.harness.is_visible("#admin-login-modal"), "Admin modal did not open"

            page.keyboard.press("Escape")
            time.sleep(0.3)
            assert not self.harness.is_visible("#admin-login-modal"), "Admin modal did not close on Escape"

            # Test Escape on Notifications Modal
            page.locator("#notifications-btn").click()
            time.sleep(0.3)
            assert self.harness.is_visible("#notifications-modal"), "Notifications modal did not open"

            page.keyboard.press("Escape")
            time.sleep(0.3)
            assert not self.harness.is_visible("#notifications-modal"), "Notifications modal did not close on Escape"

            return TestCaseResult("test_t2_escape_key_dismissal_across_modals", "Tier 2", "Keyboard Navigation", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_escape_key_dismissal_across_modals", "Tier 2", "Keyboard Navigation", "FAIL", time.time() - start, str(e))

    def test_t2_invalid_admin_passcode_rejection(self) -> TestCaseResult:
        """T2.7: Submitting invalid passcode rejects authentication and displays #admin-login-error."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)

            page.locator("#admin-passcode-input").fill("WRONG_INCORRECT_PASSCODE_999")
            page.locator("#admin-login-form button[type='submit']").click()
            time.sleep(0.4)

            # Verify admin is NOT logged in
            state = self.harness.get_app_state()
            assert not state.get("isAdmin"), "Admin was wrongly authenticated with invalid passcode"

            # Verify error message is visible
            is_err_visible = self.harness.is_visible("#admin-login-error")
            assert is_err_visible, "#admin-login-error message was not displayed upon wrong passcode"

            return TestCaseResult("test_t2_invalid_admin_passcode_rejection", "Tier 2", "Security Boundary", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_invalid_admin_passcode_rejection", "Tier 2", "Security Boundary", "FAIL", time.time() - start, str(e))

    def test_t2_offline_network_fetch_error_resilience(self) -> TestCaseResult:
        """T2.8: Network disconnect during cloud sync does not trigger fatal unhandled exceptions."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            self.harness.simulate_offline(True)
            time.sleep(0.3)

            # Trigger cloud sync while offline
            page.evaluate("""() => {
                if (typeof fetchDatabaseFromDrive === 'function') {
                    fetchDatabaseFromDrive(true).catch(() => {});
                }
            }""")
            time.sleep(0.5)

            # Verify zero fatal errors crashed the application
            fatal_errors = [e for e in self.harness.captured_page_errors if "Fatal" in e or "Uncaught (in promise)" in e]
            assert not fatal_errors, f"Fatal errors during offline sync: {fatal_errors}"

            return TestCaseResult("test_t2_offline_network_fetch_error_resilience", "Tier 2", "Offline Fault Tolerance", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t2_offline_network_fetch_error_resilience", "Tier 2", "Offline Fault Tolerance", "FAIL", time.time() - start, str(e))
        finally:
            self.harness.simulate_offline(False)
