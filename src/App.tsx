import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
// Website pages
import Index from "./pages/website/Index";
import Auth from "./pages/website/Auth";
import Signup from "./pages/website/Signup";
import PrivacyPolicy from "./pages/website/PrivacyPolicy";
import TermsOfService from "./pages/website/TermsOfService";
import NotFound from "./pages/website/NotFound";
import Unauthorized from "./pages/website/Unauthorized";
import Forbidden from "./pages/website/Forbidden";
import ServerError from "./pages/website/ServerError";

// Laundry dashboard pages
import Dashboard from "./pages/laundry/Dashboard";
import Subscription from "./pages/laundry/Subscription";
import Cashier from "./pages/laundry/Cashier";
import Invoices from "./pages/laundry/Invoices";
import Customers from "./pages/laundry/Customers";
import Departments from "./pages/laundry/Departments";
import SubItems from "./pages/laundry/SubItems";
import Services from "./pages/laundry/Services";
import Employees from "./pages/laundry/Employees";
import Coupons from "./pages/laundry/Coupons";
import FinancialAccounts from "./pages/laundry/FinancialAccounts";
import Reports from "./pages/laundry/Reports";
import Settings from "./pages/laundry/Settings";
import WorkSections from "./pages/laundry/WorkSections";
import Attendance from "./pages/laundry/Attendance";
import Salaries from "./pages/laundry/Salaries";
import Devices from "./pages/laundry/Devices";
import Products from "./pages/laundry/Products";
import Suppliers from "./pages/laundry/Suppliers";
import Packages from "./pages/laundry/Packages";
import Subscriptions from "./pages/laundry/Subscriptions";
// AdminLogin is now in Next.js app directory at /admin/login
// For React Router, we'll create a wrapper or redirect
const AdminLogin = () => {
  // This component is only used in React Router context
  // Next.js uses the page at src/app/admin/login/page.tsx
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
  return null;
};
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminLaundries from "./pages/admin/AdminLaundries";
import AdminUserProfile from "./pages/admin/AdminUserProfile";
import AdminRegistrations from "./pages/admin/AdminRegistrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={["light", "dark", "blue", "green", "purple", "orange"]}
      enableSystem={false}
      storageKey="app-theme"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AuthProvider>
          <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/dashboard/cashier" element={<Cashier />} />
            <Route path="/dashboard/invoices" element={<Invoices />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/departments" element={<Departments />} />
            <Route path="/dashboard/subitems" element={<SubItems />} />
            <Route path="/dashboard/services" element={<Services />} />
            <Route path="/dashboard/employees" element={<Employees />} />
            <Route path="/dashboard/coupons" element={<Coupons />} />
            <Route path="/dashboard/financial" element={<FinancialAccounts />} />
            <Route path="/dashboard/financial/payments" element={<FinancialAccounts />} />
            <Route path="/dashboard/financial/revenues" element={<FinancialAccounts />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/work-sections/:section" element={<WorkSections />} />
            <Route path="/dashboard/attendance" element={<Attendance />} />
            <Route path="/dashboard/salaries" element={<Salaries />} />
            <Route path="/dashboard/devices" element={<Devices />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/suppliers" element={<Suppliers />} />
            <Route path="/dashboard/packages" element={<Packages />} />
            <Route path="/dashboard/subscriptions" element={<Subscriptions />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/seo" element={<AdminSEO />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/laundries" element={<AdminLaundries />} />
            <Route path="/admin/laundries/:id" element={<AdminUserProfile />} />
            {/* Public Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Error Pages */}
            <Route path="/401" element={<Unauthorized />} />
            <Route path="/403" element={<Forbidden />} />
            <Route path="/500" element={<ServerError />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
