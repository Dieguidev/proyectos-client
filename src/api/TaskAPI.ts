import { isAxiosError } from "axios";
import { api } from "../lib/axios";
import { Project, Task, TaskFormData } from "../types";
import { taskSchema } from '../types/index';


type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["id"];
  taskId: Task["id"];
  status: Task["status"];
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

    const response = taskSchema.safeParse(data)

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

export async function updateTask({ projectId, taskId, formData }: Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/task/${projectId}/task/${taskId}`;
    const { data } = await api.put(url, formData);

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskAPI, 'projectId' | 'taskId'>) {
  try {
    const url = `/task/${projectId}/task/${taskId}`;
    const { data } = await api.delete(url);

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}

// /api/task/66ac1accc4881493e2babfc3/task/66ac2e6b55d2b3c58799fb82/status

export async function updateStatus({ projectId, taskId, status }: Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
  try {
    const url = `/task/${projectId}/task/${taskId}/status`;
    const { data } = await api.post(url, { status });

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}
