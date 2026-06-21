const statusStyles = {
  New: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'In Progress': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Waiting on Customer': 'bg-sky-50 text-sky-700 ring-sky-200',
  Resolved: 'bg-violet-50 text-violet-700 ring-violet-200',
  Closed: 'bg-slate-100 text-slate-700 ring-slate-200',
}

const priorityStyles = {
  Urgent: 'bg-rose-50 text-rose-700 ring-rose-200',
  High: 'bg-orange-50 text-orange-700 ring-orange-200',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
}

export const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status] || 'bg-slate-50 text-slate-700 ring-slate-200'}`}
  >
    {status || 'Unknown'}
  </span>
)

export const PriorityBadge = ({ priority }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${priorityStyles[priority] || 'bg-slate-50 text-slate-700 ring-slate-200'}`}
  >
    {priority || 'None'}
  </span>
)

export default StatusBadge
