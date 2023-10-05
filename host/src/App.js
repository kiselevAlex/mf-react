import React, { useState } from 'react';
import Microfront from './blocks/Microfront';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello from Server-Side Rendered React App!</h1>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <Microfront name="blog" />
    </div>
  );
}

export default App;
