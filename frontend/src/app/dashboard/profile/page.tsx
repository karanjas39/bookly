"use client";

import { useAuth } from "@/components/auth-provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { modifyDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) router.push("/signin");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile details</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>Personal Information</Label>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-sm font-medium leading-none">{user.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium leading-none">{user.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-sm font-medium leading-none">
              <Badge variant="outline">{user.verified ? "Yes" : "No"}</Badge>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Account Created</p>
            <p className="text-sm font-medium leading-none">
              {modifyDate(user.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
