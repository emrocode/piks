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
      isExternal: true,
    },
  ];

  return (
    <header>
      <nav className="box flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold uppercase">
          piks 🎃
        </Link>
        <ul className="flex items-center gap-x-1">
          {navItems.map((item) => (
            <li key={item.key}>
              <Link
                href={item.path}
                className="flex items-center gap-x-1 px-3 py-1.5 text-sm font-medium [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out [&>svg]:hover:-translate-y-0.5 [&>svg]:hover:translate-x-0.5"
                {...(item.isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
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
