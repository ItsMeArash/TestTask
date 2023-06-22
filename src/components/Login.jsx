import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setPassword,
  setLoggedIn,
} from "../redux/login/loginAction";
import { validate } from "../helpers/functions";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLogin")) {
      localStorage.removeItem("userLogin");
      console.log("initial local storage clearence");
      dispatch(setLoggedIn(false));
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedUserLogin = JSON.parse(localStorage.getItem("userLogin"));
    if (storedUserLogin) {
      dispatch(setUsername(storedUserLogin.username));
      dispatch(setPassword(storedUserLogin.password));
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validate(userLogin);
    if (Object.keys(errors).length === 0) {
      dispatch(setLoggedIn(true));
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
      navigate("/dashboard");
    } else {
      setErrors(errors);
    }
  };

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
            onChange={(event) => dispatch(setUsername(event.target.value))}
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
            onChange={(event) => dispatch(setPassword(event.target.value))}
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