import { Loader2, Inbox, FileX, Package, Users, Receipt, Calendar } from "lucide-react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-8", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
}

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ count = 3, className }: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function TableLoadingSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-16 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardLoadingSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}

interface LoadingStateProps {
  variant?: "spinner" | "skeleton" | "table" | "card";
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
  rows?: number;
  cols?: number;
  count?: number;
}

export function LoadingState({
  variant = "spinner",
  size = "md",
  text,
  className,
  rows = 5,
  cols = 4,
  count = 4,
}: LoadingStateProps) {
  switch (variant) {
    case "spinner":
      return <LoadingSpinner size={size} text={text} className={className} />;
    case "skeleton":
      return <LoadingSkeleton count={count} className={className} />;
    case "table":
      return <TableLoadingSkeleton rows={rows} cols={cols} />;
    case "card":
      return <CardLoadingSkeleton count={count} />;
    default:
      return <LoadingSpinner size={size} text={text} className={className} />;
  }
}

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title = "لا توجد بيانات",
  description,
  action,
  className,
}: EmptyStateProps) {
  const defaultIcon = icon || <Inbox className="h-12 w-12 text-muted-foreground" />;

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4", className)}>
      <div className="mb-4 text-muted-foreground">{defaultIcon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// Empty states مخصصة حسب النوع
export function EmptyCustomers({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12 text-muted-foreground" />}
      title="لا يوجد عملاء"
      description="لم يتم إضافة أي عملاء بعد. ابدأ بإضافة عميل جديد."
      action={action}
    />
  );
}

export function EmptyInvoices({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Receipt className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد فواتير"
      description="لم يتم إنشاء أي فواتير بعد. ابدأ بإنشاء فاتورة جديدة من الكاشير."
      action={action}
    />
  );
}

export function EmptyEmployees({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Users className="h-12 w-12 text-muted-foreground" />}
      title="لا يوجد موظفين"
      description="لم يتم إضافة أي موظفين بعد. ابدأ بإضافة موظف جديد."
      action={action}
    />
  );
}

export function EmptyServices({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد خدمات"
      description="لم يتم إضافة أي خدمات بعد. ابدأ بإضافة خدمة جديدة."
      action={action}
    />
  );
}

export function EmptyDepartments({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد أقسام"
      description="لم يتم إضافة أي أقسام بعد. ابدأ بإضافة قسم جديد."
      action={action}
    />
  );
}

export function EmptySubItems({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد قطع"
      description="لم يتم إضافة أي قطع بعد. ابدأ بإضافة قطعة جديدة."
      action={action}
    />
  );
}

export function EmptyCoupons({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<FileX className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد قسائم"
      description="لم يتم إضافة أي قسائم بعد. ابدأ بإضافة قسيمة جديدة."
      action={action}
    />
  );
}

export function EmptyAttendance({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد سجلات حضور"
      description="لم يتم تسجيل أي حضور بعد."
      action={action}
    />
  );
}

export function EmptySalaries({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Receipt className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد رواتب"
      description="لم يتم إضافة أي سجلات رواتب بعد. ابدأ بإضافة راتب جديد."
      action={action}
    />
  );
}

export function EmptyPayments({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Receipt className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد مصروفات"
      description="لم يتم إضافة أي مصروفات بعد. ابدأ بإضافة مصروف جديد."
      action={action}
    />
  );
}

export function EmptyRevenues({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon={<Receipt className="h-12 w-12 text-muted-foreground" />}
      title="لا توجد إيرادات"
      description="لم يتم إضافة أي إيرادات بعد. ابدأ بإضافة إيراد جديد."
      action={action}
    />
  );
}

