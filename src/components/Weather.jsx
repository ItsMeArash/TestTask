import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchWeatherGPS } from "../helpers/weatherAPI";
import { useSelector } from "react-redux";
import { BounceLoader } from "react-spinners";


function Weather() {
  const [showMenu, setShowMenu] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // add a loading state variable

  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    console.log(weather);
  }, [weather]);

  const handleFetchWeather = () => {
    setIsLoading(true); // set the loading state to true when fetching weather data
    fetchWeatherGPS()
      .then((weather) => {
        setWeather(weather);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // set the loading state to false when the data has been fetched
      });
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="bg-gray-800 text-gray-100 flex items-center justify-between p-4 md:p-8">
          <Link to="/weather/#">
            <h1
              className={`text-2xl md:text-4xl font-bold ${
                location.pathname === "/weather"
                  ? "border-b-4 border-blue-500"
                  : "text-blue-500"
              } pb-2`}
            >
              Weather
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
            } md:flex space-x-4 md:space-x-8`}
          >
            <li className="text-gray-300 hover:text-white">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="text-gray-300 hover:text-white">
              <Link to="/todo">To-Do</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center">
            <input
              className="py-2 px-3 bg-gray-200 rounded-l-lg w-64"
              type="text"
              placeholder="Enter city name here"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:shadow-outline">
              Search
            </button>

            <button
              onClick={handleFetchWeather}
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.0"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </button>
          </div>
          {isLoading && (
           <BounceLoader className="mt-16" css={override} color={"#123abc"} loading={isLoading} />
          )}
          {weather && !isLoading && (
            <div className="mt-16 rounded-lg shadow-md bg-white p-4 flex flex-col items-center">
              <img
                className="w-20 h-20 mb-4"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              />
              <h3 className="text-2xl font-bold mb-2">{`${Math.floor(
                weather.main.temp
              )}°C`}</h3>
              <p className="text-gray-500 mb-4">
                {weather.weather[0].description}
              </p>
              <h4 className="text-lg font-bold mb-2">{`${weather.name}, ${weather.sys.country}`}</h4>
              <p className="text-gray-500">{`Lat: ${weather.coord.lat} | Lon: ${weather.coord.lon}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;