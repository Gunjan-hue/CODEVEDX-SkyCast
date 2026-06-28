import { motion } from "framer-motion";

function ForecastCard({ forecast }) {
  return (
    <>
      <h3 className="text-2xl font-bold mt-8 mb-4">5 Day Forecast</h3>
      <div className="flex justify-between gap-2 mt-4">
        {forecast
          .filter((_, index) => index % 8 === 0)
          .slice(0, 5)
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="bg-white/10 backdrop-blur-md p-2 rounded-xl flex-1"
            >
              <p className="font-bold text-sm">
                {new Date(item.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt=""
                className="mx-auto"
              />
              <p>{Math.round(item.main.temp)}°C</p>
              <p className="text-xs">{item.weather[0].main}</p>
            </motion.div>
          ))}
      </div>
    </>
  );
}

export default ForecastCard;