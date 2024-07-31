import { BACKEND_URL, finalError } from "./constants";
import { apiResponse } from "./types";

export const getAllGneres = async () => {
  let apiResponse: apiResponse = {
    data: null,
    loading: false,
    message: "",
    success: false,
  };

  try {
    apiResponse.loading = true;
    const response = await fetch(`${BACKEND_URL}/user/genre/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
