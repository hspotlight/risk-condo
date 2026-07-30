export interface Reference {
  titleTh: string
  titleEn: string
  publisherTh: string
  publisherEn: string
  /** Omitted for citations that have no stable public URL. */
  url?: string
  dateTh?: string
  dateEn?: string
}

/**
 * Sources for the list and for the legal requirement it is measured against.
 *
 * The list in this app was transcribed from a Consumer Council social post; the
 * council's own articles below cover the same submissions to the BMA and are
 * used as the citable references. If you have the permalink of the original
 * post, add it here as the first entry.
 */
export const references: Reference[] = [
  {
    titleTh: 'ต้องสูญอีกกี่ชีวิต? ยื่นสอบ 50 อาคารสูง หลังเหตุไฟไหม้คอนโด',
    titleEn: 'How many more lives? Council asks BMA to inspect 50 high-rises after a condo fire',
    publisherTh: 'สภาองค์กรของผู้บริโภค',
    publisherEn: 'Thailand Consumer Council',
    url: 'https://www.tcc.or.th/17102568_condo-on-fire_news/',
    dateTh: '17 ตุลาคม 2568',
    dateEn: '17 October 2025',
  },
  {
    titleTh: 'เรียกร้อง “ชัชชาติ” ตรวจความปลอดภัย อาคารสูง 50 เขต ใน 30 วัน',
    titleEn: 'Council asks Governor Chadchart to inspect high-rise safety across 50 districts in 30 days',
    publisherTh: 'สภาองค์กรของผู้บริโภค',
    publisherEn: 'Thailand Consumer Council',
    url: 'https://www.tcc.or.th/23042568_skyscraper_news/',
    dateTh: '23 เมษายน 2568',
    dateEn: '23 April 2025',
  },
  {
    titleTh: 'ลุย! คอนโดในซอยแคบที่ผิด กม. จี้ กทม. ยกเลิกใบอนุญาตก่อสร้างชั่วคราว',
    titleEn: 'Council presses BMA to suspend permits for condos built on non-compliant narrow sois',
    publisherTh: 'สภาองค์กรของผู้บริโภค',
    publisherEn: 'Thailand Consumer Council',
    url: 'https://www.tcc.or.th/news-condo-alleyway-030966/',
  },
  {
    titleTh: 'กฎกระทรวง ฉบับที่ 33 (พ.ศ. 2535) ออกตามความในพระราชบัญญัติควบคุมอาคาร พ.ศ. 2522',
    titleEn:
      'Ministerial Regulation No. 33 (B.E. 2535 / 1992) under the Building Control Act B.E. 2522 (1979)',
    publisherTh: 'ฉบับรวมการแก้ไข เผยแพร่โดยสมาคมสถาปนิกสยาม (ASA)',
    publisherEn: 'Consolidated text published by the Association of Siamese Architects (ASA)',
    url: 'https://download.asa.or.th/03media/04law/cba/mr/mr35-33-upd69.pdf',
  },
  {
    titleTh: 'สภาองค์กรของผู้บริโภค (เว็บไซต์หลัก)',
    titleEn: 'Thailand Consumer Council (main site)',
    publisherTh: 'tcc.or.th',
    publisherEn: 'tcc.or.th',
    url: 'https://www.tcc.or.th',
  },
]
