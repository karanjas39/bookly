"use client";

import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Navbar/Navbar";
import Loader from "@/components/ui/Loader";
import { bookApi } from "@/store/api/bookApi";
import { BooksTable } from "@/components/Books/BooksTable/data-table";
import { columns } from "@/components/Books/BooksTable/columns";

function Books() {
  const { data, isLoading } = bookApi.useGetAllBooksQuery();

  if (isLoading && !data) return <Loader />;

  return (
    <div className="flex flex-col gap-3 h-screen">
      <Navbar />
      <div className="w-[80%] mx-auto mt-3 flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold ">Bookly's Stock</p>
        </div>
        <div>
          {data && data.books?.length ? (
            <BooksTable columns={columns} data={data.books} />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Books;
