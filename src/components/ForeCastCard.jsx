function ForecastCard({ forecast}) {
    return (
        <>
        <h3 className="text-2xl font-bold mt-8 mb-4">
           5 Day Forecast
        </h3>
<div className="flex justify-between gap-2 mt-4">
  {forecast
  .filter((_, index) => index% 8 === 0)
  .slice(0, 5).map((item, index) => (
    <div
      key={index}
      className="bg-slate-700 p-2 rounded-xl flex-1"
    >
      <p className="font-bold">
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

      <p>{item.weather[0].main}</p>
    </div>
  ))}
</div>
</>
); 
}

export default ForecastCard;