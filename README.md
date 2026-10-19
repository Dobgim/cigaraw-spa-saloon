# CiGa Raw Salon and Spa — website + admin dashboard

- **Website**: React + Vite (`src/`)
- **Backend & admin dashboard**: plain Node.js, no framework, no database server (`server/`).
  Content, prices, bookings and settings are saved as JSON files; uploaded photos are saved as files.

## Run it

```bash
npm install
npm run build     # build the website into dist/
npm start         # start the server on http://localhost:8787
```

- Website: <http://localhost:8787/>
- Admin dashboard: <http://localhost:8787/admin>

While working on the website code, run `npm run server` in one terminal and `npm run dev` in another —
Vite forwards `/api`, `/uploads` and `/admin` to the backend.

## Admin dashboard

From a phone or computer you can:

- see and manage **bookings** from the website form (confirm, mark done/cancelled, WhatsApp or call the client)
- add, edit, reorder and delete **tattoo designs** with their prices
- add, edit, reorder and delete **salon photos** for the gallery
- edit every **service price**, including VIP and teeth whitening
- change **opening hours**, the salon **phone**, **WhatsApp** number and **email**
- change the admin **username and password**

Photos are resized in the browser before upload, so uploads stay fast on mobile data.

### First login

On first start the server creates the admin account:

- from `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables, if set, or
- from the bundled login in `server/admin-seed.json` (only a scrypt hash is stored — the password is not in the code).

Change the password from **Account** after signing in. Forgot it? On the server run:

```bash
npm run admin:reset -- <username> <new-password>
```

## Where data lives

Everything the dashboard saves goes in `data/` (or the folder in the `DATA_DIR` environment variable):

| File | Contents |
|---|---|
| `content.json` | prices, tattoos, gallery photos, hours, contact |
| `bookings.json` | booking requests |
| `admin.json` | admin login (password hash) |
| `secret.key` | key that signs login sessions |
| `uploads/` | uploaded photos |

`data/` is not committed to Git. **Back it up**, and on a host make sure it is on a persistent disk.

## Deploying

The dashboard needs a host that runs Node.js 20.11+ with a persistent disk, for example a VPS, Render
(web service + disk), Railway (volume) or Fly.io (volume):

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment: `PORT` (set by most hosts), `DATA_DIR` = the mounted disk path, and optionally `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Serve it over **HTTPS** (all of the hosts above do this for you) — login cookies are marked `Secure` behind HTTPS.

Static-only hosting (Vercel, Netlify) still serves the website with its built-in content,
but the dashboard and saved bookings need the Node server above.

## Security notes

- Passwords are hashed with scrypt; sessions are signed, `HttpOnly`, `SameSite=Strict` cookies that expire after 12 hours.
- Changing the password signs out every other device.
- Login is rate-limited (8 attempts per 15 minutes per connection); public booking requests are rate-limited too.
- Uploads must be real JPEG/PNG/WebP files (checked by file signature), max 8 MB, saved with random names.
- The dashboard inserts all visitor-supplied text as plain text, never HTML.
