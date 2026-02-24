import { useEffect, useState } from "react";
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
    <div className="min-h-screen py-3 sm:py-4">
      <div className="page-shell">
        <div className="app-canvas overflow-hidden">
          <Header
            mounted={mounted}
            resolvedTheme={resolvedTheme}
            setTheme={setTheme}
            scrolled={scrolled}
          />

          <main className="w-full px-4 pb-8 pt-3 sm:px-6 sm:pb-10 sm:pt-5 lg:px-8">
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
