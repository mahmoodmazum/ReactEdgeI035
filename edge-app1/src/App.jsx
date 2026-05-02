import HelloComponent from "./components/HelloComponent";
import LikeButton from "./components/LikeButton";
import HookUseEffect from "./components/HookUseEffect";

function App() {
  return (
    <div>
      <HelloComponent />
      <LikeButton
        title="React is Amazing!"
        description="Just built my first component. Loving React so far!"
      />
      <LikeButton
        title="Vite is Super Fast ⚡"
        description="Switched from CRA to Vite. Never going back."
      />
      <LikeButton
        title="JSX makes sense now 😄"
        description="Once you understand JSX, everything clicks!"
      />
      <p>Welcome to React JS</p>
      <button>Click Me!</button>
      <HookUseEffect/>
    </div>
  );
}

export default App;
