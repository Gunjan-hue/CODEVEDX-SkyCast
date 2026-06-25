function WeatherCard({ weather}) {
    return(
        <>
          <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="weather"
  className="mx-auto"
          />
    <h2 className="text-5xl font-bold">
      {Math.round(weather.main.temp)}°C
    </h2>

    <h3 className="text-2xl mt-2">
      {weather.name}
    </h3>

    <p className="mt-2">
      {weather.weather[0].main}
    </p>
    </>
    );
}
export default WeatherCard;