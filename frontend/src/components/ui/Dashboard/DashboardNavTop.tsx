"use client";

import { ModeToggle } from "@/components/ui/themeToggle";
import { usePathname } from "next/navigation";

export default function DashboardNavTop() {
  const pathName = usePathname().split("/");
  const tab = pathName[pathName.length - 1].split("-");

  return (
    <div className="flex px-5 py-2 items-center justify-between">
      <div className="text-sm font-bold">
        <span className="opacity-60">Dashboard</span> {">"}{" "}
        <span className="capitalize">{tab.join(" ")}</span>
      </div>
      <ModeToggle />
    </div>
  );
}
