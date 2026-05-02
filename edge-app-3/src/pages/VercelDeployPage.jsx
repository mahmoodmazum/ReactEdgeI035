import TopicPage from '../components/TopicPage'

const STEPS = [
  {
    n: 1,
    title: 'Build your app',
    cmd: 'npm run build',
    desc: 'Creates an optimized /dist folder with minified production files.',
    icon: '🔨',
  },
  {
    n: 2,
    title: 'Commit & push to GitHub',
    cmd: 'git add . && git commit -m "deploy" && git push origin main',
    desc: 'Vercel watches your repo. Every push to main triggers a new deploy.',
    icon: '📤',
  },
  {
    n: 3,
    title: 'Import project on Vercel',
    cmd: 'vercel.com/new',
    desc: 'Connect your GitHub account → select the repo → Vercel auto-detects Vite.',
    icon: '🔗',
  },
  {
    n: 4,
    title: 'Deploy!',
    cmd: '(automatic)',
    desc: 'Your app goes live at yourapp.vercel.app. Every future push auto-deploys.',
    icon: '🚀',
  },
]

const TIPS = [
  'Add .env keys in Vercel Dashboard → Project Settings → Environment Variables',
  'Never commit your .env file — add it to .gitignore',
  'Use vercel --prod in the CLI for manual deploys',
  'Enable Preview Deployments for every pull request',
]

export default function VercelDeployPage({ onVisit }) {
  return (
    <TopicPage title="Vercel Deploy" icon="🚀" classTag="03" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>Vercel is like a self-service print shop.</strong> You hand them your files (push to
          GitHub), and they instantly print and display your website to the whole world — free, with HTTPS,
          and they reprint automatically every time you update your files.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          Vercel is a hosting platform optimized for frontend frameworks. Connect your GitHub repo once and
          every <code className="bg-gray-100 px-1 rounded font-mono text-sm">git push</code> triggers an
          automatic build and deploy. Vite projects are detected automatically — no configuration needed.
          You get a free custom subdomain, HTTPS, and global CDN.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="GUIDE">
        <div className="space-y-4">
          {STEPS.map(s => (
            <div key={s.n} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {s.n}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>{s.icon}</span>
                  <h4 className="font-semibold text-gray-800">{s.title}</h4>
                </div>
                <code className="block bg-gray-900 text-green-400 text-xs px-3 py-2 rounded-lg mb-2 font-mono">
                  $ {s.cmd}
                </code>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </TopicPage.Section>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-2">
        <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <span>⚠️</span> Pro Tips
        </h4>
        <ul className="space-y-2">
          {TIPS.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-amber-900">
              <span className="text-amber-500 flex-shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

    </TopicPage>
  )
}
