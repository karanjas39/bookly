import { BACKEND_URL } from "@/utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/index";
import { DETAILED_BOOK, MY_FEEDBACKS, tagTypes } from "@/store/api/tags";
import { z_createFeedback_type, z_id_type } from "@singhjaskaran/bookly-common";
import { generalResponseType, myFeedbacksType } from "@/utils/types/apiTypes";
import { url } from "inspector";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
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
    createFeedback: builder.mutation<
      generalResponseType,
      z_createFeedback_type
    >({
      query: (query) => ({
        url: "book/feedback/create",
        method: "POST",
        body: query,
      }),
      invalidatesTags: [DETAILED_BOOK, MY_FEEDBACKS],
    }),
    getMyFeedbacks: builder.query<myFeedbacksType, void>({
      query: () => "user/feedback/all",
      providesTags: [MY_FEEDBACKS],
    }),
    deleteFeedback: builder.mutation<generalResponseType, z_id_type>({
      query: (query) => ({
        url: "book/feedback/delete",
        method: "DELETE",
        body: query,
      }),
      invalidatesTags: [MY_FEEDBACKS, DETAILED_BOOK],
    }),
  }),
});
