import React from "react";
import { Route, Routes } from "react-router-dom";
import WeatherPage from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/:city?" Component={WeatherPage} />
    </Routes>
  );
}

export default App;
