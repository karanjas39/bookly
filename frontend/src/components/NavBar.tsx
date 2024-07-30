"use client";

import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  return (
    <nav className="flex items-center px-4 py-2 justify-between relative top-0 left-0 right-0 z-50 w-full">
      <Logo />
      <div className="flex items-center gap-4">
        <Link href={path === "/signup" ? "signin" : "signup"}>
          <Button variant="default">
            {path === "/signup" ? "Sign In" : "Sign Up"}
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
