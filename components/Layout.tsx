import { useState, useEffect } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useTheme } from "next-themes";

import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollPosition(
    ({ currPos }) => {
      setScrolled(currPos.y <= -20);
    },
    [scrolled]
  );

  return (
    <>
      <Header
        mounted={mounted}
        resolvedTheme={resolvedTheme}
        setTheme={setTheme}
        scrolled={scrolled}
      />

      {/* ✅ Center the whole site content */}
      <main className="w-full">
        <div className="max-w-4xl mx-auto px-6">{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
