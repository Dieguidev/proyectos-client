import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberForm } from "../types";
import { api } from "../lib/axios";

export async function findUserByEmail({ projectId, formData }: { projectId: Project['id'], formData: TeamMemberForm }) {
  try {
    const url = `/project/${projectId}/team/find`
    const { data } = await api.post(url, formData)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function addUserToProject({ projectId, id }: { projectId: Project['id'], id: TeamMember['id'] }) {
  try {
    const url = `/project/${projectId}/team`
    const { data } = await api.post(url, { userId: id })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjectTeam(projectId: Project['id']) {
  try {
    const url = `/project/${projectId}/team`
    const { data } = await api.get(url)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
