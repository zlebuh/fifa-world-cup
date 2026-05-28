import type { Match } from '../types'

const DATA_URL = import.meta.env.BASE_URL + 'data/matches.json'

export async function fetchMatches(): Promise<Match[]> {
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error(`Failed to fetch matches: ${res.status}`)
  return res.json() as Promise<Match[]>
}
