import { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { Sun, Moon, Menu, X } from "react-feather";
import personalInfo from "./data/personalInfo.json";

interface HeaderProps {
  mounted: boolean;
  resolvedTheme?: string; // can be undefined during SSR
  setTheme: (theme: string) => void;
  scrolled: boolean;
}

const Header = ({ mounted, resolvedTheme, setTheme, scrolled }: HeaderProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = resolvedTheme ?? "light";
  const navItems = [
    { title: "About", href: "/#about" },
    { title: "Publications", href: "/publications" },
    { title: "Projects", href: "/projects" },
    { title: "Skills", href: "/skills" },
    { title: "Blogs", href: "/blogs" },
    { title: "Misc", href: "/misc" },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={[
          "rounded-2xl border px-3 sm:px-4",
          scrolled
            ? "border-slate-200/90 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/88"
            : "border-white/20 bg-white/20 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/30",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="min-w-0">
            <span className="group relative inline-flex items-center overflow-hidden rounded-xl border border-slate-900/80 bg-white px-3 py-2 shadow-[0_6px_18px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(37,99,235,0.14)] dark:border-slate-200/70 dark:bg-slate-950">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-blue-500 to-sky-400"
              />
              <span className="pl-2 text-[11px] font-extrabold tracking-[0.2em] text-slate-900 dark:text-slate-100">
                {personalInfo.name.toUpperCase()}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink key={item.href} title={item.title} href={item.href} />
              ))}
            </nav>

            {mounted ? (
              <button
                type="button"
                aria-label="Change theme"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon size={18} aria-label="Moon" /> : <Sun size={18} aria-label="Sun" />}
              </button>
            ) : (
              <div className="h-10 w-10 rounded-xl border border-slate-200/80 dark:border-slate-700" aria-hidden="true" />
            )}

            <a
              href={`mailto:${personalInfo.about.email}`}
              className="hidden h-10 items-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition hover:brightness-105 lg:inline-flex"
            >
              Contact Me
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pb-4 lg:hidden">
            <nav className="surface-card grid gap-2 p-3">
              {navItems.map((item) => (
                <NavLink
                  key={`mobile-${item.href}`}
                  title={item.title}
                  href={item.href}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
