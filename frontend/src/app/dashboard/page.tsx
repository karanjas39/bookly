"use client";

import { useAuth } from "@/components/auth-provider";
import { getUser } from "@/utils/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { setAuthorized, setUser } = useAuth();

  useEffect(() => {
    const booklyToken = localStorage.getItem("booklyToken") || "";
    if (!booklyToken) {
      router.push("/signin");
    }
    let user;
    (async () => {
      user = await getUser({ token: booklyToken });
      if (!user.success || !user.data || !user.data.user)
        return router.push("/signin");
      setUser(user.data.user);
      setAuthorized(true);
    })();
  }, []);
  return <div>Dashboard</div>;
}
