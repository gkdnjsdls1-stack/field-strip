#!/usr/bin/env python3
"""개발용 정적 서버. python -m http.server 는 캐시 헤더를 안 보내서
브라우저가 .js 모듈을 옛 버전으로 들고 있는다. 고친 게 안 먹는 것처럼 보이는 원인."""
import os, sys
from http.server import SimpleHTTPRequestHandler, test


class NoCache(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1] if len(sys.argv) > 1 else os.environ.get('PORT', 4173))
    test(HandlerClass=NoCache, port=port, bind='127.0.0.1')
