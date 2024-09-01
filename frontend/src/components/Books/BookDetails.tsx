import { bookDetailType } from "@/utils/types/apiTypes";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { modifyDate } from "@/utils/helpers";
import FeedbackDialog from "./FeedbackDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { bookApi } from "@/store/api/bookApi";
import { useToast } from "@/components/ui/use-toast";
import { finalError } from "@/utils/constants";
import { z_createBuyRequest } from "@singhjaskaran/bookly-common";
import { Share1Icon } from "@radix-ui/react-icons";

function Bookdetails({ book }: { book: bookDetailType }) {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { toast } = useToast();
  const [createBuyRequest, { isLoading }] =
    bookApi.useCreateBuyrequestMutation();

  async function handleBuyrequest() {
    if (!token) return router.push("/signin");
    if (!book.id) return null;

    const { success, data } = z_createBuyRequest
      .strip()
      .safeParse({ bookId: book.id });
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await createBuyRequest(data).unwrap();
      if (response && response.success) {
        toast({ description: "Your buy request has been created." });
        return;
      } else throw new Error();
    } catch (error) {
      toast({ description: finalError });
    }
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Check out this book: ${book.name}`,
          text: `Hey, take a look at this awesome resource: ${book.name} by ${book.author}!`,
          url: window.location.href,
        });
        console.log("Content shared successfully!");
      } else {
        // Fallback: Copy the URL to the clipboard and show a toast notification
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description:
            "URL copied to clipboard since Web Share API is not supported in your browser.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        description: "Failed to share the content. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="w-[95%] lg:w-[60%] mx-auto my-4 flex flex-col gap-3">
      <div className="flex items-center self-end gap-3">
        <Button variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-1"
          onClick={handleShare}
        >
          <span>Share</span>
          <Share1Icon />
        </Button>
        {!book.sold ? <FeedbackDialog bookId={book.id} /> : null}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{book.name}</CardTitle>
          <CardDescription className="text-lg">{book.author}</CardDescription>
          <div className="flex h-5 items-center space-x-2 text-xs">
            <CardDescription>{book.genre.name}</CardDescription>
            <Separator orientation="vertical" />
            <CardDescription>{modifyDate(book.createdAt)}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {/* Price */}
          <div className="flex items-center gap-5">
            <CardTitle className="text-4xl">
              {book.price !== 0 ? <>&#8377; {book.price}</> : "Free"}
            </CardTitle>
            <Badge variant={!book.sold ? "default" : "destructive"}>
              {!book.sold ? "In stock" : "Sold"}
            </Badge>
          </div>
          {/* Description */}
          <div>
            <p className="text-xl font-bold">Description</p>
            <p>{book.description}</p>
          </div>
          {/* Seller Details */}
          <div>
            <p className="text-xl font-bold">Seller Details</p>
            <div className="flex lg:items-end items-start gap-2 lg:justify-between flex-col lg:flex-row">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>{book.seller?.name}</TooltipTrigger>
                  <TooltipContent>
                    <p>{book.seller?.email}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {!book.sold ? (
                <Button onClick={handleBuyrequest}>
                  {isLoading ? "Requesting..." : "Request to buy"}
                </Button>
              ) : null}
            </div>
          </div>
          {/* feedbacks */}
          <div>
            <p className="text-xl font-bold">Customer Feedbacks</p>
            {!book.feedbacks.length ? (
              <p className="text-sm">
                No feedbacks are available for this book.
              </p>
            ) : (
              <ScrollArea className="h-[300px] min-h-max mt-3">
                <div className="flex flex-col gap-3 pr-4">
                  {book.feedbacks.map((feed) => {
                    return (
                      <Card key={feed.id}>
                        <CardHeader>
                          <CardTitle>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  {feed.user.name}
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feed.user.email}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CardTitle>
                          <CardDescription>
                            {modifyDate(feed.createdAt)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{feed.feedback}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Bookdetails;
