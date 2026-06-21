const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-sky-600" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  </div>
)

export default LoadingSpinner
