// دوال الفواتير

export function generateInvoiceNumber(laundryOwnerId: string, lastInvoiceNumber?: string): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  
  if (!lastInvoiceNumber) {
    return `${year}${month}0001`;
  }
  
  // استخراج الرقم من آخر فاتورة
  const lastNumber = parseInt(lastInvoiceNumber.slice(-4)) || 0;
  const newNumber = lastNumber + 1;
  
  return `${year}${month}${String(newNumber).padStart(4, '0')}`;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

export function calculateTax(subtotal: number, taxRate: number = 15): number {
  return (subtotal * taxRate) / 100;
}

export function calculateTotal(subtotal: number, tax: number, discount: number = 0): number {
  return subtotal - discount + tax;
}

export function generateReturnCode(originalInvoiceNumber: string): string {
  return `${originalInvoiceNumber}W`;
}

export function isInvoiceReturned(invoice: { is_returned?: boolean; return_code?: string | null }): boolean {
  return invoice.is_returned === true || invoice.return_code !== null;
}

