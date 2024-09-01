import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "../../api/ProjectAPI";
import AddTaskModal from "../../components/tasks/AddTaskModal";
import TaskList from "../../components/tasks/TaskList";
import EditTaskData from "../../components/tasks/EditTaskData";
import TaskModalDetails from "../../components/tasks/TaskModalDetails";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import { useMemo } from "react";

export default function ProjectDetailView() {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();

  const { projectId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId!),
  });


  //comprueba si el usuario es el manager del proyecto y si puede editar
  const canEdit = useMemo(() => data?.manager === user?.id, [data, user]);

  console.log("canEdit", canEdit);


  if (isLoading && authLoading) {
    return "Cargando...";
  }
  if (isError) {
    return <Navigate to="/404" />;
  }

  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-ligjt text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user.id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
              onClick={() => navigate(`?newTask=true`)}
            >
              Agregar Tarea
            </button>

            <Link
              to={"team"}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={canEdit}/>
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
