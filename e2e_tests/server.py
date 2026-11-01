"""
Local HTTP Server for Seniors 2027 VET-KSU 33 Old List PWA E2E Tests.
Provides clean serving of PWA static files, service worker, manifest, and assets.
"""

import http.server
import socket
import socketserver
import threading
import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class PWATestHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript; charset=utf-8",
        ".mjs": "application/javascript; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".html": "text/html; charset=utf-8",
        ".webmanifest": "application/manifest+json",
        ".mp4": "video/mp4",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".svg": "image/svg+xml",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        # Service-Worker-Allowed header to allow SW at root
        self.send_header("Service-Worker-Allowed", "/")
        super().end_headers()

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass

    def handle(self):
        try:
            super().handle()
        except (ConnectionResetError, ConnectionAbortedError, BrokenPipeError):
            pass

    def log_message(self, format, *args):
        # Suppress noisy HTTP request logging during test runs
        pass

class ThreadedTCPServer(socketserver.ThreadingTCPServer):
    daemon_threads = True
    allow_reuse_address = True

class PWATestServer:
    def __init__(self, host="127.0.0.1", port=0):
        self.host = host
        self.port = port
        self.httpd = None
        self.thread = None

    def start(self):
        # Find free port if port is 0
        if self.port == 0:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((self.host, 0))
                s.listen(1)
                self.port = s.getsockname()[1]

        self.httpd = ThreadedTCPServer((self.host, self.port), PWATestHTTPRequestHandler)
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()
        return f"http://{self.host}:{self.port}"

    def stop(self):
        if self.httpd:
            try:
                self.httpd.shutdown()
                self.httpd.server_close()
            except Exception:
                pass
            self.httpd = None

if __name__ == "__main__":
    server = PWATestServer(port=8089)
    url = server.start()
    print(f"Server started at {url} serving {PROJECT_ROOT}")
    try:
        input("Press Enter to stop...")
    finally:
        server.stop()
