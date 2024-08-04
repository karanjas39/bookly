"use client";

import Loader from "@/components/ui/Loader";
import { feedbackApi } from "@/store/api/feedbackApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { modifyDate } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { z_id } from "@singhjaskaran/bookly-common";
import { finalError } from "@/utils/constants";
import { useState } from "react";

function Feedbacks() {
  const { data, isLoading } = feedbackApi.useGetMyFeedbacksQuery();
  const [deleteFeedback, { isLoading: isDeletingFeedback }] =
    feedbackApi.useDeleteFeedbackMutation();
  const { toast } = useToast();
  const [deletingFeedbackId, setDeletingFeedbackId] = useState<string | null>(
    null
  );

  async function handleDeleteFeedback({ id }: { id: string }) {
    if (!id) return null;

    const { success, data } = z_id.strip().safeParse({ id });
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    setDeletingFeedbackId(id);

    try {
      const response = await deleteFeedback(data).unwrap();
      if (response && response.success) {
        toast({ description: "Feedback has been deleted successfuly." });
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
          <CardTitle>Feedbacks</CardTitle>
          <CardDescription>
            Search and manage the feedbacks you have given.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!data?.userFeedbacks.length ? (
            <p className="text-center text-sm text-muted-foreground">
              You have not given any feedback yet.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {data.userFeedbacks.map((feed) => (
                <Card key={feed.id}>
                  <CardHeader className="flex flex-col gap-3 lg:gap-0">
                    <CardTitle>{feed.book.name}</CardTitle>
                    <div className="flex items-center space-x-2 h-5">
                      <CardDescription>{feed.book.author}</CardDescription>
                      <Separator orientation="vertical" />
                      <CardDescription>
                        {modifyDate(feed.createdAt)}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-1 lg:gap-0">
                    <p>{feed.feedback}</p>
                    <Button
                      variant="destructive"
                      className="self-end"
                      onClick={() => handleDeleteFeedback({ id: feed.id })}
                      disabled={
                        deletingFeedbackId === feed.id && isDeletingFeedback
                      }
                    >
                      {deletingFeedbackId === feed.id && isDeletingFeedback
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

export default Feedbacks;
