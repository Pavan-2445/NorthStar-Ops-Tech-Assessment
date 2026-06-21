import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const cleanParams = (params) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined),
  )

export const getRequests = (params = {}) => api.get('/requests/', { params: cleanParams(params) })
export const getActiveRequests = async (params = {}) => {
  const isArchived = params.archived === 'true' || params.archived === true

  if (params.overdue === 'true' || params.overdue === true) {
    return getRequests({ ...params, archived: isArchived, overdue: true })
  }

  const baseParams = { ...params }
  delete baseParams.overdue
  baseParams.archived = isArchived

  const [currentRes, overdueRes] = await Promise.allSettled([
    getRequests(baseParams),
    getRequests({ ...baseParams, overdue: true }),
  ])

  if (currentRes.status === 'rejected' && overdueRes.status === 'rejected') {
    throw currentRes.reason
  }

  const requestsById = new Map()
  const currentRequests = currentRes.status === 'fulfilled' ? currentRes.value.data || [] : []
  const overdueRequests = overdueRes.status === 'fulfilled' ? overdueRes.value.data || [] : []

  ;[...currentRequests, ...overdueRequests].forEach((request) => {
    requestsById.set(request.request_id, request)
  })

  return { data: Array.from(requestsById.values()) }
}
export const getRequestOptions = async () => {
  const [activeRes, archivedRes] = await Promise.allSettled([
    getActiveRequests({ archived: false }),
    getActiveRequests({ archived: true }),
  ])

  const activeRequests = activeRes.status === 'fulfilled' ? activeRes.value.data || [] : []
  const archivedRequests = archivedRes.status === 'fulfilled' ? archivedRes.value.data || [] : []

  return { data: [...activeRequests, ...archivedRequests] }
}
export const getRequest = (requestId) => api.get(`/requests/${requestId}`)
export const createRequest = (payload) => api.post('/requests/', payload)
export const updateRequest = (requestId, payload) => api.patch(`/requests/${requestId}`, payload)
export const archiveRequest = (requestId) => api.delete(`/requests/${requestId}`)
export const getMetrics = () => api.get('/metrics/')

export default api
