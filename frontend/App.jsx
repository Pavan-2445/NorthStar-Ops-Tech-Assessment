import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateRequest from './pages/CreateRequest'
import Dashboard from './pages/Dashboard'
import EditRequest from './pages/EditRequest'
import RequestDetails from './pages/RequestDetails'

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className:
            'rounded-full border border-slate-800 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 shadow-2xl',
        }}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests/new" element={<CreateRequest />} />
        <Route path="/requests/:requestId" element={<RequestDetails />} />
        <Route path="/requests/:requestId/edit" element={<EditRequest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
