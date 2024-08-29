import Image from "next/image";
import Banner from "../../public/bookly.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 items-center lg:w-[80%] w-[90%] mx-auto mt-8 lg:mt-3">
        <div className="flex flex-col gap-3">
          <p className="lg:text-7xl text-5xl font-extrabold">
            Affordable Textbooks, Shared Knowledge
          </p>
          <p className="lg:text-xl text-lg opacity-80">
            Bookly is the platform for university students to buy, sell, and
            share used textbooks and study materials at affordable prices.
          </p>
          <Link href="/books">
            <Button variant="default" className="w-min">
              Explore bookly's stock
            </Button>
          </Link>
        </div>
        <Image
          src={Banner}
          objectFit="cover"
          alt="Banner of the Website"
          className="rounded-md h-[90%]"
        />
      </div>
      <Footer />
    </>
  );
}
