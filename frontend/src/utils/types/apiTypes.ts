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
  description?: string;
  genre?: {
    name: string;
  };
}

export interface AllBooksType extends generalResponseType {
  books: BookType[];
}
export interface AllAcceptedBookReqsType extends generalResponseType {
  acceptedBuyRequests: {
    id: string;
    author: string;
    name: string;
    seller: { name: string; email: string };
  }[];
}

export interface getMyBookType extends generalResponseType {
  book: {
    description: string;
    author: string;
    price: number;
    feedbacks: feedbackType[];
    genre: {
      id: string;
      name: string;
    };
  } & BookType;
}

export interface getBookDeatilType extends getMyBookType {
  seller: {
    id: string;
    name: string;
    email: string;
  };
}

export interface feedbackType {
  id: string;
  feedback: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

export interface bookDetailType {
  seller?: {
    id: string;
    name: string;
    email: string;
  };
  description: string;
  sold?: boolean;
  author: string;
  price: number;
  feedbacks: feedbackType[];
  genre: {
    id: string;
    name: string;
  };
  name: string;
  createdAt: string;
  id: string;
}

export interface myFeedbacksType extends generalResponseType {
  userFeedbacks: userFeedbackObjType[];
}

export interface userFeedbackObjType {
  book: {
    name: string;
    author: string;
  };
  createdAt: string;
  feedback: string;
  id: string;
}

export interface buyRequestsType extends generalResponseType {
  buyRequests: {
    buyRequests: {
      id: string;
      book: {
        name: string;
        author: string;
      };
      user: {
        name: string;
        email: string;
      };
    }[];
  }[];
}
