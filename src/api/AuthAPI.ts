import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const { data } = await api.post("/auth/register", formData);
    return data.user
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function confirmAccount(formData: ConfirmToken) {
  try {
    const { data } = await api.post("/auth/confirm-account", formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    const { data } = await api.post("/auth/request-confirmation-code", formData);
    return data.user
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: UserLoginForm) {
  try {
    const { data } = await api.post("/auth/login", formData);
    return data.user
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
