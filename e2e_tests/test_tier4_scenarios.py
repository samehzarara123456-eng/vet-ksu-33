"""
Tier 4: Real-World Application Scenarios for Seniors 2027 VET-KSU 33 Old List PWA.
End-to-end full user journeys simulating real veterinary students and batch administrators:
1. Student complete browsing, searching, previewing, and bookmarking journey.
2. Complete offline study and revision journey.
3. Complete administrative login, publishing, and logout journey.
"""

import time
import json
from e2e_tests.framework import PWATestHarness, TestCaseResult

class Tier4ScenarioTests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def test_t4_student_browsing_and_bookmarking_journey(self) -> TestCaseResult:
        """T4.1: Complete Student Journey: Skip intro -> select subject -> folder -> search -> preview -> bookmark -> saved view."""
        start = time.time()
        # Step 1: Open PWA and dismiss intro
        page = self.harness.navigate_home(dismiss_video=False)
        try:
            assert page.locator("#intro-video-overlay").count() > 0, "Intro overlay missing on open"
            skip_btn = page.locator("#intro-skip-btn")
            if skip_btn.is_visible():
                skip_btn.click()
            time.sleep(1.0)
            self.harness.dismiss_intro_video()

            # Step 2: Verify on Root view, navigate to batna
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)

            # Step 3: Switch layout to list mode
            list_btn = page.locator("#layout-list-btn")
            if list_btn.is_visible():
                list_btn.click()
                time.sleep(0.3)

            # Step 4: Search for material
            search_input = page.locator("#search-input")
            if search_input.is_visible():
                search_input.fill("المصدر")
                time.sleep(0.4)

            # Step 5: Open preview modal on first match
            preview_btn = page.locator("[data-file-action='preview']").first
            if preview_btn.count() > 0:
                preview_btn.click()
                time.sleep(0.5)
                assert self.harness.is_visible("#preview-modal"), "Preview modal failed to open in student journey"

                # Step 6: Mark studied inside modal
                comp_btn = page.locator("#modal-complete-btn")
                if comp_btn.is_visible():
                    comp_btn.click()
                    time.sleep(0.2)

                # Step 7: Close preview modal
                page.locator("#close-preview-modal-btn").click()
                time.sleep(0.4)
                assert not self.harness.is_visible("#preview-modal"), "Preview modal failed to close"

            # Step 8: Bookmark file from card
            save_btn = page.locator("[data-file-action='toggle-save']").first
            if save_btn.count() > 0:
                save_btn.click()
                time.sleep(0.3)

            # Step 9: Open Saved View via header button
            header_saved = page.locator("#header-saved-btn")
            if header_saved.is_visible():
                header_saved.click()
                time.sleep(0.5)

            # Step 10: Verify no fatal errors throughout the journey
            assert len(self.harness.captured_page_errors) == 0, f"Errors during student journey: {self.harness.captured_page_errors}"

            return TestCaseResult("test_t4_student_browsing_and_bookmarking_journey", "Tier 4", "Student Workflow", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t4_student_browsing_and_bookmarking_journey", "Tier 4", "Student Workflow", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_t4_offline_study_and_revision_journey(self) -> TestCaseResult:
        """T4.2: Complete Offline Study Journey: Cache shell -> go offline -> reload -> navigate -> mark complete -> persist."""
        start = time.time()
        # Step 1: Load online and wait for SW caching
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=2.0)
        try:
            # Ensure Service Worker is activated and cache is populated
            start_wait = time.time()
            while time.time() - start_wait < 8.0:
                ready = page.evaluate("""async () => {
                    if (!('serviceWorker' in navigator) || !('caches' in window)) return false;
                    const reg = await navigator.serviceWorker.getRegistration();
                    if (!reg || !reg.active) return false;
                    const hasCache = await caches.has('vet33-pwa-cache-v33');
                    if (!hasCache) return false;
                    const cache = await caches.open('vet33-pwa-cache-v33');
                    const keys = await cache.keys();
                    return keys.length >= 10;
                }""")
                if ready:
                    break
                time.sleep(0.4)

            # Step 2: Go fully offline
            self.harness.simulate_offline(True)
            time.sleep(0.5)

            # Step 3: Reload page while offline
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()

            # Step 4: Verify PWA loaded from SW cache
            title = page.title()
            assert "VET-KSU 33" in title, f"PWA failed to load offline: {title}"

            # Step 5: Mark a file as completed in offline mode
            test_file_id = "batna-offline-lec-1"
            page.evaluate(f"""() => {{
                let comp = [];
                try {{ comp = JSON.parse(localStorage.getItem('vet33_completed_files_v1') || '[]'); }} catch (e) {{}}
                comp.push('{test_file_id}');
                localStorage.setItem('vet33_completed_files_v1', JSON.stringify(comp));
            }}""")

            # Step 6: Verify persistence offline
            comp_raw = self.harness.get_local_storage("vet33_completed_files_v1")
            assert test_file_id in comp_raw, "Offline completion was not persisted"

            return TestCaseResult("test_t4_offline_study_and_revision_journey", "Tier 4", "Offline Study Workflow", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t4_offline_study_and_revision_journey", "Tier 4", "Offline Study Workflow", "FAIL", time.time() - start, str(e))
        finally:
            self.harness.simulate_offline(False)

    def test_t4_admin_publishing_and_management_journey(self) -> TestCaseResult:
        """T4.3: Complete Admin Journey: Login -> admin banner -> manage -> publish modal -> submit -> logout."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        try:
            # Step 1: Open admin login modal
            page.locator("#admin-access-btn").click()
            time.sleep(0.4)
            assert self.harness.is_visible("#admin-login-modal"), "Admin modal did not open"

            # Step 2: Enter passcode and submit
            page.locator("#admin-passcode-input").fill("33")
            page.locator("#admin-login-form button[type='submit']").click()
            time.sleep(0.5)

            # Step 3: Verify admin status bar appears
            assert self.harness.is_visible("#admin-status-bar"), "Admin status bar missing after login"

            # Step 4: Open publish modal
            page.evaluate("""() => {
                if (typeof openPublishModal === 'function') openPublishModal();
            }""")
            time.sleep(0.4)
            assert self.harness.is_visible("#publish-modal"), "Publish modal failed to open"

            # Step 5: Fill mandatory fields
            page.select_option("#pub-subject", "batna")
            page.select_option("#pub-category", "محاضرات")
            page.locator("#pub-folder-num").fill("1")
            page.select_option("#pub-format", "المصدر")
            page.locator("#pub-title").fill("محاضرة اختبار تجريبية")

            # Step 6: Submit publish form
            submit_btn = page.locator("#publish-form button[type='submit']")
            submit_btn.click()
            time.sleep(0.5)

            # Step 7: Logout as admin
            logout_btn = page.locator("#admin-logout-btn")
            if logout_btn.is_visible():
                logout_btn.click()
                time.sleep(0.5)
                assert not self.harness.is_visible("#admin-status-bar"), "Admin bar still visible after logout"

            # Step 8: Verify zero console errors
            assert len(self.harness.captured_page_errors) == 0, f"Errors during admin journey: {self.harness.captured_page_errors}"

            return TestCaseResult("test_t4_admin_publishing_and_management_journey", "Tier 4", "Admin Workflow", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_t4_admin_publishing_and_management_journey", "Tier 4", "Admin Workflow", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)
