export default function ProgressBar({ visited, total, compact }) {
  const pct = total > 0 ? Math.round((visited / total) * 100) : 0

  if (compact) {
    return (
      <span className="text-xs text-gray-500">
        {visited}/{total} topics
      </span>
    )
  }

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{visited}/{total} topics visited</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
