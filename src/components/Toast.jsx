import { useState, useEffect } from 'react'

export default function Toast({ toast }) {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    if (toast) {
      setCurrent(toast)
      setVisible(true)
    } else {
      setVisible(false)
      const timer = setTimeout(() => setCurrent(null), 300)
      return () => clearTimeout(timer)
    }
  }, [toast])

  if (!current) return null

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg border text-[13px] font-medium shadow-lg ${
        typeStyles[current.type] || typeStyles.info
      } ${visible ? 'toast-enter' : 'toast-exit'}`}
    >
      {current.message}
    </div>
  )
}
