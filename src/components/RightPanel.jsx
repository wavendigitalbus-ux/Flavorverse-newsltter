import { useRef, useCallback } from 'react'

function PreviewTopBar({ activeTab, setActiveTab, generatedHTML, brand, showToast }) {
  const hasHTML = generatedHTML.length > 0

  function handleCopy() {
    navigator.clipboard.writeText(generatedHTML)
    showToast('✓ HTML copied to clipboard!', 'success')
  }

  function handleDownload() {
    const blob = new Blob([generatedHTML], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${(brand || 'newsletter').toLowerCase().replace(/\s+/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(a.href)
    showToast('↓ Downloading your newsletter...', 'info')
  }

  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`text-[13px] pb-1 cursor-pointer transition-colors ${
            activeTab === 'preview'
              ? 'font-semibold text-indigo-500 border-b-2 border-indigo-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={`text-[13px] pb-1 cursor-pointer transition-colors ${
            activeTab === 'code'
              ? 'font-semibold text-indigo-500 border-b-2 border-indigo-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          HTML Code
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasHTML}
          className="px-3 py-1.5 text-[12px] font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Copy HTML
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!hasHTML}
          className="px-3 py-1.5 text-[12px] font-medium rounded-md bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Download .html
        </button>
      </div>
    </div>
  )
}

function EmailMetaBar({ brand, topic }) {
  const fromDomain = brand ? brand.toLowerCase().replace(/\s+/g, '') : 'yourbrand'
  return (
    <div className="bg-gray-100 px-5 py-2 text-[13px] text-gray-600 border-b border-gray-200">
      <div className="flex gap-1">
        <span className="font-medium text-gray-500">FROM:</span>
        <span>newsletter@{fromDomain}.app</span>
      </div>
      <div className="flex gap-1 mt-0.5">
        <span className="font-medium text-gray-500">SUBJECT:</span>
        {topic ? (
          <span>{topic}</span>
        ) : (
          <span className="italic text-gray-400">Your subject will appear here...</span>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  const styles = [
    {
      name: 'MINIMAL', selected: true,
      lines: [
        { w: 'w-12', h: 'h-1.5', mt: '' },
        { w: 'w-full', h: 'h-6', mt: 'mt-2' },
        { w: 'w-full', h: 'h-1', mt: 'mt-2' },
        { w: 'w-3/4', h: 'h-1', mt: 'mt-1' },
        { w: 'w-10', h: 'h-2', mt: 'mt-2' },
      ]
    },
    {
      name: 'BOLD', selected: false,
      lines: [
        { w: 'w-16', h: 'h-3', mt: '' },
        { w: 'w-full', h: 'h-8', mt: 'mt-2' },
        { w: 'w-full', h: 'h-1', mt: 'mt-2' },
        { w: 'w-5/6', h: 'h-1', mt: 'mt-1' },
        { w: 'w-12', h: 'h-3', mt: 'mt-2' },
      ]
    },
    {
      name: 'EDITORIAL', selected: false,
      lines: [
        { w: 'w-14', h: 'h-1', mt: '' },
        { w: 'w-full', h: 'h-0.5', mt: 'mt-1.5' },
        { w: 'w-full', h: 'h-5', mt: 'mt-1.5' },
        { w: 'w-full', h: 'h-1', mt: 'mt-2' },
        { w: 'w-2/3', h: 'h-1', mt: 'mt-1' },
      ]
    },
  ]

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <svg className="w-12 h-12 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Your newsletter will appear here</h2>
      <p className="text-[13px] text-gray-400 mb-6">Fill in the details on the left to get started.</p>

      <div className="flex gap-3">
        {styles.map((s) => (
          <div
            key={s.name}
            className={`w-24 rounded-lg border-2 p-2.5 ${
              s.selected ? 'border-indigo-500' : 'border-gray-200'
            }`}
          >
            <div className="mb-2">
              {s.lines.map((l, i) => (
                <div key={i} className={`${l.w} ${l.h} ${l.mt} bg-gray-200 rounded-sm`} />
              ))}
            </div>
            <p className={`text-[9px] font-bold tracking-wider text-center ${
              s.selected ? 'text-indigo-600' : 'text-gray-400'
            }`}>
              {s.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoadingState({ loadingMessage }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-4">
        {/* Header skeleton */}
        <div className="h-16 w-48 mx-auto rounded bg-gray-200 animate-pulse" />
        {/* Hero skeleton */}
        <div className="h-32 w-full rounded bg-gray-200 animate-pulse" />
        {/* Content skeletons */}
        {[1, 2, 3].map((n) => (
          <div key={n} className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse" />
          </div>
        ))}
        {/* Footer skeleton */}
        <div className="h-20 w-full rounded bg-gray-200 animate-pulse" />
      </div>
      <p className="text-[13px] text-gray-500 mt-6 animate-pulse">{loadingMessage}</p>
    </div>
  )
}

function PreviewFrame({ html }) {
  const iframeRef = useRef(null)

  const handleLoad = useCallback(() => {
    const iframe = iframeRef.current
    if (iframe?.contentDocument?.body) {
      iframe.style.height = (iframe.contentDocument.body.scrollHeight + 24) + 'px'
    }
  }, [])

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <iframe
        ref={iframeRef}
        srcDoc={html}
        onLoad={handleLoad}
        title="Newsletter Preview"
        style={{
          width: '100%',
          border: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          borderRadius: '8px',
          minHeight: '500px',
          background: 'white',
        }}
      />
    </div>
  )
}

function CodeView({ html, showToast }) {
  function handleCopy() {
    navigator.clipboard.writeText(html)
    showToast('✓ HTML copied to clipboard!', 'success')
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 relative">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-7 right-7 px-2.5 py-1 text-[11px] font-medium rounded bg-gray-800 text-white hover:bg-gray-700 cursor-pointer transition-colors z-10"
      >
        Copy
      </button>
      <pre className="overflow-y-auto max-h-screen font-mono text-xs bg-gray-900 text-green-300 rounded-lg p-4 leading-relaxed">
        <code>{html}</code>
      </pre>
    </div>
  )
}

function ErrorState({ handleGenerate }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Generation failed</h2>
      <p className="text-[13px] text-gray-400 mb-4">Please check your API key and try again.</p>
      <button
        type="button"
        onClick={handleGenerate}
        className="px-5 py-2 text-[13px] font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer transition-colors"
      >
        Retry
      </button>
    </div>
  )
}

export default function RightPanel({
  activeTab, setActiveTab, generatedHTML, status,
  brand, topic, showToast, loadingMessage, handleGenerate,
}) {
  return (
    <main className="flex-1 flex flex-col bg-gray-100 overflow-hidden">
      <PreviewTopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        generatedHTML={generatedHTML}
        brand={brand}
        showToast={showToast}
      />
      <EmailMetaBar brand={brand} topic={topic} />

      {status === 'idle' && <EmptyState />}
      {status === 'loading' && <LoadingState loadingMessage={loadingMessage} />}
      {status === 'error' && <ErrorState handleGenerate={handleGenerate} />}
      {status === 'done' && activeTab === 'preview' && (
        <PreviewFrame html={generatedHTML} />
      )}
      {status === 'done' && activeTab === 'code' && (
        <CodeView html={generatedHTML} showToast={showToast} />
      )}
    </main>
  )
}
