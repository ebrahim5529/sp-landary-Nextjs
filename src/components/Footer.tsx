"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CreditCard,
  Wallet,
  Building2,
  Smartphone,
  Home,
  Info,
  Sparkles,
  BadgeDollarSign
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/logo.svg"
                alt="الفرسان المغاسل"
                className="h-10 w-auto bg-transparent"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              خدمات غسيل وكي احترافية لملابسك
            </p>
            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="تويتر"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="إنستغرام"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Info className="h-4 w-4" />
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Sparkles className="h-4 w-4" />
                  <span>الخدمات</span>
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <BadgeDollarSign className="h-4 w-4" />
                  <span>الأسعار</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@splaundry.com" className="hover:text-primary transition-colors">
                  info@splaundry.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+966500000000" className="hover:text-primary transition-colors">
                  +966 50 XXX XXXX
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>متاح 24/7</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">طرق الدفع</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-5 w-5" />
                <span>بطاقات الائتمان</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-5 w-5" />
                <span>الدفع النقدي</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5" />
                <span>تحويل بنكي</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Smartphone className="h-5 w-5" />
                <span>الدفع الإلكتروني</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 مغاسل SP. جميع الحقوق محفوظة
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                سياسة الخصوصية
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                href="/terms-of-service"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
