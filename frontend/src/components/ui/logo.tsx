import Image from "next/image";
import LogoImg from "../../../public/logo.png";
import { websiteName } from "@/utils/constants";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";
import Link from "next/link";
const fontStyle = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={LogoImg} width={50} height={50} alt="Website Image" />
      <p className={`${fontStyle.className} font-bold text-2xl`}>
        {websiteName}
      </p>
    </Link>
  );
}
