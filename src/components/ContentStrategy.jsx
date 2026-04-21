import CollapsibleSection from './CollapsibleSection'
import FieldLabel from './FieldLabel'

const TONE_OPTIONS = ['Professional', 'Friendly', 'Casual', 'Inspirational', 'Educational', 'Witty']

const ContentIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

export default function ContentStrategy({
  topic, setTopic,
  audience, setAudience,
  brand, setBrand,
  sections, setSections,
  keypoints, setKeypoints,
  tone, setTone,
  errors,
}) {
  return (
    <CollapsibleSection icon={<ContentIcon />} label="Content Strategy">
      <div>
        <FieldLabel>Topic / Subject</FieldLabel>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Weekly tech trends, product launch announcement..."
          rows={2}
          className={`w-full px-3 py-2 text-[13px] rounded-lg border bg-white outline-none resize-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 ${
            errors.topic ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.topic && (
          <p className="text-red-500 text-[11px] mt-1">{errors.topic}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Target Audience</FieldLabel>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g., Startup founders"
            className="w-full h-9 px-3 text-[13px] rounded-lg border border-gray-300 bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
          />
        </div>
        <div>
          <FieldLabel>Brand Name</FieldLabel>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="e.g., Acme Inc."
            className="w-full h-9 px-3 text-[13px] rounded-lg border border-gray-300 bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <FieldLabel>Sections</FieldLabel>
          <select
            value={sections}
            onChange={(e) => setSections(e.target.value)}
            className="w-full h-9 px-3 text-[13px] rounded-lg border border-gray-300 bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 appearance-none cursor-pointer"
          >
            {['2', '3', '4', '5'].map((n) => (
              <option key={n} value={n}>{n} sections</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel>Key Points (optional)</FieldLabel>
        <textarea
          value={keypoints}
          onChange={(e) => setKeypoints(e.target.value)}
          placeholder="Bullet points or key messages to include..."
          rows={3}
          className="w-full px-3 py-2 text-[13px] rounded-lg border border-gray-300 bg-white outline-none resize-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
        />
      </div>

      <div>
        <FieldLabel>Tone</FieldLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {TONE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setTone(opt)}
              className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors cursor-pointer ${
                tone === opt
                  ? 'bg-indigo-600 text-white border-transparent'
                  : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  )
}
