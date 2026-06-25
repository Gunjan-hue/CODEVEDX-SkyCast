function WeatherDetails({ weather}) {
    return (
        <>
        <div className="grid grid-cols-2 gap-4 mt-6">
  <div className="bg-slate-700 p-4 rounded-xl">
    <p className="text-3xl">💧</p>
    <p>Humidity</p>
    <p className="font-bold">
      {weather.main.humidity}%
    </p>
  </div>

  <div className="bg-slate-700 p-4 rounded-xl">
    <p className="text-3xl">🌬️</p>
    <p>Wind</p>
    <p className="font-bold">
      {weather.wind.speed} m/s
    </p>
  </div>
  
    <div className="bg-slate-700 p-4 rounded-2xl text-center">
  <p className="text-4xl">🌡️</p>
  <p>Feels Like</p>
  <p className="font-bold text-xl">
    {Math.round(weather.main.feels_like)}°C
  </p>
    </div>
  </div>
  <div className="bg-slate-700 p-4 rounded-xl mt-4">
        <p>
          Sunrise:{" "}
          {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p className="mt-2">
          Sunset:{" "}
          {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
</>
    );
}  
export default WeatherDetails;
  
    
