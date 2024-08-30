"use client";

import AcceptedRequests from "@/components/Dashboard/AcceptedRequests";
import Profile from "@/components/Dashboard/UserProfile";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Profile />
      <AcceptedRequests />
    </div>
  );
}
