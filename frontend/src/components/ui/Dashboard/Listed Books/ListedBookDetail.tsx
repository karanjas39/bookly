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
import { useState } from "react";
import { Badge } from "../../badge";

function ListedBookDetail({ id }: { id: string }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const { data, isLoading } = bookApi.useGetBookByIdQuery(
    { bookId: id },
    { skip: !isDetailsVisible }
  );

  const handleMoreDetails = async () => {
    setIsDetailsVisible(true);
  };

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
              View your book deatils here. To make changes go to Actions Tab.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="detail" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="detail">Details</TabsTrigger>
              <TabsTrigger value="action">Actions</TabsTrigger>
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
            <TabsContent value="action">Change your password here.</TabsContent>
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
