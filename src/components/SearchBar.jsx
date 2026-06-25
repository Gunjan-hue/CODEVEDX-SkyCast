function SearchBar({
    city,
    setCity,
    getWeather,
    loading
}) {
    return (
        <>
         <input 
           type="text"
           placeholder="Enter City Name"
           value={city}
           onChange={(e) => setCity(e.target.value)}
           onKeyDown={(e) => {
            if (e.key === "Enter"){
              getWeather();
            }
            }}
            className="w-full p-4 mt-6 rounded-xl
            bg-white text-black
            placeholder-gray-400 outline-none"
            />

            <button 
            onClick={getWeather}
            className="w-full p-4 mt-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold"
            >
              {loading ? "Loading.." : "Search"}
            </button>
        </>
    );
}
export default SearchBar;