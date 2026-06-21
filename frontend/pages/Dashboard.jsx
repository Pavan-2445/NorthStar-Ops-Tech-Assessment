import { BarChart3, PlusCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import EmptyState from '../components/EmptyState'
import Filters from '../components/Filters'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import MetricsCards from '../components/MetricsCards'
import RequestTable from '../components/RequestTable'
import Sidebar from '../components/Sidebar'
import { getActiveRequests, getMetrics, getRequestOptions } from '../services/api'

const chartColors = {
  country: ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444', '#64748b'],
  category: ['#0ea5e9', '#14b8a6', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'],
  priority: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
  status: ['#10b981', '#f59e0b', '#38bdf8', '#8b5cf6', '#64748b'],
}

const initialFilters = {
  country: '',
  category: '',
  priority: '',
  status: '',
  assigned_owner: '',
  archived: '',
  overdue: '',
}

const normalize = (value) => String(value || '').toLowerCase()

const buildChartData = (data, key) =>
  Object.entries(data || {}).map(([name, value], index) => ({
    name,
    value,
    fill: chartColors[key][index % chartColors[key].length],
  }))

const ChartCard = ({ title, children, isEmpty }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-soft">
    <div className="mb-4 flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <BarChart3 className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
    </div>
    <div className="h-72">
      {isEmpty ? (
        <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
          No metric data available
        </div>
      ) : (
        children
      )}
    </div>
  </div>
)

const Dashboard = () => {
  const [requests, setRequests] = useState([])
  const [allRequests, setAllRequests] = useState([])
  const [metrics, setMetrics] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState(initialFilters)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const [requestsRes, metricsRes, allRequestsRes] = await Promise.all([
        getActiveRequests(filters),
        getMetrics(),
        getRequestOptions(),
      ])
      setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : [])
      setAllRequests(Array.isArray(allRequestsRes.data) ? allRequestsRes.data : [])
      setMetrics(metricsRes.data || {})
    } catch (fetchError) {
      const status = fetchError.response?.status
      const url = fetchError.config?.url
      const detail = status && url ? `Failed request: ${url} returned ${status}.` : fetchError.message
      setError(`Unable to connect to the operations API. ${detail || 'Confirm the backend is running on port 8000.'}`)
      console.error('Dashboard data load failed:', fetchError)
      toast.error('Unable to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchData()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [fetchData])

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const query = searchTerm.trim().toLowerCase()
      if (!query) return true
      return (
        normalize(request.request_id).includes(query) ||
        normalize(request.customer_name).includes(query) ||
        normalize(request.email).includes(query) ||
        normalize(request.assigned_owner).includes(query) ||
        normalize(request.category).includes(query)
      )
    })
  }, [requests, searchTerm])

  const countryData = buildChartData(metrics.requests_by_country, 'country')
  const categoryData = buildChartData(metrics.requests_by_category, 'category')
  const priorityData = buildChartData(metrics.requests_by_priority, 'priority')
  const statusData = buildChartData(metrics.requests_by_status, 'status')

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1">
          <Header
            title="Dashboard"
            subtitle="Executive overview"
            searchValue={searchTerm}
            onSearch={setSearchTerm}
          />
          <div className="space-y-6 p-4 sm:p-6">
            <MetricsCards metrics={metrics} />
            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Live request pipeline</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">Operations queue</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track ownership, urgency, status, and regional load from one workspace.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={fetchData}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <Link
                  to="/requests/new"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-soft"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Request
                </Link>
              </div>
            </div>
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              options={{
                countries: allRequests.map((request) => request.country),
                categories: allRequests.map((request) => request.category),
                priorities: allRequests.map((request) => request.priority),
                statuses: allRequests.map((request) => request.status),
                owners: allRequests.map((request) => request.assigned_owner),
              }}
            />
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}
            {loading ? (
              <LoadingSpinner label="Loading request data..." />
            ) : filteredRequests.length === 0 ? (
              <EmptyState
                title={requests.length === 0 ? 'No requests in this view' : 'No requests match your filters'}
                description={
                  requests.length === 0
                    ? 'Create the first customer operations request or adjust filters to inspect another queue.'
                    : 'Try adjusting search terms or reset the filters to expand the queue.'
                }
                action={
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilters(initialFilters)
                    }}
                    className="mt-4 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Reset filters
                  </button>
                }
              />
            ) : (
              <RequestTable requests={filteredRequests} isArchivedView={filters.archived === 'true'} />
            )}
            <div className="grid gap-6 xl:grid-cols-2">
              <ChartCard title="Requests by Country" isEmpty={!countryData.length}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={countryData} dataKey="value" nameKey="name" outerRadius={92} label>
                      {countryData.map((entry, index) => (
                        <Cell key={`country-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Requests by Category" isEmpty={!categoryData.length}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} margin={{ top: 8, right: 12, bottom: 8, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Requests by Priority" isEmpty={!priorityData.length}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData} margin={{ top: 8, right: 12, bottom: 8, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {priorityData.map((entry, index) => (
                        <Cell key={`priority-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Requests by Status" isEmpty={!statusData.length}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={92} paddingAngle={3}>
                      {statusData.map((entry, index) => (
                        <Cell key={`status-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
