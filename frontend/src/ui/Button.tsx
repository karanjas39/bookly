import Link from "next/link";
import { type ReactNode } from "react";

export const Button = ({
  children,
  fontSize,
  href,
}: {
  children: ReactNode;
  fontSize?: string;
  href?: string;
}) => {
  const styles = `bg-main text-textColor rounded-lg px-5 py-1 ${
    fontSize ?? "text-xl"
  } hover:opacity-85 transition-opacity duration-300`;

  if (href) {
    return (
      <Link href={href}>
        <button className={styles}>{children}</button>
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
};
