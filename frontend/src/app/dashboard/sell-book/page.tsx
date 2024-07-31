"use client";

import { useAuth } from "@/components/auth-provider";
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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddBook() {
  const { genres } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!genres) return router.push("/signin");
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sell Book</CardTitle>
        <CardDescription>Add a new book to sell</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col gap-4">
            <Input
              label="Title"
              tag="title"
              type="text"
              placeholder="Enter book title"
            />
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">
                Description{" "}
                <span className="text-xs text-muted-foreground">
                  (optional)
                </span>{" "}
              </Label>
              <Textarea id="description" placeholder="Enter book description" />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="Select book genre" />
                </SelectTrigger>
                <SelectContent id="genre">
                  {genres.length &&
                    genres.map((genre) => (
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
            />
            <Input
              tag="price"
              label="Price"
              type="number"
              placeholder="Enter book price (in INR)"
              min={0}
            />
            <Button>Sell Book</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
