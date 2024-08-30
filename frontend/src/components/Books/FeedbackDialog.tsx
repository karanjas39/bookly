import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { feedbackApi } from "@/store/api/feedbackApi";
import { useToast } from "@/components/ui/use-toast";
import { z_createFeedback } from "@singhjaskaran/bookly-common";
import { finalError } from "@/utils/constants";

function FeedbackDialog({ bookId }: { bookId: string }) {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  const [feedback, setFeedback] = useState<string>("");
  const [createFeedback, { isLoading }] =
    feedbackApi.useCreateFeedbackMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (!token) setisLoggedIn(false);
    else setisLoggedIn(true);
  }, []);

  async function handleCreateFeedback() {
    if (!feedback) {
      return toast({ description: "All fields are required." });
    }

    const { success, data } = z_createFeedback
      .strip()
      .safeParse({ bookId, feedback });
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await createFeedback(data).unwrap();
      if (response && response.success) {
        toast({ description: "Your feedback is created successfuly" });
        setFeedback("");
        return;
      } else throw new Error();
    } catch (error) {
      return toast({ description: finalError });
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => (!isLoggedIn ? router.replace("/signin") : null)}
        >
          Give Feedback
        </Button>
      </DialogTrigger>
      {isLoggedIn && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Feedaback</DialogTitle>
            <DialogDescription>
              Give your feedback on this book.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Feedback</Label>
            <Textarea
              id="description"
              placeholder="Enter book feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button onClick={handleCreateFeedback}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default FeedbackDialog;
