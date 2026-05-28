import type { Match, MatchFilters } from '../types'

export function filterMatches(matches: Match[], filters: MatchFilters): Match[] {
  return matches.filter((match) => {
    if (filters.team) {
      const t = filters.team.toLowerCase()
      if (
        !match.homeTeam.toLowerCase().includes(t) &&
        !match.awayTeam.toLowerCase().includes(t)
      ) {
        return false
      }
    }
    if (filters.group && match.group?.toLowerCase() !== filters.group.toLowerCase()) return false
    if (filters.stage && match.stage !== filters.stage) return false
    return true
  })
}
