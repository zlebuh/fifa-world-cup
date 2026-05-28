export function detectTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function formatKickoff(utcKickoff: string, timezone: string): string {
  const date = new Date(utcKickoff)
  if (!utcKickoff || isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function listTimezones(): string[] {
  return Intl.supportedValuesOf('timeZone')
}
