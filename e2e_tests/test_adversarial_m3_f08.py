"""
Adversarial Verification Suite for Milestone 3 (F08 Publishing & Editing Modal Management).
Empirically tests:
1. Missing required fields & validation toasts.
2. Edit action on card: pre-filling, in-place update without duplicates.
3. Close/cancel buttons, backdrop click, click-inside retention, form reset & scroll restoration.
4. Escape key modal hierarchy and stacked dismissal.
5. Non-admin edit protection.
6. XSS / special characters handling in publish fields.
"""

import os
import sys
import time
import json

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from e2e_tests.framework import PWATestHarness, TestCaseResult

class AdversarialM3F08Tests:
    def __init__(self, harness: PWATestHarness):
        self.harness = harness

    def _wait_overlay_dismissed(self, page):
        """Helper to ensure intro overlay is fully closed and files loaded."""
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
        for _ in range(15):
            cnt = page.evaluate("() => typeof appState !== 'undefined' && appState.files ? appState.files.length : 0")
            if cnt > 0:
                break
            time.sleep(0.3)
        time.sleep(0.3)

    def test_adv_f08_missing_required_fields_validation_and_no_record_added(self) -> TestCaseResult:
        """ADV-F08.1: Missing required fields (subject, category, format) triggers warning toast and adds no record."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Login as admin to ensure admin state
            page.evaluate("""() => {
                appState.isAdmin = true;
                if (typeof syncAdminUI === 'function') syncAdminUI();
            }""")

            # Open publish modal
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)
            assert self.harness.is_visible("#publish-modal"), "Publish modal did not open"

            # Case A: Empty subject
            init_count = page.evaluate("() => appState.files.length")
            page.evaluate("""() => {
                const sub = document.getElementById('pub-subject');
                if (sub) sub.value = '';
                handlePublishSubmit(new Event('submit', { cancelable: true }));
            }""")
            time.sleep(0.3)
            count_after_empty_sub = page.evaluate("() => appState.files.length")
            assert count_after_empty_sub == init_count, f"Record was added despite empty subject! {count_after_empty_sub} vs {init_count}"

            # Check warning toast
            toast_text = page.evaluate("""() => {
                const toasts = Array.from(document.querySelectorAll('#toast-container > div, .toast-notification, [data-toast]'));
                return toasts.map(t => t.textContent).join(' | ');
            }""")
            assert "الحقول الإجبارية" in toast_text or "warning" in toast_text or len(toast_text) > 0, f"Expected warning toast, got: '{toast_text}'"

            # Case B: Empty category
            page.evaluate("""() => {
                const sub = document.getElementById('pub-subject');
                if (sub) sub.value = 'batna';
                const cat = document.getElementById('pub-category');
                if (cat) cat.value = '';
                handlePublishSubmit(new Event('submit', { cancelable: true }));
            }""")
            time.sleep(0.3)
            count_after_empty_cat = page.evaluate("() => appState.files.length")
            assert count_after_empty_cat == init_count, f"Record added despite empty category! {count_after_empty_cat} vs {init_count}"

            # Case C: Empty format
            page.evaluate("""() => {
                const cat = document.getElementById('pub-category');
                if (cat) cat.value = 'محاضرات';
                const fmt = document.getElementById('pub-format');
                if (fmt) fmt.value = '';
                handlePublishSubmit(new Event('submit', { cancelable: true }));
            }""")
            time.sleep(0.3)
            count_after_empty_fmt = page.evaluate("() => appState.files.length")
            assert count_after_empty_fmt == init_count, f"Record added despite empty format! {count_after_empty_fmt} vs {init_count}"

            # Case D: Empty folder number when submitted via form
            # Notice: pub-folder-num is a required number input
            page.evaluate("""() => {
                const fmt = document.getElementById('pub-format');
                if (fmt) fmt.value = 'المصدر';
                const num = document.getElementById('pub-folder-num');
                if (num) num.value = '';
            }""")
            # Check HTML5 validation rejects empty folder number
            is_valid = page.evaluate("() => document.getElementById('pub-folder-num').checkValidity()")
            assert not is_valid, "HTML5 validity passed for empty folder number on required input"

            return TestCaseResult("test_adv_f08_missing_required_fields_validation_and_no_record_added", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_missing_required_fields_validation_and_no_record_added", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_adv_f08_edit_action_prefill_and_inplace_update(self) -> TestCaseResult:
        """ADV-F08.2: Clicking edit pre-fills modal, and saving updates file in-place without duplicates."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Login as admin
            page.evaluate("""() => {
                appState.isAdmin = true;
                if (typeof syncAdminUI === 'function') syncAdminUI();
            }""")
            time.sleep(0.3)

            # Navigate to batna -> محاضرات -> folder 1
            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            time.sleep(0.5)

            # Ensure we have file cards
            edit_btn = page.locator("[data-file-action='edit']").first
            assert edit_btn.count() > 0, "No edit button found on file cards in admin mode"

            target_file_id = edit_btn.get_attribute("data-file-id")
            assert target_file_id, "Edit button has no data-file-id attribute"

            # Capture initial file data and file count
            initial_count = page.evaluate("() => appState.files.length")
            original_file = page.evaluate(f"() => appState.files.find(f => f.id === '{target_file_id}')")
            assert original_file, f"File {target_file_id} not found in appState.files"

            # Click the edit button
            edit_btn.click()
            time.sleep(0.4)

            # 1. Verify modal is visible
            assert self.harness.is_visible("#publish-modal"), "Publish modal did not open on edit action"

            # 2. Verify modal is in edit mode
            modal_title = page.locator("#publish-modal-title").text_content()
            assert "تعديل" in modal_title, f"Modal title does not indicate edit mode: '{modal_title}'"

            submit_label = page.locator("#publish-submit-label").text_content()
            assert "حفظ" in submit_label, f"Submit label does not indicate save mode: '{submit_label}'"

            edit_item_id = page.locator("#edit-item-id").input_value()
            assert edit_item_id == target_file_id, f"edit-item-id ({edit_item_id}) does not match target ({target_file_id})"

            # 3. Verify pre-filled fields
            form_data = page.evaluate("""() => {
                return {
                    subject: document.getElementById('pub-subject').value,
                    category: document.getElementById('pub-category').value,
                    folderNum: document.getElementById('pub-folder-num').value,
                    format: document.getElementById('pub-format').value,
                    title: document.getElementById('pub-title').value,
                    doctor: document.getElementById('pub-doctor').value,
                    externalUrl: document.getElementById('pub-external-url').value,
                };
            }""")
            assert form_data["subject"] == original_file.get("subject"), f"Subject mismatch: {form_data['subject']} vs {original_file.get('subject')}"
            assert form_data["category"] == original_file.get("category"), f"Category mismatch: {form_data['category']} vs {original_file.get('category')}"
            assert str(form_data["folderNum"]) == str(original_file.get("folderNum")), f"FolderNum mismatch: {form_data['folderNum']} vs {original_file.get('folderNum')}"

            # 4. Modify fields
            updated_title = "مادة باطنة معدلة اختبارياً 2027"
            updated_doctor = "أ.د. استشاري باطنة الكلية"
            page.locator("#pub-title").fill(updated_title)
            page.locator("#pub-doctor").fill(updated_doctor)

            # 5. Submit the form
            page.locator("#publish-submit-btn").click()
            time.sleep(0.5)

            # 6. Verify modal closed
            assert not self.harness.is_visible("#publish-modal"), "Publish modal remained visible after saving edits"

            # 7. Verify no duplicates created (total count unchanged)
            count_after_save = page.evaluate("() => appState.files.length")
            assert count_after_save == initial_count, f"Duplicate created! File count changed from {initial_count} to {count_after_save}"

            # 8. Verify the record was updated in-place
            updated_file = page.evaluate(f"() => appState.files.find(f => f.id === '{target_file_id}')")
            assert updated_file["title"] == updated_title, f"Title not updated in-place: '{updated_file.get('title')}'"
            assert updated_file["doctor"] == updated_doctor, f"Doctor not updated in-place: '{updated_file.get('doctor')}'"

            # 9. Verify UI re-rendered updated title
            card_html = page.inner_html("#explorer-grid")
            assert updated_title in card_html, "Updated title does not appear rendered in the explorer grid"

            return TestCaseResult("test_adv_f08_edit_action_prefill_and_inplace_update", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_edit_action_prefill_and_inplace_update", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_adv_f08_modal_dismissal_backdrop_and_form_reset(self) -> TestCaseResult:
        """ADV-F08.3: Close button, cancel button, and backdrop click cleanly dismiss modal, restore scroll, and reset form."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # 1. Open modal and dirty the form
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)
            assert self.harness.is_visible("#publish-modal"), "Publish modal not open"

            # Verify body scroll locked
            body_overflow = page.evaluate("() => document.body.style.overflow || document.body.className")
            assert "hidden" in body_overflow, f"Body scroll not locked when modal is open: {body_overflow}"

            # Fill title with dirty data
            page.locator("#pub-title").fill("DIRTY_UNSAVED_DRAFT_TITLE")
            page.locator("#pub-doctor").fill("DIRTY_DOCTOR")

            # 2. Click cancel button (#cancel-publish-btn)
            page.locator("#cancel-publish-btn").click()
            time.sleep(0.3)
            assert not self.harness.is_visible("#publish-modal"), "Modal visible after clicking cancel"

            # Verify body scroll restored
            body_style = page.evaluate("() => document.body.style.overflow")
            assert body_style != "hidden", f"Body overflow not restored after cancel: {body_style}"

            # 3. Re-open modal and verify form was reset
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)
            title_val = page.locator("#pub-title").input_value()
            doc_val = page.locator("#pub-doctor").input_value()
            assert title_val == "", f"Form title was not reset: '{title_val}'"
            assert doc_val == "", f"Form doctor was not reset: '{doc_val}'"

            # 4. Fill dirty data again and click close button (#close-publish-modal-btn)
            page.locator("#pub-title").fill("DIRTY_2")
            page.locator("#close-publish-modal-btn").click()
            time.sleep(0.3)
            assert not self.harness.is_visible("#publish-modal"), "Modal visible after clicking close button"

            # 5. Click backdrop dismiss test:
            # Re-open modal
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)

            # Clicking inside the modal dialog should NOT close it (center of card, avoiding top-left close button in RTL)
            modal_card = page.locator("#publish-modal .glass-panel").first
            modal_card.click(position={"x": 300, "y": 250})
            time.sleep(0.2)
            assert self.harness.is_visible("#publish-modal"), "Modal incorrectly closed when clicking inside modal card"

            # Clicking outside modal dialog (backdrop) SHOULD close it
            page.evaluate("""() => {
                const modal = document.getElementById('publish-modal');
                modal.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            }""")
            time.sleep(0.3)
            assert not self.harness.is_visible("#publish-modal"), "Modal did not close on backdrop click"

            return TestCaseResult("test_adv_f08_modal_dismissal_backdrop_and_form_reset", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_modal_dismissal_backdrop_and_form_reset", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_adv_f08_escape_key_dismissing_topmost_modal_in_stacked_scenarios(self) -> TestCaseResult:
        """ADV-F08.4: Escape key strictly dismisses topmost modal in stacked scenarios (#preview-modal > #publish-modal)."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Scenario A: Stack Publish Modal + Preview Modal
            # 1. Open Publish modal first
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)
            assert self.harness.is_visible("#publish-modal"), "Publish modal not open"

            # 2. Open Preview modal on top
            test_file_id = page.evaluate("() => appState.files[0] ? appState.files[0].id : null")
            assert test_file_id, "No files available in appState to test preview modal"
            page.evaluate(f"() => openPreviewModal('{test_file_id}')")
            time.sleep(0.3)
            assert self.harness.is_visible("#preview-modal"), "Preview modal not open"
            assert self.harness.is_visible("#publish-modal"), "Publish modal disappeared prematurely"

            # 3. Press Escape: Preview modal MUST close, but Publish modal MUST remain open
            page.keyboard.press("Escape")
            time.sleep(0.4)
            assert not self.harness.is_visible("#preview-modal"), "Preview modal did not close on first Escape press"
            assert self.harness.is_visible("#publish-modal"), "Publish modal was incorrectly dismissed when topmost preview modal should have been dismissed!"

            # 4. Press Escape a second time: Publish modal MUST now close
            page.keyboard.press("Escape")
            time.sleep(0.4)
            assert not self.harness.is_visible("#publish-modal"), "Publish modal did not close on second Escape press"

            # Scenario B: Quick Access Sidebar + Publish Modal
            self.harness.ensure_sidebar_open()
            time.sleep(0.3)
            page.evaluate("() => openPublishModal()")
            time.sleep(0.3)
            assert self.harness.is_visible("#publish-modal"), "Publish modal did not open"

            # Press Escape: Publish modal closes first
            page.keyboard.press("Escape")
            time.sleep(0.4)
            assert not self.harness.is_visible("#publish-modal"), "Publish modal did not dismiss before sidebar"

            return TestCaseResult("test_adv_f08_escape_key_dismissing_topmost_modal_in_stacked_scenarios", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_escape_key_dismissing_topmost_modal_in_stacked_scenarios", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_adv_f08_non_admin_edit_action_blocked(self) -> TestCaseResult:
        """ADV-F08.5: When logged out as admin, clicking [data-file-action='edit'] blocks action and shows warning."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Ensure admin is logged out
            page.evaluate("""() => {
                appState.isAdmin = false;
                if (typeof syncAdminUI === 'function') syncAdminUI();
            }""")
            time.sleep(0.3)

            self.harness.navigate_to_folder('batna', 'محاضرات', 1)
            time.sleep(0.5)

            # In student mode, edit buttons are hidden or if triggered programmatically, guarded
            # Trigger delegated edit click on first file card
            first_file_id = page.evaluate("() => appState.files[0] ? appState.files[0].id : null")
            assert first_file_id, "No file found to test edit action"

            # Programmatically fire an edit event delegation
            page.evaluate(f"""() => {{
                const grid = document.getElementById('explorer-grid');
                const mockBtn = document.createElement('button');
                mockBtn.setAttribute('data-file-action', 'edit');
                mockBtn.setAttribute('data-file-id', '{first_file_id}');
                grid.appendChild(mockBtn);
                mockBtn.click();
                mockBtn.remove();
            }}""")
            time.sleep(0.3)

            # Verify modal did NOT open
            assert not self.harness.is_visible("#publish-modal"), "Publish modal opened for non-admin user!"

            # Verify warning toast
            toast_text = page.evaluate("""() => {
                const toasts = Array.from(document.querySelectorAll('#toast-container > div, .toast-notification, [data-toast]'));
                return toasts.map(t => t.textContent).join(' | ');
            }""")
            assert "المسؤولين" in toast_text or "warning" in toast_text or len(toast_text) > 0, f"Expected admin warning toast, got: '{toast_text}'"

            return TestCaseResult("test_adv_f08_non_admin_edit_action_blocked", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_non_admin_edit_action_blocked", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)

    def test_adv_f08_xss_and_special_character_injection_sanitization(self) -> TestCaseResult:
        """ADV-F08.6: XSS payloads in title, doctor, and notes do not execute scripts or corrupt DOM."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True)
        self._wait_overlay_dismissed(page)
        try:
            # Login as admin
            page.evaluate("() => { appState.isAdmin = true; }")

            xss_payload = '<img src=x onerror="window.__xss_fired=true">'
            arabic_special = 'ملف تجريبي & " \'<script>alert(1)</script> 100% 🚀'

            page.evaluate(f"""() => {{
                openPublishModal();
                document.getElementById('pub-subject').value = 'geraha';
                document.getElementById('pub-category').value = 'سكاشن';
                document.getElementById('pub-folder-num').value = '2';
                document.getElementById('pub-format').value = 'شرح';
                document.getElementById('pub-title').value = `{xss_payload}`;
                document.getElementById('pub-doctor').value = `{arabic_special}`;
                handlePublishSubmit(new Event('submit', {{ cancelable: true }}));
            }}""")
            time.sleep(0.5)

            # Verify XSS was not executed
            xss_fired = page.evaluate("() => window.__xss_fired === true")
            assert not xss_fired, "XSS execution detected in DOM from publish modal payload!"

            # Verify no unhandled page errors
            assert len(self.harness.captured_page_errors) == 0, f"Page errors after XSS submission: {self.harness.captured_page_errors}"

            return TestCaseResult("test_adv_f08_xss_and_special_character_injection_sanitization", "Tier 5 (Adversarial)", "F08", "PASS", time.time() - start)
        except Exception as e:
            return TestCaseResult("test_adv_f08_xss_and_special_character_injection_sanitization", "Tier 5 (Adversarial)", "F08", "FAIL", time.time() - start, str(e), console_errors=self.harness.captured_page_errors)
