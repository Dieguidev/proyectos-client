import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData, projectSchema } from "../types";


export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/project", formData);

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

export async function getProjectById(id: Project["id"]) {
  try {
    const { data } = await api.get(`/project/${id}`);
    const response = editProjectSchema.safeParse(data.project);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function getFullProject(id: Project["id"]) {
  try {
    const { data } = await api.get(`/project/${id}`);

    const response = projectSchema.safeParse(data.project);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}


type UpdateProjectData = {
  formData: ProjectFormData;
  projectId: Project["id"];
}

export async function updateProject({ formData, projectId }: UpdateProjectData) {
  try {
    const { data } = await api.put(`/project/${projectId}`, formData);
    return data.project;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProject(id: Project["id"]) {
  try {
    const { data } = await api.delete<string>(`/project/${id}`);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}
