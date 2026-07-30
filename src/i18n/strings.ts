export type Lang = 'th' | 'en'

export interface Strings {
  htmlTitle: string
  appTitle: string
  appSubtitle: string
  langLabel: string
  switchTo: string

  // Data caveat
  caveatFull: (parts: { approx: string }) => string
  caveatShort: (parts: { approx: string }) => string
  caveatApprox: string

  // Why it matters
  whyHook: string
  whyExpand: string
  whyCollapse: string
  whyHeading: string
  whyParagraphs: string[]
  whyLawHeading: string
  whyLawBody: string
  whyStatusHeading: string
  whyStatusBody: string
  whyDisclaimer: string
  referencesHeading: string
  referencesNote: string

  // Filters
  searchPlaceholder: string
  searchAriaLabel: string
  clearSearch: string
  districtLabel: string
  allDistricts: string
  resultCount: (shown: number, total: number) => string

  // Table
  colNumber: string
  colName: string
  colDistrict: string
  colNearest: string
  colMap: string
  showOnMap: (name: string) => string
  openInGoogleMaps: (name: string) => string
  openInGoogleMapsShort: string
  noResults: string
  rowsPerPage: string
  displayedRows: (from: number, to: number, count: number) => string

  // Map
  pinCount: (count: number) => string
  popupLocation: (district: string, nearest: string) => string

  // Mobile tabs
  tabTable: string
  tabMap: string

  // Footer
  footerCraftedBy: string
  footerContribute: string

  // Locate
  locateMe: string
  locating: string
  locateDenied: string
}

export const strings: Record<Lang, Strings> = {
  th: {
    htmlTitle: 'แผนที่คอนโดสูงที่มีข้อสังเกตเรื่องพื้นที่รอบอาคาร',
    appTitle: '🚒 แผนที่คอนโดสูงที่มีข้อสังเกตเรื่องพื้นที่รอบอาคาร',
    appSubtitle:
      'รายชื่อ 50 โครงการที่สภาผู้บริโภคระบุว่าเข้าข่ายไม่มีถนนกว้างอย่างน้อย 6 เมตรรอบอาคาร ตามข้อกำหนดของอาคารสูงและอาคารขนาดใหญ่พิเศษ',
    langLabel: 'ภาษา',
    switchTo: 'English',

    caveatApprox: 'ค่าประมาณ',
    caveatFull: ({ approx }) =>
      `พิกัดหมุดเป็น${approx}ระดับถนน/ซอย ไม่ได้มาจากการรังวัด — กดปุ่ม “เปิดใน Google Maps” เพื่อยืนยันตำแหน่งจริง · รายชื่ออ้างอิงจากข้อมูลที่สภาผู้บริโภคเผยแพร่`,
    caveatShort: ({ approx }) => `พิกัดหมุดเป็น${approx} · ยืนยันตำแหน่งจริงด้วย Google Maps`,

    whyHook: 'ทุกนาทีมีความหมาย — ถ้ารถดับเพลิงเข้าไม่ถึงอาคาร การช่วยเหลือก็ล่าช้า',
    whyExpand: 'ทำไมเรื่องนี้สำคัญ',
    whyCollapse: 'ย่อ',
    whyHeading: 'ทำไมเรื่องนี้สำคัญ',
    whyParagraphs: [
      'เหตุเพลิงไหม้และอาคารถล่มหลายครั้งที่ผ่านมาแสดงให้เห็นว่า เมื่อเกิดเหตุในอาคารสูง เวลาเป็นตัวแปรที่ตัดสินชีวิตคน การดับเพลิงและการช่วยคนออกจากชั้นบนไม่ได้ขึ้นอยู่กับว่ารถดับเพลิงมาถึงหน้าโครงการเร็วแค่ไหนเท่านั้น แต่ขึ้นอยู่กับว่ารถเข้าไปประชิดตัวอาคารได้หรือไม่',
      'รถบันไดและรถกระเช้าต้องมีพื้นที่ตั้งลำและกางขาค้ำยันก่อนจะยกบันไดขึ้นไปถึงชั้นบน ถ้าถนนรอบอาคารแคบเกินไป มีสิ่งปกคลุม หรือถูกใช้เป็นที่จอดรถ อุปกรณ์เหล่านี้อาจกางไม่ได้เลย และการเข้าถึงผู้ประสบเหตุก็ช้าลงทั้งกระบวนการ',
    ],
    whyLawHeading: 'กฎหมายกำหนดไว้ว่าอย่างไร',
    whyLawBody:
      'กฎกระทรวง ฉบับที่ 33 (พ.ศ. 2535) ออกตามความในพระราชบัญญัติควบคุมอาคาร พ.ศ. 2522 กำหนดให้อาคารสูง (สูงเกิน 23 เมตร) และอาคารขนาดใหญ่พิเศษ (พื้นที่รวมทุกชั้นตั้งแต่ 10,000 ตารางเมตรขึ้นไป) ต้องจัดให้มีถนนที่มีผิวจราจรกว้างไม่น้อยกว่า 6.00 เมตร ปราศจากสิ่งปกคลุม โดยรอบอาคาร เพื่อให้รถดับเพลิงเข้าออกได้โดยสะดวก จึงไม่ใช่เพียงรายละเอียดในแบบก่อสร้าง แต่เป็นเงื่อนไขของการเข้าช่วยเหลือเมื่อเกิดเหตุ',
    whyStatusHeading: 'สภาผู้บริโภคพบอะไร',
    whyStatusBody:
      'สภาผู้บริโภคระบุว่าได้ส่งรายชื่อโครงการเหล่านี้ให้กรุงเทพมหานครเพื่อให้เร่งกำกับดูแลและตรวจสอบ แต่ยังไม่มีการปรับปรุงแก้ไข และแม้บางแห่งจะแจ้งกลับมาว่าดำเนินการแก้ไขแล้ว เมื่อลงพื้นที่สำรวจซ้ำกลับพบว่ายังไม่เป็นไปตามที่กฎหมายกำหนด ก่อนหน้านี้สภาผู้บริโภคเคยยื่นให้ตรวจสอบอาคารสูงไปแล้ว 38 แห่ง หลังเหตุแผ่นดินไหวเดือนมีนาคม 2568',
    whyDisclaimer:
      'แอปนี้เป็นเครื่องมือแสดงรายชื่อที่สภาผู้บริโภคเผยแพร่ลงบนแผนที่ ไม่ใช่ข้อสรุปทางกฎหมายว่าโครงการใดผิดกฎหมาย และไม่ได้ตรวจสอบสภาพพื้นที่จริงของแต่ละโครงการ',
    referencesHeading: 'แหล่งอ้างอิง',
    referencesNote: 'ลิงก์เปิดในแท็บใหม่',

    searchPlaceholder: 'ค้นหาชื่อคอนโด / เขต / สถานีรถไฟฟ้า',
    searchAriaLabel: 'ค้นหาคอนโด',
    clearSearch: 'ล้างคำค้นหา',
    districtLabel: 'เขต',
    allDistricts: 'ทุกเขต',
    resultCount: (shown, total) => `พบ ${shown} จาก ${total} โครงการ`,

    colNumber: '#',
    colName: 'ชื่อโครงการ',
    colDistrict: 'เขต',
    colNearest: 'ใกล้สถานี / ถนน',
    colMap: 'แผนที่',
    showOnMap: (name) => `ดู ${name} บนแผนที่`,
    openInGoogleMaps: (name) => `เปิด ${name} ใน Google Maps`,
    openInGoogleMapsShort: 'เปิดใน Google Maps',
    noResults: 'ไม่พบโครงการที่ตรงกับเงื่อนไข',
    rowsPerPage: 'แถวต่อหน้า',
    displayedRows: (from, to, count) => `${from}-${to} จาก ${count}`,

    pinCount: (count) => `แสดง ${count} หมุด (ตามผลการค้นหา)`,
    popupLocation: (district, nearest) => `เขต${district} · ${nearest}`,

    tabTable: 'ตาราง',
    tabMap: 'แผนที่',

    footerCraftedBy: 'จัดทำโดย HSpotlight',
    footerContribute: 'ร่วมพัฒนาบน GitHub',

    locateMe: 'ตำแหน่งของฉัน',
    locating: 'กำลังระบุ...',
    locateDenied: 'ไม่สามารถเข้าถึงตำแหน่งได้',
  },

  en: {
    htmlTitle: 'Map: Bangkok high-rises flagged over fire-access space',
    appTitle: '🚒 Bangkok high-rises flagged over fire-access space',
    appSubtitle:
      'The 50 condominium projects the Thailand Consumer Council says appear to lack the 6-metre road around the building required of high-rise and extra-large buildings',
    langLabel: 'Language',
    switchTo: 'ไทย',

    caveatApprox: 'approximate',
    caveatFull: ({ approx }) =>
      `Pin coordinates are ${approx} — derived from the nearest road or soi, not surveyed. Use “Open in Google Maps” to confirm the real location · The list itself is as published by the Consumer Council.`,
    caveatShort: ({ approx }) =>
      `Pins are ${approx} · confirm the real location in Google Maps`,

    whyHook: 'Every minute counts — if fire trucks cannot reach the building, help arrives late',
    whyExpand: 'Why this matters',
    whyCollapse: 'Collapse',
    whyHeading: 'Why this matters',
    whyParagraphs: [
      'Recent fires and building collapses have made one thing clear: in a high-rise emergency, time decides who gets out. Fighting the fire and reaching people on upper floors does not only depend on how fast a fire truck arrives at the gate — it depends on whether the truck can get right up against the building.',
      'Aerial ladders and platform trucks need room to position and extend their outriggers before the ladder can reach an upper floor. Where the road around a building is too narrow, built over, or used for parking, that equipment may not be able to deploy at all, and every step of the rescue slows down.',
    ],
    whyLawHeading: 'What the law requires',
    whyLawBody:
      'Ministerial Regulation No. 33 (B.E. 2535 / 1992), issued under the Building Control Act B.E. 2522 (1979), requires high-rise buildings (over 23 m tall) and extra-large buildings (10,000 m² or more of combined floor area) to provide a road with an unobstructed traffic surface at least 6.00 m wide around the building, so fire trucks can enter and leave freely. It is not a drafting detail — it is the precondition for a rescue actually reaching the building.',
    whyStatusHeading: 'What the Consumer Council found',
    whyStatusBody:
      'The Consumer Council says it sent this list to the Bangkok Metropolitan Administration asking for urgent inspection and enforcement, but no corrections followed. Some projects replied that they had fixed the problem, yet a repeat site survey found the space still did not meet the legal requirement. The Council had previously submitted 38 high-rise buildings for inspection after the March 2025 earthquake.',
    whyDisclaimer:
      'This app plots a list published by the Consumer Council. It is not a legal finding that any project is in breach, and it does not verify conditions on the ground at any individual project.',
    referencesHeading: 'References',
    referencesNote: 'Links open in a new tab',

    searchPlaceholder: 'Search project, district or station',
    searchAriaLabel: 'Search condos',
    clearSearch: 'Clear search',
    districtLabel: 'District',
    allDistricts: 'All districts',
    resultCount: (shown, total) => `${shown} of ${total} projects`,

    colNumber: '#',
    colName: 'Project',
    colDistrict: 'District',
    colNearest: 'Nearest station',
    colMap: 'Map',
    showOnMap: (name) => `Show ${name} on the map`,
    openInGoogleMaps: (name) => `Open ${name} in Google Maps`,
    openInGoogleMapsShort: 'Open in Google Maps',
    noResults: 'No projects match these filters',
    rowsPerPage: 'Rows per page',
    displayedRows: (from, to, count) => `${from}-${to} of ${count}`,

    pinCount: (count) => `${count} pins shown (current results)`,
    popupLocation: (district, nearest) => `${district} District · ${nearest}`,

    tabTable: 'Table',
    tabMap: 'Map',

    footerCraftedBy: 'Crafted by HSpotlight',
    footerContribute: 'Contribute on GitHub',

    locateMe: 'My location',
    locating: 'Locating...',
    locateDenied: 'Location access denied',
  },
}
