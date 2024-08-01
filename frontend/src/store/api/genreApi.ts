import { BACKEND_URL } from "@/utils/constants";
import { getGenreType } from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "@/store/api/tags";

export const genreApi = createApi({
  reducerPath: "genreApi",
  tagTypes: tagTypes,
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getGenres: builder.query<getGenreType, void>({
      query: () => "user/genre/all",
    }),
  }),
});
