# FIFA World Cup 2026 Visualizations App

An interactive, responsive presentation layer for the [2026 FIFA World Cup](https://en.wikipedia.org/wiki/2026_FIFA_World_Cup).

## The schedule

The schedule has multiple different views:
- Classic list view
- Calendar view
- Map view — see where each game takes place

The timezone defaults to the visitor's geographical location. It can be changed to any timezone in the world — useful for viewing times from a team's home country perspective or for attendees travelling to a host city.

Filtering by team, group, or stage is available across all views.

## Group standings

Live standings table for each group, updated automatically as results come in:
- Columns: Team, Played, Won, Drawn, Lost, GF, GA, GD, Points
- Qualification status highlighted (advancing / eliminated)
- Clicking a team filters the schedule to that team's matches

## Knockout bracket

Interactive bracket for the knockout rounds (Round of 32 through to the Final):
- Populated with teams and scores as results become available
- TBD slots shown for unplayed matches
- Clicking a match links to the schedule detail

## General

- **Shareable URLs** — every combination of view, filters, and timezone is encoded in the URL so any state can be shared as a link
- **Dark / light mode** — follows system preference by default, with a manual toggle
