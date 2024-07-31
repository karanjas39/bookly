"use client";

import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";

interface ClientProvidersProps {
  children: ReactNode;
}

const ProtectedProvider = ({ children }: ClientProvidersProps) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      router.replace("/signin");
    }
  }, [token, router]);

  return token ? <div>{children}</div> : null;
};

export default ProtectedProvider;
