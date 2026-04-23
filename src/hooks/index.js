import { useEffect, useState } from 'react'

export function useOffline() {
  const [online, setOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [manualOffline, setManualOffline] = useState(false)
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  return { isOffline: !online || manualOffline, toggleManual: () => setManualOffline(v => !v), manualOffline }
}

export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  }, [key, value])
  return [value, setValue]
}

export const kes = (n) => 'KSh ' + Math.round(n).toLocaleString('en-KE')
export const nowTime = () => new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })
export const today = () => new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
