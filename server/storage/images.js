// Decode an uploaded data URL and make sure it is really a JPEG, PNG or WebP image
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

const SIGNATURES = [
  { ext: 'jpg', type: 'image/jpeg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'png', type: 'image/png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: 'webp', type: 'image/webp', test: (b) => b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP' },
]

export function decodeImage(dataUrl) {
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''))
  if (!m) return { error: 'Please choose a JPG, PNG or WebP photo.' }
  const buf = Buffer.from(m[2], 'base64')
  if (buf.length > MAX_IMAGE_BYTES) return { error: 'That photo is too large (max 4 MB).' }
  const kind = SIGNATURES.find(s => s.test(buf))
  if (!kind) return { error: 'That file is not a valid image.' }
  return { buf, ext: kind.ext, type: kind.type }
}
