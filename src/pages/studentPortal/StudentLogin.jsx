import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useEffect } from "react";
import { userLoggedIn } from "../../features/auth/authSlice";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // handleStudentLoginFunc will be called when user tries to login and submit the form..
  const handleStudentLoginFunc = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      rote: "student",
    };
    login(data);
    resetForm();
  };

  // useEffect will run to check the login mutation successfull or return an error...
  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    } else if (
      data?.accessToken &&
      data?.user &&
      data?.user?.role.toLowerCase() === "student"
    ) {
      navigate("/videos");
    }
  }, [data, navigate, responseError]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <p className="mt-6 text-center text-3xl font-extrabold text-slate-100">Elearn-Learning Portal</p>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Sign in to Student Account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={handleStudentLoginFunc}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/registration"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {error && (
          <div className="error">
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentLogin;
