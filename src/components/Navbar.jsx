import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  const logOut = () => {
    localStorage.setItem("userLogin", JSON.stringify({
      username: '',
      password: '',
      isLoggedIn: false,
    }))
  }  

  const tabItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/weather", label: "Weather" },
    { path: "/todo", label: "To-Do" },
    { path: "/profile", label: "Profile" },
  ];

  const getLabel = (path) => {
    const item = tabItems.find((item) => item.path === path);
    return item ? item.label : "";
  };

  return (
    <div className="bg-gray-800 text-gray-100 box-shadow-lg flex items-center justify-between p-4 md:p-6">
        <Link to={location.pathname}>
          <h1
            className={`text-2xl md:text-3xl font-bold border-b-4 border-blue-500 pb-2`}
          >
            {getLabel(location.pathname)}
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
          <li className={`text-gray-300 hover:text-white ${location.pathname === "/dashboard" && "hidden"}`}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={`text-gray-300 hover:text-white ${location.pathname === "/weather" && "hidden"}`}>
            <Link to="/weather">Weather</Link>
          </li>
          <li className={`text-gray-300 hover:text-white ${location.pathname === "/todo2" && "hidden"}`}>
            <Link to="/todo">To-Do</Link>
          </li>
          <li className={`text-gray-300 hover:text-white ${location.pathname === "/profile" && "hidden"}`}>
            <Link to="/profile">Profile</Link>
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
  );
};

export default Navbar;