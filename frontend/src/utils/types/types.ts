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

export interface bookReqType {
  book: {
    name: string;
    author: string;
  };
  users: {
    name: string;
    email: string;
    reqId: string;
  }[];
}
