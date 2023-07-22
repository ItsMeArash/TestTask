import { validate } from "../helpers/functions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ useStore }) => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const {
    username,
    password,
    isLoggedIn,
    setUsername,
    setPassword,
    setIsLoggedIn,
  } = useStore();
  const userLogin = {
    username,
    password,
    isLoggedIn,
    setUsername,
    setPassword,
    setIsLoggedIn,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validate(userLogin);
    if (Object.keys(errors).length === 0) {
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 500)
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "userLogin",
      JSON.stringify({ username, password, isLoggedIn })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
      <form className="bg-white dark:bg-gray-700 p-4 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="username"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Username
          </label>
          <input
            value={userLogin.username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
          >
            Password
          </label>
          <input
            value={userLogin.password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        <button
          onClick={(event) => submitHandler(event)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
