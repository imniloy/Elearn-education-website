import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/404.css";

const NotFoundPage = () => {
  const { user } = useSelector((state) => state.auth);
  const redirectTo = user?.role === "admin" ? "/admin" : "/videos";

  return (
    <div className="w-full h-90vh horizontal-center vertical-center">
      <div className="">
        <h1 className="notFoundHeader">The Page is Not Found! 404 Error</h1>
        <div className="btn-container">
          <Link to={`${redirectTo}`}>
            <button className="backBtn">Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
