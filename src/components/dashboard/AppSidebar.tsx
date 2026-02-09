"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  DollarSign,
  Package,
  Wrench,
  UserCog,
  Tag,
  ShoppingCart,
  CreditCard,
  Receipt,
  FolderTree,
  Shirt,
  Workflow,
  TrendingUp,
  Store,
  Clock,
  ChevronDown,
  Monitor,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePermissions } from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  roles?: ("admin" | "cashier" | "worker")[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  roles?: ("admin" | "cashier" | "worker")[];
}

// العناصر الرئيسية (تظهر مباشرة بدون قائمة منسدلة)
const mainMenuItems: MenuItem[] = [
  { title: "لوحة التحكم", url: "/dashboard", icon: LayoutDashboard },
  { title: "الكاشير", url: "/dashboard/cashier", icon: Receipt },
];

const menuItems: MenuSection[] = [
  {
    title: "الأقسام والقطع",
    roles: ["admin", "cashier"],
    items: [
      { title: "الأقسام", url: "/dashboard/departments", icon: FolderTree, roles: ["admin"] },
      { title: "الفرعية (القطع)", url: "/dashboard/sub-items", icon: Shirt, roles: ["admin"] },
      { title: "الخدمات", url: "/dashboard/services", icon: Settings, roles: ["admin"] },
    ],
  },
  {
    title: "أقسام العمل",
    roles: ["admin", "cashier", "worker"],
    items: [
      { title: "استلام الملابس", url: "/dashboard/work-sections/receive", icon: Package, roles: ["admin", "cashier"] },
      { title: "الفرز والبقع", url: "/dashboard/work-sections/sort", icon: Workflow, roles: ["admin", "worker"] },
      { title: "الغسيل والتجفيف", url: "/dashboard/work-sections/wash", icon: Wrench, roles: ["admin", "worker"] },
      { title: "الكوي والتعليق", url: "/dashboard/work-sections/iron", icon: Settings, roles: ["admin", "worker"] },
    ],
  },
  {
    title: "الحسابات المالية",
    roles: ["admin", "cashier"],
    items: [
      { title: "الفواتير", url: "/dashboard/invoices", icon: FileText, roles: ["admin", "cashier"] },
      { title: "الحسابات المالية", url: "/dashboard/financial", icon: DollarSign, roles: ["admin"] },
      { title: "المدفوعات", url: "/dashboard/financial/payments", icon: DollarSign, roles: ["admin"] },
      { title: "الإيرادات", url: "/dashboard/financial/revenues", icon: TrendingUp, roles: ["admin"] },
    ],
  },
  {
    title: "العملاء",
    roles: ["admin", "cashier"],
    items: [
      { title: "العملاء", url: "/dashboard/customers", icon: Users, roles: ["admin", "cashier"] },
      { title: "القسائم", url: "/dashboard/coupons", icon: Tag, roles: ["admin"] },
      { title: "الباقات", url: "/dashboard/packages", icon: Package, roles: ["admin"] },
      { title: "الاشتراكات", url: "/dashboard/subscriptions", icon: CreditCard, roles: ["admin"] },
    ],
  },
  {
    title: "الموظفين",
    roles: ["admin"],
    items: [
      { title: "الموظفين", url: "/dashboard/employees", icon: UserCog, roles: ["admin"] },
      { title: "الحضور والانصراف", url: "/dashboard/attendance", icon: Clock, roles: ["admin", "worker"] },
      { title: "الرواتب والحوافز", url: "/dashboard/salaries", icon: DollarSign, roles: ["admin"] },
    ],
  },
  {
    title: "المستودع",
    roles: ["admin"],
    items: [
      { title: "المنتجات", url: "/dashboard/products", icon: Package, roles: ["admin"] },
      { title: "الموردين", url: "/dashboard/suppliers", icon: ShoppingCart, roles: ["admin"] },
    ],
  },
  {
    title: "اشتراكات المنصة",
    roles: ["admin"],
    items: [
      { title: "اشتراكات المنصة", url: "/dashboard/subscription", icon: CreditCard, roles: ["admin"] },
    ],
  },
  {
    title: "إدارة الأجهزة",
    roles: ["admin"],
    items: [
      { title: "إدارة الأجهزة", url: "/dashboard/devices", icon: Monitor, roles: ["admin"] },
    ],
  },
  {
    title: "التقارير",
    roles: ["admin"],
    items: [
      { title: "التقارير", url: "/dashboard/reports", icon: FileText, roles: ["admin"] },
    ],
  },
  {
    title: "الإعدادات",
    roles: ["admin"],
    items: [
      { title: "الإعدادات العامة", url: "/dashboard/settings", icon: Settings, roles: ["admin"] },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { hasAnyRole, roles } = usePermissions();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const isActive = (path: string) => pathname === path;
  const isCollapsed = state === "collapsed";

  const canAccessSection = (section: MenuSection): boolean => {
    if (!section.roles || section.roles.length === 0) return true;
    return hasAnyRole(section.roles);
  };

  const canAccessItem = (item: MenuItem): boolean => {
    if (!item.roles || item.roles.length === 0) return true;
    return hasAnyRole(item.roles);
  };

  const filteredMenuItems = menuItems.filter(canAccessSection).map((section) => ({
    ...section,
    items: section.items.filter(canAccessItem),
  })).filter((section) => section.items.length > 0);

  // فتح القسم تلقائياً إذا كان يحتوي على عنصر نشط
  useEffect(() => {
    const newOpenSections: Record<string, boolean> = {};
    filteredMenuItems.forEach((section) => {
      const hasActiveItem = section.items.some((item) => isActive(item.url));
      if (hasActiveItem) {
        newOpenSections[section.title] = true;
      }
    });
    setOpenSections((prev) => ({ ...prev, ...newOpenSections }));
  }, [pathname, filteredMenuItems]);

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const hasActiveItemInSection = useCallback((section: MenuSection) => {
    return section.items.some((item) => isActive(item.url));
  }, [isActive]);

  // تصفية العناصر الرئيسية حسب الصلاحيات
  const filteredMainItems = mainMenuItems.filter((item) => {
    // العناصر الرئيسية متاحة للجميع
    return true;
  });

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-60"} ${isMobile ? "hidden md:flex" : ""}`}
      collapsible="icon"
      side="right"
    >
      <SidebarContent className="p-2 md:p-4">
        {/* العناصر الرئيسية - تظهر مباشرة بدون قائمة منسدلة */}
        {filteredMainItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} className="text-xs md:text-sm">
                      <Link href={item.url} className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* باقي الأقسام */}
        {filteredMenuItems.map((section) => {
          const isOpen = openSections[section.title] ?? false;
          const hasMultipleItems = section.items.length > 1;
          const sectionHasActiveItem = hasActiveItemInSection(section);

          // إذا كان القسم يحتوي على عنصر واحد فقط، اعرضه مباشرة بدون عنوان القسم لتجنب التكرار
          if (!hasMultipleItems) {
            return (
              <SidebarGroup key={section.title}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive(item.url)} className="text-xs md:text-sm">
                          <Link href={item.url} className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2">
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && <span className="truncate">{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }

          // إذا كان القسم يحتوي على أكثر من عنصر، استخدم Collapsible
          return (
            <SidebarGroup key={section.title}>
              <Collapsible
                open={isOpen}
                onOpenChange={() => toggleSection(section.title)}
                className="w-full"
              >
                {!isCollapsed && (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "w-full text-xs md:text-sm",
                        sectionHasActiveItem && "bg-sidebar-accent text-sidebar-accent-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold">{section.title}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isOpen && "transform rotate-180"
                          )}
                        />
                      </div>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                )}
                {isCollapsed && (
                  <SidebarGroupLabel className="text-xs md:text-sm px-2 md:px-3">
                    {section.title}
                  </SidebarGroupLabel>
                )}
                <CollapsibleContent className={cn("mt-1", isCollapsed && "hidden")}>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive(item.url)} className="text-xs md:text-sm mr-4">
                          <Link href={item.url} className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2">
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && <span className="truncate">{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
