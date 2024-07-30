import { z_signUp_type, z_singIn_type } from "@singhjaskaran/bookly-common";

export interface signUptype extends z_signUp_type {
  confirmPassword: string;
}

export interface singIntype extends z_singIn_type {}

export interface apiResponse {
  data: any;
  success: boolean;
  message: string;
  loading: boolean;
}
