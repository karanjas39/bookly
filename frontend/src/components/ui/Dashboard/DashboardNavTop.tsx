"use client";

import { ModeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearToken } from "@/store/slices/authSlice";
import { authApi } from "@/store/api/authApi";
import { bookApi } from "@/store/api/bookApi";
import { genreApi } from "@/store/api/genreApi";
import { userApi } from "@/store/api/userApi";
import { AppDispatch } from "@/store";
import { feedbackApi } from "@/store/api/feedbackApi";

export default function DashboardNavTop() {
  const pathName = usePathname().split("/");
  const tab = pathName[pathName.length - 1].split("-");
  const isTabNotDashboard = tab.join(" ") != "dashboard";
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch((dispatch) => {
      dispatch(authApi.util.resetApiState());
      dispatch(bookApi.util.resetApiState());
      dispatch(genreApi.util.resetApiState());
      dispatch(userApi.util.resetApiState());
      dispatch(feedbackApi.util.resetApiState());
      dispatch(clearToken());
    });
    router.replace("/signin");
  }

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
        <Button onClick={handleLogout}>Logout</Button>
        <ModeToggle />
      </div>
    </div>
  );
}
