// Vercel serverless function: every /api/* request is rewritten here (see vercel.json).
import { handleApi } from '../server/app.js'

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://localhost')
  // vercel.json passes the original path as ?path=...; if Vercel already kept the original URL, use it
  const pathname = url.pathname.startsWith('/api/') && url.pathname !== '/api/index'
    ? url.pathname
    : '/api/' + (url.searchParams.get('path') || '').replace(/^\/+/, '')
  return handleApi(req, res, pathname)
}
