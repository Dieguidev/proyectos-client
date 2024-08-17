import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { UserRegistrationForm } from "../types";

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
