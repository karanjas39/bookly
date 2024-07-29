import Image from "next/image";
import Banner from "../../public/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 items-center w-[80%] mx-auto mt-3">
        <div className="flex flex-col gap-3">
          <p className="text-7xl font-extrabold">
            Affordable Textbooks, Shared Knowledge
          </p>
          <p className="text-xl opacity-80">
            Bookly is the platform for university students to buy, sell, and
            share used textbooks and study materials at affordable prices.
          </p>
          <Link href="/login">
            <Button variant="default" className="w-min">
              Join Bookly Today
            </Button>
          </Link>
        </div>
        <Image
          src={Banner}
          objectFit="cover"
          alt="Banner of the Website"
          className="rounded-md h-[90%] bg-blend-normal"
        />
      </div>
      <Footer />
    </>
  );
}
