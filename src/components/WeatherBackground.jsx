function RainEffect() {
  const drops = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drops.map((_, i) => (
        <span
          key={i}
          className="raindrop"
          style={{
            left: `${(i * 2.6) % 100}%`,
            animationDuration: `${0.6 + (i % 5) * 0.15}s`,
            animationDelay: `${(i % 10) * 0.3}s`,
            height: `${40 + (i % 4) * 15}px`,
          }}
        />
      ))}
    </div>
  );
}

function SnowEffect() {
  const flakes = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flakes.map((_, i) => {
        const size = 4 + (i % 4) * 2;
        return (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${(i * 3.3) % 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${4 + (i % 6)}s`,
              animationDelay: `${(i % 10) * 0.4}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function CloudsEffect({ count = 5 }) {
  const clouds = Array.from({ length: count });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((_, i) => {
        const size = 80 + (i % 3) * 40;
        return (
          <span
            key={i}
            className="cloud-shape"
            style={{
              top: `${10 + i * 15}%`,
              width: `${size}px`,
              height: `${size / 2}px`,
              animationDuration: `${25 + i * 8}s`,
              animationDelay: `${i * 3}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function SunEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        className="sun-glow"
        style={{ width: "260px", height: "260px", top: "8%", right: "12%" }}
      />
    </div>
  );
}

function ThunderEffect() {
  return (
    <>
      <RainEffect />
      <div className="lightning-flash" />
    </>
  );
}

export default function WeatherBackground({ condition }) {
  return (
    <div className="absolute inset-0 -z-10">
      {condition === "Rain" && <RainEffect />}
      {condition === "Clouds" && <CloudsEffect />}
      {condition === "Clear" && <SunEffect />}
      {condition === "Snow" && <SnowEffect />}
      {condition === "Thunderstorm" && <ThunderEffect />}
      {!condition && (
        <>
          <CloudsEffect count={3} />
          <SunEffect />
        </>
      )}
    </div>
  );
}