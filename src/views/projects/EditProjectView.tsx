import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/ProjectAPI";
import EditProjectForm from "../../components/projects/EditProjectForm";

export default function EditProjectView() {
  const { projectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
  });

  if (isLoading) {
    return "Cargando...";
  }
  if(isError) {
    return <Navigate to="/404" />;
  }

  if(data) return <EditProjectForm data={data}/>;
}
