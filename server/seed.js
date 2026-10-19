// First-run setup: copy the website's built-in content into storage, and create the admin
// login from env vars (ADMIN_USERNAME / ADMIN_PASSWORD) or the bundled seed hash.
import crypto from 'node:crypto'
import adminSeed from './admin-seed.js'
import { hashPassword } from './auth.js'
import { CLASSIC, FACE_BODY, VIP, ON_REQUEST, TEETH_WHITENING } from '../src/menu.js'
import { SALON, TATTOOS } from '../src/photos.js'
import { PHONE_DISPLAY, WHATSAPP_DISPLAY, EMAIL, OPENING } from '../src/site.js'

export const newId = () => crypto.randomBytes(8).toString('hex')

export function defaultContent() {
  return {
    menu: { classic: CLASSIC, faceBody: FACE_BODY, vip: VIP, onRequest: ON_REQUEST, teethWhitening: TEETH_WHITENING },
    tattoos: TATTOOS.map(t => ({ id: newId(), ...t })),
    salon: SALON.map(p => ({ id: newId(), ...p })),
    settings: { phone: PHONE_DISPLAY, whatsapp: WHATSAPP_DISPLAY, email: EMAIL, hours: OPENING },
    updatedAt: new Date().toISOString(),
  }
}

function defaultAdmin() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env
  if (ADMIN_USERNAME && ADMIN_PASSWORD) return { username: ADMIN_USERNAME, hash: hashPassword(ADMIN_PASSWORD), version: 1 }
  return { username: adminSeed.username, hash: adminSeed.hash, version: 1 }
}

// Runs once per process; cheap after the first call
let done = null
export function ensureSeeded(store) {
  done ||= (async () => {
    if (await store.setJSONIfAbsent('content', defaultContent())) console.log('• Created content from the website defaults')
    if (await store.setJSONIfAbsent('admin', defaultAdmin())) console.log('• Created the admin login')
  })().catch((e) => { done = null; throw e })
  return done
}
