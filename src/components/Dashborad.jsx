import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { fetchQuote } from "../helpers/functions";

// eslint-disable-next-line react/prop-types
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  // const { username, logOut } = useStore();
  const username = JSON.parse(localStorage.getItem("userLogin")).username;
  const isLoggedIn = JSON.parse(localStorage.getItem("userLogin")).isLoggedIn;
  const logOut = () => {
    localStorage.setItem("userLogin", JSON.stringify({
      username: '',
      password: '',
      isLoggedIn: false,
    }))
  }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchQuote(setQuote);
  }, []);

  const hour = currentTime.getHours();
  let timeOfDay;
  if (hour < 12) {
    timeOfDay = "morning";
  } else if (hour < 18) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "evening";
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-gray-800 text-gray-100 box-shadow-lg flex items-center justify-between p-4 md:p-6">
        <Link to="/dashboard">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              location.pathname === "/dashboard"
                ? "border-b-4 border-blue-500"
                : "text-blue-500"
            } pb-2`}
          >
            Dashboard
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
            <Link to="/profile">Profile</Link>
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
              logOut();
            }}
          >
            <Link className="text-red-500 hover:text-red-400" to="/">
              Log Out
            </Link>
          </li>
        </ul>
        
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {format(currentTime, "h:mm:ss a")}
        </h2>
        <h1 className="text-2xl md:text-3xl font-bold mb-32 text-gray-800 dark:text-gray-100">
          Good {timeOfDay}, <span className="text-blue-500">{username}</span>!
        </h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-4">
            Random Quote:
          </p>
          <blockquote className="text-base md:text-lg italic text-gray-500 dark:text-gray-300">
            {quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
