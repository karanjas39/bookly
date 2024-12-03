"use client";

import AccountBox from "@/components/Account/AccountBox";
import AccountFooter from "@/components/Account/AccountFooter";
import AccountHeader from "@/components/Account/accountHeader";
import AccountInputBox from "@/components/Account/AccountInputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/store/api/authApi";
import { finalError } from "@/utils/constants";
import { signUpType } from "@/utils/types/types";
import { z_signUp } from "@singhjaskaran/bookly-common";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [userDetail, setUserDetail] = useState<signUpType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signUp, { isLoading }] = authApi.useSignUpMutation();
  const { toast } = useToast();
  const router = useRouter();

  async function handleSignUpForm() {
    const { name, confirmPassword: cPassword, email, password } = userDetail;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return toast({ description: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return toast({ description: "Please enter a valid email address." });
    }

    if (password !== cPassword) {
      return toast({ description: "Passwords do not match." });
    }
    if (password.length < 6) {
      return toast({
        description: "Passwords should be atleast 6 characters.",
      });
    }

    const { success, data: userSignUpData } = z_signUp.safeParse({
      email,
      password,
      name,
    });
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await signUp(userSignUpData).unwrap();

      if (response && response.success) {
        toast({ description: "New account is created successfuly." });
        router.push("/signin");
        return;
      } else throw new Error();
    } catch (error) {
      toast({ description: finalError });
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
          placeholder="******"
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
          placeholder="******"
          onChange={(e) =>
            setUserDetail((prev) => {
              return { ...prev, confirmPassword: e.target.value };
            })
          }
        />
        <Button onClick={handleSignUpForm} disabled={isLoading}>
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
