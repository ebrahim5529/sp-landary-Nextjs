// دوال إخفاء أرقام الجوال

/**
 * إخفاء 4 أرقام من وسط رقم الجوال
 * مثال: 0541234567 -> 054 .. .. .. 67
 */
export function maskPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return '';
  
  // إزالة أي مسافات أو أحرف غير رقمية
  const cleaned = phone.replace(/\D/g, '');
  
  // التحقق من أن الرقم يبدأ بـ 05 ويتكون من 10 أرقام
  if (cleaned.length !== 10 || !cleaned.startsWith('05')) {
    return phone; // إرجاع الرقم كما هو إذا لم يكن بصيغة صحيحة
  }
  
  // إخفاء الأرقام الوسطى (4 أرقام)
  const start = cleaned.substring(0, 3); // 054
  const end = cleaned.substring(7); // آخر رقمين
  const middle = ' .. .. .. ';
  
  return `${start}${middle}${end}`;
}

/**
 * التحقق من صحة رقم الجوال السعودي
 */
export function isValidSaudiPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 && cleaned.startsWith('05');
}

