import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";

const StudentNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userFirstName = user?.name.split(" ")[0];

  const userLogOutFunction = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
          {user?.role === "admin" ? (
            <Link to={`/admin`}>
              <p className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                E-learn
              </p>
            </Link>
          ) : (
            <Link to={`/videos`}>
              <p className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                E-learn
              </p>

            </Link>
          )}
          <div className="flex items-center gap-3">
            {user?.role === "student" && (
              <Link to="./leaderboard" className="font-bold">
                Leaderboard
              </Link>
            )}
            <h2>{userFirstName}</h2>
            <button
              className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
              onClick={userLogOutFunction}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default StudentNavbar;
