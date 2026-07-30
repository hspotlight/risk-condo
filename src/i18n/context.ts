import { createContext, useContext } from 'react'
import type { Lang, Strings } from './strings'

export interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Strings
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside <LanguageProvider>')
  return context
}
