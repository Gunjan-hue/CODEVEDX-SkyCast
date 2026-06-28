import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

function SearchBar({ city, setCity, getWeather, loading, handleUseLocation }) {
  return (
    <div className="mt-6">
      <div className="flex items-center bg-white/90 rounded-xl overflow-hidden">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
          className="w-full p-4 bg-transparent text-black placeholder-gray-400 outline-none"
        />
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => getWeather}
          className="p-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Search size={20} />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleUseLocation}
        className="flex items-center justify-center gap-2 w-full mt-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20"
      >
        <MapPin size={16} />
        Use my location
      </motion.button>

      {loading && (
        <div className="flex justify-center mt-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;