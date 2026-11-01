"""
Runner for Milestone 3 Adversarial Suite (F08).
"""
import sys
import os
import time
import json

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from e2e_tests.framework import PWATestHarness, TestCaseResult
from e2e_tests.test_adversarial_m3_f08 import AdversarialM3F08Tests

def main():
    print("=" * 80)
    print(" SENIORS 2027 VET-KSU 33 — ADVERSARIAL M3 F08 CHALLENGER HARNESS")
    print("=" * 80)

    harness = PWATestHarness(browser_name="msedge", headless=True)
    results = []
    try:
        harness.start()
        suite = AdversarialM3F08Tests(harness)
        methods = [
            suite.test_adv_f08_missing_required_fields_validation_and_no_record_added,
            suite.test_adv_f08_edit_action_prefill_and_inplace_update,
            suite.test_adv_f08_modal_dismissal_backdrop_and_form_reset,
            suite.test_adv_f08_escape_key_dismissing_topmost_modal_in_stacked_scenarios,
            suite.test_adv_f08_non_admin_edit_action_blocked,
            suite.test_adv_f08_xss_and_special_character_injection_sanitization,
        ]

        print(f"Queued {len(methods)} adversarial test cases.\n")

        for idx, method in enumerate(methods, 1):
            name = method.__name__
            print(f"[{idx:02d}/{len(methods):02d}] {name:<65}", end="", flush=True)
            res = method()
            results.append(res)
            print(f" {res.status} ({res.duration:.2f}s)")
            if res.status != "PASS" and res.error_message:
                print(f"     Error: {res.error_message}")
                if res.console_errors:
                    print(f"     Console errors: {res.console_errors}")

        passed = sum(1 for r in results if r.status == "PASS")
        failed = len(results) - passed

        print("\n" + "=" * 80)
        print(" ADVERSARIAL EXECUTION SUMMARY")
        print("=" * 80)
        print(f" Total Tests Run : {len(results)}")
        print(f" Passed          : {passed}")
        print(f" Failed / Errors : {failed}")
        print(f" Pass Rate       : {(passed / len(results) * 100) if results else 0:.1f}%")
        print("=" * 80)

        out_path = os.path.join(PROJECT_ROOT, "e2e_tests", "adversarial_m3_results.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump([r.__dict__ for r in results], f, indent=2, ensure_ascii=False)
        print(f"\nReport written to: {out_path}")

        if failed > 0:
            sys.exit(1)

    finally:
        harness.stop()

if __name__ == "__main__":
    main()
