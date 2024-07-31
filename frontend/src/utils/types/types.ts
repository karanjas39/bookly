import { z_signUp_type } from "@singhjaskaran/bookly-common";

export interface userType {
  name: string;
  email: string;
  createdAt: string;
  verified: boolean;
}

export interface signUpType extends z_signUp_type {
  confirmPassword: string;
}
