// CiGa Raw server for a normal Node host (or your computer) — node:http, no framework.
// Serves the website (dist/), the admin dashboard (/admin), uploaded photos (/uploads) and the API.
// On Vercel the same API runs from api/index.js instead.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { SECURITY_HEADERS, sendJson, serveStatic } from './http.js'
import { handleApi } from './app.js'

const PORT = Number(process.env.PORT) || 8787
const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
// The dashboard ships inside the website build (dist/admin); fall back to the source copy
const ADMIN_DIR = fs.existsSync(path.join(DIST, 'admin', 'index.html')) ? path.join(DIST, 'admin') : path.join(ROOT, 'public', 'admin')

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url.pathname)

  if (req.method !== 'GET' && req.method !== 'HEAD') return sendJson(res, 405, { error: 'Method not allowed' })

  if (url.pathname.startsWith('/uploads/')) {
    const { UPLOAD_DIR } = await import('./storage/fs.js')
    if (serveStatic(req, res, UPLOAD_DIR, url.pathname.slice('/uploads'.length), { cache: 'public, max-age=31536000, immutable' })) return
    return sendJson(res, 404, { error: 'Not found' })
  }

  if (url.pathname === '/admin' || url.pathname.startsWith('/admin/')) {
    const rest = url.pathname.slice('/admin'.length) || '/'
    const opts = { cache: 'no-store', extraHeaders: { 'X-Frame-Options': 'DENY', 'X-Robots-Tag': 'noindex' } }
    if (rest !== '/' && serveStatic(req, res, ADMIN_DIR, rest, opts)) return
    if (serveStatic(req, res, ADMIN_DIR, '/index.html', opts)) return
  }

  // Website: hashed assets cached long, everything else falls back to index.html (client routing)
  const longCache = url.pathname.startsWith('/assets/') ? { cache: 'public, max-age=31536000, immutable' } : undefined
  if (url.pathname !== '/' && serveStatic(req, res, DIST, url.pathname, longCache)) return
  if (serveStatic(req, res, DIST, '/index.html', { cache: 'no-cache' })) return

  res.writeHead(503, { ...SECURITY_HEADERS, 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Website not built yet. Run "npm run build", then restart the server.')
})

server.listen(PORT, () => {
  console.log(`CiGa Raw server on http://localhost:${PORT}`)
  console.log(`  Website  http://localhost:${PORT}/`)
  console.log(`  Admin    http://localhost:${PORT}/admin`)
  if (!fs.existsSync(DIST)) console.log('  (run "npm run build" to serve the website)')
})
