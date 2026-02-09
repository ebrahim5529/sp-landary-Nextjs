import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Palette, Droplet, Sparkles, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  {
    value: "light",
    label: "فاتح",
    icon: Sun,
    description: "الثيم الفاتح الافتراضي",
  },
  {
    value: "dark",
    label: "داكن",
    icon: Moon,
    description: "الثيم الداكن",
  },
  {
    value: "blue",
    label: "أزرق",
    icon: Droplet,
    description: "ثيم أزرق",
  },
  {
    value: "green",
    label: "أخضر",
    icon: Palette,
    description: "ثيم أخضر",
  },
  {
    value: "purple",
    label: "بنفسجي",
    icon: Sparkles,
    description: "ثيم بنفسجي",
  },
  {
    value: "orange",
    label: "برتقالي",
    icon: Flame,
    description: "ثيم برتقالي",
  },
];

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الثيم</CardTitle>
        <CardDescription>اختر الثيم المفضل لديك لتخصيص مظهر التطبيق</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={theme || "light"} onValueChange={setTheme} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            const isSelected = theme === themeOption.value;
            return (
              <div key={themeOption.value} className="relative">
                <RadioGroupItem
                  value={themeOption.value}
                  id={themeOption.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={themeOption.value}
                  className={cn(
                    "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-card p-4 hover:bg-accent hover:text-accent-foreground transition-colors",
                    isSelected ? "border-primary" : "border-muted"
                  )}
                >
                  <Icon className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">{themeOption.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">{themeOption.description}</span>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

