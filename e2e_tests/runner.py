"""
Master E2E Test Suite Runner for Seniors 2027 VET-KSU 33 Old List PWA.

Usage:
    python e2e_tests/runner.py [options]

Options:
    --tier {1,2,3,4,all}       Run specific test tier (default: all)
    --feature {F01..F10}      Filter Tier 1 tests by feature code
    --browser {msedge,chrome} Browser executable channel to use (default: msedge)
    --headed                  Run browser in visible (headed) mode for debugging
    --json-output <path>      Output path for JSON test results (default: e2e_tests/results.json)
    --fail-fast               Stop immediately on first failure
"""

import sys
import os
import time
import json
import argparse
from typing import List

# Ensure project root is in sys.path
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from e2e_tests.framework import PWATestHarness, TestCaseResult
from e2e_tests.test_tier1_features import Tier1FeatureTests
from e2e_tests.test_tier2_boundaries import Tier2BoundaryTests
from e2e_tests.test_tier3_combinations import Tier3CombinationTests
from e2e_tests.test_tier4_scenarios import Tier4ScenarioTests

def parse_args():
    parser = argparse.ArgumentParser(description="PWA E2E Test Runner")
    parser.add_argument("--tier", choices=["1", "2", "3", "4", "all"], default="all", help="Test tier to run")
    parser.add_argument("--feature", choices=[f"F0{i}" if i < 10 else f"F{i}" for i in range(1, 11)], default=None, help="Filter Tier 1 by feature")
    parser.add_argument("--browser", choices=["msedge", "chrome"], default="msedge", help="Browser channel to use")
    parser.add_argument("--headed", action="store_true", help="Run headed (visible) browser")
    parser.add_argument("--json-output", default=os.path.join(PROJECT_ROOT, "e2e_tests", "results.json"), help="Path to JSON results file")
    parser.add_argument("--fail-fast", action="store_true", help="Abort on first test failure")
    return parser.parse_args()

def collect_test_methods(instance, prefix="test_"):
    methods = []
    for attr in dir(instance):
        if attr.startswith(prefix) and callable(getattr(instance, attr)):
            methods.append(getattr(instance, attr))
    return methods

def main():
    args = parse_args()
    print("=" * 80)
    print(" SENIORS 2027 VET-KSU 33 OLD LIST PWA — E2E TEST RUNNER")
    print(f" Browser: {args.browser.upper()} (headless={not args.headed})")
    print(f" Target Tier: {args.tier} | Feature Filter: {args.feature or 'None'}")
    print("=" * 80)

    harness = PWATestHarness(browser_name=args.browser, headless=not args.headed)
    try:
        harness.start()
    except Exception as e:
        print(f"[FATAL] Failed to initialize test harness: {e}")
        sys.exit(1)

    tier1 = Tier1FeatureTests(harness)
    tier2 = Tier2BoundaryTests(harness)
    tier3 = Tier3CombinationTests(harness)
    tier4 = Tier4ScenarioTests(harness)

    test_queue = []

    # Queue Tier 1
    if args.tier in ("1", "all"):
        for method in collect_test_methods(tier1):
            if args.feature:
                feat_tag = args.feature.lower()
                if feat_tag not in method.__name__.lower():
                    continue
            test_queue.append(method)

    # Queue Tier 2
    if args.tier in ("2", "all") and not args.feature:
        test_queue.extend(collect_test_methods(tier2))

    # Queue Tier 3
    if args.tier in ("3", "all") and not args.feature:
        test_queue.extend(collect_test_methods(tier3))

    # Queue Tier 4
    if args.tier in ("4", "all") and not args.feature:
        test_queue.extend(collect_test_methods(tier4))

    print(f"Queued {len(test_queue)} test cases.\n")

    results: List[TestCaseResult] = []
    start_suite_time = time.time()

    passed_count = 0
    failed_count = 0

    for i, test_fn in enumerate(test_queue, 1):
        test_name = test_fn.__name__
        print(f"[{i:02d}/{len(test_queue):02d}] {test_name:<60}", end="", flush=True)

        try:
            res: TestCaseResult = test_fn()
        except Exception as e:
            res = TestCaseResult(test_name, "Unknown", "Unknown", "ERROR", 0.0, str(e))

        results.append(res)

        if res.status == "PASS":
            passed_count += 1
            print(f" \033[92mPASS\033[0m ({res.duration:.2f}s)")
        else:
            failed_count += 1
            print(f" \033[91m{res.status}\033[0m ({res.duration:.2f}s)")
            if res.error_message:
                print(f"     Error: {res.error_message[:120]}")
            if res.console_errors:
                print(f"     Console: {res.console_errors[:2]}")

            if args.fail_fast:
                print("\n[FAIL-FAST] Aborting further execution.")
                break

    harness.stop()
    total_time = time.time() - start_suite_time

    # Output Summary Table
    print("\n" + "=" * 80)
    print(" EXECUTION SUMMARY")
    print("=" * 80)
    print(f" Total Tests Run : {len(results)}")
    print(f" Passed          : {passed_count}")
    print(f" Failed / Errors : {failed_count}")
    print(f" Total Duration  : {total_time:.2f}s")
    print(f" Pass Rate       : {(passed_count / len(results) * 100) if results else 0:.1f}%")
    print("=" * 80)

    # Save JSON report
    report_data = {
        "summary": {
            "total": len(results),
            "passed": passed_count,
            "failed": failed_count,
            "pass_rate": f"{(passed_count / len(results) * 100) if results else 0:.1f}%",
            "duration": total_time,
            "browser": args.browser,
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        },
        "results": [
            {
                "name": r.name,
                "tier": r.tier,
                "feature": r.feature,
                "status": r.status,
                "duration": r.duration,
                "error": r.error_message,
                "console_errors": r.console_errors,
            }
            for r in results
        ]
    }

    try:
        os.makedirs(os.path.dirname(args.json_output), exist_ok=True)
        with open(args.json_output, "w", encoding="utf-8") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        print(f"\nDetailed JSON report written to: {args.json_output}")
    except Exception as e:
        print(f"Failed to write JSON report: {e}")

    # Return exit code
    sys.exit(0 if failed_count == 0 else 1)

if __name__ == "__main__":
    main()
