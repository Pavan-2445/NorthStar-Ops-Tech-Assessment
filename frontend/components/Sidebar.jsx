import { Activity, FolderKanban, LayoutGrid, PlusCircle, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutGrid },
  { name: 'Create Request', href: '/requests/new', icon: PlusCircle },
  { name: 'Requests', href: '/', icon: FolderKanban },
]

const Sidebar = () => {
  return (
    <aside className="flex w-full flex-col border-b border-slate-200 bg-white/95 backdrop-blur lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-soft">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600">NorthStar Ops</p>
            <h2 className="mt-0.5 text-sm font-semibold text-slate-900">Request Tracker</h2>
          </div>
        </div>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-3 py-3 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:py-6">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.name !== 'Create Request'}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>
      <div className="hidden border-t border-slate-200 p-4 lg:block">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
