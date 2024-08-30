"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ListedBookDetail from "@/components/Dashboard/Listed Books/ListedBookDetail";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { bookApi } from "@/store/api/bookApi";
import { modifyDate } from "@/utils/helpers";

export default function ListedBooks() {
  const { data, isLoading } = bookApi.useMyBooksQuery({ listed: true });

  if (isLoading) return <Loader />;

  return (
    <ScrollArea className="h-[550px] min-h-max w-full mb-4">
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
                    <TableHead className="text-center hidden lg:block">
                      Listed On
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.books?.length &&
                    data.books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">
                          {book.name}
                        </TableCell>
                        <TableCell className="text-center hidden lg:block">
                          {modifyDate(book.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <ListedBookDetail id={book.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </>
            )}
            {!data?.books?.length && (
              <TableCaption>
                You have not listed any book for sale.
              </TableCaption>
            )}
          </Table>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
