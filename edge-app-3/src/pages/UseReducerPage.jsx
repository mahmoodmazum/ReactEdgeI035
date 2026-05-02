import { useReducer, useState } from "react";
import TopicPage from "../components/TopicPage";

// ── Mock API data ──────────────────────────────────────────────
const mockUser = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "Frontend Developer",
};

const mockAnalogy = {
  title: "useReducer is like a TV remote",
  description:
    "You press buttons (dispatch actions), but the TV itself decides what happens (the reducer function). The remote never directly changes the channel — it just sends a signal and the TV's logic handles it.",
};

// ── AnalogyCard — useState version ────────────────────────────
function AnalogyCardDemo() {
  const [analogy, setAnalogy] = useState(mockAnalogy);
  const [form, setForm] = useState({ ...mockAnalogy });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleEdit() {
    setForm({ ...analogy });
    setIsEditing(true);
    setSaved(false);
  }

  function handleSave() {
    setLoading(true);
    // Simulate mock API PUT call (500ms delay)
    setTimeout(() => {
      setAnalogy({ ...form });
      setLoading(false);
      setIsEditing(false);
      setSaved(true);
    }, 500);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Analogy Card</h3>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-2">
          {[
            { label: "Title", value: analogy.title },
            { label: "Desc", value: analogy.description },
          ].map(({ label, value }) => (
            <div key={label} className="text-sm">
              <span className="text-gray-400 text-xs uppercase tracking-wide">
                {label}
              </span>
              <p className="text-gray-800 font-medium mt-0.5">{value}</p>
            </div>
          ))}
          {saved && (
            <p className="text-green-600 text-xs mt-2 font-medium">
              Saved via mock API!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {[
            { field: "title", label: "Title" },
            { field: "description", label: "Description" },
          ].map(({ field, label }) => (
            <div key={field}>
              <label className="block text-xs text-gray-500 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-1.5 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-60 transition-colors font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 border-t pt-3">
        useState: <code className="bg-gray-100 px-1 rounded">setIsEditing</code>{" "}
        → <code className="bg-gray-100 px-1 rounded">setForm</code> →{" "}
        <code className="bg-gray-100 px-1 rounded">setAnalogy</code>
      </p>
    </div>
  );
}

// ── UserCard reducer ───────────────────────────────────────────
const userInitial = {
  user: mockUser,
  form: { ...mockUser },
  isEditing: false,
  loading: false,
  saved: false,
};

function userReducer(state, action) {
  switch (action.type) {
    case "OPEN_EDIT":
      return {
        ...state,
        form: { ...state.user },
        isEditing: true,
        saved: false,
      };
    case "CLOSE_EDIT":
      return { ...state, isEditing: false };
    case "SET_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case "SAVE_START":
      return { ...state, loading: true };
    case "SAVE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        isEditing: false,
        saved: true,
      };
    default:
      return state;
  }
}

function UserCardDemo() {
  const [state, dispatch] = useReducer(userReducer, userInitial);

  function handleSave() {
    dispatch({ type: "SAVE_START" });
    // Simulate mock API PUT call (500ms delay)
    setTimeout(() => {
      dispatch({ type: "SAVE_SUCCESS", payload: { ...state.form } });
    }, 500);
  }

  const { user, form, isEditing, loading, saved } = state;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">User Profile</h3>
        {!isEditing && (
          <button
            onClick={() => dispatch({ type: "OPEN_EDIT" })}
            className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {/* Display card */}
      {!isEditing ? (
        <div className="space-y-2">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Role", value: user.role },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-2 text-sm">
              <span className="text-gray-400 w-14">{label}</span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
          ))}
          {saved && (
            <p className="text-green-600 text-xs mt-2 font-medium">
              Saved via mock API!
            </p>
          )}
        </div>
      ) : (
        /* Edit box */
        <div className="space-y-3">
          {[
            { field: "name", label: "Name" },
            { field: "email", label: "Email" },
            { field: "role", label: "Role" },
          ].map(({ field, label }) => (
            <div key={field}>
              <label className="block text-xs text-gray-500 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) =>
                  dispatch({ type: "SET_FIELD", field, value: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors font-medium"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => dispatch({ type: "CLOSE_EDIT" })}
              className="flex-1 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400 border-t pt-3">
        Actions: <code className="bg-gray-100 px-1 rounded">OPEN_EDIT</code> →{" "}
        <code className="bg-gray-100 px-1 rounded">SET_FIELD</code> →{" "}
        <code className="bg-gray-100 px-1 rounded">SAVE_SUCCESS</code>
      </p>
    </div>
  );
}

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function CounterDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <p className="text-6xl font-bold text-indigo-600 mb-6">{state.count}</p>
      <div className="flex justify-center gap-3">
        {[
          {
            type: "decrement",
            label: "−",
            cls: "bg-red-100 text-red-700 hover:bg-red-200",
          },
          {
            type: "reset",
            label: "Reset",
            cls: "bg-gray-100 text-gray-700 hover:bg-gray-200",
          },
          {
            type: "increment",
            label: "+",
            cls: "bg-green-100 text-green-700 hover:bg-green-200",
          },
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
        Each button calls{" "}
        <code className="bg-gray-100 px-1 rounded">
          dispatch({'{ type: "..." }'})
        </code>
      </p>
    </div>
  );
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
}`;

export default function UseReducerPage({ onVisit }) {
  return (
    <TopicPage title="useReducer" icon="🔄" classTag="03" onVisit={onVisit}>
      <TopicPage.Section type="ANALOGY">
        {/* <p className="text-gray-700 text-lg leading-relaxed mb-6">
          <strong>useReducer is like a TV remote.</strong> You press buttons
          (dispatch actions), but the TV itself decides what happens (the
          reducer function). The remote never directly changes the channel — it
          just sends a signal and the TV's logic handles it.
        </p> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnalogyCardDemo />
          <UserCardDemo />
        </div>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">
            useReducer
          </code>{" "}
          is an alternative to{" "}
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">
            useState
          </code>{" "}
          for complex state logic. Instead of calling a setter directly, you{" "}
          <strong>dispatch an action</strong> — a plain object describing what
          happened (e.g.{" "}
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">
            {'{ type: "increment" }'}
          </code>
          ). A <strong>reducer function</strong> receives the current state and
          the action, then returns the next state. This keeps your logic in one
          predictable place, making it easy to test and reason about.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={14}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <CounterDemo />
      </TopicPage.Section>
    </TopicPage>
  );
}
