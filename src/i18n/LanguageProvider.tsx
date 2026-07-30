import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { I18nContext, type I18nValue } from './context'
import { strings, type Lang } from './strings'

const STORAGE_KEY = 'condo-safety-map:lang'

function readStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'th' || stored === 'en' ? stored : null
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — fall back to detection.
    return null
  }
}

/** Thai is the fallback: the list and its source material are Thai. */
function detectLang(): Lang {
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'th'
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang() ?? detectLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Persisting the choice is best-effort.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = strings[lang].htmlTitle
  }, [lang])

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: strings[lang] }), [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
