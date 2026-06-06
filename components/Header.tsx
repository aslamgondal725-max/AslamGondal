import { useEffect, useState } from "react";
import Link from "next/link";
import NavLink from "./NavLink";
import { Menu, X } from "react-feather";
import personalInfo from "./data/personalInfo.json";

// No props: the theme toggle (and its mounted/theme state) has been removed,
// and the header now uses a fixed paper background, so `scrolled` is unused.
type HeaderProps = Record<string, never>;

const contactClass =
  "inline-flex flex-none items-center justify-center gap-2 whitespace-nowrap rounded-sm border border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-black";

const Header = ({}: HeaderProps): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { title: "About", href: "/#about" },
    { title: "Publications", href: "/publications" },
    { title: "Projects", href: "/projects" },
    { title: "Skills", href: "/skills" },
    { title: "Blogs", href: "/blogs" },
    { title: "Misc", href: "/misc" },
  ];

  const contactHref = "mailto:Aslamgondal725@gmail.com?subject=Website%20Inquiry";
  const contactTitle =
    "Email: Aslamgondal725@gmail.com | Phone: +4915560801280";
  const contactAriaLabel =
    "Contact me by email at Aslamgondal725@gmail.com or phone at +4915560801280";

  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-paper">
      <div className="page-shell px-4 sm:px-6 lg:px-8">
        <div className="flex h-[74px] items-center justify-between gap-4">
          <Link href="/" className="min-w-0">
            <span className="font-serif text-xl font-medium tracking-tight text-ink">
              {personalInfo.name}.
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <NavLink key={item.href} title={item.title} href={item.href} />
              ))}
            </nav>

            <a
              href={contactHref}
              title={contactTitle}
              aria-label={contactAriaLabel}
              className={`hidden lg:inline-flex ${contactClass}`}
            >
              Contact
            </a>

            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink lg:hidden"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-b border-line bg-paper lg:hidden">
          <nav className="page-shell flex flex-col gap-4 px-4 py-5 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={`mobile-${item.href}`}
                title={item.title}
                href={item.href}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
            <a
              href={contactHref}
              title={contactTitle}
              aria-label={contactAriaLabel}
              onClick={() => setMenuOpen(false)}
              className={`${contactClass} self-start`}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
