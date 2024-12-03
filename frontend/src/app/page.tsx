import Image from "next/image";
import Banner from "../../public/bookly.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/Navbar";
import { BookText, Share2, TrendingUp } from "lucide-react";

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
              Explore bookly&apos;s stock
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
      <section id="features" className="py-24 bg-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-background">
            Why Choose Bookly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-slate-50" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-background">
                Best Prices
              </h3>
              <p className="text-muted-foreground">
                Save up to 60% compared to new textbooks. Set your own prices
                when selling.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <Share2 className="h-8 w-8 text-slate-50" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-background">
                Easy Exchange
              </h3>
              <p className="text-muted-foreground">
                Connect with students on your campus for quick and easy
                exchanges.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <BookText className="h-8 w-8 text-slate-50" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-background">
                Study Materials
              </h3>
              <p className="text-muted-foreground">
                Access shared study guides, notes, and practice materials from
                other students.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
