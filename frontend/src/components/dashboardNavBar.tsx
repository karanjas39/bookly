"use client";

import { type ReactNode } from "react";
import DashboardNavItems from "./ui/Dashboard/DashboardNavItems";
import Logo from "./ui/logo";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import { useRouter } from "next/navigation";

function DashboardNavPara({ children }: { children: ReactNode }) {
  return (
    <p className="text-[16px] font-bold cursor-pointer hidden lg:block">
      {children}
    </p>
  );
}

export default function DashboardNavBar() {
  const router = useRouter();
  return (
    <div className="flex flex-col px-4 py-3 bg-secondary">
      <DashboardNavItems item="end">
        <span className="hidden lg:block">
          <Logo />
        </span>
        <MenuTwoToneIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
      </DashboardNavItems>
      <div className="mt-12 flex flex-col gap-3 justify-center h-full">
        <DashboardNavItems gap={3}>
          <PersonTwoToneIcon />
          <DashboardNavPara>Profile</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems gap={3}>
          <AddTwoToneIcon />
          <DashboardNavPara>Add Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems gap={3}>
          <SearchTwoToneIcon />
          <DashboardNavPara>Explore Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems gap={3}>
          <ImportContactsTwoToneIcon />
          <DashboardNavPara>Book Requests</DashboardNavPara>
        </DashboardNavItems>
      </div>
      <DashboardNavItems gap={3}>
        <SettingsTwoToneIcon />
        <DashboardNavPara>Settings</DashboardNavPara>
      </DashboardNavItems>
    </div>
  );
}
