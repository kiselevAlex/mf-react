import React from "react";
import { useParams, Link } from "react-router-dom";
import { getWeatherData } from "@mf/api/src";
import { useFetch } from "@mf/api/src";
import { withServerData } from "@mf/api/src";

const WeatherPage = () => {
  const { city } = useParams();

  const { data, isLoading } = useFetch(getWeatherData(city));

  return (
    <div>
      <h1>Weather</h1>
      <ul>
        <li>
          <Link to="/weather/moscow">Moscow</Link>
        </li>
        <li>
          <Link to="/weather/london">London</Link>
        </li>
      </ul>
      {!!city && (
        <>
          <h2>Weather in {city}</h2>
          {isLoading && <span>loading...</span>}
          {data && (
            <div>
              <div>current: {data?.main.temp}</div>
              <div>feels like: {data?.main.feels_like}</div>
              {data?.weather[0] && (
                <div>description: {data?.weather[0].description}</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default withServerData(WeatherPage);
