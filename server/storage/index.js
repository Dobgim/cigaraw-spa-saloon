// Pick the storage driver:
//   • Upstash Redis env vars present → Vercel storage (Redis + Blob)
//   • running on Vercel without them  → "not connected" (the API explains how to connect)
//   • anywhere else                   → files in DATA_DIR
import { hasRedis, vercelStorage } from './vercel.js'

const onVercel = Boolean(process.env.VERCEL)

export const storageReady = hasRedis || !onVercel

export const NOT_CONNECTED =
  'The dashboard storage is not connected yet. In Vercel, open this project → Storage, connect “Upstash for Redis” and a “Blob” store, then redeploy.'

let driver
export async function storage() {
  if (driver) return driver
  if (hasRedis) driver = vercelStorage
  else if (!onVercel) driver = (await import('./fs.js')).fileStorage
  else throw Object.assign(new Error(NOT_CONNECTED), { status: 503 })
  return driver
}
