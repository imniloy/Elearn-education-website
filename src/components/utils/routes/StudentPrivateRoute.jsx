import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const StudentPrivateRoute = ({ children }) => {
  const { role } = useAuth();
  // here we are going to check the role of this user and then decide what to show the particular user..
  // if role is admin then this user will redirect to /admin url...
  // if role is student then user allowed to see the children page.
  // if role is undefined then user can't find the children page and redirect user to student /login page.

  if (role?.toLowerCase() === "admin") {
    // return <NotFoundPage />;
    return <Navigate to="/admin" />;
  } else if (role?.toLowerCase() === "student") {
    return children;
  } else if(role === undefined){
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
};

export default StudentPrivateRoute;
