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

export interface getMyBooksType extends generalResponseType {
  books: BookType[];
}

export interface BookType {
  name: string;
  createdAt: string;
  listed: boolean;
  id: string;
  author?: string;
  price?: number;
}

export interface AllBooksType extends generalResponseType {
  books: BookType[];
}

export interface getMyBookType extends generalResponseType {
  book: {
    description: string;
    author: string;
    price: number;
    feedbacks: string[];
    genre: {
      id: string;
      name: string;
    };
  } & BookType;
}
