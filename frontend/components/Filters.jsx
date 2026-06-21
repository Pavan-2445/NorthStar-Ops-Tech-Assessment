import { SlidersHorizontal, X } from 'lucide-react'

const Filters = ({ filters, onFilterChange, options }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const selectClass =
    'rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
  const uniqueOptions = (items = []) => [...new Set(items.filter(Boolean))].sort()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Filter requests</h3>
            <p className="text-xs text-slate-500">Refine by market, queue, priority, status, or owner.</p>
          </div>
        </div>
        <button
          onClick={() => onFilterChange({ country: '', category: '', priority: '', status: '', assigned_owner: '', archived: '', overdue: '' })}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
          Reset
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-7">
      <select
        value={filters.archived || ''}
        onChange={(e) => handleChange('archived', e.target.value)}
        className={selectClass}
      >
        <option value="">Active Queue</option>
        <option value="true">Archived Queue</option>
      </select>
      <select
        value={filters.country || ''}
        onChange={(e) => handleChange('country', e.target.value)}
        className={selectClass}
      >
        <option value="">All Countries</option>
        {uniqueOptions(options.countries).map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <select
        value={filters.category || ''}
        onChange={(e) => handleChange('category', e.target.value)}
        className={selectClass}
      >
        <option value="">All Categories</option>
        {uniqueOptions(options.categories).map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <select
        value={filters.priority || ''}
        onChange={(e) => handleChange('priority', e.target.value)}
        className={selectClass}
      >
        <option value="">All Priorities</option>
        {uniqueOptions(options.priorities).map((priority) => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </select>
      <select
        value={filters.status || ''}
        onChange={(e) => handleChange('status', e.target.value)}
        className={selectClass}
      >
        <option value="">All Statuses</option>
        {uniqueOptions(options.statuses).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <select
        value={filters.assigned_owner || ''}
        onChange={(e) => handleChange('assigned_owner', e.target.value)}
        className={selectClass}
      >
        <option value="">All Owners</option>
        {uniqueOptions(options.owners).map((owner) => (
          <option key={owner} value={owner}>{owner}</option>
        ))}
      </select>
      <select
        value={filters.overdue || ''}
        onChange={(e) => handleChange('overdue', e.target.value)}
        className={selectClass}
      >
        <option value="">All Due Dates</option>
        <option value="true">Overdue only</option>
      </select>
      </div>
    </section>
  )
}

export default Filters
