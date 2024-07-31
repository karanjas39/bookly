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
      className={`flex items-center  gap-3 cursor-pointer`}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
}
