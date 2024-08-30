"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookApi } from "@/store/api/bookApi";
import Loader from "../ui/Loader";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function AcceptedRequests() {
  const { data, isLoading } = bookApi.useGetAllAcceptedBookRequestsQuery();
  const router = useRouter();

  if (!data && isLoading) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accepted Requests</CardTitle>
        <CardDescription>
          These are the recently accepted book requests
        </CardDescription>
      </CardHeader>
      {data && data.acceptedBuyRequests?.length ? (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left font-bold">Sr. No.</TableHead>
                <TableHead className="text-center font-bold">
                  Book Title
                </TableHead>
                <TableHead className="text-center font-bold">
                  Book Author
                </TableHead>
                <TableHead className="text-center font-bold">
                  Seller Name
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.acceptedBuyRequests.map((req, i) => (
                <TableRow onClick={() => router.push(`/books/${req.id}`)}>
                  <TableCell className="text-left">{i + 1}.</TableCell>
                  <TableCell className="text-center">{req.name}</TableCell>
                  <TableCell className="text-center">{req.author}</TableCell>
                  <TableCell className="text-center">
                    {req.seller.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary">
                      <a
                        href={`mailto:${req.seller.email.trim()}`}
                        target="_blank"
                      >
                        Contact
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <p className="text-center text-sm text-muted-foreground py-3">
          No accepted book request
        </p>
      )}
    </Card>
  );
}

export default AcceptedRequests;
