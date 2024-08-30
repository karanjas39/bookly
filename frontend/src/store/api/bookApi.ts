import { BACKEND_URL } from "@/utils/constants";
import {
  AllAcceptedBookReqsType,
  AllBooksType,
  buyRequestsType,
  generalResponseType,
  getBookDeatilType,
  getMyBooksType,
  getMyBookType,
} from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  z_createBuyRequest_type,
  z_id_type,
  z_sellBook_type,
  z_updateSellBook_type,
} from "@singhjaskaran/bookly-common";
import { RootState } from "@/store/index";
import {
  tagTypes,
  MY_BOOKS_TAG,
  BOOK_BY_ID,
  ALL_BOOK,
  DETAILED_BOOK,
  MY_BUY_REQS,
} from "@/store/api/tags";

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
    getBookDetails: builder.query<getBookDeatilType, { bookId: string }>({
      query: (params) => {
        const { bookId } = params;
        return `book/single/${bookId}`;
      },
      providesTags: (result, error, arg) => [
        { type: DETAILED_BOOK, id: arg.bookId },
      ],
    }),
    getAllBooks: builder.query<AllBooksType, void>({
      query: () => `book/bulk`,
      providesTags: [ALL_BOOK],
    }),
    deleteBook: builder.mutation<getMyBookType, { id: string }>({
      query: (query) => ({
        url: "book/delete",
        method: "DELETE",
        body: query,
      }),
      invalidatesTags: [MY_BOOKS_TAG],
    }),
    createBuyrequest: builder.mutation<
      generalResponseType,
      z_createBuyRequest_type
    >({
      query: (query) => ({
        url: "book/buy-request/create",
        method: "POST",
        body: query,
      }),
    }),
    acceptBuyrequest: builder.mutation<generalResponseType, z_id_type>({
      query: (query) => ({
        url: "book/buy-request/accept",
        method: "POST",
        body: query,
      }),
      invalidatesTags: [MY_BUY_REQS],
    }),
    getBuyRequests: builder.query<buyRequestsType, void>({
      query: () => "user/buy-request/all",
      providesTags: [MY_BUY_REQS],
    }),
    getAllAcceptedBookRequests: builder.query<AllAcceptedBookReqsType, void>({
      query: () => "user/buy-request/accepted/all",
    }),
    myBooks: builder.query<getMyBooksType, { listed: boolean }>({
      query: (param) => {
        return `user/book/all/${param.listed}`;
      },
      providesTags: [MY_BOOKS_TAG],
    }),
  }),
});
