import React from "react";

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
export default AnalogyCardDemo;
