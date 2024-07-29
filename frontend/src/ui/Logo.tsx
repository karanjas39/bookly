import Image from "next/image";
import LogoImg from "../../public/logo.png";
import { websiteName } from "@/utils/constants";
import Link from "next/link";
import { Edu_VIC_WA_NT_Beginner } from "next/font/google";

const fontStyle = Edu_VIC_WA_NT_Beginner({
  subsets: ["latin"],
  weight: ["700"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <Image alt="Logo Image" src={LogoImg} width={40} height={40} />
        <p className={`${fontStyle.className} text-3xl font-[700]`}>
          {websiteName}
        </p>
      </div>
    </Link>
  );
};
