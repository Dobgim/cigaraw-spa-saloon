// First-run setup: copy the website's built-in content into DATA_DIR, and create the
// admin login from env vars (ADMIN_USERNAME / ADMIN_PASSWORD) or the bundled seed hash.
import fs from 'node:fs'
import path from 'node:path'
import { exists, readData, writeData, newId } from './store.js'
import { hashPassword } from './auth.js'
import { CLASSIC, FACE_BODY, VIP, ON_REQUEST, TEETH_WHITENING } from '../src/menu.js'
import { SALON, TATTOOS } from '../src/photos.js'
import { PHONE_DISPLAY, WHATSAPP_DISPLAY, EMAIL, OPENING } from '../src/site.js'

export function defaultContent() {
  return {
    menu: { classic: CLASSIC, faceBody: FACE_BODY, vip: VIP, onRequest: ON_REQUEST, teethWhitening: TEETH_WHITENING },
    tattoos: TATTOOS.map(t => ({ id: newId(), ...t })),
    salon: SALON.map(p => ({ id: newId(), ...p })),
    settings: { phone: PHONE_DISPLAY, whatsapp: WHATSAPP_DISPLAY, email: EMAIL, hours: OPENING },
    updatedAt: new Date().toISOString(),
  }
}

export function seed() {
  if (!exists('content.json')) {
    writeData('content.json', defaultContent())
    console.log('• Created content.json from the website defaults')
  }
  if (!exists('bookings.json')) writeData('bookings.json', [])

  if (!readData('admin.json', null)) {
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env
    let admin
    if (ADMIN_USERNAME && ADMIN_PASSWORD) {
      admin = { username: ADMIN_USERNAME, hash: hashPassword(ADMIN_PASSWORD), version: 1 }
      console.log(`• Created admin "${ADMIN_USERNAME}" from environment variables`)
    } else {
      const bundled = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'admin-seed.json'), 'utf8'))
      admin = { username: bundled.username, hash: bundled.hash, version: 1 }
      console.log(`• Created admin "${bundled.username}" from the bundled login — change the password after signing in`)
    }
    writeData('admin.json', admin)
  }
}
