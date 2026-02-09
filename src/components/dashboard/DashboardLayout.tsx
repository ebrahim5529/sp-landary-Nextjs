"use client";

const mockUser = { email: "user@example.com", id: "mock-user-id" };



import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, User, Settings, LogOut, Key } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [notificationsCount] = useState(0); // يمكن ربطه بقاعدة البيانات لاحقاً
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const handleSignOut = () => {
    // Mock sign out - clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUser');
      localStorage.removeItem('adminUser');
    }
    router.push('/');
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col md:mr-[var(--sidebar-width)] md:peer-data-[state=collapsed]:mr-[var(--sidebar-width-icon)]">
        <header className="h-14 md:h-16 border-b bg-background flex items-center justify-between px-3 md:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            <SidebarTrigger />
            <h1 className="text-base md:text-xl font-bold truncate">لوحة التحكم -SP Landary</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* أيقونة الإشعارات */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <Bell className="h-4 w-4" />
                  {notificationsCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {notificationsCount > 9 ? "9+" : notificationsCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end" dir="rtl">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">الإشعارات</h4>
                    {notificationsCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {notificationsCount}
                      </Badge>
                    )}
                  </div>
                  <div className="border-t pt-2">
                    {notificationsCount === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        لا توجد إشعارات جديدة
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {/* يمكن إضافة قائمة الإشعارات هنا لاحقاً */}
                      </div>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* قائمة إعدادات المستخدم */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">حسابي</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      mockUser@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setChangePasswordOpen(true)}>
                  <Key className="ml-2 h-4 w-4" />
                  <span>تغيير كلمة المرور</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                  <Settings className="ml-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-3 md:p-4 lg:p-6 bg-muted/30 relative">
          {children}
        </main>
        <ChangePasswordDialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
