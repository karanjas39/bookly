import Image from "next/image";
import LogoImg from "../../../public/logo.png";
import { websiteName } from "@/utils/constants";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-end gap-2">
      <Image src={LogoImg} width={40} height={40} alt="Website Image" />
      <p className="font-bold text-2xl">{websiteName}</p>
    </Link>
  );
}
