import { useState, useRef, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import Toast from './components/Toast'

export default function App() {
  // AI Configuration
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('openrouter/free')

  // Content Strategy
  const [topic, setTopic] = useState('')
  const [audience, setAudience] = useState('')
  const [brand, setBrand] = useState('')
  const [sections, setSections] = useState('3')
  const [keypoints, setKeypoints] = useState('')
  const [tone, setTone] = useState('Professional')

  // Visual Assets
  const [logo, setLogo] = useState(null)
  const [images, setImages] = useState([])
  const [primaryColor, setPrimaryColor] = useState('#6366F1')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')

  // Footer Settings
  const [footerCompany, setFooterCompany] = useState('')
  const [footerAddress, setFooterAddress] = useState('')
  const [footerEmail, setFooterEmail] = useState('')
  const [footerWebsite, setFooterWebsite] = useState('')
  const [footerTagline, setFooterTagline] = useState('')
  const [footerFb, setFooterFb] = useState('')
  const [footerIg, setFooterIg] = useState('')
  const [footerTw, setFooterTw] = useState('')
  const [footerLi, setFooterLi] = useState('')

  // Utility Links
  const [unsubscribeLink, setUnsubscribeLink] = useState('')
  const [viewBrowserLink, setViewBrowserLink] = useState('')

  // Generation state
  const [generatedHTML, setGeneratedHTML] = useState('')
  const [status, setStatus] = useState('idle')
  const [activeTab, setActiveTab] = useState('preview')
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState('')

  const intervalRef = useRef(null)
  const toastTimerRef = useRef(null)

  const showToast = useCallback((message, type) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast({ message, type })
    toastTimerRef.current = setTimeout(() => setToast(null), 2500)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('newsletter_config')
    if (saved) {
      try {
        const config = JSON.parse(saved)
        if (config.apiKey) setApiKey(config.apiKey)
        if (config.model) setModel(config.model)
        if (config.topic) setTopic(config.topic)
        if (config.audience) setAudience(config.audience)
        if (config.brand) setBrand(config.brand)
        if (config.sections) setSections(config.sections)
        if (config.keypoints) setKeypoints(config.keypoints)
        if (config.tone) setTone(config.tone)
        if (config.primaryColor) setPrimaryColor(config.primaryColor)
        if (config.backgroundColor) setBackgroundColor(config.backgroundColor)
        if (config.footerCompany) setFooterCompany(config.footerCompany)
        if (config.footerAddress) setFooterAddress(config.footerAddress)
        if (config.footerEmail) setFooterEmail(config.footerEmail)
        if (config.footerWebsite) setFooterWebsite(config.footerWebsite)
        if (config.footerTagline) setFooterTagline(config.footerTagline)
        if (config.footerFb) setFooterFb(config.footerFb)
        if (config.footerIg) setFooterIg(config.footerIg)
        if (config.footerTw) setFooterTw(config.footerTw)
        if (config.footerLi) setFooterLi(config.footerLi)
        if (config.unsubscribeLink) setUnsubscribeLink(config.unsubscribeLink)
        if (config.viewBrowserLink) setViewBrowserLink(config.viewBrowserLink)
        if (config.logo) setLogo(config.logo)
        if (config.images) setImages(config.images)
      } catch (e) {}
    }
  }, [])

  function handleSaveConfig() {
    const config = {
      apiKey, model, topic, audience, brand, sections, keypoints, tone,
      primaryColor, backgroundColor, footerCompany, footerAddress, footerEmail,
      footerWebsite, footerTagline, footerFb, footerIg, footerTw, footerLi,
      unsubscribeLink, viewBrowserLink, logo, images
    }
    localStorage.setItem('newsletter_config', JSON.stringify(config))
    showToast('✓ Configuration saved!', 'success')
  }

  function buildFooterHTML() {
    const iconColor = primaryColor.replace('#', '')
    const commonStyle = `font-family:'Poppins',Arial,sans-serif;font-size:11px;color:${primaryColor};line-height:1.4;`
    return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;border-top:1px solid #E0E0E0">
  <tr><td style="padding:12px 20px;text-align:center;${commonStyle}">
    ${logo ? `<img src="${logo.dataUrl}" style="max-height:36px;max-width:130px;object-fit:contain;display:block;margin:0 auto 6px" />` : ''}
    ${footerCompany ? `<p style="font-size:13px;font-weight:bold;color:${primaryColor};margin:0 0 2px">${footerCompany}</p>` : ''}
    ${footerAddress ? `<p style="margin:0 0 2px;color:${primaryColor}">${footerAddress}</p>` : ''}
    ${footerEmail ? `<p style="margin:0 0 2px"><a href="mailto:${footerEmail}" target="_blank" style="color:${primaryColor};font-weight:bold">${footerEmail}</a></p>` : ''}
    ${footerWebsite ? `<p style="margin:0 0 6px"><a href="${footerWebsite}" target="_blank" style="color:${primaryColor};font-weight:bold">${footerWebsite}</a></p>` : ''}
    ${(footerFb || footerIg || footerTw || footerLi) ? `<p style="margin:8px 0;line-height:0">
      ${footerFb ? `<a href="${footerFb}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/facebook-new.png" width="18" height="18" alt="Facebook" style="display:block;border:none" /></a>` : ''}
      ${footerIg ? `<a href="${footerIg}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/instagram-new.png" width="18" height="18" alt="Instagram" style="display:block;border:none" /></a>` : ''}
      ${footerTw ? `<a href="${footerTw}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/twitter.png" width="18" height="18" alt="Twitter" style="display:block;border:none" /></a>` : ''}
      ${footerLi ? `<a href="${footerLi}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/linkedin.png" width="18" height="18" alt="LinkedIn" style="display:block;border:none" /></a>` : ''}
    </p>` : ''}
    ${footerTagline ? `<p style="font-size:10px;color:${primaryColor};margin:6px 0 2px;opacity:0.8">${footerTagline}</p>` : ''}
    <p style="font-size:10px;color:${primaryColor};margin:4px 0 0;opacity:0.8">
      <a href="${unsubscribeLink || '#'}" target="_blank" style="color:${primaryColor}">Unsubscribe</a> &nbsp;·&nbsp;
      <a href="${viewBrowserLink || '#'}" target="_blank" style="color:${primaryColor}">View in browser</a>
    </p>
  </td></tr>
</table>`
  }

  async function handleGenerate() {
    const newErrors = {}
    if (!apiKey.trim()) newErrors.apiKey = 'API key is required'
    if (!topic.trim()) newErrors.topic = 'Topic is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setStatus('loading')

    // Use placeholders instead of raw base64 to keep the prompt small

    const imgTags = images.map((_, i) =>
      `<img src="{{IMAGE_${i + 1}_SRC}}" alt="Image ${i + 1}" style="max-width:100%;height:auto;display:block;margin:16px auto;border-radius:6px;" />`
    ).join('\n')

    // Build footer with placeholder for logo
    const footerLogoPlaceholder = logo
      ? `<img src="{{LOGO_SRC}}" style="max-height:36px;max-width:130px;object-fit:contain;display:block;margin:0 auto 6px" />`
      : ''

    const iconColor = primaryColor.replace('#', '')
    const footerHTML = `<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F4;border-top:1px solid #E0E0E0">
  <tr><td style="padding:12px 20px;text-align:center;font-family:'Poppins',Arial,sans-serif;font-size:11px;color:${primaryColor};line-height:1.4;">
    ${footerLogoPlaceholder}
    ${footerCompany ? `<p style="font-size:13px;font-weight:bold;color:${primaryColor};margin:0 0 2px">${footerCompany}</p>` : ''}
    ${footerAddress ? `<p style="margin:0 0 2px;color:${primaryColor}">${footerAddress}</p>` : ''}
    ${footerEmail ? `<p style="margin:0 0 2px"><a href="mailto:${footerEmail}" target="_blank" style="color:${primaryColor};font-weight:bold">${footerEmail}</a></p>` : ''}
    ${footerWebsite ? `<p style="margin:0 0 6px"><a href="${footerWebsite}" target="_blank" style="color:${primaryColor};font-weight:bold">${footerWebsite}</a></p>` : ''}
    ${(footerFb || footerIg || footerTw || footerLi) ? `<p style="margin:8px 0;line-height:0">
      ${footerFb ? `<a href="${footerFb}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/facebook-new.png" width="18" height="18" alt="Facebook" style="display:block;border:none" /></a>` : ''}
      ${footerIg ? `<a href="${footerIg}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/instagram-new.png" width="18" height="18" alt="Instagram" style="display:block;border:none" /></a>` : ''}
      ${footerTw ? `<a href="${footerTw}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/twitter.png" width="18" height="18" alt="Twitter" style="display:block;border:none" /></a>` : ''}
      ${footerLi ? `<a href="${footerLi}" target="_blank" style="display:inline-block;margin:0 6px"><img src="https://img.icons8.com/ios-filled/50/${iconColor}/linkedin.png" width="18" height="18" alt="LinkedIn" style="display:block;border:none" /></a>` : ''}
    </p>` : ''}
    ${footerTagline ? `<p style="font-size:10px;color:${primaryColor};margin:6px 0 2px;opacity:0.8">${footerTagline}</p>` : ''}
    <p style="font-size:10px;color:${primaryColor};margin:4px 0 0;opacity:0.8">
      <a href="${unsubscribeLink || '#'}" target="_blank" style="color:${primaryColor}">Unsubscribe</a> &nbsp;·&nbsp;
      <a href="${viewBrowserLink || '#'}" target="_blank" style="color:${primaryColor}">View in browser</a>
    </p>
  </td></tr>
</table>`

    const imageTokenList = images.map((_, i) => `[IMAGE_${i + 1}]`).join(', ')
    const imageInstruction = images.length > 0 
      ? `IMAGE PLACEMENT RULES: You MUST place these tokens EXACTLY as written (e.g. [IMAGE_1]) where the image should appear in the newsletter: ${imageTokenList}. Do not use <img> tags yourself. Just write the token on its own line between paragraphs.`
      : ''

    const prompt = `Create a complete HTML email newsletter.

Details:
- Topic: ${topic}
- Audience: ${audience || 'General audience'}
- Brand name: ${brand || 'Newsletter'}
- Tone: ${tone}
- Primary Brand Color: ${primaryColor} (You MUST apply this color to ALL headings, highlights, and inline text links! Do not skip this.)
- Email Background Color: ${backgroundColor} (Use this for the main email wrapper/body background)
- Number of content sections: ${sections}
${keypoints ? `- Key points to cover:\n${keypoints}` : ''}

Follow this exact structure:

1. HERO — compelling H1 headline + 1 to 2 intro paragraphs.
DESIGN RULES: Add highly engaging thematic styling based on the topic! Use a beautiful background color/gradient, relevant emojis. H1 absolute max font-size is 24px. Keep margins minimal.

2. ${sections} CONTENT SECTIONS — each MUST have an H2 heading and at least 2 detailed, engaging paragraphs of valuable content to ensure the text visually balances the images. Do not skip writing content.
DESIGN RULES: Make the layout structured. Use a base font size of 14px, and line-height of 1.6. Use creative visual hierarchies: subtle background panels/cards.
MANDATORY: You MUST place the image tokens (e.g. [IMAGE_1]) exactly where you want the images to appear. I will handle the HTML tags for them later.
${imageInstruction}

3. FOOTER — use this exact HTML block unmodified:
${footerHTML}

STRICT RULES:
- You MUST construct the email using this exact rigid HTML skeleton:
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
<style>
  body { margin: 0; padding: 0; background-color: ${backgroundColor}; font-family: 'Poppins', Arial, sans-serif; font-size: 14px; line-height: 1.4; color: #333333; }
  table { border-spacing: 0; border-collapse: collapse; }
  img { max-width: 100%; height: auto; border: 0; }
  h1, h2, h3 { margin-top: 0; margin-bottom: 8px; color: ${primaryColor}; }
  a { color: ${primaryColor}; text-decoration: none; font-weight: bold; }
  p { margin-top: 0; margin-bottom: 12px; }
  .email-wrapper { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; }
  @media screen and (max-width: 600px) {
    .email-wrapper { width: 100% !important; }
  }
</style>
</head>
<body>
  <center style="width: 100%; table-layout: fixed; padding-top: 20px; padding-bottom: 20px;">
    <!-- Outer Wrapper Table -->
    <table class="email-wrapper" width="100%" max-width="600" align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <tr>
        <td>
          /* GENERATE THE HERO AND CONTENT SECTIONS HERE */

          /* PASTE THE UNMODIFIED FOOTERHTML HERE */
        </td>
      </tr>
    </table>
  </center>
</body>
</html>

- DO NOT generate dead or broken links (like href="#"). If you create a link in the body, it must be a real or realistic URL.
- IMPORTANT: ALL links (<a>) you generate MUST have target="_blank" and style="color: ${primaryColor}; text-decoration: none; font-weight: bold;".
- DO NOT include ANY Call To Action "button", "Read More", or "Shop Now" links/buttons in your layout. The user explicitly wants NO buttons.
- Absolutely DO NOT change the outer table (width 100%, max-width 600px) constraints to guarantee mobile layout.
- Essential styling strictly in-lined on elements inside the body (e.g., color: ${primaryColor}).
- Write realistic, engaging content — not lorem ipsum.
- Return ONLY the raw HTML string without code fences.`

    const loadingMessages = [
      'Generating your newsletter...',
      'Writing content sections...',
      'Adding finishing touches...'
    ]
    let msgIndex = 0
    setLoadingMessage(loadingMessages[0])
    intervalRef.current = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length
      setLoadingMessage(loadingMessages[msgIndex])
    }, 2000)

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://newsletter-generator.app',
          'X-Title': 'Newsletter Generator'
        },
        body: JSON.stringify({
          model,
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error.message)

      let rawContent = data.choices[0].message.content
        .replace(/```html/gi, '')
        .replace(/```/g, '')
        .trim()

      const htmlMatch = rawContent.match(/(<!DOCTYPE html>.*<\/html>|<html[\s\S]*?<\/html>)/si)
      let html = htmlMatch ? htmlMatch[0] : rawContent

      // Replace placeholders with actual base64 data URLs
      if (logo) {
        const logoTag = `<img src="${logo.dataUrl}" style="max-height:36px;max-width:130px;object-fit:contain;display:block;margin:0 auto 6px" />`
        html = html.replace(/{{\s*LOGO_SRC\s*}}/gi, logo.dataUrl)
        html = html.replace(/{{\s*LOGO_TAG\s*}}/gi, logoTag) // Fallback if it used the whole tag
      }
      images.forEach((img, i) => {
        const fullImgTag = `<img src="${img.dataUrl}" alt="Content Image" style="max-width:100%;height:auto;display:block;margin:16px auto;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" />`
        const tokenRegex = new RegExp(`\\[\\s*IMAGE_${i + 1}\\s*\\]`, 'gi')
        html = html.replace(tokenRegex, fullImgTag)
        
        // Also keep the old replacement just in case
        const placeholderRegex = new RegExp(`{{\\s*IMAGE_${i + 1}_SRC\\s*}}`, 'gi')
        html = html.replace(placeholderRegex, img.dataUrl)
      })

      setGeneratedHTML(html)
      setStatus('done')
      setActiveTab('preview')
    } catch (err) {
      setStatus('error')
      const msg = err.message || 'Something went wrong. Check your API key.'
      showToast(`✗ ${msg}`, 'error')
    } finally {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel
          apiKey={apiKey} setApiKey={setApiKey}
          model={model} setModel={setModel}
          topic={topic} setTopic={setTopic}
          audience={audience} setAudience={setAudience}
          brand={brand} setBrand={setBrand}
          sections={sections} setSections={setSections}
          keypoints={keypoints} setKeypoints={setKeypoints}
          tone={tone} setTone={setTone}
          logo={logo} setLogo={setLogo}
          images={images} setImages={setImages}
          primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
          backgroundColor={backgroundColor} setBackgroundColor={setBackgroundColor}
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
          errors={errors}
          status={status}
          handleGenerate={handleGenerate}
          handleSaveConfig={handleSaveConfig}
        />
        <RightPanel
          activeTab={activeTab} setActiveTab={setActiveTab}
          generatedHTML={generatedHTML}
          status={status}
          brand={brand}
          topic={topic}
          showToast={showToast}
          loadingMessage={loadingMessage}
          handleGenerate={handleGenerate}
        />
      </div>
      <Toast toast={toast} />
    </div>
  )
}
