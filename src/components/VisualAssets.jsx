import { useRef, useState } from 'react'
import CollapsibleSection from './CollapsibleSection'
import FieldLabel from './FieldLabel'

const ImageIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
)

function LogoUpload({ logo, setLogo }) {
  return (
    <div>
      <FieldLabel>Logo Link (URL)</FieldLabel>
      <p className="text-[10px] text-gray-400 mb-2 -mt-1 leading-tight">Paste a public image link (e.g., Imgur, Facebook)</p>
      <div className="flex gap-2">
        <input 
          type="url"
          placeholder="https://..."
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-indigo-400"
          value={logo?.dataUrl || ''}
          onChange={(e) => {
            if (e.target.value) setLogo({ dataUrl: e.target.value, fileName: 'Logo Link' })
            else setLogo(null)
          }}
        />
      </div>
      {logo && (
        <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded-lg inline-block">
          <img src={logo.dataUrl} alt="Logo" className="max-h-12 object-contain" />
        </div>
      )}
    </div>
  )
}

function ContentImages({ images, setImages }) {
  function addLink(url) {
    if (!url.trim()) return
    setImages((prev) => {
      if (prev.length >= 3) return prev
      return [...prev, { dataUrl: url.trim(), fileName: 'External Image' }]
    })
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <FieldLabel>Content Image Links</FieldLabel>
      <p className="text-[10px] text-gray-400 mb-2 -mt-1 leading-tight">Paste public image URLs (Max 3)</p>
      
      {images.map((img, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center">
          <div className="w-10 h-10 rounded shrink-0 bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
             <img src={img.dataUrl} className="max-w-full max-h-full object-cover" />
          </div>
          <input
            type="text"
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[12px] outline-none read-only:text-gray-500"
            value={img.dataUrl}
            readOnly
          />
          <button
            type="button"
            onClick={() => removeImage(i)}
            className="text-red-500 font-bold px-3 py-1 hover:bg-red-50 rounded transition-colors"
          >
            ×
          </button>
        </div>
      ))}

      {images.length < 3 && (
        <input 
          type="url"
          placeholder="Paste link here and press Enter..."
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-[13px] outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 mt-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addLink(e.target.value)
              e.target.value = ''
            }
          }}
          onBlur={(e) => {
             if(e.target.value) {
                addLink(e.target.value)
                e.target.value = ''
             }
          }}
        />
      )}
    </div>
  )
}

export default function VisualAssets({
  logo, setLogo,
  images, setImages,
  primaryColor, setPrimaryColor, backgroundColor, setBackgroundColor
}) {
  return (
    <CollapsibleSection icon={<ImageIcon />} label="Visual Assets">
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <FieldLabel>Primary Brand Color</FieldLabel>
          <div className="flex items-center gap-2 p-1.5 border border-gray-300 rounded-lg bg-white overflow-hidden">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-8 h-8 rounded shrink-0 cursor-pointer border-0 p-0"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="text-[13px] text-gray-700 w-full outline-none"
            />
          </div>
        </div>
        <div>
          <FieldLabel>Email Background</FieldLabel>
          <div className="flex items-center gap-2 p-1.5 border border-gray-300 rounded-lg bg-white overflow-hidden">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-8 h-8 rounded shrink-0 cursor-pointer border-0 p-0"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="text-[13px] text-gray-700 w-full outline-none"
            />
          </div>
        </div>
      </div>
      <LogoUpload logo={logo} setLogo={setLogo} />
      <ContentImages images={images} setImages={setImages} />
    </CollapsibleSection>
  )
}
