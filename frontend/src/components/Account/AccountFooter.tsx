import Link from "next/link";

interface accFooter {
  description: string;
  linkTitle: string;
  link: string;
}

function AccountFooter({ description, link, linkTitle }: accFooter) {
  return (
    <p className="text-sm mt-4">
      {description}{" "}
      <Link href={link} className="hover:underline font-bold">
        {linkTitle}
      </Link>
    </p>
  );
}

export default AccountFooter;
