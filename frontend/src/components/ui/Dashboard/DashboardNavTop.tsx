"use client";

import { ModeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";

export default function DashboardNavTop() {
  const pathName = usePathname().split("/");
  const tab = pathName[pathName.length - 1].split("-");
  const isTabNotDashboard = tab.join(" ") != "dashboard";
  const dispatch = useDispatch();

  return (
    <div className="flex px-5 py-2 items-center justify-between">
      <div className="text-sm font-bold">
        <span className={isTabNotDashboard ? "opacity-60" : "opacity-100"}>
          Dashboard
        </span>{" "}
        {isTabNotDashboard ? "> " : null}
        <span className="capitalize">
          {isTabNotDashboard ? tab.join(" ") : null}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/" onClick={() => dispatch(clearToken())}>
          <Button>Logout</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
