"use client";

import AccountBox from "@/components/ui/Account/AccountBox";
import AccountFooter from "@/components/ui/Account/AccountFooter";
import AccountHeader from "@/components/ui/Account/accountHeader";
import AccountInputBox from "@/components/ui/Account/AccountInputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { z_singIn_type } from "@singhjaskaran/bookly-common";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [userCred, setUserCred] = useState<z_singIn_type>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleSignInForm() {
    const { email, password } = userCred;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return toast({ description: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return toast({ description: "Please enter a valid email address." });
    }
    console.log(userCred);
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
          onChange={(e) =>
            setUserCred((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
        <Button onClick={handleSignInForm}>
          {isLoading ? "Creating Account..." : "Create Account"}
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
