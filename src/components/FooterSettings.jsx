import CollapsibleSection from './CollapsibleSection'
import FieldLabel from './FieldLabel'

const FooterIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
)

export default function FooterSettings({
  footerCompany, setFooterCompany,
  footerAddress, setFooterAddress,
  footerEmail, setFooterEmail,
  footerWebsite, setFooterWebsite,
  footerTagline, setFooterTagline,
  footerFb, setFooterFb,
  footerIg, setFooterIg,
  footerTw, setFooterTw,
  footerLi, setFooterLi,
  unsubscribeLink, setUnsubscribeLink,
  viewBrowserLink, setViewBrowserLink,
}) {
  const inputClass = "w-full h-9 px-3 text-[13px] rounded-lg border border-gray-300 bg-white outline-none transition-colors focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"

  return (
    <CollapsibleSection icon={<FooterIcon />} label="Footer Settings">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Company Name</FieldLabel>
          <input type="text" value={footerCompany} onChange={(e) => setFooterCompany(e.target.value)} placeholder="Acme Inc." className={inputClass} />
        </div>
        <div>
          <FieldLabel>Address</FieldLabel>
          <input type="text" value={footerAddress} onChange={(e) => setFooterAddress(e.target.value)} placeholder="123 Main St, City" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Email</FieldLabel>
          <input type="text" value={footerEmail} onChange={(e) => setFooterEmail(e.target.value)} placeholder="hello@company.com" className={inputClass} />
        </div>
        <div>
          <FieldLabel>Website</FieldLabel>
          <input type="text" value={footerWebsite} onChange={(e) => setFooterWebsite(e.target.value)} placeholder="https://company.com" className={inputClass} />
        </div>
      </div>

      <div>
        <FieldLabel>Tagline</FieldLabel>
        <input type="text" value={footerTagline} onChange={(e) => setFooterTagline(e.target.value)} placeholder="Your tagline here..." className={inputClass} />
      </div>

      <div>
        <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500 mb-2 mt-4">
          Utility Links
        </p>
        <div className="flex flex-col gap-3">
          <div>
            <FieldLabel>Unsubscribe Link</FieldLabel>
            <input type="text" value={unsubscribeLink} onChange={(e) => setUnsubscribeLink(e.target.value)} placeholder="https://company.com/unsubscribe" className={inputClass} />
          </div>
          <div>
            <FieldLabel>View in Browser Link</FieldLabel>
            <input type="text" value={viewBrowserLink} onChange={(e) => setViewBrowserLink(e.target.value)} placeholder="https://company.com/view/..." className={inputClass} />
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold tracking-wider uppercase text-gray-500 mb-2 mt-4">
          Social Media Links (optional)
        </p>
        <div className="flex flex-col gap-2.5">
          {[
            { label: 'Facebook', value: footerFb, setter: setFooterFb, placeholder: 'https://facebook.com/...' },
            { label: 'Instagram', value: footerIg, setter: setFooterIg, placeholder: 'https://instagram.com/...' },
            { label: 'Twitter/X', value: footerTw, setter: setFooterTw, placeholder: 'https://x.com/...' },
            { label: 'LinkedIn', value: footerLi, setter: setFooterLi, placeholder: 'https://linkedin.com/in/...' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500 w-16 shrink-0">{s.label}</span>
              <input
                type="text"
                value={s.value}
                onChange={(e) => s.setter(e.target.value)}
                placeholder={s.placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  )
}
