import { districtEn, nearestEn } from '../data/places'
import type { Lang } from '../i18n/strings'
import type { Condo, SortKey } from '../types'

/**
 * Google Maps search URL built from the project name, so the user always lands
 * on Google's own record for the building rather than on our approximate pin.
 *
 * The English name is used in both languages: it is the more distinctive query
 * for these projects, and `mapQuery` overrides it where that is not true.
 */
export function googleMapsUrl(condo: Condo): string {
  const query = condo.mapQuery ?? `${condo.nameEn} Bangkok`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

/** The name shown as the row/popup heading. */
export function primaryName(condo: Condo, lang: Lang): string {
  return lang === 'th' ? condo.nameTh : condo.nameEn
}

/** The other-language name, shown underneath as a subtitle. */
export function secondaryName(condo: Condo, lang: Lang): string {
  return lang === 'th' ? condo.nameEn : condo.nameTh
}

export function districtLabel(condo: Condo, lang: Lang): string {
  return lang === 'th' ? condo.district : (districtEn[condo.district] ?? condo.district)
}

export function nearestLabel(condo: Condo, lang: Lang): string {
  return lang === 'th' ? condo.nearest : (nearestEn[condo.nearest] ?? condo.nearest)
}

/** District dropdown option label for a Thai district key. */
export function districtOptionLabel(district: string, lang: Lang): string {
  return lang === 'th' ? district : (districtEn[district] ?? district)
}

/**
 * Case-insensitive match across both languages at once, so a Thai query still
 * finds rows while the UI is in English and vice versa.
 */
export function matchesQuery(condo: Condo, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [
    condo.nameTh,
    condo.nameEn,
    condo.district,
    condo.nearest,
    districtEn[condo.district] ?? '',
    nearestEn[condo.nearest] ?? '',
    String(condo.id),
  ].some((field) => field.toLowerCase().includes(q))
}

/** The value a given column sorts on, in the active language. */
export function sortValue(condo: Condo, key: SortKey, lang: Lang): number | string {
  switch (key) {
    case 'id':
      return condo.id
    case 'name':
      return primaryName(condo, lang)
    case 'district':
      return districtLabel(condo, lang)
    case 'nearest':
      return nearestLabel(condo, lang)
  }
}
