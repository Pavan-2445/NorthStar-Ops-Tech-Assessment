import {
    AlertTriangle,
    Clock3,
    FolderOpen,
    LayoutGrid,
} from 'lucide-react'

const cards = [
  {
    title: 'Total Requests',
    key: 'total_requests',
    icon: LayoutGrid,
    accent: 'from-sky-500 to-cyan-500',
    helper: 'All tracked operations requests',
  },
  {
    title: 'Open Requests',
    key: 'open_requests',
    icon: FolderOpen,
    accent: 'from-emerald-500 to-teal-500',
    helper: 'Currently active workload',
  },
  {
    title: 'Urgent Requests',
    key: 'urgent_requests',
    icon: AlertTriangle,
    accent: 'from-rose-500 to-red-500',
    helper: 'Needs immediate attention',
  },
  {
    title: 'Overdue Requests',
    key: 'overdue_requests',
    icon: Clock3,
    accent: 'from-amber-500 to-orange-500',
    helper: 'Past committed due date',
  },
]

const MetricsCards = ({ metrics }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.key}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{metrics?.[card.key] ?? 0}</h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg shadow-slate-200 transition group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">{card.helper}</p>
          </div>
        )
      })}
    </section>
  )
}

export default MetricsCards
