import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Header Component
 * 
 * Design: Saharan Modern Architecture
 * - Deep navy background with warm gold accents
 * - Logo and navigation in RTL layout
 * - Responsive mobile menu
 * - Dark mode toggle
 */

const navigation = [
  { label: "الرئيسية", href: "/" },
  { label: "عن الجمعية", href: "/about" },
  { label: "أعضاء المجلس", href: "/board" },
  { label: "المشاريع", href: "/projects" },
  { label: "الأخبار", href: "/news" },
  { label: "الفعاليات", href: "/events" },
  { label: "المعرض", href: "/gallery" },
  { label: "الخدمات", href: "/services" },
  { label: "التواصل", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-[#E8E3D8] dark:border-slate-800 shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-3 flex-shrink-0 hover:opacity-80 transition-opacity">
            <img
              src="/manus-storage/logo_1f2ed626.png"
              alt="شعار جمعية حي سيدي خليفة القادري"
              className="h-12 w-12"
            />
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] text-sm leading-tight">
                جمعية حي
              </span>
              <span className="font-bold text-[#0F3A5F] dark:text-[#D4AF37] text-sm leading-tight">
                سيدي خليفة
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="px-3 py-2 text-sm font-medium text-[#0F3A5F] dark:text-[#E8E3D8] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors rounded-md hover:bg-[#F5F1E8] dark:hover:bg-slate-800">
                {item.label}
              </a>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-lg"
            aria-label="تبديل المظهر"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-[#D4AF37]" />
            ) : (
              <Moon className="h-5 w-5 text-[#0F3A5F]" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-lg"
            aria-label="فتح القائمة"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[#0F3A5F] dark:text-[#E8E3D8]" />
            ) : (
              <Menu className="h-6 w-6 text-[#0F3A5F] dark:text-[#E8E3D8]" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden border-t border-[#E8E3D8] dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="container py-4 space-y-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-4 py-2 text-sm font-medium text-[#0F3A5F] dark:text-[#E8E3D8] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors rounded-md hover:bg-[#F5F1E8] dark:hover:bg-slate-800"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
