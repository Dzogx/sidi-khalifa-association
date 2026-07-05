import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout Component
 * 
 * Wraps all pages with Header and Footer
 * Ensures consistent structure across the site
 */

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
