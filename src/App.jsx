import axios from "axios";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import ForecastCard from "./components/ForecastCard";
import WeatherBackground from "./components/WeatherBackground";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [recentCities, setRecentCities] = useState([]);

  const getWeather = async (cityNameOverride) => {
  const searchCity = cityNameOverride || city;
  try {
    setLoading(true);
    setError("");

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
    );
    setWeather(response.data);
    setCity(response.data.name);

    setRecentCities((prev) => {
      const updated = [response.data.name, ...prev.filter((c) => c !== response.data.name)];
      return updated.slice(0, 4);
    });

    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
    );
    setForecast(forecastResponse.data.list);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setWeather(null);
    setError("City not found. Please check the spelling and try again.");
  }
};
const handleUseLocation = () => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      getWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    () => {
      setError("Location access denied.");
    }
  );
};

  const condition = weather?.weather[0]?.main;

  const bgImages = {
    Clear: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8",
    Clouds: "https://images.unsplash.com/photo-1534088568595-a066f410bcda",
    Rain: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0",
    Snow: "https://images.unsplash.com/photo-1491002052546-bf38f186af56",
    Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28",
    default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  };

  const bgImage = bgImages[condition] || bgImages.default;

  return (
    <div className="relative min-h-screen overflow-hidden flex justify-center items-center p-4">

  <motion.div
    key={bgImage}
    initial={{ scale: 1 }}
    animate={{ scale: 1.1 }}
    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  />
      <div className="absolute inset-0 bg-black/40" />

      <WeatherBackground condition={condition} />

      <motion.div
        
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
  style={{ width: "90%", maxWidth: "450px" }}
>
    
        <h1 className="text-white text-3xl text-center font-bold">
          Weather Dashboard
        </h1>
        <p className="text-center text-gray-200 mt-2">
          Real Time Weather Monitoring
        </p>

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          loading={loading}
        />
        <AnimatePresence>
  {error && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, x: [0, -8, 8, -8, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-red-500/20 border border-red-400/40 text-red-100 rounded-xl p-3 mt-4 text-sm"
    >
      {error}
    </motion.div>
  )}
</AnimatePresence>
{recentCities.length > 0 && (
  <div className="flex gap-2 mt-3 flex-wrap justify-center">
    {recentCities.map((c) => (
      <motion.button
        key={c}
        whileTap={{ scale: 0.93 }}
        onClick={() => getWeather()}
        
        className="px-3 py-1 text-xs rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/20"
      >
        {c}
      </motion.button>
    ))}
  </div>
)}

        <div className="text-center mt-8 text-white">
          <AnimatePresence mode="wait">
            {weather && (
              <motion.div
                key={weather.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <WeatherCard weather={weather} />
                <WeatherDetails weather={weather} />
                <ForecastCard forecast={forecast} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default App;