"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Settings,
  TrendingUp,
  Search,
  Shield,
  Building2,
  ChevronDown,
  ChevronRight,
  Globe,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url?: string;
  icon: any;
  subItems?: { title: string; url: string; icon: any }[];
}

const menuItems: MenuItem[] = [
  { title: "لوحة التحكم", url: "/admin", icon: LayoutDashboard },
  { title: "طلبات التسجيل", url: "/admin/registrations", icon: ClipboardList },
  { title: "إدارة المستخدمين", url: "/admin/users", icon: Users },
  {
    title: "إعدادات النظام",
    icon: Settings,
    subItems: [
      { title: "الإعدادات العامة", url: "/admin/settings", icon: Settings },
      { title: "إعدادات SEO", url: "/admin/seo", icon: Search },
    ],
  },
  { title: "التحليلات", url: "/admin/analytics", icon: TrendingUp },
  { title: "إدارة المغاسل", url: "/admin/laundries", icon: Building2 },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed";
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const isActive = (path: string) => pathname === path;
  const isSubItemActive = (path: string) => pathname === path;

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  // فتح القائمة الفرعية تلقائياً إذا كان أحد عناصرها نشطاً
  const shouldBeOpen = (item: MenuItem) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem) => isSubItemActive(subItem.url));
  };

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-60"} ${isMobile ? "hidden md:flex" : ""}`}
      collapsible="icon"
      side="right"
    >
      <SidebarContent className="p-2 md:p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.subItems && item.subItems.length > 0) {
                  const isOpen = openMenus.includes(item.title) || shouldBeOpen(item);

                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      open={isOpen}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={shouldBeOpen(item)}
                            className="text-xs md:text-sm"
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && (
                              <>
                                <span className="truncate flex-1 text-right">{item.title}</span>
                                {isOpen ? (
                                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                )}
                              </>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubItemActive(subItem.url)}
                                >
                                  <Link href={subItem.url} className="flex items-center gap-2">
                                    <subItem.icon className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="truncate">{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url || "")}
                      className="text-xs md:text-sm"
                    >
                      <Link
                        href={item.url || "#"}
                        className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2"
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
