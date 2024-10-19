import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const navItems = [
    {
      key: "Imágenes",
      path: "/imagenes",
      icon: null,
    },
    {
      key: "GitHub",
      path: "https://github.com/emrocode/piks",
      icon: ArrowUpRightIcon,
    },
  ];

  return (
    <header>
      <nav className="h-16 flex items-center justify-between box">
        <Link href="/" className="font-bold text-xl uppercase">
          piks 🎃
        </Link>
        <ul className="flex items-center gap-x-2">
          {navItems.map((item) => (
            <li
              key={item.key}
              className="last:bg-piks-200 last:rounded-full last:ring-1 last:ring-piks-500/25"
            >
              <Link
                href={item.path}
                className="px-4 py-2 flex items-center gap-x-1 text-sm "
              >
                <span>{item.key}</span>
                {item.icon && <item.icon className="w-4" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
