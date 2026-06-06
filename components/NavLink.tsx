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
    "group relative inline-flex items-center text-sm font-medium transition-colors duration-200";
  const stateClass = isActive
    ? "text-ink"
    : "text-ink-soft hover:text-ink";

  const underlineClass = [
    "pointer-events-none absolute -bottom-1 left-0 h-[1.5px] w-full origin-left bg-ink transition-transform duration-200",
    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
  ].join(" ");

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
      <a onClick={handleClick} className={`${baseClass} ${stateClass}`}>
        {title}
        <span aria-hidden="true" className={underlineClass} />
      </a>
    </Link>
  );
};

export default NavLink;
