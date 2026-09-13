import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.m4a': 'audio/mp4', '.m3u': 'application/vnd.apple.mpegurl'
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    response.writeHead(404).end('Not found');
    return;
  }

  const stat = fs.statSync(file);
  const headers = { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
  const match = request.headers.range?.match(/bytes=(\d+)-(\d*)/);
  if (match) {
    const start = Number(match[1]);
    const end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
    response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1 });
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(file, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { ...headers, 'Content-Length': stat.size });
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Exact Canva mirror: http://127.0.0.1:${port}`);
});
