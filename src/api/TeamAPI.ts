import { isAxiosError } from "axios";
import { Project, TeamMemberForm } from "../types";
import { api } from "../lib/axios";

export async function findUserByEmail({projectId, formData}: {projectId: Project['id'], formData: TeamMemberForm}) {
  try {
    const url = `/project/${projectId}/team/find`
    const {data} = await api.post(url, formData)
    console.log(data);
    return data

  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
