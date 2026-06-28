import { motion } from "framer-motion";

function WeatherDetails({ weather }) {
  const details = [
    { icon: "💧", label: "Humidity", value: `${weather.main.humidity}%` },
    { icon: "🌬️", label: "Wind", value: `${weather.wind.speed} m/s` },
    { icon: "🌡️", label: "Feels Like", value: `${Math.round(weather.main.feels_like)}°C` },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {details.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center"
          >
            <p className="text-3xl">{item.icon}</p>
            <p className="text-sm text-gray-200">{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-md p-4 rounded-xl mt-4 flex justify-between text-sm"
      >
        <p>🌅 {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
      </motion.div>
    </>
  );
}

export default WeatherDetails;