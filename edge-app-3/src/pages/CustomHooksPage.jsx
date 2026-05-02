import { useState, useEffect } from 'react'
import TopicPage from '../components/TopicPage'

// ── useFetch custom hook ──────────────────────────────────
function useFetch(url) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('Network error'); return r.json() })
      .then(d  => { setData(d);    setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [url])

  return { data, loading, error }
}

function UseFetchDemo() {
  const [userId, setUserId] = useState(1)
  const { data, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  )

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-gray-600">User ID:</label>
        {[1,2,3,4,5].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
              userId === id ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          Loading from JSONPlaceholder…
        </div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && !loading && (
        <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
          <p><span className="font-medium text-gray-500">Name:</span> {data.name}</p>
          <p><span className="font-medium text-gray-500">Email:</span> {data.email}</p>
          <p><span className="font-medium text-gray-500">City:</span> {data.address?.city}</p>
          <p><span className="font-medium text-gray-500">Company:</span> {data.company?.name}</p>
        </div>
      )}
      <p className="mt-3 text-xs text-gray-400">
        Data from <code>jsonplaceholder.typicode.com/users/{userId}</code>
      </p>
    </div>
  )
}
// ──────────────────────────────────────────────────────────

const CODE = `// hooks/useFetch.js  — a reusable data-fetching hook
import { useState, useEffect } from 'react';

function useFetch(url) {                   // ← name MUST start with "use"
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch(url)
      .then(r  => r.json())
      .then(d  => { setData(d);    setLoading(false); })
      .catch(e => { setError(e);   setLoading(false); });
  }, [url]);                               // re-fetch when URL changes

  return { data, loading, error };         // ← KEY LINE: return the values
}

// Using useFetch in any component:
function UserCard() {
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/users/1'
  );
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error!</p>;
  return <p>{data.name}</p>;
}`

export default function CustomHooksPage({ onVisit }) {
  return (
    <TopicPage title="Custom Hooks" icon="🪝" classTag="03" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Custom Hooks are like power strips.</strong> Instead of plugging the same logic (fetch
          data, manage loading, catch errors) into every component separately, you build one reusable strip
          and plug into it wherever you need it — the logic stays in one place.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          A Custom Hook is just a JavaScript function whose name starts with
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">use</code>. It can call
          other hooks like <code className="bg-gray-100 px-1 rounded font-mono text-sm">useState</code> and
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useEffect</code> inside it.
          Each component that calls your hook gets its own independent state — hooks share logic, not state.
          Common examples: <code className="bg-gray-100 px-1 rounded font-mono text-sm">useFetch</code>,
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useLocalStorage</code>,
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">useDebounce</code>.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={15}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <UseFetchDemo />
      </TopicPage.Section>

    </TopicPage>
  )
}
