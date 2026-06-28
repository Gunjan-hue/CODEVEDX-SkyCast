import { motion } from "framer-motion";

function WeatherCard({ weather }) {
  return (
    <div>
      <motion.img
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather"
        className="mx-auto"
      />
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-bold"
      >
        {Math.round(weather.main.temp)}°C
      </motion.h2>
      <h3 className="text-2xl mt-2">{weather.name}</h3>
      <p className="mt-2 capitalize">{weather.weather[0].main}</p>
    </div>
  );
}

export default WeatherCard;