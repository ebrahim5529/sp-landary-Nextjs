import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Palette, Droplet, Sparkles, Flame, Monitor } from "lucide-react";

const themes = [
  {
    value: "light",
    label: "فاتح",
    icon: Sun,
  },
  {
    value: "dark",
    label: "داكن",
    icon: Moon,
  },
  {
    value: "blue",
    label: "أزرق",
    icon: Droplet,
  },
  {
    value: "green",
    label: "أخضر",
    icon: Palette,
  },
  {
    value: "purple",
    label: "بنفسجي",
    icon: Sparkles,
  },
  {
    value: "orange",
    label: "برتقالي",
    icon: Flame,
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10">
        <Monitor className="h-5 w-5" />
      </Button>
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <CurrentIcon className="h-5 w-5" />
          <span className="sr-only">تغيير الثيم</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>اختر الثيم</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme || "light"} onValueChange={setTheme}>
          {themes.map((themeOption) => {
            const Icon = themeOption.icon;
            return (
              <DropdownMenuRadioItem key={themeOption.value} value={themeOption.value}>
                <Icon className="ml-2 h-4 w-4" />
                {themeOption.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

