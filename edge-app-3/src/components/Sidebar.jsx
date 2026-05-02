import { NavLink } from 'react-router-dom'
import ProgressBar from './ProgressBar'

const CLASS03 = [
  { path: '/use-reducer',   label: 'useReducer',       icon: '🔄' },
  { path: '/context-api',   label: 'Context API',      icon: '🌐' },
  { path: '/auth-flow',     label: 'Auth Flow',        icon: '🔐' },
  { path: '/custom-hooks',  label: 'Custom Hooks',     icon: '🪝' },
  { path: '/vercel-deploy', label: 'Vercel Deploy',    icon: '🚀' },
]

const CLASS04 = [
  { path: '/react-query',   label: 'React Query',      icon: '⚡' },
  { path: '/vitest',        label: 'Vitest Testing',   icon: '🧪' },
  { path: '/shadcn',        label: 'shadcn/ui',        icon: '🏗️' },
  { path: '/i18n',          label: 'i18n',             icon: '🌍' },
]

function NavItem({ item, visited, onNavigate }) {
  const isVisited = visited.has(item.path)
  return (
    <NavLink
      to={item.path}
      onClick={() => onNavigate(item.path)}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
        }`
      }
    >
      <span>{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {isVisited && (
        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Visited" />
      )}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose, visited, totalTopics, onNavigate }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30
        flex flex-col transition-transform duration-200
        lg:static lg:translate-x-0 lg:flex lg:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-gray-900 text-sm">⚛ React JS</h1>
            <p className="text-xs text-gray-500">Class 03 &amp; 04</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <div className="mt-3">
          <ProgressBar visited={visited.size} total={totalTopics} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
            Class 03
          </p>
          <div className="space-y-0.5">
            {CLASS03.map((item) => (
              <NavItem key={item.path} item={item} visited={visited} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">
            Class 04
          </p>
          <div className="space-y-0.5">
            {CLASS04.map((item) => (
              <NavItem key={item.path} item={item} visited={visited} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
        Golam Mahmood · IICT, CUET
      </div>
    </aside>
  )
}
