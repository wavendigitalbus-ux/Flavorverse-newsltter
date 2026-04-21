import AIConfiguration from './AIConfiguration'
import ContentStrategy from './ContentStrategy'
import VisualAssets from './VisualAssets'
import FooterSettings from './FooterSettings'

export default function LeftPanel({
  apiKey, setApiKey, model, setModel,
  topic, setTopic, audience, setAudience,
  brand, setBrand,
  sections, setSections, keypoints, setKeypoints,
  tone, setTone,
  logo, setLogo, images, setImages,
  primaryColor, setPrimaryColor,
  backgroundColor, setBackgroundColor,
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
  errors, status, handleGenerate, handleSaveConfig,
}) {
  return (
    <aside className="w-[400px] shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <AIConfiguration
          apiKey={apiKey} setApiKey={setApiKey}
          model={model} setModel={setModel}
          errors={errors}
        />
        <ContentStrategy
          topic={topic} setTopic={setTopic}
          audience={audience} setAudience={setAudience}
          brand={brand} setBrand={setBrand}
          sections={sections} setSections={setSections}
          keypoints={keypoints} setKeypoints={setKeypoints}
          tone={tone} setTone={setTone}
          errors={errors}
        />
        <VisualAssets
          logo={logo} setLogo={setLogo}
          images={images} setImages={setImages}
          primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
          backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
        />
        <FooterSettings
          footerCompany={footerCompany} setFooterCompany={setFooterCompany}
          footerAddress={footerAddress} setFooterAddress={setFooterAddress}
          footerEmail={footerEmail} setFooterEmail={setFooterEmail}
          footerWebsite={footerWebsite} setFooterWebsite={setFooterWebsite}
          footerTagline={footerTagline} setFooterTagline={setFooterTagline}
          footerFb={footerFb} setFooterFb={setFooterFb}
          footerIg={footerIg} setFooterIg={setFooterIg}
          footerTw={footerTw} setFooterTw={setFooterTw}
          footerLi={footerLi} setFooterLi={setFooterLi}
          unsubscribeLink={unsubscribeLink} setUnsubscribeLink={setUnsubscribeLink}
          viewBrowserLink={viewBrowserLink} setViewBrowserLink={setViewBrowserLink}
        />
      </div>

      {/* Sticky Generate Button */}
      <div className="p-4 border-t border-gray-200 bg-white flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSaveConfig}
          className="w-full py-2.5 px-6 rounded-full border border-gray-300 bg-white text-gray-700 font-medium text-sm flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Configuration
        </button>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={status === 'loading'}
          className="w-full py-3 px-6 rounded-full bg-indigo-600 text-white font-semibold text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer hover:bg-indigo-700 transition-colors"
        >
          <span>✦</span> Generate Newsletter
        </button>
      </div>
    </aside>
  )
}
