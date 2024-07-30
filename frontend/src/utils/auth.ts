import { apiResponse, signUptype, singIntype } from "@/utils/types";
import { BACKEND_URL, finalError } from "@/utils/constants";
import { z_signUp, z_singIn } from "@singhjaskaran/bookly-common";

export const useSignUp = async (props: signUptype) => {
  const { name, confirmPassword: cPassword, email, password } = props;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let apiResponse: apiResponse = {
    data: null,
    message: "",
    success: false,
    loading: false,
  };

  if (!name || !email || !password || !cPassword) {
    apiResponse.message = "All fields are required.";
    return apiResponse;
  }

  if (!emailRegex.test(email)) {
    apiResponse.message = "Please enter a valid email address.";
    return apiResponse;
  }

  if (password !== cPassword) {
    apiResponse.message = "Passwords do not match.";
    return apiResponse;
  }
  if (password.length < 6) {
    apiResponse.message = "Passwords should be atleast 6 characters.";
    return apiResponse;
  }

  const { success, data: userSignUpData } = z_signUp.strip().safeParse(props);
  if (!success) {
    apiResponse.message = "Provide valid inputs to continue.";
    return apiResponse;
  }

  try {
    apiResponse.loading = true;
    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userSignUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    apiResponse.loading = false;

    if (data && data.success) {
      apiResponse.message = "New account is created successfuly.";
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

export const useSignIn = async (props: singIntype) => {
  const { email, password } = props;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let apiResponse: apiResponse = {
    data: null,
    message: "",
    success: false,
    loading: false,
  };

  if (!email || !password) {
    apiResponse.message = "All fields are required.";
    return apiResponse;
  }

  if (!emailRegex.test(email)) {
    apiResponse.message = "Please enter a valid email address.";
    return apiResponse;
  }

  const { success, data: userSignInData } = z_singIn.safeParse({
    email,
    password,
  });
  if (!success) {
    apiResponse.message = "Provide valid inputs to continue.";
    return apiResponse;
  }

  try {
    apiResponse.loading = true;

    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(userSignInData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    apiResponse.loading = false;

    if (data && data.success) {
      apiResponse.message = "You are successfuly logged in.";
      apiResponse.success = true;
      apiResponse.data = data;
      localStorage.setItem("booklyToken", data.token);
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
