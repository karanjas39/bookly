import { portfolioLink } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex items-start justify-between text-sm p-4 flex-col gap-2 lg:flex-row">
      <p className="text-muted-foreground text-sm">
        &copy; {currentYear} Bookly. All rights reserved.
      </p>
      <p className="text-muted-foreground">
        Developed and designed by{" "}
        <a
          href={portfolioLink}
          target="_blank"
          className="font-bold text-primary"
        >
          Jaskaran Singh
        </a>
      </p>
    </div>
  );
}
