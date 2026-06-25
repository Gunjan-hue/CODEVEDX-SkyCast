import axios from "axios";
import {useState} from "react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import ForecastCard from "./components/ForecastCard";

const API_KEY=import.meta.env.VITE_API_KEY


function App() {
  const[city, setCity]= useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);

  const getWeather = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setWeather(response.data);
      

      const forecastResponse = await axios.get(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setForecast(forecastResponse.data.list);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error.response);
      alert("city not found")
    }
  };
  

 let bgImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
         
  if(weather) {
    const condition = 
    weather.weather[0].main;
    if (condition === "Clear") {
    bgImage =
      "https://images.unsplash.com/photo-1561484930-998b6a7b22e8";
  } else if (condition === "Clouds") {
    bgImage =
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda";
  } else if (condition === "Rain") {
    bgImage =
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0";
  }

}
  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center"
       style={{
         backgroundImage: `url(${bgImage})`,
       }}
       >
      <div className="bg-black/30 backdrop-blur-md p-8 rounded-3xl w-[450px] shadow-2xl">
        <h1 className="text-white text-3xl text-center font-bold">
          Weather Dashboard
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Real Time Weather Monitoring
        </p>

        <SearchBar
          city={city}
          setCity={setCity}
          getWeather={getWeather}
          loading={loading}
        />
        <div className="text-center mt-8 text-white">
          {weather && (
                <>
    <WeatherCard weather={weather} />
    <WeatherDetails weather={weather} />
    <ForecastCard forecast={forecast} />
               </>
              )}
            </div>
        </div>
    </div>
  );
}
export default App;