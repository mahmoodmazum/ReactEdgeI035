import { useTranslation } from 'react-i18next'
import TopicPage from '../components/TopicPage'

// ── i18n Demo ─────────────────────────────────────────────
function I18nDemo() {
  const { t, i18n } = useTranslation()
  const isBn = i18n.language === 'bn'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Language toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-600">{t('language')}:</span>
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            !isBn ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
          }`}
        >
          🇬🇧 English
        </button>
        <button
          onClick={() => i18n.changeLanguage('bn')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            isBn ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'
          }`}
        >
          🇧🇩 বাংলা
        </button>
      </div>

      {/* Translated strings showcase */}
      <div className="space-y-3 text-sm">
        {[
          { key: 'welcome',       label: 'welcome' },
          { key: 'greeting',      label: 'greeting', opts: { name: 'Golam' } },
          { key: 'logout',        label: 'logout' },
          { key: 'protectedMsg',  label: 'protectedMsg' },
        ].map(({ key, label, opts }) => (
          <div key={key} className="flex gap-3 bg-gray-50 rounded-lg px-3 py-2 items-start">
            <code className="text-indigo-600 font-mono text-xs flex-shrink-0 mt-0.5">
              t('{label}')
            </code>
            <span className="text-gray-400">→</span>
            <span className="text-gray-800">{t(key, opts)}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-400">
        Switch languages above — all strings update instantly, no page reload.
      </p>
    </div>
  )
}
// ──────────────────────────────────────────────────────────

const CODE = `// 1. Install
// npm i react-i18next i18next

// 2. Translation files (one per language)
// en.json  →  { "greeting": "Hello, {{name}}!" }
// bn.json  →  { "greeting": "হ্যালো, {{name}}!" }

// 3. Init i18n once in i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n.use(initReactI18next).init({ lng: 'en', resources: { ... } });

// 4. Use in any component
import { useTranslation } from 'react-i18next';

function Navbar({ user }) {
  const { t, i18n } = useTranslation();    // ← KEY LINE
  return (
    <nav>
      <p>{t('greeting', { name: user })}</p>  {/* interpolation */}
      <button onClick={() => i18n.changeLanguage('bn')}>
        বাংলা
      </button>
    </nav>
  );
}`

export default function I18nPage({ onVisit }) {
  return (
    <TopicPage title="i18n (Internationalisation)" icon="🌍" classTag="04" onVisit={onVisit}>

      <TopicPage.Section type="ANALOGY">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>i18n is like a translation earpiece.</strong> The speaker says the same words —
          your code calls <code className="bg-gray-100 px-1 rounded font-mono text-sm">t('greeting')</code>
          — but the earpiece (i18next) instantly outputs the right language for each listener, without
          the speaker changing anything.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CONCEPT">
        <p className="text-gray-700 leading-relaxed">
          <strong>react-i18next</strong> wraps i18next for React. You store all user-facing strings in
          JSON files — one per language. The
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">useTranslation</code> hook
          gives you a <code className="bg-gray-100 px-1 rounded font-mono text-sm">t()</code> function that
          returns the string for the active language. Switching language with
          <code className="bg-gray-100 px-1 rounded font-mono text-sm mx-1">i18n.changeLanguage()</code>
          instantly re-renders all components — no page reload, no prop drilling.
        </p>
      </TopicPage.Section>

      <TopicPage.Section type="CODE">
        <TopicPage.CodeBlock highlightLine={16}>{CODE}</TopicPage.CodeBlock>
      </TopicPage.Section>

      <TopicPage.Section type="DEMO">
        <I18nDemo />
      </TopicPage.Section>

    </TopicPage>
  )
}
