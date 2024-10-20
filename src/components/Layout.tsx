import { Open_Sans } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import clsx from "clsx";

const open_sans = Open_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main
      className={clsx(
        "grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto] gap-4",
        open_sans.className,
      )}
    >
      <Header />
      <div className="box">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
