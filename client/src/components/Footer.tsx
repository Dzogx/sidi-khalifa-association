import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

/**
 * Footer Component
 * 
 * Design: Saharan Modern Architecture
 * - Deep navy background with warm gold accents
 * - Multiple sections: About, Quick Links, Contact, Social
 * - RTL layout support
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3A5F] dark:bg-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#D4AF37]">عن الجمعية</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              جمعية حي سيدي خليفة القادري تسعى لخدمة المجتمع وتطويره من خلال مشاريع مستدامة وفعاليات مجتمعية.
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#D4AF37]">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    عن الجمعية
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    المشاريع
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    الأخبار
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    الفعاليات
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#D4AF37]">الخدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/membership">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    العضوية
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/volunteer">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    التطوع
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/complaints">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    الشكاوى والمقترحات
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/documents">
                  <a className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                    الوثائق
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#D4AF37]">التواصل</h3>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin className="h-5 w-5 flex-shrink-0 text-[#D4AF37] mt-0.5" />
                <div>
                  <p className="text-gray-300">العالية، ولاية تقرت</p>
                  <p className="text-gray-300">الجزائر</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
                <a href="tel:+213" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  +213 (0) ...
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="h-5 w-5 flex-shrink-0 text-[#D4AF37]" />
                <a href="mailto:info@example.com" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  info@example.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#D4AF37]/20 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <p>
            &copy; {currentYear} جمعية حي سيدي خليفة القادري. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy">
              <a className="hover:text-[#D4AF37] transition-colors">
                سياسة الخصوصية
              </a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-[#D4AF37] transition-colors">
                شروط الاستخدام
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
