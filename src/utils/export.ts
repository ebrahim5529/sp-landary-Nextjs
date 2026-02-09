// دوال التصدير (PDF/Excel)

/**
 * تصدير البيانات إلى CSV (يمكن تحويلها إلى Excel)
 */
export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) return;
  
  // الحصول على العناوين من المفاتيح الأولى
  const headers = Object.keys(data[0]);
  
  // إنشاء محتوى CSV
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // معالجة القيم التي تحتوي على فواصل أو علامات اقتباس
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');
  
  // إنشاء ملف وتنزيله
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * تصدير البيانات إلى JSON
 */
export function exportToJSON(data: any[], filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * طباعة HTML كـ PDF (باستخدام window.print)
 */
export function printAsPDF(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  
  printWindow.document.write(`
    <html>
      <head>
        <title>طباعة</title>
        <style>
          @media print {
            @page {
              margin: 0;
            }
            body {
              margin: 0;
            }
          }
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
            text-align: right;
          }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

/**
 * تحويل HTML إلى PDF باستخدام jsPDF (يتطلب تثبيت المكتبة)
 */
export async function exportHTMLToPDF(
  elementId: string,
  filename: string,
  options?: { width?: number; height?: number }
): Promise<void> {
  // هذا يتطلب تثبيت jsPDF و html2canvas
  // يمكن إضافة المكتبات لاحقاً إذا لزم الأمر
  console.warn('exportHTMLToPDF requires jsPDF and html2canvas libraries');
  printAsPDF(elementId);
}

