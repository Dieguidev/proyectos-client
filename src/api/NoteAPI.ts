import { isAxiosError } from "axios";
import { NoteFormData, Project, Task } from "../types";
import { api } from "../lib/axios";



type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project["id"];
  taskId: Task["id"];
}

// {{uri}}/api/note/project/66cb40b3865740bd0c1f4878/task/66d53a8b2b1c12a1786def14
export async function createNote({ projectId, taskId, formData }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'formData'>) {
  try {
    const url = `/note/project/${projectId}/task/${taskId}`;
    const { data } = await api.post<string>(url, formData);

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}
