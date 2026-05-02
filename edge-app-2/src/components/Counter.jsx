function reducer(state, action) {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  }
  if (action.type === "decrement") {
    return { count: state.count - 1 };
  }
  return state;
}

import { useReducer } from "react";

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>

      <button onClick={() => dispatch({ type: "increment" })}>+</button>

      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

export default Counter;
