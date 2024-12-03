"use client";

import AccountBox from "@/components/Account/AccountBox";
import AccountFooter from "@/components/Account/AccountFooter";
import AccountHeader from "@/components/Account/accountHeader";
import AccountInputBox from "@/components/Account/AccountInputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/store/api/authApi";
import { setToken } from "@/store/slices/authSlice";
import { finalError } from "@/utils/constants";
import { z_singIn, z_singIn_type } from "@singhjaskaran/bookly-common";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const [userCred, setUserCred] = useState<z_singIn_type>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  const [signIn, { isLoading }] = authApi.useSignInMutation();
  const dispatch = useDispatch();

  async function handleSignInForm() {
    const { email, password } = userCred;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return toast({ description: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return toast({ description: "Please enter a valid email address." });
    }

    const { success, data: userSignInData } = z_singIn.safeParse({
      email,
      password,
    });
    if (!success) {
      return toast({ description: "Provide valid inputs to continue." });
    }

    try {
      const response = await signIn(userSignInData).unwrap();
      if (response && response.success) {
        toast({ description: "You are successfuly logged in." });
        dispatch(setToken(response.token));
        return router.push("/dashboard");
      } else throw new Error();
    } catch (error) {
      toast({ description: finalError });
    }
  }

  return (
    <AccountBox>
      <AccountHeader title="Enter your credentials to access your account." />
      <AccountInputBox>
        <Input
          label="Email"
          tag="email"
          type="email"
          placeholder="johndoe@example.com"
          value={userCred.email}
          onChange={(e) =>
            setUserCred((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <Input
          label="Password"
          type="password"
          tag="password"
          value={userCred.password}
          placeholder="******"
          onChange={(e) =>
            setUserCred((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <Button onClick={handleSignInForm} disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </AccountInputBox>
      <AccountFooter
        description="Don't have an account?"
        link="/signup"
        linkTitle="Sign Up"
      />
    </AccountBox>
  );
}
