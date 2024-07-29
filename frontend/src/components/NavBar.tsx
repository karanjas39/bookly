import { Logo } from "@/ui/Logo";
import { navLinks } from "@/utils/constants";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitcher";
import { Button } from "@/ui/Button";

export default function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-3 py-2">
      <Logo />
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        {navLinks.map((link) => (
          <Link href={link.href} className="text-base">
            {link.title}
          </Link>
        ))}
        <Button fontSize="text-base" href="/signin">
          Login
        </Button>
      </div>
    </nav>
  );
}
