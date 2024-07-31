import Image from "next/image";
import LoadingSVG from "../../../public/loader.svg";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-foreground  bg-opacity-30 backdrop-blur-sm z-50">
      <Image src={LoadingSVG} width={100} alt="Loading animation" />
    </div>
  );
}
