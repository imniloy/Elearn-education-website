import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../../features/auth/authApi";
import { useEffect } from "react";

const StudentRegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [registration, { data, isLoading, error: responseError }] =
    useRegistrationMutation();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // handleStudentRegistrationFunc will be called when user tries to register and submit the form..
  const handleStudentRegistrationFunc = (e) => {
    e.preventDefault();
    // check password and confirm password is same or different...
    if (password === confirmPassword) {
      registration({
        email,
        name,
        password,
        role: "student",
      });
      resetForm();
    } else {
      setError("Passwords and confirm password do not match");
    }
  };

  // useEffect will run to check the register mutation successfull or return an error && if it is successfull redirect user to videos page Or if login register is failed store the error on the error variable...
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
  }, [responseError, data, navigate]);

  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
        <p className="mt-6 text-center text-3xl font-extrabold text-slate-100">Elearn-Learning Portal</p>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          method="POST"
          onSubmit={handleStudentRegistrationFunc}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className="login-input "
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
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
                Already Registered? Then Login
              </Link>
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
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

export default StudentRegistrationPage;
