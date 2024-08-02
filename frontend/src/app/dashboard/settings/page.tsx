"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>User can change password here.</CardDescription>
      </CardHeader>
      <CardContent>Hello</CardContent>
    </Card>
  );
}
