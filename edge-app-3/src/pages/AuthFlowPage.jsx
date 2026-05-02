import { createContext, useContext, useState } from 'react'
import TopicPage from '../components/TopicPage'

// ── Mini Auth Demo ────────────────────────────────────────
const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login  = (name) => setUser({ name })
  const logout = ()     => setUser(null)
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

function useAuth() { return useContext(AuthContext) }

function LoginForm() {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr]   = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) { setErr('Enter a username'); return }
    if (pass !== 'react123') { setErr('Wrong password — try "react123"'); return }
    setErr('')
    login(name)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 max-w-sm mx-auto">
      <h3 className="font-bold text-gray-800 text-lg mb-4">🔐 Mock Login</h3>
      <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
      <input
        value={name} onChange={e => setName(e.target.value)}
        placeholder="Any name"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
      <input
        type="password" value={pass} onChange={e => setPass(e.target.value)}
        placeholder='type "react123"'
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {err && <p className="text-red-500 text-sm mb-3">{err}</p>}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
        Log In
      </button>
    </form>
  )
}

function Dashboard() {
  const { user, logout } = useAuth()
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 max-w-sm mx-auto text-center">
      <p className="text-4xl mb-3">🎉</p>
      <h3 className="font-bold text-indigo-800 text-xl mb-1">Protected Dashboard</h3>
      <p className="text-indigo-600 mb-4">Welcome back, <strong>{user.name}</strong>!</p>
      <p className="text-sm text-gray-500 mb-5">This page is only visible because you're logged in.</p>
      <button onClick={logout} className="px-4 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium">
        Log Out
      </button>
    </div>
  )
}

function AuthDemo() {
  const { user } = useAuth()
  return user ? <Dashboard /> : <LoginForm />
}

function AuthDemoWrapper() {
  return <AuthProvider><AuthDemo /></AuthProvider>
}
// ──────────────────────────────────────────────────────────

const CODE = `// AuthContext.jsx
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // null = logged out
  const login  = (userData) => setUser(userData);
  const logout = ()         => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

// PrivateRoute.jsx
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />; // ← KEY LINE
}

// App.jsx
<Routes>
  <Route path="/login"     element={<LoginPage />} />
  <Route path="/dashboard" element={
    <PrivateRoute><Dashboard /></PrivateRoute>
  } />
</Routes>`

export default function AuthFlowPage({ onVisit }) {
  return (
    <TopicPage title="Auth Flow" icon="🔐" classTag="03" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Auth Flow is like a bouncer at a club.</strong> Every route is the club entrance. The
          bouncer (PrivateRoute) checks your ID (user in context). If you have it, you walk in. If not,
          you're redirected to the line (login page).
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          Authentication combines Context API with React Router. An
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">AuthContext</code> stores
          whether the user is logged in. A
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">{'<PrivateRoute>'}</code>
          wrapper checks that context and either renders the page or redirects to
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">/login</code>. This keeps
          all auth logic in one place and works for any number of protected routes.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={17}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <AuthDemoWrapper />
      </TopicPage.Section>

    </TopicPage>
  )
}
