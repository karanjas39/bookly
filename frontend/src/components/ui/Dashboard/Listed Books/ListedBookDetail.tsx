import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { bookApi } from "@/store/api/bookApi";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { genreApi } from "@/store/api/genreApi";
import { z_sellBook_type } from "@singhjaskaran/bookly-common";
import { useToast } from "../../use-toast";
import { finalError } from "@/utils/constants";

interface bookDetailType extends z_sellBook_type {
  listed: boolean;
}

function ListedBookDetail({ id }: { id: string }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { data, isLoading } = bookApi.useGetBookByIdQuery(
    { bookId: id },
    { skip: !isDetailsVisible }
  );
  const [bookDetail, setBookDetail] = useState<bookDetailType>({
    name: "",
    author: "",
    description: "",
    genreId: "",
    price: 0,
    listed: false,
  });
  const { data: genres, isLoading: isLoadingGenres } =
    genreApi.useGetGenresQuery();
  const [updateBook, { isLoading: isUpdatingBook }] =
    bookApi.useUpdateBookMutation();
  const { toast } = useToast();

  const handleMoreDetails = async () => {
    setIsDetailsVisible(true);
  };

  useEffect(() => {
    if (!isLoading && data?.book) {
      setBookDetail({
        name: data?.book.name,
        author: data.book.author,
        description: data.book.description,
        genreId: data.book.genre.id,
        price: data.book.price,
        listed: data.book.listed,
      });
    }
  }, [data, isLoading]);

  async function handleSaveChanges() {
    const response = await updateBook({ id, ...bookDetail }).unwrap();
    if (response && response.success) {
      toast({ description: "Book details are updated successfuly." });
    } else {
      toast({ description: finalError });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleMoreDetails}>
          {isLoading ? "Loading.." : "Details"}
        </Button>
      </DialogTrigger>
      {data && (
        <DialogContent className="w-[95%] lg:w-[40%]">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
            <DialogDescription>
              View your book deatils here. To make changes go to Edit Tab.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="detail" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detail">Details</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="detail">
              <div className="flex flex-col gap-2 mt-2">
                <DescriptionBox data={data.book.name} name="Name" />
                <DescriptionBox
                  data={data.book.description}
                  name="Description"
                />
                <DescriptionBox data={data.book.author} name="Author" />
                <DescriptionBox data={data.book.genre.name} name="Genre" />
                <DescriptionBox data={data.book.listed} name="Listed" />
                <DescriptionBox data={data.book.price} name="Price" />
              </div>
            </TabsContent>
            <TabsContent value="edit">
              {genres?.allGenres && (
                <div className="flex flex-col gap-4">
                  <Input
                    label="Title"
                    tag="title"
                    type="text"
                    placeholder="Enter book title"
                    value={bookDetail.name}
                    onChange={(e) =>
                      setBookDetail((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">
                      Description{" "}
                      <span className="text-xs text-muted-foreground">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter book description"
                      value={bookDetail.description}
                      onChange={(e) =>
                        setBookDetail((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Input
                    label="Author"
                    tag="author"
                    placeholder="Enter author name"
                    type="text"
                    value={bookDetail.author}
                    onChange={(e) =>
                      setBookDetail((prev) => ({
                        ...prev,
                        author: e.target.value,
                      }))
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
                      setBookDetail((prev) => ({
                        ...prev,
                        price: Number(e.target.value),
                      }))
                    }
                  />
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={bookDetail.genreId}
                      onValueChange={(e) =>
                        setBookDetail((prev) => ({ ...prev, genreId: e }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select book genre" />
                      </SelectTrigger>
                      <SelectContent id="genre">
                        {genres.allGenres.length &&
                          genres.allGenres.map((genre) => (
                            <SelectItem key={genre.id} value={genre.id}>
                              {genre.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="listed">Listed</Label>
                    <Switch
                      id="lsited"
                      checked={bookDetail.listed}
                      onCheckedChange={() =>
                        setBookDetail((prev) => ({
                          ...prev,
                          listed: !prev.listed,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button onClick={handleSaveChanges}>
                      {isUpdatingBook ? "Saving..." : "Save changes"}
                    </Button>
                    <Button variant="destructive">Delete book</Button>{" "}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      )}
    </Dialog>
  );
}

function DescriptionBox({ name, data }: { name: string; data: any }) {
  return (
    <div
      className={`flex text-sm ${
        name !== "Listed" && name != "Price" ? "flex-col" : "flex-row gap-2"
      }`}
    >
      <p className="text-primary font-bold">{name}:</p>
      {name == "Listed" && (
        <div>
          <Badge variant="outline">{data ? "Yes" : "No"}</Badge>
        </div>
      )}
      {name == "Price" &&
        (data != 0 ? (
          <div>
            <span>&#8377;</span> {data}
          </div>
        ) : (
          <Badge variant="secondary">Free</Badge>
        ))}
      {name !== "Price" && name !== "Listed" && <div>{data}</div>}
    </div>
  );
}

export default ListedBookDetail;
