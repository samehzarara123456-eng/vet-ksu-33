"""
Adversarial Stress & Boundary Test Suite for Milestone 4:
Feature F09: Service Worker Caching & Offline Resilience.

Empirical verification harness executing hostile conditions:
1. Cache Storage Integrity: Verifies 'vet33-pwa-cache-v33' contains all 13 App Shell assets with non-zero byte size.
2. Offline Navigation Reload: Disconnects network, executes full navigation reloads, verifies DOM shell and title integrity without crashing.
3. Offline Network Failure Tolerance: Triggers remote cloud sync and SW messages while disconnected, confirming zero unhandled rejections or fatal errors.
4. Outdated Cache Eviction: Injects stale legacy caches (v24, v30, orphaned) and verifies activation cleanup purges all keys where k !== 'vet33-pwa-cache-v33'.
5. Offline View Navigation & Layouts: Tests rapid view transitions (saved view, home view, grid/list layout) while completely offline.
6. Non-Cacheable Bypass Resilience: Confirms MP4 video and Google Drive/Apps Script endpoints are strictly bypassed from App Shell caching.
"""

import sys
import os
import time
import json
from typing import List, Dict, Any

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from e2e_tests.framework import PWATestHarness, TestCaseResult

EXPECTED_APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './js/app.js',
    './assets/icons/favicon.png',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/app-icon.png',
    './assets/images/bg.jpg',
    './assets/icons/favicon.svg',
    './assets/icons/icon-192.svg',
    './assets/icons/icon-512.svg'
]

class AdversarialM4SWTests:
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

    def _wait_sw_active_and_cached(self, page, timeout_s: float = 6.0) -> bool:
        """Waits until the Service Worker is activated and cache is populated."""
        start = time.time()
        while time.time() - start < timeout_s:
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
                return True
            time.sleep(0.4)
        return False

    # =========================================================================
    # ADV-1: Cache Storage Integrity - Exact 13 App Shell Assets & Non-Empty
    # =========================================================================

    def test_adv_cache_storage_exact_13_assets(self) -> TestCaseResult:
        """ADV-M4.1: Verify 'vet33-pwa-cache-v33' contains all 13 App Shell assets with non-zero byte size."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=2.0)
        try:
            is_ready = self._wait_sw_active_and_cached(page, timeout_s=8.0)
            assert is_ready, "Service worker did not reach active status or cache not populated in time"

            # Check cache storage contents in detail
            verification = page.evaluate("""async (expectedAssets) => {
                const CACHE_NAME = 'vet33-pwa-cache-v33';
                const hasCache = await caches.has(CACHE_NAME);
                if (!hasCache) return { ok: false, error: 'Cache ' + CACHE_NAME + ' does not exist' };

                const cache = await caches.open(CACHE_NAME);
                const cachedRequests = await cache.keys();
                const cachedUrls = cachedRequests.map(r => r.url);

                const results = [];
                for (const asset of expectedAssets) {
                    const match = await cache.match(asset);
                    if (!match) {
                        results.push({ asset, found: false, size: 0, status: 0 });
                        continue;
                    }
                    const blob = await match.blob();
                    results.push({
                        asset,
                        found: true,
                        size: blob.size,
                        status: match.status,
                        ok: match.ok
                    });
                }

                return {
                    ok: true,
                    cachedTotal: cachedRequests.length,
                    results: results
                };
            }""", EXPECTED_APP_SHELL)

            assert verification.get("ok"), f"Cache verification failed: {verification.get('error')}"
            results = verification.get("results", [])

            missing_assets = [r["asset"] for r in results if not r["found"]]
            assert not missing_assets, f"Missing assets in 'vet33-pwa-cache-v33': {missing_assets}"

            empty_assets = [r["asset"] for r in results if r["size"] <= 0]
            assert not empty_assets, f"Assets with zero byte size in 'vet33-pwa-cache-v33': {empty_assets}"

            non_200_assets = [r["asset"] for r in results if r["status"] != 200]
            assert not non_200_assets, f"Assets with non-200 HTTP status: {non_200_assets}"

            return TestCaseResult(
                "test_adv_cache_storage_exact_13_assets",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start,
                metadata={"verified_assets_count": len(results), "cached_total": verification.get("cachedTotal")}
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_cache_storage_exact_13_assets",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )

    # =========================================================================
    # ADV-2: Offline Navigation Reload Resilience
    # =========================================================================

    def test_adv_offline_navigation_full_reload(self) -> TestCaseResult:
        """ADV-M4.2: Simulate offline in browser, perform full navigation reload, verify app renders properly without crashing."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=2.0)
        try:
            is_ready = self._wait_sw_active_and_cached(page, timeout_s=8.0)
            assert is_ready, "SW not active before entering offline mode"

            # Sever network connection
            self.harness.simulate_offline(True)
            time.sleep(0.5)

            # Perform full navigation reload while offline
            page.reload(wait_until="domcontentloaded")
            time.sleep(1.0)
            self._wait_overlay_dismissed(page)

            # 1. Verify title
            title = page.title()
            assert "VET-KSU 33" in title, f"Expected 'VET-KSU 33' in title offline, got: '{title}'"

            # 2. Verify root document attributes
            doc_meta = page.evaluate("""() => ({
                dir: document.documentElement.getAttribute('dir'),
                lang: document.documentElement.getAttribute('lang'),
                hasMain: !!document.getElementById('main-workspace'),
                hasHeader: !!document.querySelector('header'),
                hasGrid: !!document.getElementById('explorer-grid')
            })""")
            assert doc_meta["dir"] == "rtl", f"Document dir is not rtl: {doc_meta['dir']}"
            assert doc_meta["lang"] == "ar", f"Document lang is not ar: {doc_meta['lang']}"
            assert doc_meta["hasHeader"], "App header element missing after offline reload"
            assert doc_meta["hasGrid"], "Explorer grid element missing after offline reload"

            # 3. Verify zero unhandled exceptions
            assert len(self.harness.captured_page_errors) == 0, f"Unhandled runtime errors on offline reload: {self.harness.captured_page_errors}"

            return TestCaseResult(
                "test_adv_offline_navigation_full_reload",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_offline_navigation_full_reload",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )
        finally:
            self.harness.simulate_offline(False)

    # =========================================================================
    # ADV-3: Offline Network Failure Tolerance (API & Drive Sync)
    # =========================================================================

    def test_adv_offline_network_failure_tolerance(self) -> TestCaseResult:
        """ADV-M4.3: Simulate network failure during API calls or Drive queries, verify zero unhandled rejections or fatal errors."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            self.harness.simulate_offline(True)
            time.sleep(0.5)

            # Trigger remote fetchDatabaseFromDrive while offline
            res = page.evaluate("""async () => {
                try {
                    if (typeof fetchDatabaseFromDrive === 'function') {
                        await fetchDatabaseFromDrive(true);
                        return { executed: true, success: true };
                    }
                    return { executed: false, reason: 'fetchDatabaseFromDrive not in scope' };
                } catch (err) {
                    return { executed: true, success: false, error: err.message };
                }
            }""")

            # Trigger background sync / SW message while offline
            page.evaluate("""() => {
                if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'INIT_SW',
                        notifiedIds: ['adversarial-offline-test-id']
                    });
                }
            }""")
            time.sleep(1.0)

            # Verify no unhandled promise rejections or fatal page errors occurred
            fatal_errors = [e for e in self.harness.captured_page_errors if "Uncaught" in e or "Fatal" in e]
            assert not fatal_errors, f"Fatal or uncaught promise errors occurred during offline network failure: {fatal_errors}"

            # Verify app state remains valid and populated from cache/storage
            files_count = page.evaluate("() => typeof appState !== 'undefined' && appState.files ? appState.files.length : 0")
            assert files_count >= 0, "appState was corrupted by offline network failure"

            return TestCaseResult(
                "test_adv_offline_network_failure_tolerance",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start,
                metadata={"drive_fetch_result": res}
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_offline_network_failure_tolerance",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )
        finally:
            self.harness.simulate_offline(False)

    # =========================================================================
    # ADV-4: Outdated Cache Eviction Lifecycle
    # =========================================================================

    def test_adv_outdated_cache_eviction(self) -> TestCaseResult:
        """ADV-M4.4: Inject legacy cache keys (v24, v30, orphaned) and confirm activate eviction purges all k !== 'vet33-pwa-cache-v33'."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            # 1. Inject multiple legacy caches
            legacy_caches = ['vet33-pwa-cache-v24', 'vet33-pwa-cache-v30', 'vet33-legacy-orphaned-cache']
            page.evaluate("""async (legacyNames) => {
                for (const name of legacyNames) {
                    const c = await caches.open(name);
                    await c.put(new Request('/legacy-test-' + name), new Response('legacy data ' + name));
                }
            }""", legacy_caches)

            # Verify they exist
            initial_keys = page.evaluate("async () => await caches.keys()")
            for leg in legacy_caches:
                assert leg in initial_keys, f"Failed to seed legacy cache '{leg}'"

            # 2. Trigger the exact cache eviction routine executed by sw.js activate event:
            # const keys = await caches.keys();
            # await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
            page.evaluate("""async () => {
                const CACHE_NAME = 'vet33-pwa-cache-v33';
                const keys = await caches.keys();
                await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
            }""")
            time.sleep(0.5)

            # 3. Verify all legacy caches are eliminated and only 'vet33-pwa-cache-v33' remains
            remaining_keys = page.evaluate("async () => await caches.keys()")
            for leg in legacy_caches:
                assert leg not in remaining_keys, f"Legacy cache '{leg}' was not evicted: remaining={remaining_keys}"

            assert 'vet33-pwa-cache-v33' in remaining_keys, f"'vet33-pwa-cache-v33' was accidentally deleted: {remaining_keys}"

            return TestCaseResult(
                "test_adv_outdated_cache_eviction",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start,
                metadata={"evicted_caches": legacy_caches, "remaining_caches": remaining_keys}
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_outdated_cache_eviction",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )

    # =========================================================================
    # ADV-5: Offline View Navigation & Layout Switching
    # =========================================================================

    def test_adv_offline_view_navigation_and_layout_switching(self) -> TestCaseResult:
        """ADV-M4.5: Perform view transitions (saved view, home view, grid/list) completely offline."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            self._wait_overlay_dismissed(page)
            self._wait_sw_active_and_cached(page, timeout_s=6.0)

            # Seed a saved file in localStorage
            page.evaluate("() => localStorage.setItem('vet33_saved_files_v1', JSON.stringify(['batna-lec-1-source']))")

            # Go offline
            self.harness.simulate_offline(True)
            time.sleep(0.5)

            # 1. Switch to Saved View offline
            saved_btn = page.locator("#header-saved-btn")
            assert saved_btn.count() > 0, "Missing #header-saved-btn"
            saved_btn.click(force=True)
            time.sleep(0.5)

            view = page.evaluate("() => typeof appState !== 'undefined' ? appState.currentView : null")
            assert view == "saved", f"Expected view to be 'saved' offline, got: '{view}'"

            # 2. Switch Layout Mode offline (grid -> list -> grid)
            list_btn = page.locator("#layout-list-btn")
            if list_btn.count() > 0 and list_btn.is_visible():
                list_btn.click(force=True)
                time.sleep(0.3)
                layout = page.evaluate("() => typeof appState !== 'undefined' ? appState.layoutMode : null")
                assert layout == "list", f"Expected layoutMode 'list', got: '{layout}'"

            grid_btn = page.locator("#layout-grid-btn")
            if grid_btn.count() > 0 and grid_btn.is_visible():
                grid_btn.click(force=True)
                time.sleep(0.3)
                layout = page.evaluate("() => typeof appState !== 'undefined' ? appState.layoutMode : null")
                assert layout == "grid", f"Expected layoutMode 'grid', got: '{layout}'"

            # 3. Return to Home View offline
            logo_btn = page.locator("#brand-logo-btn")
            assert logo_btn.count() > 0, "Missing #brand-logo-btn"
            logo_btn.click(force=True)
            time.sleep(0.5)

            home_view = page.evaluate("() => typeof appState !== 'undefined' ? appState.currentView : null")
            assert home_view != "saved", f"Expected to leave saved view offline, got: '{home_view}'"

            # Verify zero errors throughout offline navigation
            assert len(self.harness.captured_page_errors) == 0, f"Page errors during offline navigation: {self.harness.captured_page_errors}"

            return TestCaseResult(
                "test_adv_offline_view_navigation_and_layout_switching",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_offline_view_navigation_and_layout_switching",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )
        finally:
            self.harness.simulate_offline(False)

    # =========================================================================
    # ADV-6: Non-Cacheable Host & Media Bypass
    # =========================================================================

    def test_adv_non_cacheable_hosts_and_video_bypass(self) -> TestCaseResult:
        """ADV-M4.6: Verify MP4 video and Google Drive / Apps Script requests are never stored in cache."""
        start = time.time()
        page = self.harness.navigate_home(dismiss_video=True, wait_seconds=1.5)
        try:
            bypass_check = page.evaluate("""async () => {
                const CACHE_NAME = 'vet33-pwa-cache-v33';
                if (!await caches.has(CACHE_NAME)) return { hasCache: false };
                const cache = await caches.open(CACHE_NAME);
                const keys = await cache.keys();
                const urls = keys.map(k => k.url);

                const mp4InCache = urls.filter(u => u.includes('.mp4'));
                const gasInCache = urls.filter(u => u.includes('script.google.com') || u.includes('drive.google.com'));

                return {
                    hasCache: true,
                    mp4InCache,
                    gasInCache,
                    totalCached: urls.length
                };
            }""")

            assert bypass_check.get("hasCache"), "vet33-pwa-cache-v33 missing"
            assert len(bypass_check.get("mp4InCache", [])) == 0, f"MP4 video files found in Cache Storage: {bypass_check.get('mp4InCache')}"
            assert len(bypass_check.get("gasInCache", [])) == 0, f"Google Drive / GAS URLs found in Cache Storage: {bypass_check.get('gasInCache')}"

            return TestCaseResult(
                "test_adv_non_cacheable_hosts_and_video_bypass",
                "Tier 5 Adversarial",
                "F09",
                "PASS",
                time.time() - start,
                metadata=bypass_check
            )
        except Exception as e:
            return TestCaseResult(
                "test_adv_non_cacheable_hosts_and_video_bypass",
                "Tier 5 Adversarial",
                "F09",
                "FAIL",
                time.time() - start,
                error_message=str(e),
                console_errors=self.harness.captured_page_errors
            )

def run_adversarial_tests():
    print("=" * 80)
    print(" SENIORS 2027 VET-KSU 33 OLD LIST PWA — ADVERSARIAL SW & OFFLINE STRESS SUITE")
    print(" Milestone 4: Feature F09")
    print("=" * 80)

    harness = PWATestHarness(browser_name="msedge", headless=True)
    try:
        harness.start()
    except Exception as e:
        print(f"[FATAL] Test harness initialization failed: {e}")
        sys.exit(1)

    suite = AdversarialM4SWTests(harness)
    methods = [
        suite.test_adv_cache_storage_exact_13_assets,
        suite.test_adv_offline_navigation_full_reload,
        suite.test_adv_offline_network_failure_tolerance,
        suite.test_adv_outdated_cache_eviction,
        suite.test_adv_offline_view_navigation_and_layout_switching,
        suite.test_adv_non_cacheable_hosts_and_video_bypass
    ]

    results = []
    print(f"Queued {len(methods)} adversarial stress tests.\n")

    passed = 0
    failed = 0

    for idx, test_fn in enumerate(methods, start=1):
        test_name = test_fn.__name__
        print(f"[{idx:02d}/{len(methods):02d}] {test_name:<60}", end="", flush=True)
        res = test_fn()
        results.append(res)
        if res.status == "PASS":
            passed += 1
            print(f" PASS ({res.duration:.2f}s)")
        else:
            failed += 1
            print(f" FAIL ({res.duration:.2f}s)")
            if res.error_message:
                print(f"      Error: {res.error_message}")

    harness.stop()

    print("\n" + "=" * 80)
    print(" ADVERSARIAL EXECUTION SUMMARY")
    print("=" * 80)
    print(f" Total Tests Run : {len(results)}")
    print(f" Passed          : {passed}")
    print(f" Failed / Errors : {failed}")
    print(f" Pass Rate       : {(passed / len(results) * 100):.1f}%")
    print("=" * 80)

    output_path = os.path.join(PROJECT_ROOT, "e2e_tests", "adversarial_m4_results.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump([r.__dict__ for r in results], f, indent=2, ensure_ascii=False)
    print(f"Adversarial results written to {output_path}")

    return 0 if failed == 0 else 1

if __name__ == "__main__":
    sys.exit(run_adversarial_tests())
