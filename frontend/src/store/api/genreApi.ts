import { BACKEND_URL } from "@/utils/constants";
import { getGenreType } from "@/utils/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getGenres: builder.query<getGenreType, void>({
      query: () => "user/genre/all",
    }),
  }),
});
