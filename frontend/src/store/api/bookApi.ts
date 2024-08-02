import { BACKEND_URL } from "@/utils/constants";
import {
  generalResponseType,
  getMyBooksType,
  getMyBookType,
} from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  z_sellBook_type,
  z_updateSellBook_type,
} from "@singhjaskaran/bookly-common";
import { RootState } from "@/store/index";
import { tagTypes, MY_BOOKS_TAG, BOOK_BY_ID } from "@/store/api/tags";

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
      invalidatesTags: [MY_BOOKS_TAG],
    }),
    updateBook: builder.mutation<generalResponseType, z_updateSellBook_type>({
      query: (dataToUpdate) => ({
        url: "book/update",
        method: "PUT",
        body: dataToUpdate,
      }),
      invalidatesTags: [MY_BOOKS_TAG, BOOK_BY_ID],
    }),
    getBookById: builder.query<getMyBookType, { bookId: string }>({
      query: (params) => {
        const { bookId } = params;
        return `user/book/single/${bookId}`;
      },
      providesTags: [BOOK_BY_ID],
    }),
    myBooks: builder.query<getMyBooksType, { listed: boolean }>({
      query: (param) => {
        console.log(param);
        return `user/book/all/${param.listed}`;
      },
      providesTags: [MY_BOOKS_TAG],
    }),
  }),
});
