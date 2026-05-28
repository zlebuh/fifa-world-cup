export type Stage = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final'

export interface Match {
  id: string
  stage: Stage
  group?: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  utcKickoff: string
  venue: string
  city: string
  lat: number
  lng: number
}

export interface MatchFilters {
  team?: string
  group?: string
  stage?: Stage
}
