"""
Adversarial Stress & Boundary Test Suite for Milestone 3:
Feature F07: Admin Gate & Authentication.

Empirical verification harness executing hostile conditions:
1. Wrong passcodes, empty inputs (HTML5 validation & programmatic submission), whitespace-only codes, and injection payloads.
2. Valid passcode variations, case insensitivity, trimming, and admin name fallbacks.
3. Corrupted non-JSON and malformed session data in both vet33_admin_session_v1 and ksu_vet33_admin_session_v4.
4. Rapid consecutive login/logout cycles stress test (verifying storage, DOM, and memory resilience).
5. Modal backdrop dismissal vs click containment inside modal card.
6. Escape key dismissal, form state reset on reopen, and modal hierarchy handling.
7. Admin privilege boundaries (status bar, about edit triggers, and DOM state sync).
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

class AdversarialM3Tests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def _wait_overlay_dismissed(self, page):
        """Helper to ensure intro video overlay transition has completed and does not intercept clicks."""
        try:
            self.harness.dismiss_intro_video()
            page.evaluate("""() => {
                const overlay = document.getElementById('intro-video-overlay');
                if (overlay) {
                    overlay.classList.add('hidden', 'intro-hidden');
                    overlay.style.display = 'none';
                    overlay.style.pointerEvents = 'none';
                }
            }""")
        except Exception:
            pass
        time.sleep(0.3)

    # =========================================================================
    # ADV-1: Passcode Fuzzing & Invalid Submission Defense
    # =========================================================================

    def test_adv_admin_wrong_passcodes_fuzzing(self) -> TestCaseResult:
        """ADV-M3.1: Fuzz admin passcode input with empty, whitespace, injection, and invalid strings."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Open admin login modal
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)
            assert self.harness.is_visible("#admin-login-modal"), "Admin login modal failed to open"

            pass_input = page.locator("#admin-passcode-input")
            form = page.locator("#admin-login-form")

            # 1. Test empty string submission via HTML5 UI submit button:
            # HTML5 'required' attribute prevents form submission natively
            pass_input.fill("")
            is_valid = pass_input.evaluate("el => el.checkValidity()")
            assert not is_valid, "Empty passcode input unexpectedly passed HTML5 validity check despite required attribute"

            # 2. Test empty string submission bypassing native tooltip (programmatic form submit event)
            # handleAdminLogin MUST reject empty string, show error, and keep isAdmin = False
            form.evaluate("f => f.dispatchEvent(new Event('submit', { cancelable: true }))")
            time.sleep(0.2)
            state = self.harness.get_app_state()
            assert not state.get("isAdmin"), "Empty passcode submission wrongly granted admin rights!"
            assert self.harness.is_visible("#admin-login-error"), "#admin-login-error not shown on empty submit dispatch"

            # 3. Test whitespace-only and hostile strings
            hostile_inputs = [
                (" ", "single whitespace"),
                ("     ", "multi whitespace"),
                ("\t\t\n", "tabs and newlines"),
                ("wrong_password", "arbitrary text"),
                ("12345", "common numeric PIN"),
                ("333", "near-miss repeat number"),
                ("vet", "prefix fragment"),
                ("2028", "wrong year"),
                ("' OR '1'='1", "SQL injection payload"),
                ("<script>alert(1)</script>", "XSS script payload"),
                ("${7*7}", "template injection"),
                ("undefined", "JS keyword"),
                ("null", "null keyword"),
                ("NaN", "NaN keyword"),
            ]

            submit_btn = page.locator("#admin-login-form button[type='submit']")

            for inp, desc in hostile_inputs:
                pass_input.fill(inp)
                submit_btn.click()
                time.sleep(0.15)

                # Verify appState.isAdmin remains False
                state = self.harness.get_app_state()
                assert not state.get("isAdmin"), f"Hostile input '{inp}' ({desc}) wrongly granted admin rights!"

                # Verify error message is displayed
                is_err_visible = self.harness.is_visible("#admin-login-error")
                assert is_err_visible, f"Error message '#admin-login-error' was not displayed for input '{inp}' ({desc})"

                # Verify input has error border
                has_border = page.evaluate("() => document.getElementById('admin-passcode-input').classList.contains('border-rose-500')")
                assert has_border, f"Input failed to receive border-rose-500 error styling for '{inp}' ({desc})"

                # Verify admin status bar remains hidden
                assert not self.harness.is_visible("#admin-status-bar"), f"Admin status bar shown on invalid input '{inp}'"

                # Verify localStorage does not have active admin session
                s1 = self.harness.get_local_storage("vet33_admin_session_v1")
                s2 = self.harness.get_local_storage("ksu_vet33_admin_session_v4")
                assert not s1 and not s2, f"Storage wrongly persisted session for invalid input '{inp}'"

            # Assert no uncaught JS page errors
            assert len(self.harness.captured_page_errors) == 0, f"Page errors during passcode fuzzing: {self.harness.captured_page_errors}"

            return TestCaseResult("test_adv_admin_wrong_passcodes_fuzzing", "Adversarial M3", "F07 Security", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_wrong_passcodes_fuzzing", "Adversarial M3", "F07 Security", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-2: Valid Passcodes, Case-Insensitivity & Whitespace Trimming
    # =========================================================================

    def test_adv_admin_valid_passcodes_and_case_insensitivity(self) -> TestCaseResult:
        """ADV-M3.2: Verify all valid passcodes authenticate properly with casing and trimming."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            valid_cases = [
                ("33", "standard numeric passcode"),
                ("  33  ", "numeric passcode with surrounding spaces"),
                ("vet33", "lowercase alphanumeric"),
                ("VET33", "uppercase alphanumeric"),
                ("Vet33", "mixed-case alphanumeric"),
                ("  vet33  ", "alphanumeric with spaces"),
                ("2027", "class graduation year"),
                ("vetksu33", "full portal code lowercase"),
                ("VETKSU33", "full portal code uppercase"),
                ("admin", "admin literal lowercase"),
                ("ADMIN", "admin literal uppercase"),
            ]

            pass_input = page.locator("#admin-passcode-input")
            submit_btn = page.locator("#admin-login-form button[type='submit']")

            for code, desc in valid_cases:
                # Open modal
                page.evaluate("() => openAdminModal()")
                time.sleep(0.2)

                pass_input.fill(code)
                submit_btn.click()
                time.sleep(0.3)

                # 1. Verify authenticated
                state = self.harness.get_app_state()
                assert state.get("isAdmin") is True, f"Valid passcode '{code}' ({desc}) failed to authenticate!"

                # 2. Verify modal closed
                assert not self.harness.is_visible("#admin-login-modal"), f"Modal failed to close on successful login for '{code}'"

                # 3. Verify status bar visible
                assert self.harness.is_visible("#admin-status-bar"), f"Status bar not visible for '{code}'"

                # 4. Verify dual-key storage
                s1 = self.harness.get_local_storage("vet33_admin_session_v1")
                s2 = self.harness.get_local_storage("ksu_vet33_admin_session_v4")
                assert s1 and s2, f"Dual-key storage missing for '{code}'"
                parsed1 = json.loads(s1)
                assert parsed1.get("isAdmin") is True, f"Persisted session isAdmin is not true for '{code}'"

                # Logout for next iteration
                page.evaluate("() => handleAdminLogout()")
                time.sleep(0.2)
                state_after = self.harness.get_app_state()
                assert not state_after.get("isAdmin"), f"Failed to reset admin state after test case '{code}'"

            assert len(self.harness.captured_page_errors) == 0, f"Page errors: {self.harness.captured_page_errors}"
            return TestCaseResult("test_adv_admin_valid_passcodes_and_case_insensitivity", "Adversarial M3", "F07 Auth", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_valid_passcodes_and_case_insensitivity", "Adversarial M3", "F07 Auth", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-3: Admin Name Handling & Fallback
    # =========================================================================

    def test_adv_admin_name_fallback_and_custom_names(self) -> TestCaseResult:
        """ADV-M3.3: Verify fallback to default admin name on empty/whitespace and custom name propagation."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            name_cases = [
                ("", "مسؤول الدفعة", "empty name fallback"),
                ("   ", "مسؤول الدفعة", "whitespace name fallback"),
                ("د. أحمد علي", "د. أحمد علي", "Arabic custom name"),
                ("Dr. Vet Admin 33", "Dr. Vet Admin 33", "English custom name"),
            ]

            for input_name, expected_name, desc in name_cases:
                page.evaluate("() => openAdminModal()")
                time.sleep(0.2)

                page.locator("#admin-name-input").fill(input_name)
                page.locator("#admin-passcode-input").fill("33")
                page.locator("#admin-login-form button[type='submit']").click()
                time.sleep(0.3)

                state = self.harness.get_app_state()
                assert state.get("isAdmin") is True, f"Failed login for {desc}"
                assert state.get("adminName") == expected_name, f"Expected adminName '{expected_name}', got '{state.get('adminName')}' ({desc})"

                # Check welcome banner text
                welcome_text = page.inner_text("#admin-welcome-name")
                assert expected_name in welcome_text, f"Welcome text '{welcome_text}' does not contain expected name '{expected_name}' ({desc})"

                # Logout
                page.evaluate("() => handleAdminLogout()")
                time.sleep(0.2)

            return TestCaseResult("test_adv_admin_name_fallback_and_custom_names", "Adversarial M3", "F07 Admin Identity", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_name_fallback_and_custom_names", "Adversarial M3", "F07 Admin Identity", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-4: Session Corruption & Malformed Storage Attack
    # =========================================================================

    def test_adv_admin_session_corruption_resilience(self) -> TestCaseResult:
        """ADV-M3.4: Hostile corruption of admin session keys with non-JSON, primitive, and forged payloads."""
        start = time.time()
        corrupted_payloads = [
            ("vet33_admin_session_v1", "{bad_json:true,broken", "non-JSON syntax in primary key"),
            ("ksu_vet33_admin_session_v4", "UNDEFINED_RAW_DATA%", "non-JSON string in legacy key"),
            ("vet33_admin_session_v1", "12345", "numeric primitive"),
            ("vet33_admin_session_v1", "null", "null literal"),
            ("vet33_admin_session_v1", "[1, 2, 3]", "JSON array instead of object"),
            ("vet33_admin_session_v1", '{"isAdmin": "true"}', "string 'true' instead of boolean true"),
            ("vet33_admin_session_v1", '{"isAdmin": false, "adminName": "Impostor"}', "explicit isAdmin false object"),
            ("vet33_admin_session_v1", '{"isAdmin": 0}', "numeric 0 falsy"),
        ]

        try:
            for key, payload, desc in corrupted_payloads:
                page = self.harness.new_page()
                page.goto(f"{self.harness.base_url}/index.html", wait_until="commit")

                # Clear and seed corrupt payload
                page.evaluate(f"""() => {{
                    localStorage.removeItem('vet33_admin_session_v1');
                    localStorage.removeItem('ksu_vet33_admin_session_v4');
                    localStorage.setItem('{key}', '{payload}');
                }}""")

                # Navigate and load app
                page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")
                time.sleep(0.8)
                self.harness.dismiss_intro_video()

                # Verify no SyntaxError or JSON.parse errors thrown
                json_errors = [e for e in self.harness.captured_page_errors if "JSON.parse" in e or "SyntaxError" in e]
                assert not json_errors, f"Corrupted payload '{desc}' caused unhandled JSON error: {json_errors}"

                # Verify appState.isAdmin is strictly False
                state = self.harness.get_app_state()
                assert not state.get("isAdmin"), f"Corrupted payload '{desc}' wrongly granted isAdmin=True!"

                # Verify admin status bar is hidden
                is_bar_visible = self.harness.is_visible("#admin-status-bar")
                assert not is_bar_visible, f"Admin status bar shown on corrupted payload '{desc}'"

            # Test BOTH keys corrupted simultaneously with non-JSON
            page = self.harness.new_page()
            page.goto(f"{self.harness.base_url}/index.html", wait_until="commit")
            page.evaluate("""() => {
                localStorage.setItem('vet33_admin_session_v1', '!!!CORRUPT_PRIMARY!!!');
                localStorage.setItem('ksu_vet33_admin_session_v4', '???CORRUPT_SECONDARY???');
            }""")
            page.goto(f"{self.harness.base_url}/index.html", wait_until="domcontentloaded")
            time.sleep(0.8)
            self.harness.dismiss_intro_video()

            state = self.harness.get_app_state()
            assert not state.get("isAdmin"), "Dual corrupted keys wrongly granted admin rights!"
            assert not self.harness.is_visible("#admin-status-bar"), "Status bar shown under dual corruption"

            return TestCaseResult("test_adv_admin_session_corruption_resilience", "Adversarial M3", "F07 Robustness", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_session_corruption_resilience", "Adversarial M3", "F07 Robustness", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-5: Rapid Consecutive Login / Logout Cycles Stress
    # =========================================================================

    def test_adv_admin_rapid_login_logout_stress(self) -> TestCaseResult:
        """ADV-M3.5: Execute 10 consecutive login/logout cycles to stress state transitions and event handlers."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            cycles = 10

            for i in range(cycles):
                # 1. Open admin modal
                page.locator("#admin-access-btn").click()
                time.sleep(0.2)
                assert self.harness.is_visible("#admin-login-modal"), f"Cycle {i+1}: Admin modal did not open"

                # 2. Fill passcode and submit
                page.locator("#admin-passcode-input").fill("33")
                page.locator("#admin-login-form button[type='submit']").click()
                time.sleep(0.3)

                # 3. Assert active admin state
                state = self.harness.get_app_state()
                assert state.get("isAdmin") is True, f"Cycle {i+1}: Failed to log in as admin"
                assert self.harness.is_visible("#admin-status-bar"), f"Cycle {i+1}: Status bar not visible"
                assert self.harness.get_local_storage("vet33_admin_session_v1"), f"Cycle {i+1}: Missing storage key"

                # 4. Click logout button
                logout_btn = page.locator("#admin-logout-btn")
                logout_btn.click()
                time.sleep(0.25)

                # 5. Assert logged out state
                state_out = self.harness.get_app_state()
                assert not state_out.get("isAdmin"), f"Cycle {i+1}: Failed to reset isAdmin to False"
                assert not self.harness.is_visible("#admin-status-bar"), f"Cycle {i+1}: Status bar still visible after logout"
                assert not self.harness.get_local_storage("vet33_admin_session_v1"), f"Cycle {i+1}: Storage not cleared"

            # Verify no unhandled page errors during all cycles
            assert len(self.harness.captured_page_errors) == 0, f"Page errors during rapid cycling: {self.harness.captured_page_errors}"

            return TestCaseResult("test_adv_admin_rapid_login_logout_stress", "Adversarial M3", "F07 Concurrency", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_rapid_login_logout_stress", "Adversarial M3", "F07 Concurrency", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-6: Modal Backdrop Dismissal & Click Containment
    # =========================================================================

    def test_adv_admin_modal_backdrop_and_click_containment(self) -> TestCaseResult:
        """ADV-M3.6: Verify clicking inside modal card keeps it open, while backdrop clicks dismiss cleanly."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # 1. Open admin modal
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)
            assert self.harness.is_visible("#admin-login-modal"), "Admin modal did not open"

            # 2. Click inside modal card (passcode input, name input, card body)
            page.click("#admin-passcode-input")
            time.sleep(0.1)
            assert self.harness.is_visible("#admin-login-modal"), "Modal unexpectedly closed when clicking passcode input!"

            page.click("#admin-name-input")
            time.sleep(0.1)
            assert self.harness.is_visible("#admin-login-modal"), "Modal unexpectedly closed when clicking name input!"

            # 3. Click backdrop near edge of viewport (x=5, y=5)
            page.click("#admin-login-modal", position={"x": 5, "y": 5})
            time.sleep(0.3)
            assert not self.harness.is_visible("#admin-login-modal"), "Backdrop click failed to close #admin-login-modal"

            # 4. Reopen via footer link and test close button
            footer_link = page.locator("#footer-admin-link")
            footer_link.scroll_into_view_if_needed()
            footer_link.click()
            time.sleep(0.3)
            assert self.harness.is_visible("#admin-login-modal"), "Failed to reopen via #footer-admin-link"

            page.locator("#close-admin-login-btn").click()
            time.sleep(0.3)
            assert not self.harness.is_visible("#admin-login-modal"), "#close-admin-login-btn failed to close modal"

            return TestCaseResult("test_adv_admin_modal_backdrop_and_click_containment", "Adversarial M3", "F07 Modal UX", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_modal_backdrop_and_click_containment", "Adversarial M3", "F07 Modal UX", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-7: Escape Key Dismissal, Form State Reset, and Modal Priority
    # =========================================================================

    def test_adv_admin_modal_escape_and_form_state_reset(self) -> TestCaseResult:
        """ADV-M3.7: Verify Escape dismissal, input/error reset on reopen, and topmost modal escape priority."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # 1. Open admin modal and trigger validation error
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)

            page.locator("#admin-passcode-input").fill("INVALID_CODE_123")
            page.locator("#admin-login-form button[type='submit']").click()
            time.sleep(0.2)

            assert self.harness.is_visible("#admin-login-error"), "Validation error not shown"
            has_error_border = page.evaluate("() => document.getElementById('admin-passcode-input').classList.contains('border-rose-500')")
            assert has_error_border, "Red border missing on invalid submission"

            # 2. Press Escape to dismiss
            page.keyboard.press("Escape")
            time.sleep(0.3)
            assert not self.harness.is_visible("#admin-login-modal"), "Admin modal did not close on Escape"

            # 3. Reopen modal and verify form is sanitized and reset
            page.locator("#admin-access-btn").click()
            time.sleep(0.3)

            passcode_val = page.locator("#admin-passcode-input").input_value()
            assert passcode_val == "", f"Expected passcode input to be reset to empty, got '{passcode_val}'"

            assert not self.harness.is_visible("#admin-login-error"), "Error message remained visible upon reopening modal"

            border_cleared = page.evaluate("() => !document.getElementById('admin-passcode-input').classList.contains('border-rose-500')")
            assert border_cleared, "border-rose-500 was not cleared on reopen"

            # Close again
            page.keyboard.press("Escape")
            time.sleep(0.2)

            # 4. Multi-modal Escape priority test:
            # Open preview modal, then open admin modal
            page.evaluate("""() => {
                if (typeof openPreviewModal === 'function' && appState.files && appState.files[0]) {
                    openPreviewModal(appState.files[0].id);
                }
                openAdminModal();
            }""")
            time.sleep(0.3)

            # Both modals might have classes, but preview modal has highest escape priority in hierarchy
            page.keyboard.press("Escape")
            time.sleep(0.3)

            # After first Escape, the topmost modal (preview-modal) should close
            assert not self.harness.is_visible("#preview-modal"), "Topmost #preview-modal failed to close on first Escape"

            # Second Escape closes admin modal
            page.keyboard.press("Escape")
            time.sleep(0.3)
            assert not self.harness.is_visible("#admin-login-modal"), "#admin-login-modal failed to close on second Escape"

            return TestCaseResult("test_adv_admin_modal_escape_and_form_state_reset", "Adversarial M3", "F07 Modal Lifecycle", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_modal_escape_and_form_state_reset", "Adversarial M3", "F07 Modal Lifecycle", "FAIL", time.time() - start, str(e))

    # =========================================================================
    # ADV-8: Admin Privilege Boundaries & DOM Element State
    # =========================================================================

    def test_adv_admin_privilege_boundaries(self) -> TestCaseResult:
        """ADV-M3.8: Verify UI gates (#about-admin-edit-btn, inline add button, status bar) strictly obey auth state."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # 1. As Student:
            assert not self.harness.is_visible("#admin-status-bar"), "Status bar visible in student mode"
            about_edit_btn = page.locator("#about-admin-edit-btn")
            if about_edit_btn.count() > 0:
                is_hidden_class = page.evaluate("() => document.getElementById('about-admin-edit-btn').classList.contains('hidden')")
                assert is_hidden_class, "About admin edit button does not have 'hidden' class in student mode"

            # 2. Log in as Admin
            page.evaluate("() => { appState.isAdmin = true; appState.adminName = 'Super Admin'; saveAppState(); syncAdminUI(); }")
            time.sleep(0.3)

            assert self.harness.is_visible("#admin-status-bar"), "Status bar hidden in admin mode"
            if about_edit_btn.count() > 0:
                has_inline_flex = page.evaluate("() => document.getElementById('about-admin-edit-btn').classList.contains('inline-flex') && !document.getElementById('about-admin-edit-btn').classList.contains('hidden')")
                assert has_inline_flex, "About admin edit button failed to receive 'inline-flex' class in admin mode"

            # Also open about modal and verify button is visible to user
            page.evaluate("() => typeof openAboutModal === 'function' ? openAboutModal() : document.getElementById('about-modal').classList.remove('hidden')")
            time.sleep(0.3)
            assert about_edit_btn.is_visible(), "About admin edit button not visible inside opened about modal in admin mode"
            page.keyboard.press("Escape")
            time.sleep(0.2)

            # 3. Log out
            page.evaluate("() => handleAdminLogout()")
            time.sleep(0.3)

            assert not self.harness.is_visible("#admin-status-bar"), "Status bar visible after logout"
            if about_edit_btn.count() > 0:
                is_hidden_after = page.evaluate("() => document.getElementById('about-admin-edit-btn').classList.contains('hidden')")
                assert is_hidden_after, "About admin edit button visible after logout"

            return TestCaseResult("test_adv_admin_privilege_boundaries", "Adversarial M3", "F07 Authorization", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_admin_privilege_boundaries", "Adversarial M3", "F07 Authorization", "FAIL", time.time() - start, str(e))

def run_adversarial_suite():
    print("=" * 80)
    print(" SENIORS 2027 VET-KSU 33 OLD LIST PWA — ADVERSARIAL STRESS SUITE (M3)")
    print(" Target Feature: F07 (Admin Gate & Authentication)")
    print("=" * 80)

    harness = PWATestHarness(browser_name="msedge", headless=True)
    try:
        harness.start()
    except Exception as e:
        print(f"[FATAL] Failed to start test harness: {e}")
        return 1

    suite = AdversarialM3Tests(harness)

    test_methods = [
        suite.test_adv_admin_wrong_passcodes_fuzzing,
        suite.test_adv_admin_valid_passcodes_and_case_insensitivity,
        suite.test_adv_admin_name_fallback_and_custom_names,
        suite.test_adv_admin_session_corruption_resilience,
        suite.test_adv_admin_rapid_login_logout_stress,
        suite.test_adv_admin_modal_backdrop_and_click_containment,
        suite.test_adv_admin_modal_escape_and_form_state_reset,
        suite.test_adv_admin_privilege_boundaries,
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
            res = TestCaseResult(name, "Adversarial M3", "Unhandled", "ERROR", 0.0, str(e))

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
    print(" ADVERSARIAL EXECUTION SUMMARY (M3)")
    print("=" * 80)
    print(f" Total Tests Run : {len(results)}")
    print(f" Passed          : {passed}")
    print(f" Failed / Errors : {failed}")
    print(f" Duration        : {total_time:.2f}s")
    print(f" Pass Rate       : {(passed / len(results) * 100):.1f}%")
    print("=" * 80)

    # Save to json
    out_path = os.path.join(PROJECT_ROOT, "e2e_tests", "adversarial_m3_results.json")
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
