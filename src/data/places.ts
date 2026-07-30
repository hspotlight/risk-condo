/**
 * English labels for the Thai place names used in `condos.ts`.
 *
 * Kept as lookup tables rather than extra fields on every condo: the same
 * districts and stations repeat across the list, so one entry per place keeps
 * the dataset short and the spellings consistent. Transliterations follow the
 * names BTS/MRT/ARL use on their own signage and maps.
 */

export const districtEn: Record<string, string> = {
  ปทุมวัน: 'Pathum Wan',
  ดินแดง: 'Din Daeng',
  บางรัก: 'Bang Rak',
  ห้วยขวาง: 'Huai Khwang',
  พญาไท: 'Phaya Thai',
  คลองเตย: 'Khlong Toei',
  พระโขนง: 'Phra Khanong',
  วัฒนา: 'Watthana',
  บางนา: 'Bang Na',
  สวนหลวง: 'Suan Luang',
  จตุจักร: 'Chatuchak',
  คลองสาน: 'Khlong San',
  บางกะปิ: 'Bang Kapi',
  ราชเทวี: 'Ratchathewi',
  สาทร: 'Sathon',
}

export const nearestEn: Record<string, string> = {
  'BTS ชิดลม': 'BTS Chit Lom',
  'MRT พระราม 9': 'MRT Rama 9',
  'BTS สุรศักดิ์': 'BTS Surasak',
  'MRT ห้วยขวาง': 'MRT Huai Khwang',
  'BTS อนุสาวรีย์ชัยสมรภูมิ': 'BTS Victory Monument',
  'BTS พร้อมพงษ์': 'BTS Phrom Phong',
  'MRT สามย่าน': 'MRT Sam Yan',
  'BTS ปุณณวิถี': 'BTS Punnawithi',
  'BTS ทองหล่อ': 'BTS Thong Lo',
  'BTS อุดมสุข': 'BTS Udom Suk',
  'BTS บางนา': 'BTS Bang Na',
  'ถนนพระราม 9': 'Rama 9 Road',
  'BTS บางจาก': 'BTS Bang Chak',
  'BTS รัชโยธิน': 'BTS Ratchayothin',
  'BTS เพลินจิต': 'BTS Ploen Chit',
  'BTS ห้าแยกลาดพร้าว': 'BTS Ha Yaek Lat Phrao',
  'BTS กรุงธนบุรี': 'BTS Krung Thon Buri',
  'BTS เสนานิคม': 'BTS Sena Nikhom',
  'BTS พระโขนง': 'BTS Phra Khanong',
  'ARL รามคำแหง': 'ARL Ramkhamhaeng',
  'BTS อารีย์': 'BTS Ari',
  'BTS ราชเทวี': 'BTS Ratchathewi',
  'BTS เอกมัย': 'BTS Ekkamai',
  'BTS กรมป่าไม้': 'BTS Royal Forest Department',
  'BTS ช่องนนทรี': 'BTS Chong Nonsi',
  'BTS อ่อนนุช': 'BTS On Nut',
  'ถนนเจริญราษฎร์': 'Charoen Rat Road',
  'ถนนเจริญนคร (ริมเจ้าพระยา)': 'Charoen Nakhon Road (Chao Phraya riverside)',
}
