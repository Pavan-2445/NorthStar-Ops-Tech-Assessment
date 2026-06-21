import { Bell, Search, Sparkles } from 'lucide-react'

const Header = ({ title, subtitle, onSearch, searchValue }) => {
  return (
    <header className="sticky top-0 z-20 flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Sparkles className="h-4 w-4 text-sky-500" />
          <span>{subtitle || 'Operations Hub'}</span>
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        {onSearch && (
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 shadow-inner sm:flex-none">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={searchValue || ''}
              onChange={(event) => onSearch(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-72"
              placeholder="Search ID, customer, owner..."
            />
          </div>
        )}
        <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-sm">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

export default Header
