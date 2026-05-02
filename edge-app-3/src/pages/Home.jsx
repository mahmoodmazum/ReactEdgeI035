import { Link } from 'react-router-dom'

const TOPICS = [
  { path: '/use-reducer',   label: 'useReducer',    icon: '🔄', cls: '03' },
  { path: '/context-api',   label: 'Context API',   icon: '🌐', cls: '03' },
  { path: '/auth-flow',     label: 'Auth Flow',     icon: '🔐', cls: '03' },
  { path: '/custom-hooks',  label: 'Custom Hooks',  icon: '🪝', cls: '03' },
  { path: '/vercel-deploy', label: 'Vercel Deploy', icon: '🚀', cls: '03' },
  { path: '/react-query',   label: 'React Query',   icon: '⚡', cls: '04' },
  { path: '/vitest',        label: 'Vitest',        icon: '🧪', cls: '04' },
  { path: '/shadcn',        label: 'shadcn/ui',     icon: '🏗️', cls: '04' },
  { path: '/i18n',          label: 'i18n',          icon: '🌍', cls: '04' },
]

export default function Home() {
  return (
    <div className="pb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          ⚛ ReactJS Advanced — Class 03 &amp; 04
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Learn React Interactively
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Pick a topic from the sidebar or the cards below. Each lesson has an
          analogy, explanation, code example, and a live demo you can play with.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOPICS.map((t) => (
          <Link
            key={t.path}
            to={t.path}
            className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all"
          >
            <span className="text-3xl">{t.icon}</span>
            <div>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                t.cls === '03' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
              }`}>
                Class {t.cls}
              </span>
              <p className="font-semibold text-gray-800 mt-0.5 group-hover:text-indigo-700">
                {t.label}
              </p>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-indigo-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
