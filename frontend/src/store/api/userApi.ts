import { BACKEND_URL } from "@/utils/constants";
import { getUserResponseType } from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { tagTypes, USER_TAG } from "@/store/api/tags";

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
  }),
});
