import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../button";
import { BookType } from "@/utils/types/apiTypes";
import Link from "next/link";

function BookTemplate({ book }: { book: BookType }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-2xl">{book.name}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <p className="font-bold text-xl">
            {book.price !== 0 ? <>&#8377; {book.price}</> : "Free"}
          </p>
          <Link href={`/books/${book.id}`}>
            <Button variant="outline">View details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookTemplate;
