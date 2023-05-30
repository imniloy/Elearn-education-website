import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
  const { role } = useAuth();
  // here we are going to check the role of this user and then decide what to show the particular user..
  // if role is admin then user can see the children page.
  // if role is student can't see children page and redirect to student / url.
  // if role is undefined then user can't see the children page and redirect user to /admin/login page.

  if (role?.toLowerCase() === "admin") {
    return children;
  } else if (role?.toLowerCase() === "student") {
    return <Navigate to="/videos" />;
  } else if (role === undefined) {
    return (
      <>
        <Navigate to="/admin/login" />
      </>
    );
  }
};

export default AdminPrivateRoute;
