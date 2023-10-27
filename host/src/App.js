import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { ApiProvider } from "@mf/api/src";
import Microfront from "./blocks/Microfront";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ApiProvider>
      <div>
        <h1>Hello from Server-Side Rendered React App!</h1>
        <p>Counter: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>

        <ul>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/weather/*" element={<Microfront name="weather" />} />
        </Routes>
      </div>
    </ApiProvider>
  );
}

export default App;
