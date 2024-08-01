"use client";

import { Badge } from "@/components/ui/badge";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
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
        <Table className="max-h-[100px] overflow-scroll">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Listed On</TableHead>
              <TableHead>Price (INR)</TableHead>
              <TableHead className="text-right">Listed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.books &&
              data.books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.name}</TableCell>
                  <TableCell>{modifyDate(book.createdAt)}</TableCell>
                  <TableCell>
                    {book.price ? (
                      <Badge variant="outline">{book.price}</Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {book.listed ? (
                      <Badge>Yes</Badge>
                    ) : (
                      <Badge variant="destructive">No</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
