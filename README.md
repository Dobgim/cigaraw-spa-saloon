# CiGa Raw Salon and Spa — website + admin dashboard

- **Website**: React + Vite (`src/`)
- **Backend**: plain Node.js, no framework (`server/`), also deployed as a Vercel function (`api/index.js`).
- **Admin dashboard**: plain HTML/CSS/JS (`public/admin/`), served at `/admin`.

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

The backend picks its storage automatically:

| Where it runs | Content, bookings, login | Uploaded photos |
|---|---|---|
| **Vercel** | Upstash Redis (free, private) | Vercel Blob (free) |
| Your own server / computer | JSON files in `data/` (or `DATA_DIR`) | `data/uploads/` |

`data/` is not committed to Git — back it up if you run your own server.

## Deploying on Vercel (current host)

The website, the dashboard (`/admin`) and the API (`api/index.js`, a Vercel function) all deploy from this repo.
The dashboard needs two free storage add-ons, connected once:

1. Open the project on vercel.com → **Storage**.
2. **Create / connect "Upstash for Redis"** (Marketplace) → connect it to this project.
3. **Create / connect a "Blob" store** → connect it to this project.
4. **Deployments → Redeploy** the latest deployment so it picks up the new settings.

Vercel adds the needed environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, `BLOB_READ_WRITE_TOKEN`) by itself.
Check it worked at `/api/health` — it should say `"storage":"connected"`.

Until storage is connected the website still works with its built-in content; the dashboard shows what to connect.

## Deploying on your own server instead

Any host that runs Node.js 20.11+ with a persistent disk (VPS, Render + disk, Railway + volume, Fly.io + volume):

- Build: `npm install && npm run build` · Start: `npm start`
- Environment: `PORT`, `DATA_DIR` (the disk path), optionally `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Serve over HTTPS (these hosts do it for you).

## Security notes

- Passwords are hashed with scrypt; sessions are signed, `HttpOnly`, `SameSite=Strict` cookies that expire after 12 hours.
- Changing the password signs out every other device.
- Login is rate-limited (8 attempts per 15 minutes per connection); public booking requests are rate-limited too (shared across Vercel instances via Redis).
- Uploads must be real JPEG/PNG/WebP files (checked by file signature), max 8 MB, saved with random names.
- The dashboard inserts all visitor-supplied text as plain text, never HTML.
