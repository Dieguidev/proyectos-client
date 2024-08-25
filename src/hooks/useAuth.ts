import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/AuthAPI"


export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 1,
    refetchOnWindowFocus: false, // No refetch on focus in windows
  })

  return { data, isError, isLoading }
}
