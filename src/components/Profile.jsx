import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { validate } from "../helpers/functions";


// eslint-disable-next-line react/prop-types
const Profile = ({ useStore }) => {
  const navigate = useNavigate();
  
  const isLoggedIn = JSON.parse(localStorage.getItem("userLogin")).isLoggedIn;
  
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const { username, setUsername } = useStore();

  const usernameRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(validate(usernameRef.current.value));
    if (Object.keys(validate(usernameRef.current.value)).length === 0) {
      setUsername(usernameRef.current.value);
    }
    localStorage.setItem("theme", theme);
    document.body.classList.toggle("dark", theme === "dark");
  };


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="dark:bg-gray-800">
      <Navbar />
      <div className="flex flex-col h-screen justify-center items-center px-4">
        <form className="bg-white dark:bg-gray-700  p-6 rounded-lg shadow-md max-w-lg w-full">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block dark:text-slate-300 font-bold"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={username}
              ref={usernameRef}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="theme"
              className="block dark:text-slate-300 font-bold"
            >
              Theme:
            </label>
            <select
              name="theme"
              value={theme}
              onChange={event => setTheme(event.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:bg-white focus:border-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={submitHandler}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
