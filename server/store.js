// JSON-file storage. Everything the admin edits lives in DATA_DIR:
//   content.json   prices, tattoos, gallery photos, contact & hours
//   bookings.json  booking requests from the website
//   admin.json     admin login (password stored as a scrypt hash)
//   secret.key     key that signs login sessions
//   uploads/       photos uploaded from the dashboard
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(import.meta.dirname, '..', 'data'))
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads')

fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const file = (name) => path.join(DATA_DIR, name)

export function readData(name, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file(name), 'utf8'))
  } catch {
    return fallback
  }
}

// Write to a temp file then rename, so a crash never leaves half-written JSON
export function writeData(name, value) {
  const target = file(name)
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2))
  fs.renameSync(tmp, target)
}

export function exists(name) {
  return fs.existsSync(file(name))
}

export function readSecret() {
  const p = file('secret.key')
  if (!fs.existsSync(p)) fs.writeFileSync(p, crypto.randomBytes(48).toString('hex'), { mode: 0o600 })
  return fs.readFileSync(p, 'utf8').trim()
}

export const newId = () => crypto.randomBytes(8).toString('hex')

// Save an uploaded image sent as a data URL. Only real JPEG/PNG/WebP files are accepted.
const SIGNATURES = [
  { ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: 'webp', test: (b) => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP' },
]
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024

export function saveImage(dataUrl, folder) {
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''))
  if (!m) return { error: 'Please choose a JPG, PNG or WebP photo.' }
  const buf = Buffer.from(m[2], 'base64')
  if (buf.length > MAX_IMAGE_BYTES) return { error: 'That photo is too large (max 8 MB).' }
  const kind = SIGNATURES.find(s => s.test(buf))
  if (!kind) return { error: 'That file is not a valid image.' }
  const dir = path.join(UPLOAD_DIR, folder)
  fs.mkdirSync(dir, { recursive: true })
  const name = `${Date.now().toString(36)}-${crypto.randomBytes(5).toString('hex')}.${kind.ext}`
  fs.writeFileSync(path.join(dir, name), buf)
  return { src: `/uploads/${folder}/${name}` }
}

// Delete an uploaded file (built-in /images/... photos are left alone)
export function deleteUpload(src) {
  if (typeof src !== 'string' || !src.startsWith('/uploads/')) return
  const target = path.resolve(UPLOAD_DIR, '.' + src.slice('/uploads'.length))
  if (target.startsWith(UPLOAD_DIR + path.sep)) fs.rmSync(target, { force: true })
}
