"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/ui/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
} from "@/components/ui/table";
import { bookApi } from "@/store/api/bookApi";
import { modifyDate } from "@/utils/helpers";

export default function ListedBooks() {
  const { data, isLoading } = bookApi.useMyBooksQuery();

  if (isLoading) return <Loader />;

  return (
    // Add className="h-[50px] overflow-scroll" to content to scroll
    <Card>
      <CardHeader>
        <CardTitle>Listed Books</CardTitle>
        <CardDescription>
          Search and manage for books you have listed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="overflow-x-auto">
          {data?.books && (
            <>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead className="text-center">Listed On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.books?.length &&
                  data.books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.name}</TableCell>
                      <TableCell className="text-center">
                        {modifyDate(book.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button>More Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </>
          )}
          {!data?.books?.length && (
            <TableCaption>You have not listed any book for sale.</TableCaption>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
