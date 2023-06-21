import axios from "axios";

const API_KEY = "981417e4702b1cb8d27b30cb81acfa22";

export const fetchWeatherGPS = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      axios
        .get(API_URL)
        .then((res) => {
          const weather = res.data;
          resolve(weather);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

export const fetchWeather = (city) => {
  return new Promise((resolve, reject) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=metric`;
    axios
      .get(API_URL)
      .then((res) => {
        const weather = res.data;
        console.log(weather);
        resolve(weather);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
