import { useParams } from "react-router-dom";


export default function EditProjectView() {

  const {projectId} = useParams();

  return (
    <div>EditProjectView</div>
  )
}
