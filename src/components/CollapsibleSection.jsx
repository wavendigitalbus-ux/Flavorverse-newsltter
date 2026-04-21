import { useState } from 'react'

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export default function CollapsibleSection({ icon, label, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-4 px-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
      >
        <span className="text-gray-500">{icon}</span>
        <span className="text-[11px] font-bold tracking-[0.07em] uppercase text-gray-700 flex-1 text-left">
          {label}
        </span>
        <ChevronIcon open={open} />
      </button>
      <div
        className="section-body"
        style={{
          maxHeight: open ? '2000px' : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div className="px-4 pb-4 flex flex-col gap-3">
          {children}
        </div>
      </div>
    </div>
  )
}
