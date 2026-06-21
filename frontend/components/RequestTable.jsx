import { Archive, Eye, PencilLine } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PriorityBadge, StatusBadge } from './StatusBadge'

const formatDate = (value) => {
  if (!value) return 'Not set'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Not set'
  return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

const RequestTable = ({ requests, isArchivedView = false }) => {
  const sortedRequests = useMemo(() => {
    return [...requests].sort((a, b) => String(a.request_id).localeCompare(String(b.request_id)))
  }, [requests])

  if (!requests.length) return null

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{isArchivedView ? 'Archived queue' : 'Request queue'}</h3>
          <p className="text-xs text-slate-500">
            {sortedRequests.length} visible {isArchivedView ? 'archived' : 'active'} requests
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Request</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Due Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sortedRequests.map((request) => (
              <tr key={request.request_id} className="transition hover:bg-slate-50/80">
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    {isArchivedView ? (
                      <span className="font-semibold text-slate-900">{request.request_id || 'Unassigned'}</span>
                    ) : (
                      <Link to={`/requests/${request.request_id}`} className="font-semibold text-slate-900 hover:text-sky-600">
                        {request.request_id || 'Unassigned'}
                      </Link>
                    )}
                    <p className="text-sm text-slate-500">{request.category || 'Uncategorized'}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{request.customer_name || 'Unknown customer'}</p>
                    <p className="text-sm text-slate-500">{request.country || 'No country'}</p>
                  </div>
                </td>
                <td className="px-6 py-4"><PriorityBadge priority={request.priority} /></td>
                <td className="px-6 py-4"><StatusBadge status={request.status} /></td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">{request.assigned_owner || 'Unassigned'}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{formatDate(request.due_date)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {isArchivedView ? (
                      <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        <Archive className="h-4 w-4" />
                        Archived
                      </span>
                    ) : (
                      <>
                        <Link to={`/requests/${request.request_id}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link to={`/requests/${request.request_id}/edit`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950">
                          <PencilLine className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RequestTable
