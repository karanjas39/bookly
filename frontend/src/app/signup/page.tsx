"use client";

import AccountBox from "@/components/ui/Account/AccountBox";
import AccountFooter from "@/components/ui/Account/AccountFooter";
import AccountHeader from "@/components/ui/Account/accountHeader";
import AccountInputBox from "@/components/ui/Account/AccountInputBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { BACKEND_URL, finalError } from "@/utils/constants";
import { z_signUp_type } from "@singhjaskaran/bookly-common";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface signUptype extends z_signUp_type {
  confirmPassword: string;
}

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
    const { name, email, password, confirmPassword: cPassword } = userDetail;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !cPassword) {
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
    const { confirmPassword, ...signupData } = userDetail;
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setIsLoading(false);
      if (data && data.success) {
        setUserDetail({
          name: "",
          confirmPassword: "",
          email: "",
          password: "",
        });
        toast({ description: "New account is created successfuly." });
        setTimeout(() => {
          router.push("/signin");
        }, 2500);
      } else throw new Error();
    } catch (error) {
      toast({ description: finalError });
    } finally {
      setIsLoading(false);
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
          {isLoading ? "Creating Account..." : "Create Account"}
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
