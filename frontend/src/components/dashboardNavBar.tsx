"use client";

import { useState, type ReactNode } from "react";
import DashboardNavItems from "./ui/Dashboard/DashboardNavItems";
import Logo from "./ui/logo";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ImportContactsTwoToneIcon from "@mui/icons-material/ImportContactsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { useRouter } from "next/navigation";

function DashboardNavPara({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
}) {
  return (
    <>
      {open && (
        <p className="text-[16px] font-bold cursor-pointer hidden lg:block">
          {children}
        </p>
      )}
    </>
  );
}

export default function DashboardNavBar() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="flex flex-col px-4 py-3 bg-secondary">
      <DashboardNavItems item="end">
        {open && (
          <div className="hidden lg:block">
            <Logo />
          </div>
        )}
        <MenuTwoToneIcon
          fontSize="large"
          onClick={() => setOpen((prev) => !prev)}
        />
      </DashboardNavItems>
      <div className="mt-12 flex flex-col gap-3 justify-center h-full">
        <DashboardNavItems handleOnClick={() => router.push("/")}>
          <HomeTwoToneIcon titleAccess="Home" />
          <DashboardNavPara open={open}>Home</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/profile")}
        >
          <PersonTwoToneIcon titleAccess="Profile" />
          <DashboardNavPara open={open}>Profile</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/add-book")}
        >
          <AddTwoToneIcon titleAccess="Add Books" />
          <DashboardNavPara open={open}>Add Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems>
          <SearchTwoToneIcon titleAccess="Explore Books" />
          <DashboardNavPara open={open}>Explore Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/book-requests")}
        >
          <ImportContactsTwoToneIcon titleAccess="Book Requests" />
          <DashboardNavPara open={open}>Book Requests</DashboardNavPara>
        </DashboardNavItems>
      </div>
      <DashboardNavItems
        handleOnClick={() => router.push("/dashboard/settings")}
      >
        <SettingsTwoToneIcon titleAccess="Settings" />
        <DashboardNavPara open={open}>Settings</DashboardNavPara>
      </DashboardNavItems>
    </div>
  );
}
