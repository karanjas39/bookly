import { type MouseEventHandler, type ReactNode } from "react";

export default function DashboardNavItems({
  children,
  handleOnClick,
}: {
  children: ReactNode;
  handleOnClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      className="flex items-center cursor-pointer gap-4"
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
}
