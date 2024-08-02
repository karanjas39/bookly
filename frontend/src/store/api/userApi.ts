import { BACKEND_URL } from "@/utils/constants";
import {
  generalResponseType,
  getUserResponseType,
} from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { tagTypes } from "@/store/api/tags";
import { z_updatePassword_type } from "@singhjaskaran/bookly-common";

export const userApi = createApi({
  reducerPath: "userApi",
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
    fetchUser: builder.query<getUserResponseType, void>({
      query: () => "user/detail",
    }),
    updatePassword: builder.mutation<
      generalResponseType,
      z_updatePassword_type
    >({
      query: (query) => ({
        url: "user/password/update",
        method: "PUT",
        body: query,
      }),
    }),
  }),
});
