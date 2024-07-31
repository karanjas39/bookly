import { type MouseEventHandler, type ReactNode } from "react";

export default function DashboardNavItems({
  children,
  item,
  handleOnClick,
}: {
  children: ReactNode;
  item?: "center" | "start" | "end";
  handleOnClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className={`flex items-${item ? item : "center"}  gap-4 cursor-pointer`}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
}
