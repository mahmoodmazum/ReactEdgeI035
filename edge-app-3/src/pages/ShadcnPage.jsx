import TopicPage from '../components/TopicPage'

const STEPS = [
  {
    n: 1,
    title: 'Initialise shadcn/ui',
    cmd: 'npx shadcn@latest init',
    icon: '🏗️',
    desc: 'Sets up tailwind.config, globals.css, and src/lib/utils.ts. Answer the prompts for your style and color.',
  },
  {
    n: 2,
    title: 'Add components on demand',
    cmd: 'npx shadcn@latest add button\nnpx shadcn@latest add input\nnpx shadcn@latest add dialog\nnpx shadcn@latest add card',
    icon: '➕',
    desc: 'Each command copies the component source into src/components/ui/ — you own the code.',
  },
  {
    n: 3,
    title: 'Use in your component',
    cmd: `import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

function LoginForm() {
  return (
    <form>
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button variant="default">Sign In</Button>
      <Button variant="outline">Cancel</Button>
    </form>
  );
}`,
    icon: '✏️',
    desc: 'Import from your local /ui folder. Customize the source however you like.',
  },
]

const WHY = [
  { icon: '⚡', title: 'Build Fast',       desc: 'Pre-built, accessible components ready to go' },
  { icon: '🎨', title: 'Consistent UI',    desc: 'Same design language across your entire app' },
  { icon: '♿', title: 'Accessible',       desc: 'ARIA roles and keyboard nav built in via Radix UI' },
  { icon: '✏️', title: 'Fully Customizable', desc: 'Copy the code into your project and own it' },
]

export default function ShadcnPage({ onVisit }) {
  return (
    <TopicPage title="shadcn/ui" icon="🏗️" classTag="04" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>shadcn/ui is like IKEA furniture.</strong> You pick the pieces you need, assemble them
          yourself, and can repaint or modify anything. Unlike a UI library (pre-assembled, hard to change),
          the code lives in your repo — it's yours.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          shadcn/ui is not a traditional component library you install as a package.
          Instead, the CLI <strong>copies component source code</strong> directly into your project.
          Components are built on <strong>Radix UI</strong> (headless, accessible primitives) and
          styled with <strong>Tailwind CSS</strong>. You get full control — no version conflicts,
          no opaque APIs, just clean code you can edit freely.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="GUIDE">
        <div className="space-y-4 mb-6">
          {STEPS.map(s => (
            <div key={s.n} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
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
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {WHY.map(w => (
            <div key={w.title} className="bg-violet-50 border border-violet-100 rounded-xl p-4">
              <p className="text-2xl mb-1">{w.icon}</p>
              <p className="font-semibold text-gray-800 text-sm">{w.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{w.desc}</p>
            </div>
          ))}
        </div>
      </TopicPage.Section>

    </TopicPage>
  )
}
