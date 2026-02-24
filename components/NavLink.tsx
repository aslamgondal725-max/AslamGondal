import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  title: string;
  href: string; // can be "/publications" or "/#about"
  onNavigate?: () => void;
}

const NavLink = ({ title, href, onNavigate }: NavLinkProps): JSX.Element => {
  const router = useRouter();

  const isActive =
    href === router.pathname ||
    (href.startsWith("/#") && router.pathname === "/");

  const baseClass =
    "inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm font-medium transition duration-200";
  const activeClass =
    "border-blue-600 bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.25)] dark:border-blue-400 dark:bg-blue-400 dark:text-slate-950";
  const inactiveClass =
    "border-transparent text-slate-700 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-white/80 hover:shadow-sm dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900/70";

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only custom-handle hash links
    if (!href.includes("#")) {
      onNavigate?.();
      return;
    }

    e.preventDefault();

    const [path, hash] = href.split("#");
    const targetId = hash?.trim();

    // If link is like "/#about" and we are not on "/", navigate first
    const targetPath = path === "" ? "/" : path;

    if (router.pathname !== targetPath) {
      await router.push(targetPath);
    }

    if (!targetId) return;

    // Scroll after route is ready
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    onNavigate?.();
  };

  return (
    <Link href={href} legacyBehavior>
      <a
        onClick={handleClick}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        {title}
      </a>
    </Link>
  );
};

export default NavLink;
