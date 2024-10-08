"use client";

import { useState, type ReactNode } from "react";
import DashboardNavItems from "./DashboardNavItems";
import Logo from "@/components/ui/logo";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  EnvelopeOpenIcon,
  GearIcon,
  HamburgerMenuIcon,
  HomeIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

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
      <DashboardNavItems>
        {open && (
          <div className="hidden lg:block">
            <Logo />
          </div>
        )}
        <HamburgerMenuIcon
          onClick={() => setOpen((prev) => !prev)}
          className="icon-size"
        />
      </DashboardNavItems>
      <div className="mt-12 flex flex-col gap-5 h-full">
        <DashboardNavItems handleOnClick={() => router.push("/dashboard")}>
          <HomeIcon className="icon-size" />
          <DashboardNavPara open={open}>Dashboard</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/sell-book")}
        >
          <PlusIcon className="icon-size" />
          <DashboardNavPara open={open}>Sell Book</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/listed-books")}
        >
          <ListBulletIcon className="icon-size" />
          <DashboardNavPara open={open}>Listed Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/unlisted-books")}
        >
          <Pencil2Icon className="icon-size" />
          <DashboardNavPara open={open}>Unlisted Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems handleOnClick={() => router.push("/books")}>
          <MagnifyingGlassIcon className="icon-size" />

          <DashboardNavPara open={open}>Explore Books</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/book-requests")}
        >
          <BellIcon className="icon-size" />
          <DashboardNavPara open={open}>Book Requests</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/feedbacks")}
        >
          <EnvelopeOpenIcon className="icon-size" />
          <DashboardNavPara open={open}>Feedbacks</DashboardNavPara>
        </DashboardNavItems>
        <DashboardNavItems
          handleOnClick={() => router.push("/dashboard/settings")}
        >
          <GearIcon className="icon-size" />
          <DashboardNavPara open={open}>Settings</DashboardNavPara>
        </DashboardNavItems>
      </div>
    </div>
  );
}
