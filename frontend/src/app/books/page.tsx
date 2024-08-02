"use client";

import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import BookTemplate from "@/components/ui/Books/BookTemplate";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bookApi } from "@/store/api/bookApi";

function Books() {
  const { data, isLoading } = bookApi.useGetAllBooksQuery();

  if (isLoading && !data) return <Loader />;

  console.log(data);

  return (
    <div>
      <NavBar />
      <div className="w-[60%] mx-auto mt-3">
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold ">Books Catalog</p>
          <Input placeholder="Search by title or author" />
        </div>
        <ScrollArea className="h-[550px] min-h-max p-4 mt-7 pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {data &&
              data.books &&
              data.books.map((book) => (
                <BookTemplate key={book.id} book={book} />
              ))}
          </div>
        </ScrollArea>
      </div>
      <Footer />
    </div>
  );
}

export default Books;
