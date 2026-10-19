import { applyMenu } from './menu'
import { applyPhotos } from './photos'
import { applySettings } from './site'

// Fetch the content saved in the admin dashboard and apply it over the built-in defaults.
// Resolves to true when live content was applied, false when the site keeps its defaults
// (for example on static hosting with no backend).
export async function loadContent() {
  try {
    const res = await fetch('/api/content', { headers: { Accept: 'application/json' } })
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) return false
    const data = await res.json()
    applyMenu(data.menu)
    applyPhotos(data)
    applySettings(data.settings)
    return true
  } catch {
    return false
  }
}

// Send a booking to the backend; the confirmation screen works either way
export async function saveBooking(booking) {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    })
    return res.ok
  } catch {
    return false
  }
}
