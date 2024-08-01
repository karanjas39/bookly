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

export default function Profile() {
  const { data, isLoading } = userApi.useFetchUserQuery();

  if (isLoading && !data) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile details</CardDescription>
      </CardHeader>
      {data && (
        <CardContent>
          {/* <Label>Personal Information</Label> */}
          <div className="flex flex-col gap-2">
            <ProfileBox name="Name" data={data.user.name} />
            <ProfileBox name="Email" data={data.user.email} />
            <ProfileBox name="Verified" data={data?.user.verified} />
            <ProfileBox name="Account Created" data={data?.user.createdAt} />
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function ProfileBox({ name, data }: { name: string; data: string | boolean }) {
  return (
    <div className="flex text-sm  lg:flex-row flex-col lg:justify-between">
      <p className="text-muted-foreground">{name}</p>
      {name === "Verified" ? (
        <div className="font-medium leading-none">
          <Badge variant="outline">{data ? "Yes" : "No"}</Badge>
        </div>
      ) : (
        <div className="font-medium leading-none">
          {name !== "Account Created" ? data : modifyDate(data)}
        </div>
      )}
    </div>
  );
}
