import { ArrowLeft, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import { getRequest, updateRequest } from '../services/api'

const OWNER_OPTIONS = ['Ops Agent 1', 'Ops Agent 2', 'Ops Agent 3', 'Ops Agent 4']

const EditRequest = () => {
  const { requestId } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoadError('')
        const response = await getRequest(requestId)
        setForm({
          priority: response.data.priority,
          status: response.data.status,
          assigned_owner: response.data.assigned_owner,
          due_date: response.data.due_date,
          notes: response.data.notes || '',
        })
      } catch {
        setLoadError('We could not find or load this request.')
        toast.error('Unable to load request')
      } finally {
        setLoading(false)
      }
    }
    fetchRequest()
  }, [requestId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await updateRequest(requestId, form)
      toast.success('Request Updated Successfully')
      navigate(`/requests/${requestId}`)
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to update request')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading request details..." />

  if (loadError || !form) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1">
            <Header title="Request unavailable" subtitle="Request maintenance" />
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
          <Header title={`Edit ${requestId}`} subtitle="Request maintenance" />
          <div className="p-4 sm:p-6">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <p className="text-sm font-medium text-slate-500">Update request</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">Edit details</h2>
                  <p className="mt-1 text-sm text-slate-500">Keep ownership, priority, status, and due dates current.</p>
                </div>
                <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
                    <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option>New</option>
                      <option>In Progress</option>
                      <option>Waiting on Customer</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Assigned owner</label>
                    <select name="assigned_owner" value={form.assigned_owner} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option value="">Select owner</option>
                      {OWNER_OPTIONS.map((owner) => (
                        <option key={owner} value={owner}>
                          {owner}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Due date</label>
                    <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes</label>
                  <textarea name="notes" rows="5" value={form.notes} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300">
                    <Save className="h-4 w-4" />
                    {submitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditRequest
