"use client";

import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/themeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { token } = useSelector((s: RootState) => s.auth);
  const [isLoggedIn, setIsLoggedin] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    if (token) {
      setIsLoggedin(true);
    }
  }, [path, token]);

  return (
    <nav className="flex items-center px-4 py-2 justify-between relative top-0 left-0 right-0 z-50 w-full">
      <Logo />
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Link href={path === "/signup" ? "/signin" : "/signup"}>
            <Button>{path === "/signup" ? "Sign In" : "Sign Up"}</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
}
