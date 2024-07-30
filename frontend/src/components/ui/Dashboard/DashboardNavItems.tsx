import { type ReactNode } from "react";

export default function DashboardNavItems({
  children,
  item,
  gap,
}: {
  children: ReactNode;
  item?: "center" | "start" | "end";
  gap?: number;
}) {
  return (
    <div
      className={`flex items-${item ? item : "center"} gap-${gap ? gap : 6}`}
    >
      {children}
    </div>
  );
}
