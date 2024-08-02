"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UnlistedBookDetail from "@/components/ui/Dashboard/Unlisted Books/UnListedBookDetail";
import Loader from "@/components/ui/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookApi } from "@/store/api/bookApi";
import { modifyDate } from "@/utils/helpers";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function UnlistedBooks() {
  const { data, isLoading } = bookApi.useMyBooksQuery({ listed: false });

  if (isLoading) return <Loader />;

  return (
    <ScrollArea className="h-[550px] min-h-max w-full mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Unlisted Books</CardTitle>
          <CardDescription>
            Search and manage for books you have listed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
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
                          <UnlistedBookDetail id={book.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </>
            )}
            {!data?.books?.length && (
              <TableCaption>You have not saved any book as draft.</TableCaption>
            )}
          </Table>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
