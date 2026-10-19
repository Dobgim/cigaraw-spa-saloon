// Small HTTP helpers on top of node:http — no framework
import fs from 'node:fs'
import path from 'node:path'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.md': 'text/plain; charset=utf-8',
}

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function sendJson(res, status, data, headers = {}) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  })
  res.end(body)
}

// Read the request body as JSON, refusing anything over `limit` bytes
export function readJson(req, limit = 100_000) {
  return new Promise((resolve, reject) => {
    const type = req.headers['content-type'] || ''
    if (!type.includes('application/json')) return reject(new HttpError(415, 'Expected JSON'))
    // On Vercel the platform may have read and parsed the body already
    if (process.env.VERCEL) {
      let parsed
      try { parsed = req.body } catch { return reject(new HttpError(400, 'Invalid JSON')) }
      if (parsed !== undefined) {
        if (typeof parsed === 'string') {
          try { parsed = JSON.parse(parsed) } catch { return reject(new HttpError(400, 'Invalid JSON')) }
        }
        if (JSON.stringify(parsed ?? {}).length > limit) return reject(new HttpError(413, 'Request too large'))
        return resolve(parsed ?? {})
      }
    }
    let size = 0
    const chunks = []
    req.on('data', (c) => {
      size += c.length
      if (size > limit) {
        reject(new HttpError(413, 'Request too large'))
        req.destroy()
        return
      }
      chunks.push(c)
    })
    req.on('end', () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {})
      } catch {
        reject(new HttpError(400, 'Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

export function parseCookies(req) {
  const out = {}
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=')
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim())
  }
  return out
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  return (fwd ? String(fwd).split(',')[0] : req.socket.remoteAddress || '').trim()
}

// Serve a file from `root` if `urlPath` resolves inside it. Returns false when not found.
export function serveStatic(req, res, root, urlPath, { cache = 'public, max-age=3600', extraHeaders = {} } = {}) {
  let rel
  try {
    rel = decodeURIComponent(urlPath)
  } catch {
    return false
  }
  const file = path.resolve(root, '.' + path.posix.normalize('/' + rel))
  if (!file.startsWith(path.resolve(root) + path.sep) && file !== path.resolve(root)) return false
  let stat
  try {
    stat = fs.statSync(file)
  } catch {
    return false
  }
  if (!stat.isFile()) return false
  res.writeHead(200, {
    ...SECURITY_HEADERS,
    'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Content-Length': stat.size,
    'Cache-Control': cache,
    ...extraHeaders,
  })
  if (req.method === 'HEAD') return res.end(), true
  fs.createReadStream(file).pipe(res)
  return true
}
