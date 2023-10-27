const API_KEY = "dfc2f93d5a919a74d0b85daf682223c1";

const SETTINGS = {
  moscow: {
    lat: 55.7558,
    lon: 37.6173,
  },
  london: {
    lat: 51.5072,
    lon: 0.1276,
  },
};

export const CITIES = Object.keys(SETTINGS);

export const getWeatherData = (city) => {
  const setting = SETTINGS[city];
  if (!setting) return null;

  const { lat, lon } = setting;

  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
};
