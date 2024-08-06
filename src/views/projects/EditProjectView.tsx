import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../api/ProjectAPI";

export default function EditProjectView() {
  const { projectId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId!),
  });

  return <div>EditProjectView</div>;
}
