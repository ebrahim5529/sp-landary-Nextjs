/**
 * بيانات تجريبية ثابتة للمشروع
 * Mock Data for the Application
 */

// إحصائيات اليوم
export interface TodayStatsData {
  todayInvoices: number;
  todayPaidInvoices: number;
  totalCustomers: number;
  customersWithUnpaidInvoices: number;
  todayPiecesReceived: number;
  todayPiecesDelivered: number;
  todayRevenue: number;
  todayExpenses: number;
}

export const getTodayStats = (period: "day" | "week" | "month"): TodayStatsData => {
  const factor = period === "day" ? 1 : period === "week" ? 7 : 30;
  
  return {
    todayInvoices: 12 * factor,
    todayPaidInvoices: 10 * factor,
    totalCustomers: 156,
    customersWithUnpaidInvoices: 22,
    todayPiecesReceived: 45 * factor,
    todayPiecesDelivered: 38 * factor,
    todayRevenue: 1500 * factor,
    todayExpenses: 450 * factor,
  };
};

// بيانات الرسوم البيانية
export interface DailyStats {
  date: string;
  invoices: number;
  paid: number;
  piecesReceived: number;
  piecesDelivered: number;
}

export const getOperationalChartsData = (): DailyStats[] => {
  const days = 7;
  const stats: DailyStats[] = [];

  // بيانات ثابتة لآخر 7 أيام
  const fixedData = [
    { invoices: 15, paid: 12, piecesReceived: 65, piecesDelivered: 58 },
    { invoices: 18, paid: 15, piecesReceived: 72, piecesDelivered: 65 },
    { invoices: 12, paid: 10, piecesReceived: 55, piecesDelivered: 50 },
    { invoices: 20, paid: 18, piecesReceived: 80, piecesDelivered: 75 },
    { invoices: 16, paid: 14, piecesReceived: 68, piecesDelivered: 62 },
    { invoices: 14, paid: 11, piecesReceived: 60, piecesDelivered: 55 },
    { invoices: 19, paid: 16, piecesReceived: 75, piecesDelivered: 70 },
  ];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const data = fixedData[days - 1 - i];

    stats.push({
      date: date.toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
      invoices: data.invoices,
      paid: data.paid,
      piecesReceived: data.piecesReceived,
      piecesDelivered: data.piecesDelivered,
    });
  }

  return stats;
};

// بيانات الأقسام
export interface Department {
  id: string;
  name: string;
  color: string;
  standard_time_minutes: number;
  active: boolean;
  invoice_count: number;
  in_progress_count: number;
  completed_count: number;
  timeStats?: {
    averageTime: number;
    standardTime: number;
    percentage: number;
    status: "normal" | "warning" | "critical";
    color: "green" | "yellow" | "red";
  };
}

export const getDepartments = (): Department[] => {
  return [
    {
      id: "1",
      name: "قسم الغسيل",
      color: "#3b82f6",
      standard_time_minutes: 120,
      active: true,
      invoice_count: 25,
      in_progress_count: 3,
      completed_count: 22,
      timeStats: {
        averageTime: 102,
        standardTime: 120,
        percentage: -15,
        status: "normal",
        color: "green",
      },
    },
    {
      id: "2",
      name: "قسم الكي",
      color: "#10b981",
      standard_time_minutes: 90,
      active: true,
      invoice_count: 18,
      in_progress_count: 2,
      completed_count: 16,
      timeStats: {
        averageTime: 112.5,
        standardTime: 90,
        percentage: 25,
        status: "critical",
        color: "red",
      },
    },
    {
      id: "3",
      name: "قسم التعبئة",
      color: "#f59e0b",
      standard_time_minutes: 45,
      active: true,
      invoice_count: 30,
      in_progress_count: 1,
      completed_count: 29,
      timeStats: {
        averageTime: 40.5,
        standardTime: 45,
        percentage: -10,
        status: "normal",
        color: "green",
      },
    },
    {
      id: "4",
      name: "قسم الاستلام",
      color: "#8b5cf6",
      standard_time_minutes: 30,
      active: true,
      invoice_count: 42,
      in_progress_count: 5,
      completed_count: 37,
      timeStats: {
        averageTime: 28,
        standardTime: 30,
        percentage: -6.7,
        status: "normal",
        color: "green",
      },
    },
  ];
};

// بيانات الوقت
export interface DepartmentTime {
  department_id: string;
  department_name: string;
  standard_time: number;
  average_time: number;
  stats: {
    averageTime: number;
    standardTime: number;
    percentage: number;
    status: "normal" | "warning" | "critical";
    color: "green" | "yellow" | "red";
  };
}

export const getDepartmentTimes = (): DepartmentTime[] => {
  return [
    {
      department_id: "1",
      department_name: "قسم الغسيل",
      standard_time: 120,
      average_time: 95,
      stats: {
        averageTime: 95,
        standardTime: 120,
        percentage: -20.8,
        status: "normal",
        color: "green",
      },
    },
    {
      department_id: "2",
      department_name: "قسم الكي",
      standard_time: 90,
      average_time: 110,
      stats: {
        averageTime: 110,
        standardTime: 90,
        percentage: 22.2,
        status: "warning",
        color: "yellow",
      },
    },
    {
      department_id: "3",
      department_name: "قسم التعبئة",
      standard_time: 45,
      average_time: 35,
      stats: {
        averageTime: 35,
        standardTime: 45,
        percentage: -22.2,
        status: "normal",
        color: "green",
      },
    },
    {
      department_id: "4",
      department_name: "قسم الاستلام",
      standard_time: 30,
      average_time: 28,
      stats: {
        averageTime: 28,
        standardTime: 30,
        percentage: -6.7,
        status: "normal",
        color: "green",
      },
    },
  ];
};

// بيانات الفواتير للأقسام
export interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string | null;
  total: number;
  status: string;
}

export const getDepartmentInvoices = (departmentId: string): Invoice[] => {
  const invoicesByDepartment: Record<string, Invoice[]> = {
    "1": [
      {
        id: "1",
        invoice_number: "INV-001",
        customer_name: "أحمد علي",
        total: 150,
        status: "paid",
      },
      {
        id: "2",
        invoice_number: "INV-002",
        customer_name: "سارة محمد",
        total: 200,
        status: "in_progress",
      },
      {
        id: "3",
        invoice_number: "INV-003",
        customer_name: "محمد أحمد",
        total: 120,
        status: "completed",
      },
    ],
    "2": [
      {
        id: "4",
        invoice_number: "INV-004",
        customer_name: "فاطمة خالد",
        total: 180,
        status: "paid",
      },
      {
        id: "5",
        invoice_number: "INV-005",
        customer_name: "علي حسن",
        total: 220,
        status: "in_progress",
      },
    ],
    "3": [
      {
        id: "6",
        invoice_number: "INV-006",
        customer_name: "نورا سعيد",
        total: 100,
        status: "completed",
      },
      {
        id: "7",
        invoice_number: "INV-007",
        customer_name: "خالد منصور",
        total: 250,
        status: "paid",
      },
    ],
    "4": [
      {
        id: "8",
        invoice_number: "INV-008",
        customer_name: "ليلى عبدالله",
        total: 130,
        status: "in_progress",
      },
      {
        id: "9",
        invoice_number: "INV-009",
        customer_name: "يوسف أحمد",
        total: 170,
        status: "paid",
      },
    ],
  };

  return invoicesByDepartment[departmentId] || [];
};
