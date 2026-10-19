// Reset the admin login from the command line (uses the same storage as the server):
//   npm run admin:reset -- <username> <new-password>
// For Vercel storage, run it with the KV_REST_API_URL / KV_REST_API_TOKEN env vars from the Vercel project.
import { hashPassword } from './auth.js'
import { storage } from './storage/index.js'

const [username, password] = process.argv.slice(2)
if (!username || !password || password.length < 10) {
  console.log('Usage: npm run admin:reset -- <username> <new-password (10+ characters)>')
  process.exit(1)
}
const store = await storage()
const current = await store.getJSON('admin')
await store.setJSON('admin', { username, hash: hashPassword(password), version: (current?.version || 0) + 1 })
console.log(`Admin login reset for "${username}" (${store.kind} storage). All existing sessions are signed out.`)
