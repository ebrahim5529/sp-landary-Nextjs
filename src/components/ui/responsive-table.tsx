import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface ResponsiveTableColumn<T = any> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  mobileLabel?: string; // Label for mobile card view
  hideOnMobile?: boolean; // Hide on mobile
  hideOnTablet?: boolean; // Hide on tablet
  className?: string;
}

interface ResponsiveTableProps<T = any> {
  columns: ResponsiveTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  emptyState?: React.ReactNode;
  className?: string;
  cardClassName?: string;
  selectAllChecked?: boolean;
  onSelectAll?: (checked: boolean) => void;
}

export function ResponsiveTable<T = any>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "لا توجد بيانات",
  emptyState,
  className,
  cardClassName,
  selectAllChecked,
  onSelectAll,
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();

  // Mobile view: Cards
  if (isMobile) {
    const mobileColumns = columns.filter((col) => !col.hideOnMobile);

    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground text-sm">
          {emptyMessage}
        </div>
      );
    }

    return (
      <div className={cn("space-y-3", className)}>
        {data.map((row) => (
          <Card key={keyExtractor(row)} className={cardClassName}>
            <CardContent className="p-4 space-y-2">
              {mobileColumns.map((column) => {
                const value = column.accessor
                  ? column.accessor(row)
                  : (row as any)[column.key];

                return (
                  <div
                    key={column.key}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                  >
                    <span className="text-xs text-muted-foreground font-medium">
                      {column.mobileLabel || column.header}:
                    </span>
                    <span className="text-sm font-medium">{value || "-"}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Desktop/Tablet view: Table
  const visibleColumns = columns.filter((col) => !col.hideOnTablet);

  if (data.length === 0) {
    return emptyState ? (
      <div className={className}>{emptyState}</div>
    ) : (
      <div className="text-center py-8 text-muted-foreground text-sm md:text-base">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn("text-right", column.className)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={keyExtractor(row)}>
                {visibleColumns.map((column) => {
                  const value = column.accessor
                    ? column.accessor(row)
                    : (row as any)[column.key];

                  return (
                    <TableCell
                      key={column.key}
                      className={cn("text-right", column.className)}
                    >
                      {value || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

