import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { Project, Task, TaskFormData } from "../types";


type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["id"];
  taskId: Task["id"];
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, 'formData' | 'projectId'>) {
  try {
    const url = `/task/${projectId}`;
    const { data } = await api.post(url, formData);
    return data.task;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/task/${projectId}/task/${taskId}`;
    const { data } = await api.get(url);

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}
