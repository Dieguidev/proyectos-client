import { Link } from "react-router-dom";
import { getProjects } from "../api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";

export default function DashboardView() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return 'Cargando...';
  }

  console.log(data);
  console.log(isError);
  console.log(isLoading);

  return (
    <>
      <h1 className="text-5xl font-black">Mis proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y administra tus proyectos
      </p>

      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/projects/create"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
