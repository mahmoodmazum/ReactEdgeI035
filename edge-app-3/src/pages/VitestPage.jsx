import TopicPage from '../components/TopicPage'

const STEPS = [
  {
    n: 1,
    title: 'Install Vitest & Testing Library',
    cmd: 'npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom',
    icon: '📦',
    desc: 'Vitest is the test runner. jsdom simulates a browser. Testing Library renders components.',
  },
  {
    n: 2,
    title: 'Configure vite.config.js',
    cmd: `// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true,
          setupFiles: './src/test/setup.js' },
})`,
    icon: '⚙️',
    desc: 'Tell Vitest to use jsdom and auto-import expect/describe/it globally.',
  },
  {
    n: 3,
    title: 'Create setup file',
    cmd: `// src/test/setup.js
import '@testing-library/jest-dom';`,
    icon: '🛠️',
    desc: 'Adds custom matchers like .toBeInTheDocument() to every test.',
  },
  {
    n: 4,
    title: 'Write a unit test',
    cmd: `// utils.test.js
import { describe, it, expect } from 'vitest';
import { add } from './utils';

describe('add()', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});`,
    icon: '🧪',
    desc: 'describe() groups tests, it() is one test case, expect() asserts the result.',
  },
  {
    n: 5,
    title: 'Run tests',
    cmd: 'npx vitest         # watch mode\nnpx vitest run     # single run\nnpx vitest --coverage  # coverage report',
    icon: '▶️',
    desc: '',
  },
]

export default function VitestPage({ onVisit }) {
  return (
    <TopicPage title="Vitest Testing" icon="🧪" classTag="04" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Tests are like spell-check for your code.</strong> Word catches typos before you
          send an email. Vitest catches broken logic before you ship to users — automatically,
          every time you save a file.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          Vitest is a blazing-fast test runner built on Vite — same config, same transforms.
          You write tests with <code className="bg-gray-100 px-1 rounded font-mono text-sm">describe</code>/
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">it</code>/
          <code className="bg-gray-100 px-1 rounded font-mono text-sm">expect</code> (same API as Jest).
          React Testing Library lets you render components and interact with them as a user would —
          by text, roles, or labels — making tests resilient to implementation changes.
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">vi.fn()</code> creates
          mock functions to test callbacks without real side effects.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="GUIDE">
        <div className="space-y-4">
          {STEPS.map(s => (
            <div key={s.n} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {s.n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span>{s.icon}</span>
                  <h4 className="font-semibold text-gray-800">{s.title}</h4>
                </div>
                <pre className="bg-gray-900 text-green-400 text-xs px-3 py-2 rounded-lg mb-2 font-mono overflow-x-auto whitespace-pre-wrap">
                  {s.cmd}
                </pre>
                {s.desc && <p className="text-sm text-gray-600">{s.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </TopicPage.Section>

    </TopicPage>
  )
}
