import { BACKEND_URL } from "@/utils/constants";
import {
  generalResponseType,
  getMyBooksType,
  getMyBookType,
} from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z_sellBook_type } from "@singhjaskaran/bookly-common";
import { RootState } from "@/store/index";
import { tagTypes, LISTED_BOOKS_TAG } from "@/store/api/tags";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: (builder) => ({
    sellBook: builder.mutation<generalResponseType, z_sellBook_type>({
      query: (bookDetails) => ({
        url: "book/sell",
        method: "POST",
        body: bookDetails,
      }),
      invalidatesTags: [LISTED_BOOKS_TAG],
    }),
    getBookById: builder.query<getMyBookType, { bookId: string }>({
      query: (params) => {
        const { bookId } = params;
        return `user/book/single/${bookId}`;
      },
    }),
    myBooks: builder.query<getMyBooksType, void>({
      query: () => "user/book/all",
      providesTags: [LISTED_BOOKS_TAG],
    }),
  }),
});
