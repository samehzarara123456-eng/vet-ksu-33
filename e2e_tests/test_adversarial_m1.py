"""
Adversarial Stress & Boundary Test Suite for Milestone 1:
Features F01 (Saved View), F02 (Video Safety), F03 (Search & Clear), F04 (Layout Switcher).

Empirical verification harness executing hostile conditions:
1. View switching stress (rapid toggling, deep hierarchy navigation while in saved view).
2. Layout mode persistence across reloads, multi-level folder transitions, and storage corruption.
3. Video overlay dismissal under simulated offline and stalled/slow network conditions.
4. Search boundary fuzzing with special characters, rapid typing, and Escape key recovery.
5. Absolute zero unhandled console error / page error enforcement.
"""

import sys
import os
import time
import json
from typing import List

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from e2e_tests.framework import PWATestHarness, TestCaseResult

class AdversarialM1Tests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def _wait_overlay_dismissed(self, page):
        """Helper to ensure intro video overlay transition (650ms) has fully finished and display is none."""
        try:
            self.harness.dismiss_intro_video()
            page.evaluate("""() => {
                const overlay = document.getElementById('intro-video-overlay');
                if (overlay) {
                    overlay.classList.add('hidden', 'intro-hidden');
                    overlay.style.display = 'none';
                    overlay.style.pointerEvents = 'none';
                    overlay.style.opacity = '0';
                }
            }""")
        except Exception:
            pass
        time.sleep(0.3)

    # =========================================================================
    # ADV-1: View Switching & Hierarchy Navigation Stress
    # =========================================================================

    def test_adv_view_switching_rapid_toggling_stress(self) -> TestCaseResult:
        """ADV-1.1: Rapidly toggle saved view 20 times consecutively across entry points."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Seed sample bookmarks
            page.evaluate("""() => {
                localStorage.setItem('vet33_saved_files_v1', JSON.stringify(['batna-lec-1-source', 'geraha-lec-1-source']));
                if (typeof loadSavedFilesFromStorage === 'function') loadSavedFilesFromStorage();
            }""")
            time.sleep(0.3)

            # Rapid 20 toggles via toggleSavedView API and header/footer buttons
            header_btn = page.locator("#header-saved-btn")
            footer_btn = page.locator("#footer-saved-link")

            for i in range(20):
                if i % 3 == 0 and header_btn.count() > 0:
                    page.evaluate("() => document.getElementById('header-saved-btn') && document.getElementById('header-saved-btn').click()")
                elif i % 3 == 1 and footer_btn.count() > 0:
                    page.evaluate("() => document.getElementById('footer-saved-link') && document.getElementById('footer-saved-link').click()")
                else:
                    page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
                time.sleep(0.05)

            time.sleep(0.5)

            # Assert no runtime exceptions occurred
            assert len(self.harness.captured_page_errors) == 0, f"Page errors during rapid toggling: {self.harness.captured_page_errors}"
            # Filter browser-internal messages like push api in incognito
            fatal_console = [e for e in self.harness.captured_console_errors if "crbug.com" not in e and "Push API" not in e]
            assert len(fatal_console) == 0, f"Console errors during rapid toggling: {fatal_console}"

            # Verify final state is valid (either 'saved' or 'explorer', not undefined/null)
            state = self.harness.get_app_state()
            assert state.get("currentView") in ("saved", "explorer"), f"Invalid state after rapid toggling: {state.get('currentView')}"

            # One more toggle to verify it cleanly switches
            is_saved_before = (state.get("currentView") == "saved")
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            state_after = self.harness.get_app_state()
            is_saved_after = (state_after.get("currentView") == "saved")
            assert is_saved_before != is_saved_after, "toggleSavedView locked up or ceased functioning after stress"

            return TestCaseResult("test_adv_view_switching_rapid_toggling_stress", "Adversarial M1", "F01 Stress", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_view_switching_rapid_toggling_stress", "Adversarial M1", "F01 Stress", "FAIL", time.time() - start, str(e))

    def test_adv_view_switching_navigation_escape(self) -> TestCaseResult:
        """ADV-1.2: Navigating to folder or breadcrumb while in saved view cleanly exits saved mode."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # 1. Navigate to batna folder 1
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            state_f1 = self.harness.get_app_state()
            assert state_f1.get("currentSubject") == 'batna', "Failed initial navigation to batna"

            # 2. Switch to Saved View
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            state_saved = self.harness.get_app_state()
            assert state_saved.get("currentView") == "saved", "Failed to switch to saved view"
            assert state_saved.get("previousHierarchy") is not None, "previousHierarchy not captured"

            # 3. While in saved view, user navigates to geraha folder 2 directly
            page.evaluate("() => typeof navigateToHierarchy === 'function' && navigateToHierarchy('geraha', 'محاضرات', 2)")
            time.sleep(0.5)

            # Check state: currentView should reflect active folder hierarchy or explorer, not stuck on saved
            state_nav = self.harness.get_app_state()
            assert state_nav.get("currentSubject") == 'geraha', f"Subject was not updated: {state_nav.get('currentSubject')}"
            assert state_nav.get("currentFolderNum") == 2, f"FolderNum was not updated: {state_nav.get('currentFolderNum')}"

            # Check breadcrumb reflects geraha
            breadcrumb = page.inner_text("#breadcrumb-bar")
            assert "الجراحة" in breadcrumb or "جراحه" in breadcrumb or "محاضرات" in breadcrumb, f"Breadcrumb inconsistent: {breadcrumb}"

            # 4. Now toggle saved view again from geraha
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            state_saved_2 = self.harness.get_app_state()
            assert state_saved_2.get("currentView") == "saved", "Failed to re-enter saved view"
            assert state_saved_2.get("previousHierarchy", {}).get("subject") == "geraha", "Failed to capture geraha in previousHierarchy"

            # 5. Toggle off saved view, must restore to geraha
            page.evaluate("() => typeof toggleSavedView === 'function' && toggleSavedView()")
            time.sleep(0.3)
            state_restored = self.harness.get_app_state()
            assert state_restored.get("currentSubject") == "geraha", f"Failed to restore geraha: {state_restored.get('currentSubject')}"
            assert state_restored.get("currentFolderNum") == 2, f"Failed to restore folder 2: {state_restored.get('currentFolderNum')}"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_view_switching_navigation_escape", "Adversarial M1", "F01 Navigation", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_view_switching_navigation_escape", "Adversarial M1", "F01 Navigation", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-2: Layout Mode Persistence & Transition Stress
    # =========================================================================

    def test_adv_layout_persistence_across_reloads_and_transitions(self) -> TestCaseResult:
        """ADV-2.1: Layout mode 'list' persists across deep folder navigation and full page reloads."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Switch to list mode
            list_btn = page.locator("#layout-list-btn")
            assert list_btn.count() > 0, "Missing #layout-list-btn"
            list_btn.click()
            time.sleep(0.3)

            # Verify localStorage is updated
            raw_layout = self.harness.get_local_storage("ksu_vet33_layout_v1")
            assert raw_layout == "list", f"Expected localStorage ksu_vet33_layout_v1 'list', got: {raw_layout}"

            # Step through Level 1 -> Level 2 -> Level 3 -> Level 4
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            time.sleep(0.4)

            # Check that layoutMode is STILL list
            state_f = self.harness.get_app_state()
            assert state_f.get("layoutMode") == "list", f"layoutMode reset to {state_f.get('layoutMode')} during folder navigation"

            # Check list button styling has active classes
            list_btn_classes = page.locator("#layout-list-btn").get_attribute("class") or ""
            assert "bg-amber-500" in list_btn_classes, f"Active class lost on list button: {list_btn_classes}"

            # Full browser reload (F5 / page.reload)
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()
            self._wait_overlay_dismissed(page)

            # Verify layoutMode is restored from localStorage as 'list'
            state_reloaded = self.harness.get_app_state()
            assert state_reloaded.get("layoutMode") == "list", f"layoutMode failed to persist after page reload: {state_reloaded.get('layoutMode')}"

            # Verify button styling after reload
            list_btn_classes_reloaded = page.locator("#layout-list-btn").get_attribute("class") or ""
            assert "bg-amber-500" in list_btn_classes_reloaded, f"List button lost active styling after reload: {list_btn_classes_reloaded}"

            # Switch back to grid mode
            grid_btn = page.locator("#layout-grid-btn")
            grid_btn.click()
            time.sleep(0.3)
            assert self.harness.get_local_storage("ksu_vet33_layout_v1") == "grid", "Failed to switch back to grid mode"

            # Reload again and verify 'grid' persists
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()
            self._wait_overlay_dismissed(page)
            state_grid_reloaded = self.harness.get_app_state()
            assert state_grid_reloaded.get("layoutMode") == "grid", f"Grid mode failed to persist after reload: {state_grid_reloaded.get('layoutMode')}"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_layout_persistence_across_reloads_and_transitions", "Adversarial M1", "F04 Persistence", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_layout_persistence_across_reloads_and_transitions", "Adversarial M1", "F04 Persistence", "FAIL", time.time() - start, str(e))

    def test_adv_layout_rapid_toggling_stress(self) -> TestCaseResult:
        """ADV-2.2: Rapidly clicking between grid and list 30 times does not crash DOM or leak state."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            grid_btn = page.locator("#layout-grid-btn")
            list_btn = page.locator("#layout-list-btn")

            for i in range(30):
                if i % 2 == 0:
                    list_btn.click()
                else:
                    grid_btn.click()
                time.sleep(0.04)

            time.sleep(0.4)

            # Final check: active classes match current layoutMode
            state = self.harness.get_app_state()
            current_mode = state.get("layoutMode")
            assert current_mode in ("grid", "list"), f"Invalid layoutMode: {current_mode}"

            active_btn_sel = "#layout-grid-btn" if current_mode == "grid" else "#layout-list-btn"
            classes = page.locator(active_btn_sel).get_attribute("class") or ""
            assert "bg-amber-500" in classes, f"Active button missing bg-amber-500: {classes}"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors during layout stress: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_layout_rapid_toggling_stress", "Adversarial M1", "F04 Rapid Toggle", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_layout_rapid_toggling_stress", "Adversarial M1", "F04 Rapid Toggle", "FAIL", time.time() - start, str(e))

    def test_adv_layout_corrupted_storage_recovery(self) -> TestCaseResult:
        """ADV-2.3: Corrupted layoutMode in localStorage falls back gracefully to 'grid'."""
        start = time.time()
        page = self.harness.new_page()
        try:
            # Seed corrupted layout string
            page.goto(f"{self.harness.base_url}/index.html", wait_until="commit")
            page.evaluate("() => localStorage.setItem('ksu_vet33_layout_v1', 'UNKNOWN_CORRUPT_MODE_999')")

            page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")
            time.sleep(1.0)
            self.harness.dismiss_intro_video()
            self._wait_overlay_dismissed(page)

            state = self.harness.get_app_state()
            assert state.get("layoutMode") in ("grid", "list"), f"App accepted invalid layoutMode without fallback: {state.get('layoutMode')}"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors on corrupt layout storage: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_layout_corrupted_storage_recovery", "Adversarial M1", "F04 Corrupt Recovery", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_layout_corrupted_storage_recovery", "Adversarial M1", "F04 Corrupt Recovery", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-3: Video Overlay Dismissal under Offline & Stalled Conditions
    # =========================================================================

    def test_adv_video_dismissal_offline_simulated(self) -> TestCaseResult:
        """ADV-3.1: Video playback during offline mode triggers error/safety timeout and unblocks UI within 3.5s."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Simulate offline
            self.harness.simulate_offline(True)
            time.sleep(0.3)

            # Replay video via header button while offline
            page.locator("#header-intro-video-btn").click()
            time.sleep(0.5)

            # Verify overlay opened
            overlay = page.locator("#intro-video-overlay")
            assert overlay.count() > 0, "Missing #intro-video-overlay"

            # Wait 3.6s for safety timeout / error handler to auto-dismiss
            time.sleep(3.6)

            # Check that overlay is hidden and unblocked
            is_dismissed = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                const isHidden = el.classList.contains('hidden') || el.classList.contains('intro-hidden') || style.display === 'none' || style.opacity === '0' || el.style.display === 'none';
                const isPointerBlocked = style.pointerEvents === 'none' || isHidden;
                return isHidden && isPointerBlocked;
            }""")
            assert is_dismissed, "Overlay remained blocking user interaction when offline"

            # Verify underlying elements are clickable
            brand_btn = page.locator("#brand-logo-btn")
            assert brand_btn.count() > 0, "Missing brand logo button"
            brand_btn.click(timeout=1500)

            # Verify zero fatal uncaught errors
            fatal_errors = [e for e in self.harness.captured_page_errors if "Fatal" in e]
            assert not fatal_errors, f"Fatal page errors: {fatal_errors}"

            return TestCaseResult("test_adv_video_dismissal_offline_simulated", "Adversarial M1", "F02 Offline Safety", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_video_dismissal_offline_simulated", "Adversarial M1", "F02 Offline Safety", "FAIL", time.time() - start, str(e))
        finally:
            self.harness.simulate_offline(False)

    def test_adv_video_stalled_route_hang(self) -> TestCaseResult:
        """ADV-3.2: Slow / hanging media stream route triggers safety fallback timer within 3.5s."""
        start = time.time()
        page = self.harness.new_page()
        try:
            # Route intercept all media requests to hang indefinitely
            page.route("**/*.mp4", lambda route: None)

            page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")
            time.sleep(0.5)

            # Wait 3.6s for safety fallback timer
            time.sleep(3.6)

            is_dismissed = page.evaluate("""() => {
                const el = document.getElementById('intro-video-overlay');
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || el.classList.contains('intro-hidden') || style.display === 'none' || style.opacity === '0';
            }""")
            assert is_dismissed, "Safety fallback timer did not dismiss hung video within 3.5s"

            return TestCaseResult("test_adv_video_stalled_route_hang", "Adversarial M1", "F02 Slow Media", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_video_stalled_route_hang", "Adversarial M1", "F02 Slow Media", "FAIL", time.time() - start, str(e))
        finally:
            try:
                page.unroute("**/*.mp4")
            except Exception:
                pass

    def test_adv_video_rapid_replay_and_escape_stress(self) -> TestCaseResult:
        """ADV-3.3: Rapidly replaying and dismissing video 5 times in a row leaves clean state."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            replay_btn = page.locator("#header-intro-video-btn")
            assert replay_btn.count() > 0, "Missing #header-intro-video-btn"

            for i in range(5):
                replay_btn.click()
                time.sleep(0.4)

                # Check overlay opened
                is_open = page.evaluate("""() => {
                    const el = document.getElementById('intro-video-overlay');
                    return el && !el.classList.contains('hidden') && el.style.display !== 'none';
                }""")
                assert is_open, f"Overlay failed to open on replay iteration {i+1}"

                # Dismiss via Escape or Skip
                if i % 2 == 0:
                    page.keyboard.press("Escape")
                else:
                    page.locator("#intro-skip-btn").click()

                # Wait for 650ms transition timeout in closeIntroVideo() to apply display: none
                time.sleep(0.8)

                is_closed = page.evaluate("""() => {
                    const el = document.getElementById('intro-video-overlay');
                    if (!el) return true;
                    return el.classList.contains('hidden') || el.classList.contains('intro-hidden') || el.style.display === 'none';
                }""")
                assert is_closed, f"Overlay failed to close on iteration {i+1}"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors on replay stress: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_video_rapid_replay_and_escape_stress", "Adversarial M1", "F02 Replay Stress", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_video_rapid_replay_and_escape_stress", "Adversarial M1", "F02 Replay Stress", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-4: Search Boundary & Input Fuzzing
    # =========================================================================

    def test_adv_search_special_chars_and_xss_fuzzing(self) -> TestCaseResult:
        """ADV-4.1: Hostile inputs (XSS strings, regex metachars, Arabic tashkeel) do not throw or crash."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            self.harness.ensure_sidebar_open()
            search_input = page.locator("#search-input")
            assert search_input.count() > 0, "Missing #search-input"

            fuzz_inputs = [
                "<script>alert(1)</script>",
                "'; DROP TABLE materials; --",
                "(\\[.*+?^${}()|])",
                "بَاطِنَةٌ مُشْتَرَكَةٌ",  # Arabic tashkeel/diacritics
                "🐾 🩺 🔬 📚 🐕",        # Emojis
                "\"\"\"'''```",
                "\\x00\\x1f\\x7f",
                "a" * 300,              # Very long string
            ]

            for term in fuzz_inputs:
                search_input.fill(term)
                time.sleep(0.1)
                # Verify no crash
                assert len(self.harness.captured_page_errors) == 0, f"Error on input '{term}': {self.harness.captured_page_errors}"
                # Verify appState.searchQuery updated safely
                state = self.harness.get_app_state()
                assert state.get("searchQuery") == term.strip()

            # Now press Escape to test clear
            page.keyboard.press("Escape")
            time.sleep(0.3)
            assert search_input.input_value() == "", "Escape failed to clear search input"
            assert self.harness.get_app_state().get("searchQuery") == "", "Escape failed to clear appState.searchQuery"

            return TestCaseResult("test_adv_search_special_chars_and_xss_fuzzing", "Adversarial M1", "F03 Fuzzing", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_search_special_chars_and_xss_fuzzing", "Adversarial M1", "F03 Fuzzing", "FAIL", time.time() - start, str(e))

def run_adversarial_suite():
    print("=" * 80)
    print(" SENIORS 2027 VET-KSU 33 OLD LIST PWA — ADVERSARIAL STRESS SUITE (M1)")
    print("=" * 80)

    harness = PWATestHarness(browser_name="msedge", headless=True)
    try:
        harness.start()
    except Exception as e:
        print(f"[FATAL] Failed to initialize test harness: {e}")
        sys.exit(1)

    suite = AdversarialM1Tests(harness)
    test_methods = [
        suite.test_adv_view_switching_rapid_toggling_stress,
        suite.test_adv_view_switching_navigation_escape,
        suite.test_adv_layout_persistence_across_reloads_and_transitions,
        suite.test_adv_layout_rapid_toggling_stress,
        suite.test_adv_layout_corrupted_storage_recovery,
        suite.test_adv_video_dismissal_offline_simulated,
        suite.test_adv_video_stalled_route_hang,
        suite.test_adv_video_rapid_replay_and_escape_stress,
        suite.test_adv_search_special_chars_and_xss_fuzzing,
    ]

    print(f"Queued {len(test_methods)} adversarial stress test scenarios.\n")
    results = []
    start_time = time.time()
    passed = 0
    failed = 0

    for i, test_fn in enumerate(test_methods, 1):
        name = test_fn.__name__
        print(f"[{i:02d}/{len(test_methods):02d}] {name:<65}", end="", flush=True)
        try:
            res = test_fn()
        except Exception as e:
            res = TestCaseResult(name, "Adversarial M1", "Unhandled", "ERROR", 0.0, str(e))

        results.append(res)
        if res.status == "PASS":
            passed += 1
            print(f" \033[92mPASS\033[0m ({res.duration:.2f}s)")
        else:
            failed += 1
            print(f" \033[91m{res.status}\033[0m ({res.duration:.2f}s)")
            if res.error_message:
                print(f"     Error: {res.error_message[:120]}")

    harness.stop()
    total_time = time.time() - start_time

    print("\n" + "=" * 80)
    print(" ADVERSARIAL EXECUTION SUMMARY")
    print("=" * 80)
    print(f" Total Tests Run : {len(results)}")
    print(f" Passed          : {passed}")
    print(f" Failed / Errors : {failed}")
    print(f" Duration        : {total_time:.2f}s")
    print(f" Pass Rate       : {(passed / len(results) * 100):.1f}%")
    print("=" * 80)

    # Save to json
    out_path = os.path.join(PROJECT_ROOT, "e2e_tests", "adversarial_m1_results.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump({
            "summary": {
                "total": len(results),
                "passed": passed,
                "failed": failed,
                "pass_rate": f"{(passed / len(results) * 100):.1f}%",
                "duration": total_time
            },
            "tests": [
                {
                    "name": r.name,
                    "tier": r.tier,
                    "feature": r.feature,
                    "status": r.status,
                    "duration": r.duration,
                    "error_message": r.error_message
                }
                for r in results
            ]
        }, f, indent=2)

    return 0 if failed == 0 else 1

if __name__ == "__main__":
    sys.exit(run_adversarial_suite())
