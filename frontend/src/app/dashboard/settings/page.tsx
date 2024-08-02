"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userApi } from "@/store/api/userApi";
import { finalError } from "@/utils/constants";
import {
  z_updatePassword,
  z_updatePassword_type,
} from "@singhjaskaran/bookly-common";
import { useState } from "react";

interface userPassword extends z_updatePassword_type {
  confirmCurrPassword: string;
}

export default function Settings() {
  const [password, setPassword] = useState<userPassword>({
    confirmCurrPassword: "",
    currPassword: "",
    prevPassword: "",
  });
  const { toast } = useToast();
  const [updatePassword, { isLoading }] = userApi.useUpdatePasswordMutation();

  async function handleSavePassword() {
    const { confirmCurrPassword, currPassword, prevPassword } = password;
    if (!confirmCurrPassword && !currPassword && !prevPassword) {
      return toast({ description: "All fields are required." });
    }

    if (currPassword !== confirmCurrPassword) {
      return toast({ description: "" });
    }

    const { success, data } = z_updatePassword
      .strip()
      .safeParse({ currPassword, prevPassword });

    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await updatePassword(data).unwrap();
      if (response && response.success) {
        toast({ description: "Your password has been updated successfuly." });
        setPassword({
          prevPassword: "",
          confirmCurrPassword: "",
          currPassword: "",
        });
      } else throw new Error();
    } catch (error) {
      return toast({ description: finalError });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>User can change password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Input
            label="Previous password"
            tag="prevPass"
            placeholder="Enter your previous password"
            type="password"
            value={password.prevPassword}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, prevPassword: e.target.value }))
            }
          />
          <Input
            label="New password"
            tag="newPass"
            placeholder="Enter your new password"
            type="password"
            value={password.currPassword}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, currPassword: e.target.value }))
            }
          />
          <Input
            label="Confirm password"
            tag="confirmPass"
            placeholder="Confirm your new password"
            type="password"
            value={password.confirmCurrPassword}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                confirmCurrPassword: e.target.value,
              }))
            }
          />
          <Button onClick={handleSavePassword}>
            {isLoading ? "Updating..." : "Save changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
