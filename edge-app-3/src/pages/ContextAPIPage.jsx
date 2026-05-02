import { createContext, useContext, useState } from 'react'
import TopicPage from '../components/TopicPage'

// ── Demo Context ──────────────────────────────────────────
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

function ThemedCard() {
  const { theme, toggle } = useContext(ThemeContext)
  const dark = theme === 'dark'
  return (
    <div className={`rounded-xl border p-6 transition-colors ${dark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
      <p className={`text-sm mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Current theme</p>
      <p className="text-2xl font-bold mb-4">{dark ? '🌙 Dark' : '☀️ Light'}</p>
      <p className={`text-sm mb-4 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
        This card reads theme from Context — no props passed!
      </p>
      <button
        onClick={toggle}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          dark ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        Toggle Theme
      </button>
    </div>
  )
}

function ThemeDemo() {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  )
}
// ──────────────────────────────────────────────────────────

const CODE = `// 1. Create a context object
const ThemeContext = createContext();

// 2. Build a Provider that holds the shared state
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggle }}> {/* ← KEY LINE */}
      {children}  {/* every child can now access theme + toggle */}
    </ThemeContext.Provider>
  );
}

// 3. Any component reads context with useContext — no prop drilling!
function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <nav style={{ background: theme === 'dark' ? '#111' : '#fff' }}>
      <button onClick={toggle}>Toggle Theme</button>
    </nav>
  );
}`

export default function ContextAPIPage({ onVisit }) {
  return (
    <TopicPage title="Context API" icon="🌐" classTag="03" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Context is like a WiFi router.</strong> Instead of running an ethernet cable (props)
          from the router to every device in the house, you just broadcast the signal and any device
          can connect directly — no wires needed through every room.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          Context API solves <strong>prop drilling</strong> — the tedious passing of props through many
          component levels just to reach a deeply nested child.
          You <strong>create</strong> a context, <strong>provide</strong> a value via a
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">{'<Provider>'}</code> wrapper,
          and then <strong>consume</strong> it anywhere in the tree with
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useContext()</code> — no
          intermediate components need to know about it.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={8}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <ThemeDemo />
      </TopicPage.Section>

    </TopicPage>
  )
}
