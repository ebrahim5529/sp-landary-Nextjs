// دوال إخفاء أسماء العملاء

/**
 * إخفاء الاسم: عرض الاسم الأول و آخر 3 أحرف من الاسم الأخير
 * مثال: "محمد أحمد العلي" -> "محمد ... علي"
 */
export function maskCustomerName(name: string | null | undefined): string {
  if (!name) return '';
  
  const parts = name.trim().split(/\s+/);
  
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  
  const firstName = parts[0];
  const lastName = parts[parts.length - 1];
  
  // أخذ آخر 3 أحرف من الاسم الأخير
  const lastThreeChars = lastName.length >= 3 
    ? lastName.substring(lastName.length - 3)
    : lastName;
  
  return `${firstName} ... ${lastThreeChars}`;
}

/**
 * الحصول على الاسم الكامل (للاستخدام الداخلي فقط)
 */
export function getFullName(name: string | null | undefined): string {
  return name || '';
}

