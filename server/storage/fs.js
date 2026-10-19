// File storage for a normal server (VPS, Render with a disk, your own computer).
// Everything lives in DATA_DIR:
//   content.json  admin.json  bookings.json  secret.key  uploads/
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { decodeImage } from './images.js'

export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(import.meta.dirname, '..', '..', 'data'))
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads')
fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const file = (key) => path.join(DATA_DIR, `${key}.json`)

function read(key, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file(key), 'utf8'))
  } catch {
    return fallback
  }
}

// Write to a temp file then rename, so a crash never leaves half-written JSON
function write(key, value) {
  const target = file(key)
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2))
  fs.renameSync(tmp, target)
}

const hits = new Map()
setInterval(() => {
  const now = Date.now()
  for (const [k, b] of hits) if (b.reset < now) hits.delete(k)
}, 10 * 60_000).unref()

export const fileStorage = {
  kind: 'files',

  async getJSON(key, fallback = null) { return read(key, fallback) },
  async setJSON(key, value) { write(key, value) },
  async setJSONIfAbsent(key, value) {
    if (fs.existsSync(file(key))) return false
    write(key, value)
    return true
  },

  async secret() {
    const p = path.join(DATA_DIR, 'secret.key')
    if (!fs.existsSync(p)) fs.writeFileSync(p, crypto.randomBytes(48).toString('hex'), { mode: 0o600 })
    return fs.readFileSync(p, 'utf8').trim()
  },

  bookings: {
    async list() { return read('bookings', []) },
    async add(b) { write('bookings', [b, ...read('bookings', [])].slice(0, 5000)) },
    async put(b) { write('bookings', read('bookings', []).map(x => (x.id === b.id ? b : x))) },
    async remove(id) { write('bookings', read('bookings', []).filter(x => x.id !== id)) },
  },

  async saveImage(dataUrl, folder) {
    const img = decodeImage(dataUrl)
    if (img.error) return img
    const dir = path.join(UPLOAD_DIR, folder)
    fs.mkdirSync(dir, { recursive: true })
    const name = `${Date.now().toString(36)}-${crypto.randomBytes(5).toString('hex')}.${img.ext}`
    fs.writeFileSync(path.join(dir, name), img.buf)
    return { src: `/uploads/${folder}/${name}` }
  },

  // Built-in /images/... photos are never deleted
  async deleteImage(src) {
    if (typeof src !== 'string' || !src.startsWith('/uploads/')) return
    const target = path.resolve(UPLOAD_DIR, '.' + src.slice('/uploads'.length))
    if (target.startsWith(UPLOAD_DIR + path.sep)) fs.rmSync(target, { force: true })
  },

  // In-memory rate limit: `max` hits per `windowSec` per key
  async hit(key, max, windowSec) {
    const now = Date.now()
    const b = hits.get(key)
    if (!b || b.reset < now) {
      hits.set(key, { count: 1, reset: now + windowSec * 1000 })
      return { ok: true }
    }
    b.count++
    return b.count > max ? { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) } : { ok: true }
  },
  async clearHit(key) { hits.delete(key) },
}
