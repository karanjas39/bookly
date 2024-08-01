import {
  generalResponseType,
  signInResponseType,
} from "@/utils/types/apiTypes";
import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z_signUp_type, z_singIn_type } from "@singhjaskaran/bookly-common";
import { tagTypes } from "@/store/api/tags";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  tagTypes,
  endpoints: (builder) => ({
    signIn: builder.mutation<signInResponseType, z_singIn_type>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<generalResponseType, z_signUp_type>({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
