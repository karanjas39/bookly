"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import { userApi } from "@/store/api/userApi";
import { modifyDate } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { data, isLoading } = userApi.useFetchUserQuery();

  if (isLoading && !data) return <Loader />;

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
            <p className="text-sm font-medium leading-none">
              {data?.user.name}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-sm font-medium leading-none">
              {data?.user.email}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Verified</p>
            <p className="text-sm font-medium leading-none">
              <Badge variant="outline">
                {data?.user.verified ? "Yes" : "No"}
              </Badge>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Account Created</p>
            <p className="text-sm font-medium leading-none">
              {modifyDate(data?.user.createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
