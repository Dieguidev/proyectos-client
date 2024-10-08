import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { UpdateCurrentUserPasswordFrom, UserProfileForm } from "../types";


// {{uri}}/api/auth/profile
export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put<string>("/auth/profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

// {{uri}}/api/auth/update-password
export async function changePassword(formData: UpdateCurrentUserPasswordFrom) {
  try {
    const { data } = await api.post<string>("/auth/update-password", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
