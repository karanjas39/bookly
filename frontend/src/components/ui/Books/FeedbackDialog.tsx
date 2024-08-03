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

function FeedbackDialog() {
  const { token } = useSelector((state: RootState) => state.auth);
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!token) setisLoggedIn(false);
    else setisLoggedIn(true);
  }, []);

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
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default FeedbackDialog;
