import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface NavLinkProps {
  title: string;
  href: string; // can be "/publications" or "/#about"
}

const NavLink = ({ title, href }: NavLinkProps): JSX.Element => {
  const router = useRouter();

  const isActive =
    href === router.pathname ||
    (href.startsWith("/#") && router.pathname === "/");

  const baseClass =
    "px-3 py-1.5 rounded-full text-sm font-semibold transition border";
  const activeClass =
    "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white";
  const inactiveClass =
    "border-transparent text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700";

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only custom-handle hash links
    if (!href.includes("#")) return;

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
