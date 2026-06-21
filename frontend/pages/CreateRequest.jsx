import { ArrowLeft, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import RequestReviewDialog from '../components/RequestReviewDialog'
import Sidebar from '../components/Sidebar'
import { createRequest } from '../services/api'

const TIME_ZONE_OPTIONS = ['Eastern', 'Central', 'Mountain', 'Pacific', 'Atlantic']
const CATEGORY_OPTIONS = ['Sales Lead', 'Appointment Follow-up', 'Billing', 'Technical Issue', 'General Question']
const OWNER_OPTIONS = ['Ops Agent 1', 'Ops Agent 2', 'Ops Agent 3', 'Ops Agent 4']

const initialState = {
  customer_name: '',
  email: '',
  country: '',
  timeZone: '',
  category: '',
  priority: '',
  status: 'New',
  assigned_owner: '',
  due_date: '',
  notes: '',
}

const CreateRequest = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [reviewOpen, setReviewOpen] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.customer_name.trim()) nextErrors.customer_name = 'Customer name is required'
    if (!form.email.trim()) nextErrors.email = 'Email is required'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address'
    if (!form.country.trim()) nextErrors.country = 'Country is required'
    if (!form.timeZone.trim()) nextErrors.timeZone = 'Time zone is required'
    if (!form.category.trim()) nextErrors.category = 'Category is required'
    if (!form.priority.trim()) nextErrors.priority = 'Priority is required'
    if (!form.assigned_owner.trim()) nextErrors.assigned_owner = 'Assigned owner is required'
    if (!form.due_date) nextErrors.due_date = 'Due date is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setReviewOpen(true)
  }

  const handleProceed = async () => {
    setReviewOpen(false)

    try {
      await createRequest({
        ...form,
        due_date: form.due_date,
      })
      toast.success('Request Created Successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to create request')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1">
          <Header title="Create Request" subtitle="Intake workspace" />
          <div className="p-4 sm:p-6">
            <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <p className="text-sm font-medium text-slate-500">New request</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">Request details</h2>
                  <p className="mt-1 text-sm text-slate-500">Capture the customer, ownership, priority, and next action date.</p>
                </div>
                <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Customer name</label>
                    <input name="customer_name" value={form.customer_name} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                    {errors.customer_name && <p className="mt-1 text-sm text-rose-600">{errors.customer_name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                    {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
                    <input name="country" value={form.country} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                    {errors.country && <p className="mt-1 text-sm text-rose-600">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Time Zone</label>
                    <select name="timeZone" value={form.timeZone} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option value="">Select time zone</option>
                      {TIME_ZONE_OPTIONS.map((timeZone) => (
                        <option key={timeZone} value={timeZone}>
                          {timeZone}
                        </option>
                      ))}
                    </select>
                    {errors.timeZone && <p className="mt-1 text-sm text-rose-600">{errors.timeZone}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option value="">Select category</option>
                      {CATEGORY_OPTIONS.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-rose-600">{errors.category}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100">
                      <option value="">Select priority</option>
                      <option>Urgent</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                    {errors.priority && <p className="mt-1 text-sm text-rose-600">{errors.priority}</p>}
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
                    {errors.assigned_owner && <p className="mt-1 text-sm text-rose-600">{errors.assigned_owner}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Due date</label>
                    <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                    {errors.due_date && <p className="mt-1 text-sm text-rose-600">{errors.due_date}</p>}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Notes</label>
                  <textarea name="notes" rows="5" value={form.notes} onChange={handleChange} className="w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100" />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
                    <PlusCircle className="h-4 w-4" />
                    Review & Create Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <RequestReviewDialog
        isOpen={reviewOpen}
        request={form}
        onCancel={() => setReviewOpen(false)}
        onProceed={handleProceed}
      />
    </div>
  )
}

export default CreateRequest
