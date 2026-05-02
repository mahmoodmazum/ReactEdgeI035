import { useEffect } from 'react'

const BADGE = {
  ANALOGY: 'bg-amber-100 text-amber-800 border border-amber-200',
  CONCEPT:  'bg-blue-100 text-blue-800 border border-blue-200',
  CODE:     'bg-gray-800 text-green-400 border border-gray-700',
  DEMO:     'bg-emerald-100 text-emerald-800 border border-emerald-200',
  GUIDE:    'bg-purple-100 text-purple-800 border border-purple-200',
}

function Badge({ type }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider ${BADGE[type]}`}>
      {type}
    </span>
  )
}

function Section({ type, children }) {
  return (
    <div className="mb-6">
      <Badge type={type} />
      <div className="mt-3">{children}</div>
    </div>
  )
}

function CodeBlock({ children, highlightLine }) {
  const lines = children.trim().split('\n')
  return (
    <div className="code-block">
      {lines.map((line, i) => (
        <span
          key={i}
          className={`block ${highlightLine === i ? 'highlight-line' : ''}`}
        >
          {line || ' '}
        </span>
      ))}
    </div>
  )
}

export default function TopicPage({ title, icon, classTag, onVisit, children }) {
  useEffect(() => {
    onVisit?.()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-2 ${
          classTag === '03' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
        }`}>
          Class {classTag}
        </span>
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span> {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

TopicPage.Section = Section
TopicPage.CodeBlock = CodeBlock
