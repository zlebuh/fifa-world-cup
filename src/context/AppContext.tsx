import { createContext, useContext, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'
import type { Match, MatchFilters } from '../types'
import { detectTimezone } from '../services/timezone'

interface AppState {
  matches: Match[]
  setMatches: Dispatch<SetStateAction<Match[]>>
  filters: MatchFilters
  setFilters: Dispatch<SetStateAction<MatchFilters>>
  timezone: string
  setTimezone: Dispatch<SetStateAction<string>>
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([])
  const [filters, setFilters] = useState<MatchFilters>({})
  const [timezone, setTimezone] = useState(detectTimezone)

  return (
    <AppContext.Provider value={{ matches, setMatches, filters, setFilters, timezone, setTimezone }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
