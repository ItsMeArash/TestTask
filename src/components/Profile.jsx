import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/login/loginAction";
import { useState, useEffect, useRef } from "react";
import { setUsername } from "../redux/login/loginAction";

const Profile = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userLogin = useSelector((state) => state.login);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [savedTheme, setSavedTheme] = useState("light");
  
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const usernameRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (usernameRef.current.value !== "") {
      dispatch(setUsername(usernameRef.current.value));
    }
    if (selectedTheme !== savedTheme) {
      setSavedTheme(selectedTheme);
      document.body.classList.toggle("dark", selectedTheme === "dark");
    }
    navigate("/dashboard");
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  useEffect(() => {
    setSelectedTheme(savedTheme);
  }, [savedTheme]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="dark:bg-gray-800">
      <div className="bg-gray-800 text-gray-100 flex items-center justify-between p-4 md:p-6">
        <Link to="/profile">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              location.pathname === "/profile"
                ? "border-b-4 border-blue-500"
                : "text-blue-500"
            } pb-2`}
          >
            Profile
          </h1>
        </Link>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            className="w-6 h-6 text-gray-300 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {showMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <ul
          className={`${
            showMenu ? "flex" : "hidden"
          } md:flex space-x-4 md:space-x-8 font-bold`}
        >
          <li className="text-gray-300 hover:text-white">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="text-gray-300 hover:text-white">
            <Link to="/todo">To-Do</Link>
          </li>
          <li className="text-gray-300 hover:text-white">
            <Link to="/weather">Weather</Link>
          </li>
          <li
            onClick={() => {
              localStorage.removeItem("userLogin");
              dispatch(logOut());
            }}
          >
            <Link className="text-red-500 hover:text-red-400" to="/">
              Log Out
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col h-screen justify-center items-center px-4">
        <form className="bg-white dark:bg-slate-600  p-6 rounded-lg shadow-md max-w-lg w-full">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block dark:text-slate-300 font-bold">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={userLogin.username}
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
              value={selectedTheme}
              onChange={handleThemeChange}
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