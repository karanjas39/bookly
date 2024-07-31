import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddBook() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sell Book</CardTitle>
        <CardDescription>Add a new book to sell.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col gap-2">
            <Input label="Title" tag="title" placeholder="Enter book title" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
