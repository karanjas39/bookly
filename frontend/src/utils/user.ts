import { BACKEND_URL, finalError } from "./constants";
import { apiResponse } from "./types";

export const getUser = async ({ token }: { token: string }) => {
  let apiResponse: apiResponse = {
    data: null,
    loading: false,
    message: "",
    success: false,
  };

  if (!token) {
    apiResponse.message = "You are not authorized";
    return apiResponse;
  }

  try {
    apiResponse.loading = true;
    const response = await fetch(`${BACKEND_URL}/user/detail`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    apiResponse.loading = false;

    if (data && data.success) {
      apiResponse.success = true;
      apiResponse.data = data;
      return apiResponse;
    } else throw new Error();
  } catch (error) {
    apiResponse.message = finalError;
    return apiResponse;
  } finally {
    apiResponse.loading = false;
    return apiResponse;
  }
};
