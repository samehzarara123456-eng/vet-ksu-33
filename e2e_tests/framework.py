"""
E2E Testing Framework & Driver for Seniors 2027 VET-KSU 33 Old List PWA.
Opaque-box browser automation via Playwright with Edge/Chrome headless support.
"""

import time
import json
import traceback
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page, Error as PlaywrightError
from e2e_tests.server import PWATestServer

@dataclass
class TestCaseResult:
    name: str
    tier: str
    feature: str
    status: str  # "PASS", "FAIL", "ERROR"
    duration: float
    error_message: Optional[str] = None
    stack_trace: Optional[str] = None
    console_errors: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)

class PWATestHarness:
    def __init__(self, browser_name: str = "msedge", headless: bool = True):
        self.browser_name = browser_name
        self.headless = headless
        self.server: Optional[PWATestServer] = None
        self.base_url: str = ""
        self.playwright = None
        self.browser: Optional[Browser] = None
        self.context: Optional[BrowserContext] = None
        self.page: Optional[Page] = None
        self.captured_console_errors: List[str] = []
        self.captured_page_errors: List[str] = []

    def start(self):
        """Starts local server and browser session."""
        self.server = PWATestServer()
        self.base_url = self.server.start()

        self.playwright = sync_playwright().start()
        channel = "msedge" if self.browser_name.lower() in ("edge", "msedge") else "chrome"
        try:
            self.browser = self.playwright.chromium.launch(
                channel=channel,
                headless=self.headless,
                args=[
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--autoplay-policy=no-user-gesture-required",
                ]
            )
        except Exception:
            # Fallback to standard chromium if channel fails
            self.browser = self.playwright.chromium.launch(
                headless=self.headless,
                args=["--no-sandbox", "--disable-dev-shm-usage"]
            )

    def stop(self):
        """Tears down browser and HTTP server."""
        if self.page:
            try:
                self.page.close()
            except Exception:
                pass
        if self.context:
            try:
                self.context.close()
            except Exception:
                pass
        if self.browser:
            try:
                self.browser.close()
            except Exception:
                pass
        if self.playwright:
            try:
                self.playwright.stop()
            except Exception:
                pass
        if self.server:
            try:
                self.server.stop()
            except Exception:
                pass

    def new_page(self) -> Page:
        """Creates a fresh browser context and page with error listeners."""
        if self.context:
            try:
                self.context.close()
            except Exception:
                pass

        self.captured_console_errors = []
        self.captured_page_errors = []

        self.context = self.browser.new_context(
            viewport={"width": 1280, "height": 800},
            permissions=["notifications"],
            bypass_csp=True,
        )

        self.page = self.context.new_page()
        self.page.set_default_navigation_timeout(15000)
        self.page.set_default_timeout(5000)

        def on_console(msg):
            if msg.type in ("error",):
                self.captured_console_errors.append(f"[{msg.type}] {msg.text}")

        def on_page_error(err):
            self.captured_page_errors.append(str(err))

        self.page.on("console", on_console)
        self.page.on("pageerror", on_page_error)
        return self.page

    def navigate_home(self, dismiss_video: bool = True, wait_seconds: float = 1.0) -> Page:
        """Navigates to the PWA home page, cleans errors, and optionally skips intro video."""
        page = self.new_page()
        page.goto(f"{self.base_url}/index.html", wait_until="domcontentloaded")
        time.sleep(wait_seconds)

        if dismiss_video:
            self.dismiss_intro_video()

        return page

    def dismiss_intro_video(self):
        """Dismisses the intro video overlay cleanly."""
        try:
            skip_btn = self.page.locator("#intro-skip-btn")
            if skip_btn.is_visible(timeout=1000):
                skip_btn.click(timeout=1000)
                # Wait for overlay to hide or scale down
                self.page.wait_for_selector("#intro-video-overlay.hidden, #intro-video-overlay[style*='display: none']", timeout=1500)
        except Exception:
            pass
        finally:
            try:
                self.page.evaluate("""() => {
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

    def get_app_state(self) -> Dict[str, Any]:
        """Reads appState if available."""
        try:
            return self.page.evaluate("""() => {
                if (typeof appState !== 'undefined' && appState) {
                    return JSON.parse(JSON.stringify(appState));
                }
                if (typeof window !== 'undefined' && window.appState) {
                    return JSON.parse(JSON.stringify(window.appState));
                }
                return {};
            }""")
        except Exception:
            return {}

    def get_local_storage(self, key: str) -> Any:
        """Reads a key from localStorage."""
        return self.page.evaluate(f"() => localStorage.getItem('{key}')")

    def set_local_storage(self, key: str, value: str):
        """Sets a key in localStorage."""
        self.page.evaluate(f"() => localStorage.setItem('{key}', '{value}')")

    def clear_local_storage(self):
        """Clears localStorage."""
        self.page.evaluate("() => localStorage.clear()")

    def ensure_sidebar_open(self):
        """Ensures the quick-access sidebar drawer is opened."""
        try:
            is_open = self.page.evaluate("""() => {
                const sb = document.getElementById('quick-access-sidebar');
                return sb && sb.classList.contains('sidebar-open');
            }""")
            if not is_open:
                edge_tab = self.page.locator("#sidebar-edge-tab")
                if edge_tab.is_visible():
                    edge_tab.click()
                    time.sleep(0.4)
                else:
                    self.page.evaluate("() => typeof openQuickSidebar === 'function' && openQuickSidebar()")
                    time.sleep(0.4)
        except Exception:
            pass

    def navigate_to_folder(self, subject: str = 'batna', category: str = 'محاضرات', folder_num: int = 1):
        """Navigates to a folder containing file cards, waiting for files to sync if needed."""
        for _ in range(15):
            cnt = self.page.evaluate("() => typeof appState !== 'undefined' && appState.files ? appState.files.length : 0")
            if cnt > 0:
                break
            time.sleep(0.3)
        self.page.evaluate(f"() => typeof navigateToHierarchy === 'function' && navigateToHierarchy('{subject}', '{category}', {folder_num})")
        try:
            self.page.wait_for_selector("#explorer-grid [data-file-id], #explorer-grid [data-file-action]", timeout=4000)
        except Exception:
            pass
        time.sleep(0.5)

    def is_visible(self, selector: str) -> bool:
        """Checks if an element is visible in the viewport and does not have .hidden."""
        try:
            el = self.page.locator(selector)
            if not el.is_visible(timeout=500):
                return False
            # Check classes
            has_hidden = self.page.evaluate(f"""(sel) => {{
                const el = document.querySelector(sel);
                if (!el) return true;
                const style = window.getComputedStyle(el);
                return el.classList.contains('hidden') || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
            }}""", selector)
            return not has_hidden
        except Exception:
            return False

    def simulate_offline(self, offline: bool = True):
        """Simulates offline or online network state."""
        if self.context:
            self.context.set_offline(offline)
