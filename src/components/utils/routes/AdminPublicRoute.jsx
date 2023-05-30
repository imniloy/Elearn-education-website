import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminPublicRoute = ({ children }) => {
  const { role } = useAuth();
  // here we are going to check the role of this user and then decide what to show the particular user..
  // if role is admin then user can't find the children page and redirect to /admin...
  // if role is student then user can not find the children page and redirct to student / url...
  // if role is undefined then user can find the page...

  if (role?.toLowerCase() === "student") {
    return <Navigate to="/" />;
  } else if (role?.toLowerCase() === "admin") {
    return (
      <>
        <Navigate to="/admin" />
      </>
    );
  } else if (role === undefined) {
    return children;
  }
};

export default AdminPublicRoute;
