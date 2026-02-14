import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { Sun, Moon } from "react-feather";

interface HeaderProps {
  mounted: boolean;
  resolvedTheme?: string; // can be undefined during SSR
  setTheme: (theme: string) => void;
  scrolled: boolean;
}

const Header = ({ mounted, resolvedTheme, setTheme, scrolled }: HeaderProps): JSX.Element => {
  // ✅ fallback to avoid undefined during build/SSR
  const theme = resolvedTheme ?? "light";

  return (
    <header
      className={`z-10 pt-10 pb-1 mb-10 pl-0 top-0 right-0 left-0 transition border-b ${
        scrolled ? "border-gray-400" : "bg-transparent border-transparent"
      } sticky w-screen backdrop-filter backdrop-blur-md`}
    >
      <div className="h-0 pb-9 pl-5 max-w-4xl w-full flex items-center justify-between m-auto">
        <Link href="/" aria-label="Home">
          <Image
            className="cursor-pointer transition-colors flex !p-1 rounded-md mr-8 hover:bg-gray-300 text-lg dark:filter dark:invert"
            src="/favicon/favicon.svg"
            width={45}
            height={45}
            alt="favicon"
          />
        </Link>

        <nav className="flex items-center justify-between pr-4 gap-2">
          <NavLink title="About" href="/#about" />
          <NavLink title="Publications" href="/publications" />
          <NavLink title="Projects" href="/projects" />
          <NavLink title="Skills" href="/skills" />
          <NavLink title="Misc" href="/misc" />

          {mounted ? (
            <button
              type="button"
              aria-label="Change theme"
              className="cursor-pointer hover:bg-gray-300 p-1 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-30 rounded-md"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <abbr title="Switch theme">
                {theme === "light" ? (
                  <Moon size={22} aria-label="Moon" />
                ) : (
                  <Sun size={22} aria-label="Sun" />
                )}
              </abbr>
            </button>
          ) : (
            <div className="p-1 w-[30px] h-[30px]" aria-hidden="true" />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
