import { userType } from "./types";

export interface generalResponseType {
  success: boolean;
  status: number;
  message?: string;
}
export interface signInResponseType extends generalResponseType {
  token: string;
  user: userType;
}

export interface getUserResponseType extends generalResponseType {
  user: userType;
}

export interface getGenreType extends generalResponseType {
  allGenres: { id: string; name: string }[];
}
