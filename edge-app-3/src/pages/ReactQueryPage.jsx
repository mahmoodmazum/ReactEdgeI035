import { useQuery } from '@tanstack/react-query'
import TopicPage from '../components/TopicPage'

// ── React Query Demo ──────────────────────────────────────
function PostsList() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['demo-posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts?_limit=5').then(r => r.json()),
    staleTime: 1000 * 30, // 30 seconds
  })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-800">Posts from JSONPlaceholder</h4>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-xs px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 disabled:opacity-50 transition-colors flex items-center gap-1.5"
        >
          {isFetching && <span className="w-3 h-3 border border-indigo-500 border-t-transparent rounded-full animate-spin inline-block" />}
          Refetch
        </button>
      </div>

      {/* Status badges */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { label: 'isLoading', active: isLoading, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'isFetching', active: isFetching, color: 'bg-blue-100 text-blue-700' },
          { label: 'isError', active: isError, color: 'bg-red-100 text-red-700' },
          { label: 'Success', active: !!data && !isLoading, color: 'bg-green-100 text-green-700' },
        ].map(s => (
          <span
            key={s.label}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.active ? s.color : 'bg-gray-100 text-gray-400'}`}
          >
            {s.label}: {s.active ? 'true' : 'false'}
          </span>
        ))}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {[1,2,3].map(i => <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />)}
        </div>
      )}
      {isError && <p className="text-red-500 text-sm">Failed to fetch posts.</p>}
      {data && (
        <ul className="space-y-2 text-sm">
          {data.map(post => (
            <li key={post.id} className="bg-gray-50 rounded-lg px-3 py-2">
              <span className="text-gray-400 text-xs mr-2">#{post.id}</span>
              {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
// ──────────────────────────────────────────────────────────

const CODE = `// 1. Wrap your app with QueryClientProvider (done in main.jsx)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>

// 2. Use useQuery to fetch data with automatic caching
import { useQuery } from '@tanstack/react-query';

function Posts() {
  const { data, isLoading, isError } = useQuery({ // ← KEY LINE
    queryKey: ['posts'],   // unique cache key
    queryFn: () => fetch('/api/posts').then(r => r.json()),
    staleTime: 30_000,     // cache is fresh for 30 seconds
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError)   return <p>Error!</p>;
  return data.map(p => <p key={p.id}>{p.title}</p>);
}`

export default function ReactQueryPage({ onVisit }) {
  return (
    <TopicPage title="React Query" icon="⚡" classTag="04" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>React Query is like a smart fridge.</strong> Your manual
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useFetch</code> hook
          fetches food every time you ask. React Query's fridge automatically restocks (refetches),
          remembers what's inside (cache), and tells you if it's still fresh — without you lifting a finger.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          React Query manages <strong>server state</strong> — data that lives on a remote server.
          It handles loading, error and success states automatically.
          Results are <strong>cached</strong> by a
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">queryKey</code> and
          reused until they go stale. Background refetching, retries on error, and
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useMutation</code> for
          writes are all built in. You write far less boilerplate than with manual
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useEffect</code> fetching.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={10}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <PostsList />
      </TopicPage.Section>

    </TopicPage>
  )
}
