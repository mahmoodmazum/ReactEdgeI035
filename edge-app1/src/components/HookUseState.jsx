import React from "react";
import { useState } from "react";

function HookUseState() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleSubtract = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSubtract}>Subtract</button>
    </div>
  );
}

export default HookUseState;
