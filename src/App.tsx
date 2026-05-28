import { createHashRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ListView from './views/list/ListView'
import CalendarView from './views/calendar/CalendarView'
import MapView from './views/map/MapView'

function Layout() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1 rounded text-sm font-medium transition-colors ${
      isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:text-white'
    }`

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-6">
        <span className="font-bold text-lg tracking-tight">FIFA World Cup 2026</span>
        <nav className="flex gap-2">
          <NavLink to="/" end className={navClass}>List</NavLink>
          <NavLink to="/calendar" className={navClass}>Calendar</NavLink>
          <NavLink to="/map" className={navClass}>Map</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ListView /> },
      { path: 'calendar', element: <CalendarView /> },
      { path: 'map', element: <MapView /> },
    ],
  },
])

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
