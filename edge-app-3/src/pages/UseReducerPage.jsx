import { useReducer } from 'react'
import TopicPage from '../components/TopicPage'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 }
    case 'decrement': return { count: state.count - 1 }
    case 'reset':     return initialState
    default:          return state
  }
}

function CounterDemo() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <p className="text-6xl font-bold text-indigo-600 mb-6">{state.count}</p>
      <div className="flex justify-center gap-3">
        {[
          { type: 'decrement', label: '−', cls: 'bg-red-100 text-red-700 hover:bg-red-200' },
          { type: 'reset',     label: 'Reset', cls: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
          { type: 'increment', label: '+', cls: 'bg-green-100 text-green-700 hover:bg-green-200' },
        ].map(({ type, label, cls }) => (
          <button
            key={type}
            onClick={() => dispatch({ type })}
            className={`px-5 py-2 rounded-lg font-semibold transition-colors ${cls}`}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Each button calls <code className="bg-gray-100 px-1 rounded">dispatch({'{ type: "..." }'})</code>
      </p>
    </div>
  )
}

const CODE = `// 1. Define initial state and reducer function
const initialState = { count: 0 };

function reducer(state, action) {   // ← reducer receives state + action
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return initialState;
    default:          return state;
  }
}

function Counter() {
  // 2. useReducer returns current state + dispatch function
  const [state, dispatch] = useReducer(reducer, initialState); // ← KEY LINE

  return (
    <div>
      <p>Count: {state.count}</p>
      {/* 3. dispatch sends an action object to the reducer */}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}`

export default function UseReducerPage({ onVisit }) {
  return (
    <TopicPage title="useReducer" icon="🔄" classTag="03" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>useReducer is like a TV remote.</strong> You press buttons (dispatch actions), but the TV
          itself decides what happens (the reducer function). The remote never directly changes the channel —
          it just sends a signal and the TV's logic handles it.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">useReducer</code> is an alternative
          to <code className="bg-gray-100 px-1 rounded font-mono text-sm">useState</code> for complex state
          logic. Instead of calling a setter directly, you <strong>dispatch an action</strong> — a plain
          object describing what happened (e.g. <code className="bg-gray-100 px-1 rounded font-mono text-sm">{'{ type: "increment" }'}</code>).
          A <strong>reducer function</strong> receives the current state and the action, then returns the
          next state. This keeps your logic in one predictable place, making it easy to test and reason about.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={14}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <CounterDemo />
      </TopicPage.Section>

    </TopicPage>
  )
}
