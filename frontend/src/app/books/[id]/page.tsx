"use client";

import NavBar from "@/components/navBar";
import Bookdetails from "@/components/ui/Books/BookDetails";
import Loader from "@/components/ui/Loader";
import { bookApi } from "@/store/api/bookApi";
import { useParams } from "next/navigation";

function BookDetails() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { data, isLoading } = bookApi.useGetBookDetailsQuery({ bookId: id });

  return (
    <div>
      <NavBar />
      {isLoading && !data ? (
        <Loader />
      ) : (
        data?.book && <Bookdetails book={data.book} />
      )}
    </div>
  );
}

export default BookDetails;
