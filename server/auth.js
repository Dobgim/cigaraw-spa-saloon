// Admin login: scrypt password hashes and signed session cookies
import crypto from 'node:crypto'
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

// Session token: base64url(payload).hmac — the payload carries the username, expiry and the
// password version, so changing the password signs out every other session
const sign = (data, secret) => crypto.createHmac('sha256', secret).update(data).digest('base64url')

export function createSession(admin, secret) {
  const payload = Buffer.from(JSON.stringify({
    u: admin.username,
    v: admin.version,
    exp: Date.now() + SESSION_HOURS * 3600_000,
  })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function readSession(req, admin, secret) {
  const token = parseCookies(req)[COOKIE]
  if (!admin || !token || !token.includes('.')) return null
  const [payload, mac] = token.split('.')
  const good = sign(payload, secret)
  if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null
  let data
  try {
    data = JSON.parse(Buffer.from(payload, 'base64url').toString())
  } catch {
    return null
  }
  if (data.exp < Date.now() || data.u !== admin.username || data.v !== admin.version) return null
  return admin
}

export function sessionCookie(token, req) {
  const secure = process.env.VERCEL || req.headers['x-forwarded-proto'] === 'https' || req.socket?.encrypted
  const parts = [`${COOKIE}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${SESSION_HOURS * 3600}`]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
