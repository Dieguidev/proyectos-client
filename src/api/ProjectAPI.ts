import { api } from "../lib/axios";
import { ProjectFormData } from "../types";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/project", formData);
    console.log(data);

  } catch (error) {
    console.error(error);
  }

}
