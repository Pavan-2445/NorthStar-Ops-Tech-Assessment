import { Inbox, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyState = ({ title, description, action }) => (
  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-soft">
      <Inbox className="h-8 w-8" />
    </div>
    <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    {action || (
      <Link
        to="/requests/new"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
      >
        <PlusCircle className="h-4 w-4" />
        Create request
      </Link>
    )}
  </div>
)

export default EmptyState
