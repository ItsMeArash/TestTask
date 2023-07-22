import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../helpers/functions";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");
  const username = JSON.parse(localStorage.getItem("userLogin")).username;
  const isLoggedIn = JSON.parse(localStorage.getItem("userLogin")).isLoggedIn;

  const navigate = useNavigate();

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
      
      <Navbar />
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
