"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, UserCog, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { LoadingState } from "@/components/ui/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  created_at: string;
  roles: string[];
  subscription_status: string | null;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Backend removal cleanup - providing mock users
      const mockUsers: User[] = [
        {
          id: "1",
          email: "admin@example.com",
          full_name: "مدير النظام",
          phone: "0500000000",
          created_at: new Date().toISOString(),
          roles: ["admin"],
          subscription_status: "active",
        },
        {
          id: "2",
          email: "employee@example.com",
          full_name: "موظف 1",
          phone: "0511111111",
          created_at: new Date().toISOString(),
          roles: ["employee"],
          subscription_status: "active",
        },
      ];

      setUsers(mockUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error("حدث خطأ في جلب المستخدمين");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      setLoading(true);
      // Backend removal cleanup
      toast.success("تم تحديث الدور بنجاح (بيئة عرض)");
      setRoleDialogOpen(false);

      // Update local state to reflect change
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, roles: role ? [role] : [] } : u
      ));
    } catch (error: any) {
      console.error("Error updating role:", error);
      toast.error("حدث خطأ في تحديث الدور");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((mockUser) => {
    const query = searchQuery.toLowerCase();
    return (
      mockUser.full_name?.toLowerCase().includes(query) ||
      mockUser.email?.toLowerCase().includes(query) ||
      mockUser.phone?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <LoadingState variant="spinner" size="lg" />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>قائمة المستخدمين</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الأدوار</TableHead>
                <TableHead>حالة الاشتراك</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((mockUser) => (
                  <TableRow key={mockUser.id}>
                    <TableCell>{mockUser.full_name || "-"}</TableCell>
                    <TableCell>{mockUser.id}</TableCell>
                    <TableCell>{mockUser.phone || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {mockUser.roles.map((role) => (
                          <Badge key={role} variant="secondary">
                            {role}
                          </Badge>
                        ))}
                        {mockUser.roles.length === 0 && (
                          <Badge variant="outline">لا يوجد</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {mockUser.subscription_status ? (
                        <Badge
                          variant={
                            mockUser.subscription_status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {mockUser.subscription_status}
                        </Badge>
                      ) : (
                        <Badge variant="outline">لا يوجد</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(mockUser.created_at).toLocaleDateString("ar-SA")}
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={roleDialogOpen && selectedUser?.id === mockUser.id}
                        onOpenChange={(open) => {
                          setRoleDialogOpen(open);
                          if (open) {
                            setSelectedUser(mockUser);
                            setNewRole(mockUser.roles[0] || "");
                          } else {
                            setSelectedUser(null);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(mockUser);
                              setNewRole(mockUser.roles[0] || "");
                            }}
                          >
                            <UserCog className="h-4 w-4 ml-2" />
                            إدارة الأدوار
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>إدارة أدوار المستخدم</DialogTitle>
                            <DialogDescription>
                              تعديل أدوار المستخدم: {mockUser.full_name || mockUser.id}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>الدور</Label>
                              <Select
                                value={newRole}
                                onValueChange={setNewRole}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الدور" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">مدير</SelectItem>
                                  <SelectItem value="employee">موظف</SelectItem>
                                  <SelectItem value="customer">عميل</SelectItem>
                                  <SelectItem value="">إزالة الدور</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              onClick={() => handleRoleChange(mockUser.id, newRole)}
                              className="w-full"
                            >
                              حفظ التغييرات
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

