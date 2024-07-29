import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/themeToggle";
import { navLinks } from "@/utils/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="flex items-center px-4 py-2 justify-between">
      <Logo />
      <div className="flex items-center gap-3">
        {navLinks.map((link, i) => (
          <Link href={link.href} key={i}>
            {link.title}
          </Link>
        ))}
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
