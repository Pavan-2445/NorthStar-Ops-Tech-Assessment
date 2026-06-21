import { Archive, ArrowLeft, CalendarDays, Clock3, Edit3, Mail, MapPin } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import { PriorityBadge, StatusBadge } from '../components/StatusBadge'
import { archiveRequest, getRequest } from '../services/api'

const RequestDetails = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  const fetchRequest = useCallback(async () => {
    try {
      setLoading(true)
      setLoadError('')
      const response = await getRequest(requestId)
      setRequest(response.data)
    } catch {
      setLoadError('We could not find or load this request.')
      toast.error('Unable to load request details')
    } finally {
      setLoading(false)
    }
  }, [requestId])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchRequest()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchRequest])

  const handleArchive = async () => {
    try {
      await archiveRequest(requestId)
      toast.success('Request Archived Successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to archive request')
    }
  }

  const formatDate = (value) => {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? 'Not available' : parsed.toLocaleDateString()
  }

  const formatDateTime = (value) => {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? 'Not available' : parsed.toLocaleString()
  }

  if (loading) return <LoadingSpinner label="Loading request details..." />

  if (loadError || !request) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1">
            <Header title="Request unavailable" subtitle="Request record" />
            <div className="p-4 sm:p-6">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-700">
                {loadError || 'We could not find or load this request.'}
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1">
          <Header title={`Request ${request.request_id}`} subtitle="Request record" />
          <div className="space-y-6 p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <div className="flex gap-2">
                <button onClick={() => navigate(`/requests/${request.request_id}/edit`)} className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
                <button onClick={() => setConfirmOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.5fr,1fr]">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Customer</p>
                    <h2 className="mt-1 text-2xl font-semibold text-slate-900">{request.customer_name}</h2>
                  </div>
                  <div className="flex gap-2">
                    <StatusBadge status={request.status} />
                    <PriorityBadge priority={request.priority} />
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">{request.email}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">{request.country} · {request.timeZone}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">Due {formatDate(request.due_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <Clock3 className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-700">Owner {request.assigned_owner}</span>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{request.notes || 'No additional notes provided.'}</p>
                </div>
              </section>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Request timeline</h3>
                <div className="mt-4 space-y-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Created</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDateTime(request.created_at)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Updated</p>
                    <p className="mt-1 text-sm text-slate-700">{formatDateTime(request.updated_at)}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Category</p>
                    <p className="mt-1 text-sm text-slate-700">{request.category}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Archive request"
        message="Are you sure you want to archive this request?"
        confirmLabel="Archive"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          handleArchive()
        }}
      />
    </div>
  )
}

export default RequestDetails
