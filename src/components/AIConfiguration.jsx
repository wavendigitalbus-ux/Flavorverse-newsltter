import CollapsibleSection from './CollapsibleSection'
import FieldLabel from './FieldLabel'

const MODELS = [
  { label: 'Auto (any free model)', value: 'openrouter/free' },
  { label: 'Llama 3.3 70B Instruct — free', value: 'meta-llama/llama-3.3-70b-instruct:free' },
  { label: 'Gemma 3 27B — free', value: 'google/gemma-3-27b-it:free' },
  { label: 'Gemma 4 31B — free', value: 'google/gemma-4-31b-it:free' },
  { label: 'Nemotron 3 Super 120B — free', value: 'nvidia/nemotron-3-super-120b-a12b:free' },
  { label: 'Qwen3 Next 80B — free', value: 'qwen/qwen3-next-80b-a3b-instruct:free' },
  { label: 'GPT-4o Mini', value: 'openai/gpt-4o-mini' },
  { label: 'GPT-4o', value: 'openai/gpt-4o' },
  { label: 'Claude 3 Haiku', value: 'anthropic/claude-3-haiku' },
  { label: 'Claude 3.5 Sonnet', value: 'anthropic/claude-3.5-sonnet' },
]

const AiIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
)

export default function AIConfiguration({ apiKey, setApiKey, model, setModel, errors }) {
  return (
    <CollapsibleSection icon={<AiIcon />} label="AI Configuration">
      <div>
        <FieldLabel>OpenRouter API Key</FieldLabel>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-or-v1-..."
          className={`w-full h-9 px-3 text-[13px] rounded-lg border bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 ${
            errors.apiKey ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.apiKey && (
          <p className="text-red-500 text-[11px] mt-1">{errors.apiKey}</p>
        )}
      </div>
      <div>
        <FieldLabel>AI Model</FieldLabel>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full h-9 px-3 text-[13px] rounded-lg border border-gray-300 bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 appearance-none cursor-pointer"
        >
          {MODELS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>
    </CollapsibleSection>
  )
}
