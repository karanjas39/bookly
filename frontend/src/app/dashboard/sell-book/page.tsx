"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { genreApi } from "@/store/api/genreApi";
import Loader from "@/components/ui/Loader";
import { useState } from "react";
import { z_sellBook, z_sellBook_type } from "@singhjaskaran/bookly-common";
import { bookApi } from "@/store/api/bookApi";
import { useToast } from "@/components/ui/use-toast";
import { finalError } from "@/utils/constants";

export default function AddBook() {
  const [bookDetail, setBookDetail] = useState<z_sellBook_type>({
    name: "",
    author: "",
    description: "",
    genreId: "",
    price: 0,
  });
  const { toast } = useToast();
  const { data, isLoading } = genreApi.useGetGenresQuery();
  const [sellBook, { isLoading: isSellBookLoading }] =
    bookApi.useSellBookMutation();

  async function handleSellBook() {
    const { author, genreId, name } = bookDetail;
    if (!author || !genreId || !name) {
      return toast({ description: "All fields are required." });
    }

    const { success, data: sellBookdata } = z_sellBook
      .strip()
      .safeParse(bookDetail);
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await sellBook(sellBookdata).unwrap();
      if (response && response.success) {
        toast({ description: "Your book is successfuly listed for sale." });
        setBookDetail({
          name: "",
          author: "",
          description: "",
          genreId: "",
          price: 0,
        });
        return;
      } else throw new Error();
    } catch (error) {
      return toast({ description: finalError });
    }
  }

  if (isLoading) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sell Book</CardTitle>
        <CardDescription>Add a new book to sell</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mt-2">
          <Input
            label="Title"
            tag="title"
            type="text"
            placeholder="Enter book title"
            value={bookDetail.name}
            onChange={(e) =>
              setBookDetail((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">
              Description{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Enter book description"
              value={bookDetail.description}
              onChange={(e) =>
                setBookDetail((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={bookDetail.genreId}
              onValueChange={(e) =>
                setBookDetail((prev) => {
                  return { ...prev, genreId: e };
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select book genre" />
              </SelectTrigger>
              <SelectContent id="genre">
                {data?.allGenres?.length &&
                  data.allGenres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            label="Author"
            tag="author"
            placeholder="Enter author name"
            type="text"
            value={bookDetail.author}
            onChange={(e) =>
              setBookDetail((prev) => {
                return { ...prev, author: e.target.value };
              })
            }
          />
          <Input
            tag="price"
            label="Price"
            comment="In INR only"
            type="number"
            placeholder="Enter book price (in INR)"
            min={0}
            value={bookDetail.price}
            onChange={(e) =>
              setBookDetail((prev) => {
                return { ...prev, price: Number(e.target.value) };
              })
            }
          />
          <Button onClick={handleSellBook}>
            {isSellBookLoading ? "Listing book for sale..." : "Sell Book"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
