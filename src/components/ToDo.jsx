import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/login/loginAction";

const Todo = () => {
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

 

  // Handle form submit to add new task
  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  // Handle task completion toggle
  const handleToggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Filter tasks by status
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "active":
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="dark:bg-gray-800 dark:text-gray-100 h-screen">
      <div className="bg-gray-800 text-gray-100 flex items-center justify-between p-4 md:p-6">
        <Link to="/todo">
          <h1
            className={`text-2xl md:text-3xl font-bold ${
              location.pathname === "/todo"
                ? "border-b-4 border-blue-500"
                : "text-blue-500"
            } pb-2`}
          >
            To-Do List
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="text-gray-300 hover:text-white">
            <Link to="/weather">Weather</Link>
          </li>
          <li
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <Link
              className="text-red-500 hover:text-red-400"
              to="/"
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
      <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <form
          onSubmit={handleAddTask}
          className="flex items-center px-4 py-2 border-b border-gray-300"
        >
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            className="flex-grow px-2 py-1 mr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={event => handleAddTask(event)}
          >
            Add
          </button>
        </form>
        <div className="px-4 py-2 border-b border-gray-300">
          <label htmlFor="filter" className="mr-2 font-medium">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <ul className="px-4 py-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between py-1 border-b border-gray-300 last:border-b-0"
            >
              {task.completed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300 dark:text-gray-500 mr-2 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  onClick={() => handleToggleCompleted(task.id)}
                >
                  <circle cx="10" cy="10" r="9" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M6 10l3 3 6-6"
                  />
                </svg>
              )}
              <span
                className={`flex-grow cursor-pointer ${
                  task.completed
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : ""
                }`}
                onClick={() => handleToggleCompleted(task.id)}
              >
                {task.text}
              </span>
              <button
                className="px-2 py-1 text-red-500 dark:text-red-400 rounded-lg hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
