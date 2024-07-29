import { portfolioLink } from "@/utils/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex items-center justify-between text-sm p-4">
      <p>&copy; {currentYear} Bookly. All rights reserved.</p>
      <p>
        Developed and designed by{" "}
        <a href={portfolioLink} className="font-bold">
          Jaskaran Singh
        </a>
      </p>
    </div>
  );
}
