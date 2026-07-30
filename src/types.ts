export interface Condo {
  /** Number as published in the Consumer Council list (1-50). */
  id: number
  nameTh: string
  nameEn: string
  /** Bangkok district (เขต), in Thai; English label lives in `data/places.ts`. */
  district: string
  /** Nearest BTS/MRT/ARL station or landmark, in Thai. */
  nearest: string
  lat: number
  lng: number
  /**
   * Overrides the Google Maps search string. Defaults to `${nameEn} Bangkok`.
   */
  mapQuery?: string
}

/** Sort keys are semantic: names sort by whichever language is displayed. */
export type SortKey = 'id' | 'name' | 'district' | 'nearest'
export type SortDir = 'asc' | 'desc'
