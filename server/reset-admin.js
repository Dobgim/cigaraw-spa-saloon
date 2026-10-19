// Reset the admin login from the command line:
//   npm run admin:reset -- <username> <new-password>
import { hashPassword, getAdmin, saveAdmin } from './auth.js'

const [username, password] = process.argv.slice(2)
if (!username || !password || password.length < 10) {
  console.log('Usage: npm run admin:reset -- <username> <new-password (10+ characters)>')
  process.exit(1)
}
const current = getAdmin()
saveAdmin({ username, hash: hashPassword(password), version: (current?.version || 0) + 1 })
console.log(`Admin login reset for "${username}". All existing sessions are signed out.`)
