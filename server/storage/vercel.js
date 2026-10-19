// Storage for Vercel, where functions have no lasting disk:
//   • Upstash Redis (free, private) for content, bookings, the admin login and the session key
//   • Vercel Blob (free, public files) for uploaded photos
// Both are added from the Vercel dashboard (Storage tab), which sets these env vars automatically.
import crypto from 'node:crypto'
import { decodeImage } from './images.js'

// Vercel names these env vars with an optional custom prefix (e.g. KV_REST_API_URL or
// STORAGE_KV_REST_API_URL), so find them by suffix. Read-only tokens are skipped.
const env = (...suffixes) => {
  for (const suffix of suffixes) {
    const exact = process.env[suffix]
    if (exact) return exact
    const key = Object.keys(process.env).find(k => k.endsWith('_' + suffix) && !k.includes('READ_ONLY'))
    if (key) return process.env[key]
  }
  return undefined
}
const REDIS_URL = env('KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL')
const REDIS_TOKEN = env('KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_TOKEN')
const BLOB_TOKEN = env('BLOB_READ_WRITE_TOKEN', 'READ_WRITE_TOKEN')
const PREFIX = 'cigaraw:'

export const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN)
export const hasBlob = Boolean(BLOB_TOKEN)

// One Redis command over Upstash's REST API (no SDK needed)
async function redis(...command) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.error) throw new Error(`Storage error: ${data.error || res.status}`)
  return data.result
}

const parse = (v, fallback) => {
  if (v === null || v === undefined) return fallback
  try { return JSON.parse(v) } catch { return fallback }
}

export const vercelStorage = {
  kind: 'vercel',

  async getJSON(key, fallback = null) { return parse(await redis('GET', PREFIX + key), fallback) },
  async setJSON(key, value) { await redis('SET', PREFIX + key, JSON.stringify(value)) },
  async setJSONIfAbsent(key, value) { return (await redis('SET', PREFIX + key, JSON.stringify(value), 'NX')) === 'OK' },

  async secret() {
    await redis('SET', PREFIX + 'secret', crypto.randomBytes(48).toString('hex'), 'NX')
    return redis('GET', PREFIX + 'secret')
  },

  // Each booking is one field in a hash, so two people booking at once never overwrite each other
  bookings: {
    async list() {
      const flat = (await redis('HGETALL', PREFIX + 'bookings')) || []
      const out = []
      for (let i = 1; i < flat.length; i += 2) {
        const b = parse(flat[i], null)
        if (b) out.push(b)
      }
      return out.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    },
    async add(b) { await redis('HSET', PREFIX + 'bookings', b.id, JSON.stringify(b)) },
    async put(b) { await redis('HSET', PREFIX + 'bookings', b.id, JSON.stringify(b)) },
    async remove(id) { await redis('HDEL', PREFIX + 'bookings', id) },
  },

  async saveImage(dataUrl, folder) {
    if (!hasBlob) return { error: 'Photo storage is not connected yet. In Vercel, open Storage and connect a Blob store to this project.' }
    const img = decodeImage(dataUrl)
    if (img.error) return img
    const { put } = await import('@vercel/blob')
    const name = `${folder}/${Date.now().toString(36)}-${crypto.randomBytes(5).toString('hex')}.${img.ext}`
    const blob = await put(name, img.buf, { access: 'public', contentType: img.type, addRandomSuffix: false, cacheControlMaxAge: 31536000, token: BLOB_TOKEN })
    return { src: blob.url }
  },

  // Only photos uploaded to Blob are deleted; built-in /images/... photos are left alone
  async deleteImage(src) {
    if (!hasBlob || typeof src !== 'string' || !/^https:\/\/[a-z0-9-]+\.public\.blob\.vercel-storage\.com\//.test(src)) return
    const { del } = await import('@vercel/blob')
    await del(src, { token: BLOB_TOKEN }).catch(() => {})
  },

  // Shared rate limit across all function instances
  async hit(key, max, windowSec) {
    const k = PREFIX + 'rl:' + key
    const count = await redis('INCR', k)
    if (count === 1) await redis('EXPIRE', k, windowSec)
    if (count <= max) return { ok: true }
    const ttl = await redis('TTL', k)
    return { ok: false, retryAfter: ttl > 0 ? ttl : windowSec }
  },
  async clearHit(key) { await redis('DEL', PREFIX + 'rl:' + key) },
}
