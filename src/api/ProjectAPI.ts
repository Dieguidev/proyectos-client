import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { dashboardProjectSchema, ProjectFormData } from "../types";


export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/project", formData);
    console.log(data);

    return data.project;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get("/project");
    const response = dashboardProjectSchema.safeParse(data);
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }

}
