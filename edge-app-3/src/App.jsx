import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ProgressBar from './components/ProgressBar'
import Home from './pages/Home'
import UseReducerPage from './pages/UseReducerPage'
import ContextAPIPage from './pages/ContextAPIPage'
import AuthFlowPage from './pages/AuthFlowPage'
import CustomHooksPage from './pages/CustomHooksPage'
import VercelDeployPage from './pages/VercelDeployPage'
import ReactQueryPage from './pages/ReactQueryPage'
import VitestPage from './pages/VitestPage'
import ShadcnPage from './pages/ShadcnPage'
import I18nPage from './pages/I18nPage'

const TOPICS = [
  '/use-reducer',
  '/context-api',
  '/auth-flow',
  '/custom-hooks',
  '/vercel-deploy',
  '/react-query',
  '/vitest',
  '/shadcn',
  '/i18n',
]

export default function App() {
  const [visited, setVisited] = useState(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const markVisited = (path) =>
    setVisited((prev) => new Set([...prev, path]))

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-gray-50 font-sans">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          visited={visited}
          totalTopics={TOPICS.length}
          onNavigate={markVisited}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-semibold text-gray-800">React Class 03 &amp; 04</span>
            <div className="ml-auto">
              <ProgressBar visited={visited.size} total={TOPICS.length} compact />
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/use-reducer"   element={<UseReducerPage   onVisit={() => markVisited('/use-reducer')} />} />
              <Route path="/context-api"   element={<ContextAPIPage   onVisit={() => markVisited('/context-api')} />} />
              <Route path="/auth-flow"     element={<AuthFlowPage     onVisit={() => markVisited('/auth-flow')} />} />
              <Route path="/custom-hooks"  element={<CustomHooksPage  onVisit={() => markVisited('/custom-hooks')} />} />
              <Route path="/vercel-deploy" element={<VercelDeployPage onVisit={() => markVisited('/vercel-deploy')} />} />
              <Route path="/react-query"   element={<ReactQueryPage   onVisit={() => markVisited('/react-query')} />} />
              <Route path="/vitest"        element={<VitestPage       onVisit={() => markVisited('/vitest')} />} />
              <Route path="/shadcn"        element={<ShadcnPage       onVisit={() => markVisited('/shadcn')} />} />
              <Route path="/i18n"          element={<I18nPage         onVisit={() => markVisited('/i18n')} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
