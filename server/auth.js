// Admin login: scrypt password hashes, signed session cookies, and login rate limiting
import crypto from 'node:crypto'
import { readData, writeData, readSecret } from './store.js'
import { parseCookies } from './http.js'

const COOKIE = 'cr_admin'
const SESSION_HOURS = 12
const SCRYPT = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

export function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(password, salt, 64, SCRYPT)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

export function verifyPassword(password, stored) {
  const [kind, saltHex, hashHex] = String(stored || '').split('$')
  if (kind !== 'scrypt' || !saltHex || !hashHex) return false
  const expected = Buffer.from(hashHex, 'hex')
  const actual = crypto.scryptSync(String(password), Buffer.from(saltHex, 'hex'), expected.length, SCRYPT)
  return crypto.timingSafeEqual(actual, expected)
}

export const getAdmin = () => readData('admin.json', null)
export const saveAdmin = (admin) => writeData('admin.json', admin)

// --- sessions: base64url(payload).hmac, where payload carries the username, expiry and
// the password version, so changing the password signs out every other session
const sign = (data) => crypto.createHmac('sha256', readSecret()).update(data).digest('base64url')

export function createSession(admin) {
  const payload = Buffer.from(JSON.stringify({
    u: admin.username,
    v: admin.version,
    exp: Date.now() + SESSION_HOURS * 3600_000,
  })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function readSession(req) {
  const token = parseCookies(req)[COOKIE]
  if (!token || !token.includes('.')) return null
  const [payload, mac] = token.split('.')
  const good = sign(payload)
  if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null
  let data
  try {
    data = JSON.parse(Buffer.from(payload, 'base64url').toString())
  } catch {
    return null
  }
  const admin = getAdmin()
  if (!admin || data.exp < Date.now() || data.u !== admin.username || data.v !== admin.version) return null
  return admin
}

export function sessionCookie(token, req) {
  const secure = req.headers['x-forwarded-proto'] === 'https' || req.socket.encrypted
  const parts = [`${COOKIE}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${SESSION_HOURS * 3600}`]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`

// --- simple in-memory rate limiter: `max` hits per `windowMs` per key
const buckets = new Map()
export function rateLimit(key, max, windowMs) {
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { ok: true }
  }
  b.count++
  return b.count > max ? { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) } : { ok: true }
}
export const clearRateLimit = (key) => buckets.delete(key)

setInterval(() => {
  const now = Date.now()
  for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k)
}, 10 * 60_000).unref()
