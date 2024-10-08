import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";
import { api } from "../lib/axios";



type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project["id"];
  taskId: Task["id"];
  noteId: Note["_id"];
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

// {{uri}}/api/note/66d7ae8710285f284350f3eb/project/66cb40b3865740bd0c1f4878/task/66d53a8b2b1c12a1786def14
export async function deleteNote({ projectId, taskId, noteId }: Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
  try {
    const url = `/note/${noteId}/project/${projectId}/task/${taskId}`;
    const { data } = await api.delete<string>(url);

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error(error.response.data.error);
      throw new Error(error.response.data.error);
    }
  }
}
