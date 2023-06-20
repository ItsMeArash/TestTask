import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setPassword,
  setLoggedIn,
} from "../redux/login/loginAction";
import { validate } from "../helpers/functions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.login);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validate(userLogin);
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
      dispatch(setLoggedIn(true));
      navigate("/dashboard");
    } else {
      console.log(errors);
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form className="bg-white p-4 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            value={userLogin.username}
            onChange={(event) => dispatch(setUsername(event.target.value))}
            type="text"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            value={userLogin.password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
            type="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>

        <button
          onClick={(event) => submitHandler(event)}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
