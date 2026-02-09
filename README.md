# برنامج SP لإدارة المغاسل | SP Laundry Management System

نظام إدارة متكامل وشامل لإدارة المغاسل يساعدك على تنظيم الطلبات، متابعة العملاء، إدارة الموظفين، وتحليل الأرباح.

An integrated and comprehensive laundry management system that helps you organize orders, track customers, manage employees, and analyze profits.

## معلومات المشروع | Project Info

نظام إدارة مغاسل شامل مبني بتقنية Next.js مع React Router للتوجيه، يجمع بين قوة Next.js في التطوير ومرونة React Router في إدارة المسارات المعقدة.

**نظام مختلط**: يستخدم Next.js App Router لبعض الصفحات (مثل صفحات الإدارة) وReact Router للواجهة الرئيسية للمغسلة.

### كيفية عمل النظام المختلط | How the Hybrid System Works

المشروع يستخدم بنية مختلطة تجمع بين قوة Next.js وقدرات React Router:

1. **Next.js App Router** (`src/app/`): يُستخدم للصفحات العامة وصفحات الإدارة
2. **React Router** (`src/App.tsx`): يُستخدم للواجهة الرئيسية للمغسلة ولوحة التحكم
3. **المكونات المشتركة** (`src/components/`): تُستخدم في كلا النظامين
4. **البيانات التجريبية** (`src/api/mockData.ts`): توفر بيانات تجريبية للتطوير

---

## الميزات الرئيسية | Key Features

### 🧺 إدارة الطلبات والفواتير
- استقبال وتسجيل الطلبات بسهولة
- تتبع حالة الطلب بالوقت الفعلي
- إصدار الفواتير والطباعة
- إدارة استرجاع الفواتير

### 👥 إدارة العملاء
- قاعدة بيانات شاملة للعملاء
- سجل كامل لطلبات العميل
- برنامج نقاط الولاء والخصومات
- تصدير بيانات العملاء

### 💼 إدارة الموظفين
- إدارة بيانات الموظفين والأدوار
- نظام الحضور والانصراف
- إدارة الرواتب
- تتبع أداء الموظفين

### 🏢 إدارة الأقسام والخدمات
- إدارة الأقسام الرئيسية والفرعية
- إدارة الخدمات والقطع
- تتبع الوقت المعياري لكل قسم
- إحصائيات مفصلة لكل قسم

### 🔄 أقسام العمل (Workflow)
- استلام الملابس
- الفرز ومعالجة البقع
- الغسيل والتجفيف
- الكوي والتعليق
- تتبع حالة الطلب في كل مرحلة

### 💰 الحسابات المالية
- تتبع الإيرادات والمصروفات
- تقارير مالية شاملة
- إدارة المدفوعات
- تحليل الأرباح

### 📊 التقارير والتحليلات
- تقارير العملاء
- التقارير المالية
- التقارير التشغيلية
- إحصائيات مفصلة

### 🎫 نظام القسائم
- إنشاء وإدارة القسائم
- أنواع مختلفة من الخصومات
- تتبع استخدام القسائم

### 🔧 إدارة الأجهزة
- إدارة جميع الأجهزة المستخدمة في النظام
- تتبع حالة الأجهزة (يعمل، صيانة، معطل)
- إحصائيات شاملة عن الأجهزة
- تصدير قائمة الأجهزة

### 📦 إدارة المنتجات
- إدارة كافة المنتجات في المغسلة
- البحث عن المنتجات بالاسم أو الكود
- إضافة منتجات متعددة ضمن فاتورة مشتريات واحدة
- تتبع الكمية المتوفرة والمنتجات المنتهية
- إحصائيات شاملة (المخزون، القيمة الإجمالية)
- ربط المنتجات بالموردين وفواتير المشتريات

### ⚙️ الإعدادات
- إعدادات معلومات المغسلة
- إدارة الصلاحيات والأدوار
- تخصيص النظام
- إدارة الاشتراكات

### 🎨 الميزات التقنية المتقدمة | Advanced Technical Features

- **نظام المصادقة المزدوج**: مصادقة منفصلة للمستخدمين والإداريين
- **إدارة الصلاحيات**: نظام أدوار وصلاحيات متقدم
- **البيانات التجريبية**: نظام بيانات تجريبية شامل للتطوير
- **إدارة السمات**: دعم الوضع المظلم والفاتح مع سمات مخصصة
- **إشعارات متقدمة**: نظام إشعارات متعدد المستويات
- **تحقق من البيانات**: تحقق شامل باستخدام Zod
- **إدارة الأخطاء**: معالجة أخطاء متقدمة مع Error Boundaries

## التقنيات المستخدمة | Technologies

This project is built with:

- **Next.js 16.1.6** - Full-stack React framework
- **React 19.2.4** - UI library with latest features
- **React Router** - Client-side routing
- **TypeScript 5.8.3** - Type-safe JavaScript
- **shadcn-ui** - Modern UI component library
- **Radix UI** - Accessible component primitives
- **Tailwind CSS v4** - Utility-first CSS framework
- **Supabase** - Backend as a Service (Database, Auth, Storage)
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **Recharts** - Chart library
- **date-fns** - Date utilities
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## كيفية تحرير الكود | How to Edit This Code

There are several ways of editing your application.

### استخدام Lovable | Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/364db488-c119-473a-beb8-afd2405c793c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### استخدام IDE المفضل لديك | Use Your Preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

**ملاحظة مهمة**: هذا مشروع مختلط يجمع بين Next.js و React Router. تأكد من فهم البنية قبل التعديل.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### فهم البنية المختلطة | Understanding the Hybrid Structure

- **صفحات Next.js**: في `src/app/` - للصفحات العامة وصفحات الإدارة
- **صفحات React Router**: في `src/pages/` - للواجهة الرئيسية للمغسلة
- **المكونات المشتركة**: في `src/components/` - قابلة للاستخدام في كلا النظامين
- **البيانات**: في `src/api/mockData.ts` - بيانات تجريبية للتطوير

### تحرير الملف مباشرة في GitHub | Edit a File Directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### استخدام GitHub Codespaces | Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## الأوامر المتاحة | Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type checking (مهم للمشروع المكتوب بـ TypeScript)
npm run type-check
```

### أدوات التطوير | Development Tools

- **ESLint**: للتحقق من جودة الكود
- **TypeScript Compiler**: للتحقق من الأنواع
- **Prettier**: لتنسيق الكود (إذا كان مثبتاً)
- **Mock Data**: بيانات تجريبية شاملة في `src/api/mockData.ts`

## البنية الأساسية | Project Structure

```
src/
├── app/                # Next.js App Router pages | صفحات Next.js
│   ├── admin/          # Admin pages | صفحات الإدارة
│   ├── auth/           # Authentication | المصادقة
│   ├── dashboard/      # Dashboard pages | صفحات لوحة التحكم
│   ├── privacy-policy/ # Privacy policy | سياسة الخصوصية
│   ├── signup/         # Sign up page | صفحة التسجيل
│   ├── terms-of-service/ # Terms of service | شروط الخدمة
│   ├── layout.tsx      # Root layout | التخطيط الجذر
│   ├── page.tsx        # Home page | الصفحة الرئيسية
│   └── globals.css     # Global styles | الأنماط العامة
├── components/         # React components | مكونات React
│   ├── admin/          # Admin components | مكونات الإدارة
│   ├── attendance/     # Attendance management | إدارة الحضور
│   ├── cashier/        # Cashier interface | واجهة الكاشير
│   ├── common/         # Common components | المكونات المشتركة
│   ├── coupons/        # Coupon management | إدارة القسائم
│   ├── customers/      # Customer management | إدارة العملاء
│   ├── dashboard/      # Dashboard components | مكونات لوحة التحكم
│   ├── departments/    # Department management | إدارة الأقسام
│   ├── devices/        # Device management | إدارة الأجهزة
│   ├── employees/      # Employee management | إدارة الموظفين
│   ├── financial/      # Financial components | المكونات المالية
│   ├── invoices/       # Invoice management | إدارة الفواتير
│   ├── products/       # Product management | إدارة المنتجات
│   ├── reports/        # Report components | مكونات التقارير
│   ├── salaries/       # Salary management | إدارة الرواتب
│   ├── services/       # Service management | إدارة الخدمات
│   ├── settings/       # Settings components | مكونات الإعدادات
│   ├── subitems/       # Sub-item management | إدارة القطع الفرعية
│   ├── work-sections/  # Workflow sections | أقسام العمل
│   ├── onboarding/     # Onboarding components | مكونات الإعداد الأولي
│   ├── subscriptions/  # Subscription components | مكونات الاشتراكات
│   └── ui/             # UI components (shadcn) | مكونات الواجهة
├── pages/              # React Router pages | صفحات React Router
│   ├── admin/          # Admin dashboard pages | صفحات لوحة إدارة المغاسل
│   ├── laundry/        # Laundry management pages | صفحات إدارة المغسلة
│   └── website/        # Public website pages | صفحات الموقع العام
├── contexts/           # React contexts | سياقات React
│   ├── AuthContext.tsx # Authentication context | سياق المصادقة
│   └── ClientAuthProvider.tsx # Client auth provider | موفر المصادقة
├── hooks/              # Custom React hooks | خطافات React مخصصة
├── lib/                # Utility libraries | مكتبات مساعدة
├── utils/              # Utility functions | دوال مساعدة
│   ├── export.ts       # Export utilities | أدوات التصدير
│   ├── invoice.ts      # Invoice utilities | أدوات الفواتير
│   ├── timeTracking.ts # Time tracking utilities | أدوات تتبع الوقت
│   └── ...             # Other utilities
├── api/                # API utilities | أدوات API
│   └── mockData.ts     # Mock data | البيانات التجريبية
├── App.tsx             # React Router App component | مكون React Router
├── main.tsx            # Entry point | نقطة الدخول
└── index.css           # Additional styles | أنماط إضافية

supabase/
├── migrations/         # Database migrations | ترحيلات قاعدة البيانات
└── functions/          # Edge functions | دوال الحافة
```

## الصفحات والمسارات | Pages and Routes

### صفحات الموقع العام (Next.js App Router)
- `/` - الصفحة الرئيسية (Landing Page)
- `/auth` - صفحة تسجيل الدخول
- `/signup` - صفحة إنشاء الحساب
- `/privacy-policy` - سياسة الخصوصية
- `/terms-of-service` - شروط الخدمة

### صفحات لوحة التحكم للمغسلة (React Router)
- `/dashboard` - لوحة التحكم الرئيسية
- `/dashboard/cashier` - واجهة الكاشير
- `/dashboard/invoices` - إدارة الفواتير
- `/dashboard/customers` - إدارة العملاء
- `/dashboard/departments` - إدارة الأقسام
- `/dashboard/subitems` - إدارة القطع الفرعية
- `/dashboard/services` - إدارة الخدمات
- `/dashboard/employees` - إدارة الموظفين
- `/dashboard/coupons` - إدارة القسائم
- `/dashboard/financial` - الحسابات المالية
- `/dashboard/financial/payments` - المدفوعات
- `/dashboard/financial/revenues` - الإيرادات
- `/dashboard/reports` - التقارير
- `/dashboard/settings` - الإعدادات
- `/dashboard/work-sections/:section` - أقسام العمل (استلام، فرز، غسيل، كوي)
- `/dashboard/attendance` - الحضور والانصراف
- `/dashboard/salaries` - الرواتب والحوافز
- `/dashboard/devices` - إدارة الأجهزة
- `/dashboard/products` - إدارة المنتجات
- `/dashboard/suppliers` - إدارة الموردين
- `/dashboard/packages` - إدارة الباقات
- `/dashboard/subscriptions` - إدارة الاشتراكات
- `/subscription` - صفحة الاشتراك

### صفحات الإدارة (Next.js App Router)
- `/admin` - لوحة إدارة النظام
- `/admin/login` - تسجيل دخول الإدارة
- `/admin/users` - إدارة المستخدمين
- `/admin/laundries` - إدارة المغاسل
- `/admin/registrations` - طلبات التسجيل
- `/admin/settings` - إعدادات النظام
- `/admin/seo` - إعدادات SEO
- `/admin/analytics` - التحليلات

### صفحات الأخطاء
- `/401` - غير مصرح
- `/403` - محظور
- `/500` - خطأ في الخادم

## النشر | Deployment

Simply open [Lovable](https://lovable.dev/projects/364db488-c119-473a-beb8-afd2405c793c) and click on Share -> Publish.

## ربط نطاق مخصص | Custom Domain

Yes, you can connect a custom domain!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## المتطلبات | Requirements

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for backend services)
- TypeScript 5.8.3+
- Next.js 16.1.6+
- React 19.2.4+

## قاعدة تحديث README | README Update Rule

عند إضافة ميزة جديدة أو تحديث مهم، يجب تحديث README.md وفقاً للقواعد التالية:

### القواعد | Rules

1. **إضافة الميزات الجديدة**: عند إضافة ميزة جديدة، يجب تحديث قسم "الميزات الرئيسية" بإضافة وصف واضح بالعربية والإنجليزية
2. **تحديث التقنيات**: عند إضافة مكتبة أو تقنية جديدة، يجب تحديث قسم "التقنيات المستخدمة"
3. **تحديث البنية**: عند إضافة مجلد أو صفحة جديدة مهمة، يجب تحديث قسم "البنية الأساسية"
4. **تحديث المسارات**: عند إضافة مسار جديد، يجب تحديث قسم "الصفحات والمسارات"
5. **الحفاظ على التنسيق**: يجب الحفاظ على التنسيق ثنائي اللغة (عربي/إنجليزي) في جميع الأقسام
6. **استخدام الإيموجي**: استخدام الإيموجي المناسب لكل قسم لسهولة القراءة

### مثال على التحديث | Update Example

عند إضافة ميزة "إدارة المخزون":
- إضافة قسم جديد في "الميزات الرئيسية"
- إضافة المسار الجديد في "الصفحات والمسارات"
- تحديث "البنية الأساسية" إذا تم إضافة مجلد جديد

## الترخيص | License

This project is private and proprietary.
