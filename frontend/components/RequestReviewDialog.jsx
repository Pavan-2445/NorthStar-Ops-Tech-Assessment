const detailRowClass = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5'

const DetailItem = ({ label, value }) => (
  <div className={detailRowClass}>
    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-900">{value || '—'}</p>
  </div>
)

const RequestReviewDialog = ({ isOpen, request, onCancel, onProceed }) => {
  if (!isOpen || !request) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-sm font-medium text-slate-500">Review request details</p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">Confirm before creating</h3>
          <p className="mt-2 text-sm text-slate-500">Please quickly check the details below, then proceed to create the request.</p>
        </div>
        <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
          <DetailItem label="Customer name" value={request.customer_name} />
          <DetailItem label="Email" value={request.email} />
          <DetailItem label="Country" value={request.country} />
          <DetailItem label="Time Zone" value={request.timeZone} />
          <DetailItem label="Category" value={request.category} />
          <DetailItem label="Priority" value={request.priority} />
          <DetailItem label="Status" value={request.status} />
          <DetailItem label="Assigned owner" value={request.assigned_owner} />
          <DetailItem label="Due date" value={request.due_date} />
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Notes</p>
            <p className="mt-1 text-sm font-medium text-slate-900 whitespace-pre-wrap">{request.notes || '—'}</p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onProceed}
            className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Proceed & Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default RequestReviewDialog
