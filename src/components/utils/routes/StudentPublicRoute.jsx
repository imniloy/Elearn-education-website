import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const StudentPublicRoute = ({ children }) => {
  const { role } = useAuth();
  // here we are going to check the role of this user and then decide what to show this particular user..
  // if role is admin then this user redirects to the /admin page..
  // if role is student then user redirect user to student / url...
  // if role is undefined then user can find the page.

  if (role?.toLowerCase() === "student") {
    return (
      <>
        <Navigate to="/" />
      </>
    );
  } else if (role?.toLowerCase() === "admin") {
    return <Navigate to="/admin" />;
  } else if (role === undefined) {
    return children;
  }
};

export default StudentPublicRoute;
