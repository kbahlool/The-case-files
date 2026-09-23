// Case registry. To add a case: create src/cases/case002/index.js and add ONE entry here.
// access: FREE | PREMIUM | LOCKED | COMING_SOON  (payments are not implemented; see canPlay)
import case001 from './case001/index.js';

export const CASES = [
  { id: 'case001', number: '001', access: 'FREE', data: case001 },
  { id: 'case002', number: '002', access: 'LOCKED', teaser: 'A file the department would rather stay shut.', teaser_ar: 'ملف تفضّل الإدارة أن يبقى مغلقاً.' },
  { id: 'case003', number: '003', access: 'COMING_SOON', teaser: 'Someone is writing the next chapter.', teaser_ar: 'أحدهم يكتب الفصل التالي.' },
  { id: 'case004', number: '004', access: 'PREMIUM', teaser: 'Season pass holders only.', teaser_ar: 'لحاملي بطاقة الموسم فقط.' },
];
export const getCase = (id) => CASES.find(c => c.id === id)?.data || null;
// Hook for future purchases: pass owned case ids / a season pass flag.
export const canPlay = (entry, entitlements = []) => !!entry.data && (entry.access === 'FREE' || entitlements.includes(entry.id));
