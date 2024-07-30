"use client";

import AccountBox from "@/components/ui/Account/AccountBox";
import AccountFooter from "@/components/ui/Account/AccountFooter";
import AccountHeader from "@/components/ui/Account/accountHeader";
import AccountInputBox from "@/components/ui/Account/AccountInputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useSignUp } from "@/utils/auth";
import { signUptype } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [userDetail, setUserDetail] = useState<signUptype>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSignUpForm() {
    setIsLoading(true);
    const { loading, message, success } = await useSignUp(userDetail);
    setIsLoading(loading);
    toast({ description: message });
    if (success) {
      router.push("/signin");
    }
  }

  return (
    <AccountBox>
      <AccountHeader title="Create an account to get started." />
      <AccountInputBox>
        <Input
          label="Full name"
          tag="name"
          type="text"
          className="w-full"
          placeholder="John Doe"
          value={userDetail.name}
          onChange={(e) =>
            setUserDetail((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
        />
        <Input
          label="Email"
          tag="email"
          type="email"
          className="w-full"
          placeholder="johndoe@example.com"
          value={userDetail.email}
          onChange={(e) =>
            setUserDetail((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <Input
          label="Password"
          tag="password"
          type="password"
          className="w-full"
          value={userDetail.password}
          onChange={(e) =>
            setUserDetail((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <Input
          label="Confirm Password"
          tag="confirm-password"
          type="password"
          className="w-full"
          onChange={(e) =>
            setUserDetail((prev) => {
              return { ...prev, confirmPassword: e.target.value };
            })
          }
        />
        <Button onClick={handleSignUpForm}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </Button>
      </AccountInputBox>
      <AccountFooter
        description="Already have an account?"
        link="/signin"
        linkTitle="Sign In"
      />
    </AccountBox>
  );
}
