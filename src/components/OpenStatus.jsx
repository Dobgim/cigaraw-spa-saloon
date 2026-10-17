import { useEffect, useState } from 'react'
import { openStatus } from '../site'

// Live "Open now / Closed" pill, refreshed every minute
export default function OpenStatus({ className = '', tone = 'dark' }) {
  const [status, setStatus] = useState(() => openStatus())

  useEffect(() => {
    const t = setInterval(() => setStatus(openStatus()), 60_000)
    return () => clearInterval(t)
  }, [])

  const dot = status.open ? 'bg-wa' : 'bg-ember'
  const skin = tone === 'dark' ? 'bg-paper/10 text-paper' : 'bg-ink/5 text-ink'

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${skin} ${className}`}>
      <span className="relative flex w-2 h-2">
        {status.open && <span className={`absolute inline-flex w-full h-full rounded-full ${dot} opacity-75 animate-ping`} />}
        <span className={`relative inline-flex w-2 h-2 rounded-full ${dot}`} />
      </span>
      {status.text}
    </span>
  )
}
