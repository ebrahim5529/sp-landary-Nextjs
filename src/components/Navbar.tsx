"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="الفرسان المغاسل"
              className="h-12 w-auto bg-transparent"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              الرئيسية
            </Link>
            <Link href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">
              من نحن
            </Link>
            <Link href="/#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              الأسعار
            </Link>
            <Link href="/#services" className="text-foreground hover:text-primary transition-colors font-medium">
              الخدمات
            </Link>
            <ThemeToggle />
            <Link href="/auth">
              <Button variant="default" size="lg" className="font-bold">
                تسجيل الدخول
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-foreground hover:text-primary transition-colors font-medium">
              الرئيسية
            </Link>
            <Link href="/#about" className="block text-foreground hover:text-primary transition-colors font-medium">
              من نحن
            </Link>
            <Link href="/#pricing" className="block text-foreground hover:text-primary transition-colors font-medium">
              الأسعار
            </Link>
            <Link href="/#services" className="block text-foreground hover:text-primary transition-colors font-medium">
              الخدمات
            </Link>
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground font-medium">الثيم:</span>
              <ThemeToggle />
            </div>
            <Link href="/auth">
              <Button variant="default" size="lg" className="w-full font-bold">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
