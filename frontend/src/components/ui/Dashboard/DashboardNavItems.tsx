import { type MouseEventHandler, type ReactNode } from "react";

export default function DashboardNavItems({
  children,
  handleOnClick,
  gap,
}: {
  children: ReactNode;
  handleOnClick?: MouseEventHandler<HTMLDivElement>;
  gap?: string;
}) {
  return (
    <div
      className={`flex items-center  ${
        !gap ? "gap-3" : `gap-${gap}`
      } cursor-pointer`}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
}
