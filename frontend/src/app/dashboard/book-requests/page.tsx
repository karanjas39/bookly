"use client";

import Loader from "@/components/ui/Loader";
import { bookApi } from "@/store/api/bookApi";
import { buyRequestTransformer } from "@/utils/Transformers/buyRequest";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { bookReqType } from "@/utils/types/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { z_id } from "@singhjaskaran/bookly-common";
import { finalError } from "@/utils/constants";

export default function BookRequests() {
  const { data, isLoading } = bookApi.useGetBuyRequestsQuery();
  const [acceptRequest, { isLoading: isAcceptingReq }] =
    bookApi.useAcceptBuyrequestMutation();
  const [reqs, setReqs] = useState<bookReqType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && data && data.buyRequests) {
      const response = buyRequestTransformer(data);
      setReqs(response);
    }
  }, [data, isLoading]);

  async function handleBookReq(id: string) {
    if (!id) return null;

    const { success, data } = z_id.strip().safeParse({ id });

    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await acceptRequest(data).unwrap();
      if (response && response.success) {
        toast({ description: "The buy request is accepted successfuly." });
        return;
      }
    } catch (error) {
      return toast({ description: finalError });
    }
  }

  if (isLoading) return <Loader />;

  return (
    <ScrollArea className="h-[550px] min-h-max w-full mb-4">
      <Card>
        <CardHeader>
          <CardTitle>Buy requests</CardTitle>
          <CardDescription>
            Search and manage all the buy requests fro you books.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reqs.length ? (
            <div className="flex flex-col gap-3">
              {reqs.map((req, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{req.book.name}</CardTitle>
                    <CardDescription>{req.book.author}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="max-h-[100px] min-h-max">
                      {req.users.map((user) => (
                        <div
                          className="flex items-center justify-between mb-2"
                          key={user.reqId}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>{user.name}</TooltipTrigger>
                              <TooltipContent>
                                <p>{user.email}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button variant="outline">Accept</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will accept the buy request for this book
                                  and you have to contact the person.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleBookReq(user.reqId)}
                                >
                                  {isAcceptingReq ? "Accepting..." : "Continue"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No new requests for your books.
            </p>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
