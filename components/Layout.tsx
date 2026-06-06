import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header />

      <main className="page-shell w-full flex-1 px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
